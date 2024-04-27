import { test, type Page } from '@playwright/test'

let page: Page

test.describe.serial('End to end', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('http://localhost:3000/')
  })

  test('Go To Homepage', async () => {
    await page.getByTestId('featured-title').click()
    await page.getByTestId('featured-overview').click()
    await page.getByTestId('featured-genre').click()
    await page.getByTestId('featured-rating').click()
  })

  test('Movie Detail', async () => {
    await page.getByTestId('featured-details').click()
    await page.getByTestId('movie-title').click()
    await page.getByTestId('movie-overview').click()
    await page.getByTestId('movie-genre').click()
    await page.getByTestId('movie-rating').click()
    await page.getByTestId('movie-runtime').click()
    await page.getByTestId('movie-language').click()
    await page.getByTestId('movie-cast').click()
  })

  test('Navigate to Home From Detail', async () => {
    await page.locator('[data-test-id="tab-Home"]').click()
  })

  test('Movie See More Button', async () => {
    await page
      .locator('div')
      .filter({ hasText: /^MoviesSee more$/ })
      .getByRole('button')
      .click()
  })

  test('Navigate to Home from Movie See More', async () => {
    await page.locator('[data-test-id="tab-Home"]').click()
  })

  test('TV Series See More Button', async () => {
    await page
      .locator('div')
      .filter({ hasText: /^TV SeriesSee more$/ })
      .getByRole('button')
      .click()
  })

  test('Navigate to Home from TV Series See More', async () => {
    await page.locator('[data-test-id="tab-Home"]').click()
  })

  ///go to series??
  //test('TV Series Details', async () => {
  //await page.getByRole('button', { name: '/ 10' }).click()
  //await page.getByRole('button', { name: 'seasons' }).click()
  //await page.getByRole('button', { name: 'episodes' }).click()
  //await page.getByRole('button', { name: 'EN', exact: true }).click()
  //await page.getByText('Season 0').click()
  //await page.getByText('Season 1', { exact: true }).click()
  //  await page.locator('.w-64').first().click()
  // await page.getByText('Episode 1', { exact: true }).click()
  //})

  test('Discover Movies by Genre', async () => {
    await page.locator('[data-test-id="tab-Movies"]').click()
    await page.getByText('Discover Movies by Genre').click()
    await page.getByRole('button', { name: 'Documentary' }).click()
  })

  test('Discover TV Series by Genre', async () => {
    await page.locator('[data-test-id="tab-TV Series"]').click()
    await page.getByText('Discover TV Series by Genre').click()
    await page.getByRole('button', { name: 'Action & Adventure' }).click()
  })

  test('Search from Navigation Bar', async () => {
    await page.getByPlaceholder('Search by title...').click()
    await page.getByPlaceholder('Search by title...').fill('harry')
    await page.getByPlaceholder('Search by title...').press('Enter')
    await page.getByText('Search your favorite movies').click()
  })
})
