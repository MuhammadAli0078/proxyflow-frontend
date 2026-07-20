import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { PublicLayout } from '../components/layout/DashboardLayout'
import { Button } from '../components/ui/Button'
import { FadeIn } from '../components/ui/Animations'

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <FadeIn className="text-center">
          <p className="text-8xl font-bold gradient-text mb-4">404</p>
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted mb-8">The page you're looking for doesn't exist.</p>
          <div className="flex justify-center gap-4">
            <Link to="/">
              <Button icon={<Home size={16} />}>Go Home</Button>
            </Link>
            <Button variant="outline" icon={<ArrowLeft size={16} />} onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </FadeIn>
      </div>
    </PublicLayout>
  )
}
