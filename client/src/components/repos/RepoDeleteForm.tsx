import { 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../ui/dialog'
import { Button } from '../ui/button'
import { FC } from 'react'
import { selectors, useAppStore } from '@/store'

const RepoDeleteForm: FC = () => {
  const deleteRepo = useAppStore(state => state.deleteRepo)
  const selectedRepo = useAppStore(selectors.getSelectedRepo)
  const isChangingRepos = useAppStore(state => state.isChangingRepos)

  const onDeleteConfirm = () => {
    const token = localStorage.getItem('access_token')

    if(token && selectedRepo) {
      deleteRepo(token, selectedRepo.id)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Delete Repo</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete <b>{selectedRepo?.name}</b> repo?
        </DialogDescription>
      </DialogHeader>

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

export default RepoDeleteForm