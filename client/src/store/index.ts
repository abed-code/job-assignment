import { create } from "zustand";
import { GithubApi } from "../api/git";
import { CreateRepoBody, Repo, RepoMode, UpdateRepoBody, User } from "../types";

type State = {
  user?: User
  repos: Repo[]
  selectedRepoId?: string
  repoMode?: RepoMode
  isFetchingRepos: boolean
  isChangingRepos: boolean
  createRepoOpen: boolean
}

type Actions = {
  fetchUserData: (token: string) => void
  createRepo: (token: string, repoBody: CreateRepoBody) => void
  updateRepo: (token: string, repoId: string, repoBody: UpdateRepoBody) => void
  deleteRepo: (token: string, repoId: string) => void
  setRepoOpen: (open: boolean, mode?: RepoMode, selectedRepoId?: string) => void
}

export type StoreState = State & Actions

export const useAppStore = create<StoreState>((set, get) => ({
  user: undefined,
  repos: [],
  selectedRepoId: undefined,
  repoMode: undefined,
  isFetchingRepos: false,
  isChangingRepos: false,
  createRepoOpen: false,
  setRepoOpen: (open: boolean, mode?: RepoMode, selectedRepoId?: string) => {
    set({ ...get(), createRepoOpen: open, repoMode: mode, selectedRepoId })
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
      createRepoOpen: false 
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
        createRepoOpen: false 
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
        createRepoOpen: false 
      })
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
    return state.repoMode === RepoMode.Create ? 
      "Create a new Repo" :
      "Update Repo"
  },
}