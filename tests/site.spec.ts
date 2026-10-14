import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('legacy project links and author contact remain available', async ({ page }) => {
  await page.goto('/projects/');
  await expect(page.getByRole('link', { name: 'my GitHub profile ↗', exact: true })).toHaveAttribute('href', 'https://github.com/rinshidvp');
  await page.getByRole('link', { name: 'BlinkBreak', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('BlinkBreak');
  await expect(page.getByRole('heading', { name: 'What it does' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Explore more' }).getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page.getByRole('link', { name: 'muhammedrinshidvpr@gmail.com' })).toHaveAttribute('href', 'mailto:muhammedrinshidvpr@gmail.com');
});

test('dark appearance persists and system preference works', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' }); await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByLabel('Appearance').selectOption('light'); await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByLabel('Appearance').selectOption('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

for (const theme of ['light', 'dark'] as const) {
  test(`pages remain readable and accessible on mobile in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 }); await page.emulateMedia({ colorScheme: theme });
    for (const path of ['/', '/projects/', '/projects/cosmiq-sync/', '/writing/', '/guides/', '/videos/', '/about/', '/now/', '/links/', '/contact/']) {
      const response = await page.goto(path); expect(response?.status()).toBe(200);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations, `${path}: ${JSON.stringify(results.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => node.target) })))}`).toEqual([]);
    }
  });
}

test('draft and private direct URLs are not published', async ({ request }) => {
  for (const path of ['/writing/draft-canary/', '/videos/draft-video/', '/projects/private-project-canary/']) expect((await request.get(path)).status()).toBe(404);
});

test('empty writing archive presents useful context without search controls', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/writing/?q=agents&language=ml');
  await expect(page.getByRole('searchbox')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'No writing published yet.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Engineering in the AI era', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('keyboard skip link and desktop composition are usable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('/');
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter'); await expect(page.locator('main')).toBeFocused();
  await page.locator('main').blur();
  await page.screenshot({ path: '.local/home-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 }); await page.screenshot({ path: '.local/home-mobile.png', fullPage: true });
  await page.getByRole('navigation', { name: 'Footer' }).getByRole('link', { name: 'Student guides' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Student guides.');
  await page.getByRole('navigation', { name: 'Footer' }).getByRole('link', { name: 'Videos', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Videos.');
});

test('notebook is reading-first with a short bio, portfolio and social links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
  await expect(page.locator('main .intro')).toContainText('Muhammed Rinshid V P');
  await expect(page.locator('main')).not.toContainText('Selected projects');
  await expect(page.locator('main')).not.toContainText('Previously:');
  await expect(page.locator('main')).not.toContainText('On my desk');
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(navigation.getByRole('link', { name: 'Projects', exact: true })).toHaveCount(0);
  await page.getByRole('link', { name: 'Browse writing' }).click();
  await expect(page).toHaveURL(/\/writing\/$/);
  await navigation.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page.locator('main .summary')).toContainText('CS student and builder from Kerala');
  await expect(page.locator('.experience-list')).toHaveCount(0);
  await expect(page.locator('#skills, #education')).toHaveCount(0);
  const socialLinks = {
    Portfolio: 'https://rinshid-portfolio.vercel.app/',
    GitHub: 'https://github.com/rinshidvp',
    LinkedIn: 'https://www.linkedin.com/in/rinshidrazaq/',
    YouTube: 'https://www.youtube.com/@RinshidRazaq',
    Instagram: 'https://www.instagram.com/rinshidrazaq/',
  };
  for (const [platform, url] of Object.entries(socialLinks)) {
    await expect(page.locator('main').getByRole('link', { name: `${platform} ↗`, exact: true })).toHaveAttribute('href', url);
    await expect(page.getByRole('navigation', { name: 'Footer' }).getByRole('link', { name: platform, exact: true })).toHaveAttribute('href', url);
  }
});

test('previous Now page remains reachable by its existing URL', async ({ page }) => {
  await page.goto('/now/');
  await expect(page.locator('.page-head time')).toHaveAttribute('datetime', '2026-10-06T00:00:00.000Z');
  await expect(page.getByRole('heading', { name: 'Building this notebook', exact: true })).toBeVisible();
});
