import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import AdminOverview from './AdminOverview'
import AdminCustomers from './AdminCustomers'
import AdminPackages from './AdminPackages'
import AdminTransactions from './AdminTransactions'
import AdminApi from './AdminApi'
import AdminSettings from './AdminSettings'

export default function Admin() {
  return (
    <DashboardLayout admin>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="packages" element={<AdminPackages />} />
        <Route path="transactions" element={<AdminTransactions />} />
        <Route path="api" element={<AdminApi />} />
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </DashboardLayout>
  )
}
