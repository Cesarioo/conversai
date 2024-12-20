import { CallHistory } from '../components/CallHistory'
import ErrorBoundary from '../components/ErrorBoundary'

export default function CallHistoryPage() {
  return (
    <div className="container mx-auto py-10">
      <ErrorBoundary>
        <CallHistory />
      </ErrorBoundary>
    </div>
  )
}

