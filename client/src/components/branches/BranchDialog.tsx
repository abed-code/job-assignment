import { selectors, useAppStore } from '@/store'
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle, 
} from '../ui/dialog'
import { FC, useMemo } from 'react'
import { BranchActionMode } from '@/types'
import CreateBranchForm from './CreateBranchForm'
import DeleteBranchForm from './DeleteBranchForm'
import CommitForm from './CommitForm'
import BranchContent from './BranchContent'

type Props = {
  open: boolean
  onOpenChange?: (open: boolean) => void
}

const BranchDialog: FC<Props> = ({ open, onOpenChange }) => {
  const branch = useAppStore(selectors.getSelectedBranch)
  const branchMode = useAppStore(state => state.branchMode)

  const title = useMemo(() => {
    let val = ""
    if(branchMode === BranchActionMode.Read) val = `${branch?.name} content`
    if(branchMode === BranchActionMode.Create) val = "Create a new branch"
    if(branchMode === BranchActionMode.Delete) val = "Delete branch"
    if(branchMode === BranchActionMode.Commit) val = "Commit Changes"
    
    return val
  }, [branch, branchMode])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {branchMode === BranchActionMode.Read && <BranchContent />}
        {branchMode === BranchActionMode.Create && <CreateBranchForm />}
        {branchMode === BranchActionMode.Delete && <DeleteBranchForm />}
        {branchMode === BranchActionMode.Commit && <CommitForm />}
      </DialogContent>
    </Dialog>
  )
}

export default BranchDialog