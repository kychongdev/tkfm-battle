import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/battle/select')({
  component: () => <div>Hello /battle/select!</div>
})