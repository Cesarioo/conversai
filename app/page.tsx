import { AgentDashboard } from './components/AgentDashboard'
import ErrorBoundary from './components/ErrorBoundary'

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <ErrorBoundary>
        <AgentDashboard />
      </ErrorBoundary>
    </div>
  )
}

