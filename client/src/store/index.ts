import { create } from "zustand";
import { GithubApi } from "../api/git";
import { 
  Branch,
  BranchActionMode, 
  CommitBody, 
  Content, 
  CreateRepoBody, 
  Repo, 
  RepoActionMode, 
  UpdateRepoBody, 
  User 
} from "../types";

type State = {
  user?: User
  repos: Repo[]
  branchContent: Record<string, Content[]>
  selectedRepoId?: string
  selectedBranchId?: string
  repoMode?: RepoActionMode
  branchMode?: BranchActionMode
  isFetchingRepos: boolean
  isChangingRepos: boolean
  isChangingBranches: boolean
  isCommitting: boolean
  repoDialogOpen: boolean
  branchDialogOpen: boolean
}

type Actions = {
  fetchUserData: (token: string) => void
  createRepo: (token: string, repoBody: CreateRepoBody) => void
  updateRepo: (token: string, repoId: string, repoBody: UpdateRepoBody) => void
  deleteRepo: (token: string, repoId: string) => void
  setRepoDialogOpen: (open: boolean, mode?: RepoActionMode, selectedRepoId?: string) => void
  fetchBranches: (token: string, repoId: string) => void
  setBranchDialogOpen: (
    open: boolean, 
    mode?: BranchActionMode, 
    selectedRepoId?: string, 
    selectedBranchId?: string
  ) => void
  createBranch: (token: string, repoId: string, name: string) => void
  deleteBranch: (token: string, repoId: string, name: string) => void
  commit: (token: string, repoId: string, name: string, body: CommitBody) => void
  fetchBranchContent: (token: string, repoId: string, name: string) => void
}

export type StoreState = State & Actions

