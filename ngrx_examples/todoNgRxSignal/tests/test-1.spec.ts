import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('listitem').filter({ hasText: 'delectus aut autem' }).getByRole('checkbox').check();

  await page.getByRole('button', { name: 'Completed' }).click();
  await expect(page.getByText('delectus aut autem')).toBeVisible();
});