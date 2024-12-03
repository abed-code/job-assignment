import { selectors, useAppStore } from '@/store'
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle, 
} from '../ui/dialog'
import RepoForm from './RepoForm'
import { FC } from 'react'
import RepoDeleteForm from './RepoDeleteForm'
import { RepoMode } from '@/types'

type Props = {
  open: boolean
  onOpenChange?: (open: boolean) => void
}

const RepoDialog: FC<Props> = ({ open, onOpenChange }) => {
  const title = useAppStore(selectors.getDialogTitle)
  const repoMode = useAppStore(state => state.repoMode)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {repoMode === RepoMode.Delete ? 
          <RepoDeleteForm />
          :
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <RepoForm />
          </>
        }
      </DialogContent>
    </Dialog>
  )
}

export default RepoDialog