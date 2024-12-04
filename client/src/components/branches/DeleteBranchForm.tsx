import { DialogFooter, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { selectors, useAppStore } from '@/store'

const DeleteBranchForm = () => {
  const deleteBranch = useAppStore(state => state.deleteBranch)
  const selectedRepoId = useAppStore(state => state.selectedRepoId)
  const branch = useAppStore(selectors.getSelectedBranch)
  const isChangingRepos = useAppStore(state => state.isChangingRepos)

  const onDeleteConfirm = () => {
    const token = localStorage.getItem('access_token')

    if(token && selectedRepoId && branch) {
      deleteBranch(token, selectedRepoId, branch.name)
    }
  }

  return (
    <>
      <div>Are you sure you want to delete <b>{branch?.name}</b> branch?</div>

      <DialogFooter>
        <DialogTrigger asChild>
          <Button variant="secondary">
            Cancel
          </Button>
        </DialogTrigger>

        <Button variant="destructive" onClick={onDeleteConfirm} disabled={isChangingRepos}>
          Delete
        </Button>
      </DialogFooter>
    </>
  )
}

export default DeleteBranchForm