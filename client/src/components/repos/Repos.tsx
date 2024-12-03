import { FC } from "react"
import { useAppStore } from "../../store"
import RepoItem from "./RepoItem"
import RepoDialog from "./RepoDialog"
import Spinner from "../ui/spinner"
import { Button } from "../ui/button"
import { RepoMode } from "@/types"

const Repos: FC = () => {
  const repos = useAppStore(state => state.repos)
  const isLoading = useAppStore(state => state.isFetchingRepos)
  const createRepoOpen = useAppStore(state => state.createRepoOpen)
  const setRepoOpen = useAppStore(state => state.setRepoOpen)

  const onOpenChange = (open: boolean) => {
    setRepoOpen(open)
  }

  return (
    <div className="container max-w-4xl mx-auto mt-10 bg-white rounded-md shadow-md p-5">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Repos</h1>

        <Button onClick={() => setRepoOpen(true, RepoMode.Create)}>
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
              onEditClick={() => setRepoOpen(true, RepoMode.Update, repo.id)}
              onDeleteClick={() => setRepoOpen(true, RepoMode.Delete, repo.id)} 
            />
          )}
        </div>
      }

      <RepoDialog open={createRepoOpen} onOpenChange={onOpenChange} />
    </div>
  )
}

export default Repos