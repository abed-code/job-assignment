import { Content } from '@/types'
import { FC } from 'react'
import { File } from 'lucide-react';
import { Folder } from 'lucide-react';

type Props = {
  content: Content
}

const ContentItem: FC<Props> = ({ content }) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        {content.type === 'file' ? <File /> : <Folder />}
      </div>
      <div className="text-lg">{content.name}</div>
    </div>
  )
}

export default ContentItem