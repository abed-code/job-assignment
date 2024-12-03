import { FC } from 'react'
import { Repo } from '../../types'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';

type Props = {
  repo: Repo
  onEditClick: () => void
  onDeleteClick: () => void
}

const RepoItem: FC<Props> = ({ repo, onEditClick, onDeleteClick }) => {
  return (
    <div className="flex justify-between items-center border p-5 rounded-md shadow-sm">
      <div className="flex items-center gap-3">
        <h3 className="text-xl">{repo.name}</h3>
        <div className="border border-gray-400 text-gray-600 rounded-full px-2 text-sm">
          {repo.private ? "Private" : "Public"}
        </div>
      </div>

      <div className="space-x-5">
        <Button variant="secondary" onClick={onEditClick}>
          <Pencil />
        </Button>

        <Button variant="destructive" onClick={onDeleteClick}>
          <Trash />
        </Button>
      </div>
    </div>
  )
}

export default RepoItem