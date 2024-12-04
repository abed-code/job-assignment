import { useAppStore } from '@/store'
import { Branch, BranchActionMode } from '@/types'
import { FC, useEffect } from 'react'
import BranchItem from './BranchItem'
import { Button } from '../ui/button'

type Props = {
  repoId: string
  branches?: Branch[]
}

const Branches: FC<Props> = ({ repoId, branches }) => {
  const fetchBranches = useAppStore(state => state.fetchBranches)
  const setBranchDialogOpen = useAppStore(state => state.setBranchDialogOpen)

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if(token) {
      fetchBranches(token, repoId)
    }
  }, [])

  return (
    <div>
      <Button 
        className="mt-3" 
        size="sm" 
        variant="outline" 
        onClick={() => setBranchDialogOpen(true, BranchActionMode.Create, repoId)}
      >
        Create new branch
      </Button>

      <div className="mt-5 space-y-5">
        {branches?.map(b =>
          <BranchItem 
            key={b.name} 
            branch={b}
            onViewClick={() => setBranchDialogOpen(
              true, 
              BranchActionMode.Read,
              repoId, 
              b.name
            )}
            onCommitClick={() => setBranchDialogOpen(
              true, 
              BranchActionMode.Commit,
              repoId, 
              b.name
            )}
            onDeleteClick={() => setBranchDialogOpen(
              true, 
              BranchActionMode.Delete,
              repoId, 
              b.name
            )}
          />
        )}
      </div>

      
    </div>
  )
}

export default Branches