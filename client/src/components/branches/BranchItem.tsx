import { Branch } from '@/types'
import { FC } from 'react'
import { GitBranch, Trash, GitCommitHorizontal, Files } from 'lucide-react';
import { Button } from '../ui/button';

type Props = {
  branch: Branch
  onViewClick: () => void
  onCommitClick: () => void
  onDeleteClick: () => void
}

const BranchItem: FC<Props> = ({ branch, onViewClick, onDeleteClick, onCommitClick }) => {
  return (
    <div className="flex space-x-5 items-center">
      <GitBranch />

      <div className="font-bold">{branch.name}</div>

      <Button 
        onClick={onViewClick}
        variant="outline" 
        size="sm"
        className="h-7"
      >
        <Files /> View Changes
      </Button>

      <Button
        onClick={onCommitClick}
        variant="outline" 
        size="sm"
        className="h-7"
      >
        <GitCommitHorizontal /> Commit
      </Button>

      <Button 
        onClick={onDeleteClick}
        variant="outline" 
        size="sm" 
        className="text-red-500 w-8 h-7"
      >
        <Trash />
      </Button>
    </div>
  )
}

export default BranchItem