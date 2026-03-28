import { test, expect } from '@playwright/test'

test.describe('フード検索機能', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/explore')
  })

  test('ページが表示される', async ({ page }) => {
    await expect(page.getByText('みんなの記録から')).toBeVisible()
    await expect(page.getByPlaceholder('ごはんの名前・ブランド名で検索')).toBeVisible()
  })

  test('ブランド名で検索できる（カタカナ）', async ({ page }) => {
    await page.getByPlaceholder('ごはんの名前・ブランド名で検索').fill('ロイヤルカナン')
    await page.getByPlaceholder('ごはんの名前・ブランド名で検索').press('Enter')

    await page.waitForURL(/q=/)
    await expect(page.getByText('ロイヤルカナン').first()).toBeVisible()
  })

  test('ひらがなでカタカナのブランドが検索できる', async ({ page }) => {
    await page.getByPlaceholder('ごはんの名前・ブランド名で検索').fill('ちゃお')
    await page.getByPlaceholder('ごはんの名前・ブランド名で検索').press('Enter')

    await page.waitForURL(/q=/)
    await expect(page.getByText('チャオ').first()).toBeVisible()
  })

  test('スペース区切りでAND検索ができる', async ({ page }) => {
    await page.getByPlaceholder('ごはんの名前・ブランド名で検索').fill('ロイヤル キトン')
    await page.getByPlaceholder('ごはんの名前・ブランド名で検索').press('Enter')

    await page.waitForURL(/q=/)
    await expect(page.getByText('キトン').first()).toBeVisible()
  })

  test('種類フィルターで絞り込める', async ({ page }) => {
    await page.getByRole('link', { name: 'ウェット', exact: true }).click()

    await page.waitForURL(/type=wet/)
    const cards = page.locator('.grid a')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('年齢フィルターで絞り込める', async ({ page }) => {
    await page.getByRole('link', { name: '子猫', exact: true }).click()

    await page.waitForURL(/age=kitten/)
    const cards = page.locator('.grid a')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('検索結果がない場合メッセージが表示される', async ({ page }) => {
    await page.getByPlaceholder('ごはんの名前・ブランド名で検索').fill('存在しないフード名xyz')
    await page.getByPlaceholder('ごはんの名前・ブランド名で検索').press('Enter')

    await page.waitForURL(/q=/)
    await expect(page.getByText('該当するごはんが見つかりません')).toBeVisible()
  })

  test('フード詳細ページに遷移できる', async ({ page }) => {
    await page.getByRole('link', { name: 'ドライ', exact: true }).click()
    await page.waitForURL(/type=dry/)

    const firstCard = page.locator('.grid a').first()
    await firstCard.click()

    await expect(page).toHaveURL(/\/explore\//)
    await expect(page.locator('h1')).toBeVisible()
  })
})
