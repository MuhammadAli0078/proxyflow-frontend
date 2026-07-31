import { chromium } from 'playwright'

const BASE = process.env.TEST_BASE || 'https://muhammadali0078.github.io/proxyflow-frontend/'
const results = []
const log = (name, ok, detail) => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'} - ${name}${detail ? ' :: ' + detail : ''}`)
}

const browser = await chromium.launch()
const page = await browser.newPage()
const consoleErrors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text())
})
page.on('pageerror', (err) => consoleErrors.push(String(err)))

try {
  // 1. Landing page loads
  await page.goto(BASE, { waitUntil: 'networkidle' })
  const title = await page.title()
  log('Landing page loads', title.includes('ProxyFlow'), `title="${title}"`)

  // 2. Navigate to login
  await page.goto(BASE + 'login', { waitUntil: 'networkidle' })
  log('Login page reachable (BrowserRouter deep link via 404.html trick)', page.url().includes('/login'), page.url())

  // 3. Use demo account quick-fill, then log in
  await page.getByText('alex@example.com — Customer dashboard').click()
  await page.locator('form').getByRole('button', { name: 'Sign In' }).click()
  await page.waitForURL('**/dashboard', { timeout: 5000 })
  log('Login succeeds and redirects to /dashboard', page.url().includes('/dashboard'))

  // 4. Go to My Proxies page
  await page.goto(BASE + 'dashboard/proxies', { waitUntil: 'networkidle' })
  const proxyCards = await page.locator('text=Copy Proxy').count()
  log('Proxies page lists credentials', proxyCards >= 1, `${proxyCards} "Copy Proxy" buttons found`)

  // 5. Copy Proxy button works (clipboard + "Copied!" state)
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.locator('text=Copy Proxy').first().click()
  await page.waitForTimeout(300)
  const copiedVisible = await page.getByText('Copied!').count()
  log('Copy Proxy shows "Copied!" confirmation', copiedVisible >= 1)
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
  log('Clipboard actually contains a proxy string', clipboardText.includes('@') && clipboardText.length > 10, clipboardText)
  const toastVisible = await page.getByText('Proxy copied to clipboard!').count()
  log('Toast confirms copy', toastVisible >= 1)

  // 6. Refresh button works (spinner -> toast)
  await page.getByRole('button', { name: /Refresh/ }).click()
  const refreshingVisible = await page.getByText('Refreshing…').count()
  log('Refresh button shows loading state', refreshingVisible >= 1)
  await page.waitForTimeout(1000)
  const refreshedToast = await page.getByText('Proxy list refreshed!').count()
  log('Refresh completes with confirmation toast', refreshedToast >= 1)

  // 7. Search/filter works
  await page.goto(BASE + 'dashboard/proxies', { waitUntil: 'networkidle' })
  await page.getByPlaceholder('Search proxies...').fill('socks5')
  await page.waitForTimeout(300)
  const filteredCount = await page.locator('text=Copy Proxy').count()
  log('Search filters proxy list', filteredCount >= 1 && filteredCount <= proxyCards, `filtered to ${filteredCount}`)

  // 8. Export CSV triggers a download
  await page.getByPlaceholder('Search proxies...').fill('')
  const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null)
  await page.getByRole('button', { name: /Export CSV/ }).click()
  const download = await downloadPromise
  log('Export CSV triggers a file download', !!download, download ? download.suggestedFilename() : 'no download event')

  // 9. Purchase flow reaches payment step with a real package
  await page.goto(BASE + 'purchase', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Continue to Payment/ }).click()
  await page.waitForTimeout(300)
  const paymentStepVisible = await page.getByRole('heading', { name: 'Payment Method' }).count()
  log('Purchase flow reaches Payment step', paymentStepVisible >= 1)

  const payButton = page.locator('button', { hasText: /^Pay \$/ })

  // 10. Purchase card validation rejects a bad card number
  await page.getByPlaceholder('4242 4242 4242 4242').fill('123')
  await page.getByPlaceholder('MM/YY').fill('12/30')
  await page.getByPlaceholder('123').fill('123')
  await payButton.click()
  await page.waitForTimeout(300)
  const cardErrorVisible = await page.getByText('Enter a valid card number.').count()
  log('Card validation rejects invalid card number', cardErrorVisible >= 1)

  // 11. Valid card proceeds to success
  await page.getByPlaceholder('4242 4242 4242 4242').fill('4242 4242 4242 4242')
  await payButton.click()
  await page.waitForTimeout(2500)
  const successVisible = await page.getByText('Payment Successful!').count()
  log('Valid card completes purchase flow', successVisible >= 1)

  console.log('\nConsole/page errors captured during run:', consoleErrors.length)
  consoleErrors.forEach((e) => console.log('  -', e))
} catch (err) {
  console.error('Script-level failure:', err)
} finally {
  await browser.close()
}

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`)
if (failed.length) process.exit(1)
