import { AgentSettingsForm } from '../components/AgentSettingsForm'
import ErrorBoundary from '../components/ErrorBoundary'

export default function AgentSettings() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Agent Settings</h1>
      <ErrorBoundary>
        <AgentSettingsForm />
      </ErrorBoundary>
    </div>
  )
}