export const useAppStore = create<StoreState>((set, get) => ({
  user: undefined,
  repos: [],
  branchContent: {},
  selectedRepoId: undefined,
  selectedBranchId: undefined,
  repoMode: undefined,
  branchMode: undefined,
  isFetchingRepos: false,
  isChangingRepos: false,
  isChangingBranches: false,
  isCommitting: false,
  repoDialogOpen: false,
  branchDialogOpen: false,
  setRepoDialogOpen: (open: boolean, mode?: RepoActionMode, selectedRepoId?: string) => {
    set({ ...get(), repoDialogOpen: open, repoMode: mode, selectedRepoId })
  },
  setBranchDialogOpen: (
    open: boolean, 
    mode?: BranchActionMode, 
    selectedRepoId?: string, 
    selectedBranchId?: string
  ) => {
    set({ 
      ...get(), 
      branchDialogOpen: open, 
      branchMode: mode, 
      selectedRepoId, 
      selectedBranchId 
    })
  },
  fetchUserData: async (token: string) => {
    set({ ...get(), isFetchingRepos: true })

    const user = await GithubApi.fetchUser(token)
    const repos = await GithubApi.fetchRepos(token, user.login)
    
    set({ ...get(), user, repos, isFetchingRepos: false })
  },
  createRepo: async (token: string, repoBody: CreateRepoBody) => {
    set({ ...get(), isChangingRepos: true })

    const repo = await GithubApi.createRepo(token, repoBody)

    set({ 
      ...get(), 
      repos: [repo, ...get().repos], 
      isChangingRepos: false, 
      repoDialogOpen: false 
    })
  },
  updateRepo: async (token: string, repoId: string, repoBody: UpdateRepoBody) => {
    set({ ...get(), isChangingRepos: true })

    const repo = get().repos.find(r => r.id === repoId)
    const owner = get().user?.login

    if (owner && repo) {
      const updatedRepo = await GithubApi.updateRepo(token, owner, repo.name, repoBody)
  
      const updatedRepos = [...get().repos].map(
        r => r.id === repoId ? { ...r, ...updatedRepo } : r
      )

      set({ 
        ...get(), 
        repos: updatedRepos, 
        isChangingRepos: false, 
        repoDialogOpen: false 
      })
    }
  },
  deleteRepo: async (token: string, repoId: string) => {
    set({ ...get(), isChangingRepos: true })

    const repo = get().repos.find(r => r.id === repoId)
    const owner = get().user?.login

    if (owner && repo) {
      await GithubApi.deleteRepo(token, owner, repo.name)
  
      const updatedRepos = [...get().repos].filter(r => r.id !== repoId)

      set({ 
        ...get(), 
        repos: updatedRepos, 
        isChangingRepos: false, 
        repoDialogOpen: false 
      })
    }
  },
  fetchBranches: async (token: string, repoId: string) => {
    set({ ...get(), selectedRepoId: repoId })

    const repo = get().repos.find(r => r.id === repoId)
    const owner = get().user?.login

    if (owner && repo && !repo.branchesFecthed) {
      const branches = await GithubApi.fetchBranches(token, owner, repo.name)
  
      const updatedRepos = [...get().repos].map(
        r => r.id === repoId ? { ...r, branches, branchesFecthed: true } : r
      )

      set({ 
        ...get(), 
        repos: updatedRepos, 
        selectedRepoId: undefined
      })
    }
  },
  createBranch: async (token: string, repoId: string, name: string) => {
    set({ ...get(), isChangingBranches: true })

    const repo = get().repos.find(r => r.id === repoId)
    const owner = get().user?.login

    if (owner && repo) {
      await GithubApi.createBranches(token, owner, repo.name, name)
  
      const branch = { name } as Branch

      const updatedRepos = [...get().repos].map(
        r => r.id === repoId ? { 
          ...r, 
          branches: r.branches?.length ? [branch, ...r.branches] : [branch]
        } : r
      )

      set({ 
        ...get(),
        repos: updatedRepos,
        branchDialogOpen: false,
        isChangingBranches: false 
      })
    }
  },
  deleteBranch: async (token: string, repoId: string, name: string) => {
    set({ ...get(), isChangingRepos: true })

    const repo = get().repos.find(r => r.id === repoId)
    const owner = get().user?.login

    if (owner && repo) {
      await GithubApi.deleteBranch(token, owner, repo.name, name)
  
      const updatedRepos = [...get().repos].map(
        r => r.id === repoId ? { 
          ...r, 
          branches: r.branches?.filter(b => b.name !== name)
        } : r
      )

      set({ 
        ...get(), 
        repos: updatedRepos, 
        isChangingBranches: false, 
        branchDialogOpen: false 
      })
    }
  },
  commit: async (token: string, repoId: string, name: string, body: CommitBody) => {
    set({ ...get(), isCommitting: true })

    const repo = get().repos.find(r => r.id === repoId)
    const owner = get().user?.login

    if (owner && repo) {
      await GithubApi.commit(token, owner, repo.name, name, body)

      set({ ...get(), branchDialogOpen: false, isCommitting: false })
    }
  },
  fetchBranchContent: async (token: string, repoId: string, name: string) => {
    const repo = get().repos.find(r => r.id === repoId)
    const owner = get().user?.login

    if (owner && repo) {
      const data = await GithubApi.fetchBranchContent(token,owner, repo.name, name)
      const branchContent = { ...get().branchContent, [name]: data.contents }
      set({ ...get(), branchContent })
    }
  }
}))

export const selectors = {
  getSelectedRepo: (state: StoreState) => {
    return state.selectedRepoId ? 
      state.repos.find(r => r.id === state.selectedRepoId) :
      undefined
  },
  getDialogTitle: (state: StoreState) => {
    return state.repoMode === RepoActionMode.Create ? 
      "Create a new Repo" :
      "Update Repo"
  },
  getSelectedBranch: (state: StoreState) => {
    if(state.selectedRepoId && state.selectedBranchId) {
      const repo = state.repos.find(r => r.id === state.selectedRepoId)

      if(repo) {
        const branch = repo.branches?.find(b => b.name === state.selectedBranchId)
        return branch
      }
    }

    return undefined
  },
  getBranchContent: (state: StoreState) => {
    if(state.selectedBranchId) {
      return state.branchContent[state.selectedBranchId]
    }

    return []
  }
}