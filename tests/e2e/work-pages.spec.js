/**
 * Accessibility tests for the work/case study pages.
 * Mirrors the homepage suite but targets each case study page.
 */

const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const path = require('path');

const PAGES = [
  {
    name: 'QuintoAndar iOS',
    url: `file://${path.resolve(__dirname, '../../work/quintoandar-ios/index.html')}`,
  },
  {
    name: 'Cozy Design System',
    url: `file://${path.resolve(__dirname, '../../work/design-system/index.html')}`,
  },
  {
    name: 'Centauro',
    url: `file://${path.resolve(__dirname, '../../work/centauro/index.html')}`,
  },
];

for (const { name, url } of PAGES) {
  test.describe(`Work page: ${name}`, () => {

    // ── axe WCAG 2.1 AA audit ──────────────────────────────────────────────
    test('no axe violations', async ({ page }) => {
      await page.goto(url);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();

      if (results.violations.length > 0) {
        const summary = results.violations.map(v =>
          `\n  [${v.impact}] ${v.id}: ${v.description}\n  ` +
          v.nodes.map(n => n.html).join('\n  ')
        ).join('\n');
        console.log(`${name} violations:\n` + summary);
      }

      expect(results.violations).toHaveLength(0);
    });

    // ── Skip link ──────────────────────────────────────────────────────────
    test('has skip link pointing to main article', async ({ page }) => {
      await page.goto(url);
      const skip = page.locator('a.skip-link');
      await expect(skip).toBeAttached();
      expect(await skip.getAttribute('href')).toBe('#main-article');
    });

    test('skip link is first focusable element', async ({ page }) => {
      await page.goto(url);
      await page.keyboard.press('Tab');
      await expect(page.locator('a.skip-link')).toBeFocused();
    });

    test('skip link moves focus to article', async ({ page }) => {
      await page.goto(url);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page.locator('#main-article')).toBeFocused();
    });

    // ── Landmarks ──────────────────────────────────────────────────────────
    test('has lang="en"', async ({ page }) => {
      await page.goto(url);
      const lang = await page.evaluate(() => document.documentElement.lang);
      expect(lang).toBe('en');
    });

    test('has a single h1', async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('h1')).toHaveCount(1);
    });

    test('heading levels never skip', async ({ page }) => {
      await page.goto(url);
      const levels = await page.evaluate(() =>
        Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h =>
          parseInt(h.tagName.charAt(1), 10)
        )
      );
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
      }
    });

    // ── Images ─────────────────────────────────────────────────────────────
    test('every img has an alt attribute', async ({ page }) => {
      await page.goto(url);
      const missing = await page.evaluate(() =>
        Array.from(document.querySelectorAll('img'))
          .filter(img => !img.hasAttribute('alt'))
          .map(img => img.src)
      );
      expect(missing).toEqual([]);
    });

    // ── Videos ─────────────────────────────────────────────────────────────
    test('autoplay videos are hidden from AT or have aria-label', async ({ page }) => {
      await page.goto(url);
      const issues = await page.evaluate(() =>
        Array.from(document.querySelectorAll('video'))
          .filter(v => {
            const hasControls = v.hasAttribute('controls');
            const isHidden = v.getAttribute('aria-hidden') === 'true';
            const hasLabel = v.hasAttribute('aria-label');
            // If no controls, it must be either aria-hidden or labelled
            return !hasControls && !isHidden && !hasLabel;
          })
          .map(v => v.outerHTML.slice(0, 120))
      );
      expect(issues).toEqual([]);
    });

    test('videos with controls have aria-label', async ({ page }) => {
      await page.goto(url);
      const issues = await page.evaluate(() =>
        Array.from(document.querySelectorAll('video[controls]'))
          .filter(v => !v.hasAttribute('aria-label'))
          .map(v => v.outerHTML.slice(0, 120))
      );
      expect(issues).toEqual([]);
    });

    // ── Progress bar ───────────────────────────────────────────────────────
    test('progress bar (if present) has ARIA role and label', async ({ page }) => {
      await page.goto(url);
      const bar = page.locator('#progress-bar');
      const exists = await bar.count();
      if (exists > 0) {
        expect(await bar.getAttribute('role')).toBe('progressbar');
        const label = await bar.getAttribute('aria-label');
        expect(label?.trim().length).toBeGreaterThan(0);
      }
    });

    // ── Navigation ─────────────────────────────────────────────────────────
    test('logo home link has aria-label', async ({ page }) => {
      await page.goto(url);
      const logoLink = page.locator('.menu a');
      await expect(logoLink).toBeAttached();
      const label = await logoLink.getAttribute('aria-label');
      expect(label?.trim().length).toBeGreaterThan(0);
    });

    // ── Decorative elements ────────────────────────────────────────────────
    test('hover arrow divs are aria-hidden', async ({ page }) => {
      await page.goto(url);
      const hoverDivs = page.locator('.hover');
      const count = await hoverDivs.count();
      for (let i = 0; i < count; i++) {
        const hidden = await hoverDivs.nth(i).getAttribute('aria-hidden');
        expect(hidden).toBe('true');
      }
    });

    // ── External links ─────────────────────────────────────────────────────
    test('external links mention "opens in new tab" in aria-label', async ({ page }) => {
      await page.goto(url);
      const externals = page.locator('a[target="_blank"]');
      const count = await externals.count();
      for (let i = 0; i < count; i++) {
        const label = await externals.nth(i).getAttribute('aria-label');
        expect(label).toBeTruthy();
        expect(label?.toLowerCase()).toContain('opens in new tab');
      }
    });

    // ── Screen reader live region ──────────────────────────────────────────
    test('has aria-live region for announcements', async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('#sr-announcements')).toBeAttached();
    });
  });
}
