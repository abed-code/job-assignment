import { FC } from "react"
import { useAppStore } from "../../store"
import RepoItem from "./RepoItem"
import RepoDialog from "./RepoDialog"
import Spinner from "../ui/spinner"
import { Button } from "../ui/button"
import { RepoActionMode } from "@/types"
import BranchDialog from "../branches/BranchDialog"

const Repos: FC = () => {
  const repos = useAppStore(state => state.repos)
  const isLoading = useAppStore(state => state.isFetchingRepos)
  const repoDialogOpen = useAppStore(state => state.repoDialogOpen)
  const setDialogRepoOpen = useAppStore(state => state.setRepoDialogOpen)
  const branchDialogOpen = useAppStore(state => state.branchDialogOpen)
  const setBranchDialogOpen = useAppStore(state => state.setBranchDialogOpen)

  const onRepoOpenChange = (open: boolean) => {
    setDialogRepoOpen(open)
  }

  const onBranchOpenChange = (open: boolean) => {
    setBranchDialogOpen(open)
  }

  return (
    <div className="container max-w-4xl mx-auto mt-10 bg-white rounded-md shadow-md p-5 mb-10">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Repos</h1>

        <Button onClick={() => setDialogRepoOpen(true, RepoActionMode.Create)}>
          Create new repo
        </Button>
      </div>

      {isLoading ?
        <div className="flex justify-center items-center"><Spinner /></div>
        :
        <div className="space-y-5">
          {repos.map(repo => 
            <RepoItem 
              key={repo.id} 
              repo={repo} 
              onEditClick={() => setDialogRepoOpen(true, RepoActionMode.Update, repo.id)}
              onDeleteClick={() => setDialogRepoOpen(true, RepoActionMode.Delete, repo.id)} 
            />
          )}
        </div>
      }

      <RepoDialog open={repoDialogOpen} onOpenChange={onRepoOpenChange} />
      <BranchDialog open={branchDialogOpen} onOpenChange={onBranchOpenChange} />
    </div>
  )
}

export default Repos