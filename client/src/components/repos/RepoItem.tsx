import { FC, useState } from 'react'
import { Repo } from '../../types'
import { Button } from '../ui/button'
import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import Branches from '../branches/Branches';

type Props = {
  repo: Repo
  onEditClick: () => void
  onDeleteClick: () => void
}

const RepoItem: FC<Props> = ({ repo, onEditClick, onDeleteClick }) => {
  const [viewBranches, setViewBranches] = useState(false)

  return (
    <div className="border p-5 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-5">
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

      <hr />

      <div className="mt-3">
        <Button variant="link" className="px-0" onClick={() => setViewBranches(v => !v)}>
          {viewBranches ? "Hide Branches" : "View Branches"}
        </Button>
        
        {viewBranches && <Branches repoId={repo.id} branches={repo.branches} />}
      </div>
    </div>
  )
}

export default RepoItem