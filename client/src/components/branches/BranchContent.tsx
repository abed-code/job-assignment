import { selectors, useAppStore } from '@/store'
import { useEffect } from 'react'
import ContentItem from './ContentItem'

const BranchContent = () => {
  const fetchBranchContent = useAppStore(state => state.fetchBranchContent)
  const selectedRepoId = useAppStore(state => state.selectedRepoId)
  const selectedBranchId = useAppStore(state => state.selectedBranchId)
  const content = useAppStore(selectors.getBranchContent)

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if(token && selectedRepoId && selectedBranchId) {
      fetchBranchContent(token, selectedRepoId, selectedBranchId)
    }
  }, [])

  return (
    <div className="space-y-2">
      {content?.map(c => 
        <ContentItem key={c.name} content={c} />
      )}
    </div>
  )
}

export default BranchContent