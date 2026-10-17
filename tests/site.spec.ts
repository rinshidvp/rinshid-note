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
    for (const path of ['/', '/projects/', '/projects/cosmiq-sync/', '/writing/', '/writing/how-to-think-like-an-engineer-in-the-ai-era/', '/guides/', '/videos/', '/about/', '/now/', '/links/', '/contact/']) {
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

test('writing archive explains unmatched filters and lets readers reset them', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/writing/?q=agents&language=ml');
  await expect(page.getByRole('searchbox')).toHaveValue('agents');
  await expect(page.getByRole('heading', { name: 'No matching entries.' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.getByRole('heading', { name: 'No matching entries.' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'How to Think Like an Engineer in the AI Era', exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/writing\/$/);
  expect(errors).toEqual([]);
});

test('engineering article is discoverable and provides a practical reading path', async ({ page, request }) => {
  const title = 'How to Think Like an Engineer in the AI Era';
  const path = '/writing/how-to-think-like-an-engineer-in-the-ai-era/';
  await page.goto('/');
  await page.getByRole('link', { name: title, exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${path}$`));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  await page.locator('.toc').getByRole('link', { name: 'A checklist you can use today' }).click();
  await expect(page).toHaveURL(/#a-checklist-you-can-use-today$/);
  await expect(page.getByRole('heading', { name: 'A checklist you can use today' })).toBeInViewport();
  await expect(page.locator('article.prose')).toContainText('What is the smallest useful version?');
  await page.getByRole('link', { name: '← The notebook' }).click();
  await page.getByRole('searchbox').fill('canteen');
  await expect(page.getByRole('link', { name: title, exact: true })).toBeVisible();
  for (const url of ['/rss.xml', '/sitemap-0.xml']) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(path);
  }
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

test('taste article is discoverable as standalone writing with a practical reading path', async ({ page, request }) => {
  const title = 'Everyone Is Learning AI. This Skill Sets You Apart.';
  const path = '/writing/taste-in-the-ai-era/';
  await page.goto('/');
  await page.getByRole('link', { name: title, exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${path}$`));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  await expect(page.locator('.page-head .eyebrow')).toContainText('article');
  await expect(page.locator('.page-head .meta span').filter({ hasText: 'min read' })).toHaveText(/^(?:[6-9]|10) min read \(estimate\)$/);
  await expect(page.locator('article.prose h2')).toHaveCount(6);
  await expect(page.locator('.series-nav')).toHaveCount(0);
  await page.locator('.toc').getByRole('link', { name: 'How to develop taste on purpose' }).click();
  await expect(page.getByRole('heading', { name: 'How to develop taste on purpose' })).toBeInViewport();
  await expect(page.locator('article.prose')).toContainText('Try a five-minute exercise now.');
  for (const question of ['Why is this good?', 'What actually works?', 'Why do I like this?', 'What could be better?']) {
    await expect(page.locator('article.prose')).toContainText(question);
  }
  await page.getByRole('link', { name: '← The notebook' }).click();
  await page.getByRole('searchbox').fill('taste');
  await expect(page.getByRole('link', { name: title, exact: true })).toBeVisible();
  for (const url of ['/rss.xml', '/sitemap-0.xml']) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(path);
  }
});

test('publishing taste keeps the earlier engineering article available', async ({ page, request }) => {
  const articles = [
    { title: 'How to Think Like an Engineer in the AI Era', path: '/writing/how-to-think-like-an-engineer-in-the-ai-era/' },
    { title: 'Everyone Is Learning AI. This Skill Sets You Apart.', path: '/writing/taste-in-the-ai-era/' },
  ];
  for (const path of ['/', '/writing/']) {
    await page.goto(path);
    for (const article of articles) {
      await expect(page.getByRole('link', { name: article.title, exact: true })).toHaveAttribute('href', article.path);
    }
  }
  for (const article of articles) {
    expect((await request.get(article.path)).status()).toBe(200);
  }
});

test('taste illustrations contain visual artwork rather than text cards', async ({ page, request }) => {
  await page.goto('/writing/taste-in-the-ai-era/');
  const images = page.locator('article.prose figure img');
  await expect(images).toHaveCount(4);
  for (const image of await images.all()) {
    const source = await image.getAttribute('src');
    const response = await request.get(source!);
    expect(response.status()).toBe(200);
    expect(await response.text()).not.toMatch(/<(?:text|foreignObject)\b/i);
  }
});

for (const theme of ['light', 'dark'] as const) {
  test(`taste illustrations load and stay accessible at mobile and desktop widths in ${theme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 960 });
      await page.goto('/writing/taste-in-the-ai-era/');
      const figures = page.locator('article.prose figure');
      await expect(figures).toHaveCount(4);
      for (const figure of await figures.all()) {
        const image = figure.getByRole('img');
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveAttribute('alt', /\S.{30,}/);
        await expect(image).toHaveAttribute('src', /^\/images\/taste\/.+\.svg$/);
        await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
        await expect(figure.locator('figcaption')).not.toBeEmpty();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations).toEqual([]);
      await page.screenshot({ path: `.local/taste-${theme}-${width}.png`, fullPage: true });
    }
  });
}
