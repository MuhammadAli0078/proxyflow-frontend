import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import DashboardOverview from './DashboardOverview'
import DashboardProxies from './DashboardProxies'
import DashboardUsage from './DashboardUsage'
import DashboardSettings from './DashboardSettings'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="proxies" element={<DashboardProxies />} />
        <Route path="usage" element={<DashboardUsage />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Routes>
    </DashboardLayout>
  )
}
