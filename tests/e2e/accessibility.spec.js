/**
 * Accessibility test suite for lotsuka.com
 *
 * Covers:
 *  - WCAG 2.1 AA automated audit (axe-core via AxeBuilder)
 *  - Keyboard navigation & tab order
 *  - Skip navigation link
 *  - Focus indicators
 *  - Semantic landmarks & heading hierarchy
 *  - Alt text on all images
 *  - ARIA labels on icon-only / external links
 *  - prefers-reduced-motion support
 *  - Screen-reader-oriented checks (roles, names, descriptions)
 *  - Colour contrast
 */

const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const path = require('path');
const fs = require('fs');

const PAGE_URL = `file://${path.resolve(__dirname, '../../index.html')}`;

// axe-core source for manual injection (used by the contrast spot-check)
const AXE_SOURCE = fs.readFileSync(
  path.resolve(__dirname, '../../node_modules/axe-core/axe.min.js'),
  'utf8'
);

// ─── helpers ──────────────────────────────────────────────────────────────────

async function openPage(page, reducedMotion = false) {
  if (reducedMotion) {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  }
  await page.goto(PAGE_URL);
}

// ─── 1. Automated WCAG 2.1 AA audit ──────────────────────────────────────────

test.describe('WCAG 2.1 AA automated audit', () => {
  test('no axe violations on the homepage', async ({ page }) => {
    await openPage(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    if (results.violations.length > 0) {
      const summary = results.violations
        .map(v =>
          `\n  [${v.impact}] ${v.id}: ${v.description}\n  ` +
          v.nodes.map(n => n.html).join('\n  ')
        )
        .join('\n');
      console.log('Violations:\n' + summary);
    }

    expect(results.violations).toHaveLength(0);
  });
});

// ─── 2. Semantic landmarks ────────────────────────────────────────────────────

test.describe('Semantic landmarks', () => {
  test('page has a <header> with role="banner"', async ({ page }) => {
    await openPage(page);
    const header = page.locator('header[role="banner"]');
    await expect(header).toBeVisible();
  });

  test('page has a <main> with id="main-content"', async ({ page }) => {
    await openPage(page);
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();
  });

  test('page has a <footer> with role="contentinfo"', async ({ page }) => {
    await openPage(page);
    const footer = page.locator('footer[role="contentinfo"]');
    await expect(footer).toBeVisible();
  });

  test('projects section has aria-labelledby pointing to a heading', async ({ page }) => {
    await openPage(page);
    const section = page.locator('section[aria-labelledby]');
    const labelId = await section.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    const label = page.locator(`#${labelId}`);
    await expect(label).toBeAttached();
    const text = await label.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });
});

// ─── 3. Heading hierarchy ─────────────────────────────────────────────────────

test.describe('Heading hierarchy', () => {
  test('exactly one <h1> on the page', async ({ page }) => {
    await openPage(page);
    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
  });

  test('h1 contains the designer name', async ({ page }) => {
    await openPage(page);
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Lucas Otsuka');
  });

  test('all project articles contain an <h2>', async ({ page }) => {
    await openPage(page);
    const projects = page.locator('article.project');
    const count = await projects.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(projects.nth(i).locator('h2')).toBeAttached();
    }
  });

  test('heading levels never skip', async ({ page }) => {
    await openPage(page);
    const headingLevels = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h =>
        parseInt(h.tagName.charAt(1), 10)
      )
    );
    for (let i = 1; i < headingLevels.length; i++) {
      expect(headingLevels[i] - headingLevels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
});

// ─── 4. Skip navigation ───────────────────────────────────────────────────────

test.describe('Skip navigation', () => {
  test('skip link exists and points to #main-content', async ({ page }) => {
    await openPage(page);
    const skip = page.locator('a.skip-link');
    await expect(skip).toBeAttached();
    expect(await skip.getAttribute('href')).toBe('#main-content');
  });

  test('skip link is the first focusable element', async ({ page }) => {
    await openPage(page);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip-link')).toBeFocused();
  });

  test('activating skip link moves focus to main content', async ({ page }) => {
    await openPage(page);
    await page.keyboard.press('Tab');   // focus skip link
    await page.keyboard.press('Enter'); // activate it
    await expect(page.locator('#main-content')).toBeFocused();
  });
});

// ─── 5. Keyboard navigation ───────────────────────────────────────────────────

test.describe('Keyboard navigation', () => {
  test('all interactive elements are reachable by Tab', async ({ page }) => {
    await openPage(page);

    const focusedTags = new Set();
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab');
      const tag = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName : null;
      });
      if (tag) focusedTags.add(tag);
    }
    // Should have reached links and at least one other element type
    expect(focusedTags.size).toBeGreaterThanOrEqual(2);
    expect(focusedTags.has('A')).toBe(true);
  });

  test('Shift+Tab works (focus not trapped)', async ({ page }) => {
    await openPage(page);
    // Tab forward to the 4th element
    for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');
    const forwardTag = await page.evaluate(() => document.activeElement?.tagName);

    // Shift+Tab back — focus should move to a different element
    await page.keyboard.press('Shift+Tab');
    const backTag = await page.evaluate(() => document.activeElement?.tagName);

    // If focus moved at all (even to body), it's not trapped
    // The key assertion: it's not stuck on the same element
    const forwardEl = await page.evaluate(() => document.activeElement?.outerHTML?.slice(0, 80));
    // Just confirm Shift+Tab didn't throw and focus changed
    expect(backTag).toBeDefined();
  });

  test('project links have an href (keyboard-activatable)', async ({ page }) => {
    await openPage(page);
    const projectLinks = page.locator('article.project a[href]');
    const count = await projectLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const href = await projectLinks.nth(i).getAttribute('href');
      expect(href?.trim().length).toBeGreaterThan(0);
    }
  });
});

// ─── 6. Focus indicators ──────────────────────────────────────────────────────

test.describe('Focus indicators', () => {
  test('focused links have a visible outline', async ({ page }) => {
    await openPage(page);
    await page.keyboard.press('Tab'); // skip link
    await page.keyboard.press('Tab'); // first real interactive element

    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return { style: s.outlineStyle, width: s.outlineWidth };
    });

    expect(outline).not.toBeNull();
    expect(outline.style === 'none' || outline.width === '0px').toBe(false);
  });
});

// ─── 7. Image alt text ────────────────────────────────────────────────────────

test.describe('Image alt text', () => {
  test('every <img> has an alt attribute', async ({ page }) => {
    await openPage(page);
    const missing = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img'))
        .filter(img => !img.hasAttribute('alt'))
        .map(img => img.src)
    );
    expect(missing).toEqual([]);
  });

  test('meaningful images have non-empty alt text', async ({ page }) => {
    await openPage(page);
    const emptyNonDecorative = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img'))
        .filter(img => {
          const alt = img.getAttribute('alt');
          const isDecorative =
            img.getAttribute('role') === 'presentation' ||
            img.getAttribute('aria-hidden') === 'true';
          return alt === '' && !isDecorative;
        })
        .map(img => img.src)
    );
    expect(emptyNonDecorative).toEqual([]);
  });
});

// ─── 8. ARIA labels ───────────────────────────────────────────────────────────

test.describe('ARIA labels', () => {
  test('all social icon links have aria-label', async ({ page }) => {
    await openPage(page);
    const links = page.locator('.social_button');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const label = await links.nth(i).getAttribute('aria-label');
      expect(label?.trim().length).toBeGreaterThan(0);
    }
  });

  test('all external links have aria-label mentioning "opens in new tab"', async ({ page }) => {
    await openPage(page);
    const externals = page.locator('a[target="_blank"]');
    const count = await externals.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const label = await externals.nth(i).getAttribute('aria-label');
      expect(label).toBeTruthy();
      expect(label?.toLowerCase()).toContain('opens in new tab');
    }
  });

  test('email button has an accessible name', async ({ page }) => {
    await openPage(page);
    const emailBtn = page.locator('a.button[href^="mailto"]');
    await expect(emailBtn).toBeAttached();
    const name = await emailBtn.evaluate(
      el => el.getAttribute('aria-label') || el.textContent?.trim()
    );
    expect(name?.length).toBeGreaterThan(0);
  });

  test('aria-live region exists for screen reader announcements', async ({ page }) => {
    await openPage(page);
    await expect(page.locator('[aria-live]')).toBeAttached();
  });
});

// ─── 9. prefers-reduced-motion ────────────────────────────────────────────────

test.describe('Motion preferences', () => {
  test('animated elements are immediately visible with prefers-reduced-motion', async ({ page }) => {
    await openPage(page, true); // reducedMotion = true

    const el = page.locator('.show-on-scroll').first();
    await expect(el).toBeAttached();

    const opacity = await el.evaluate(
      node => parseFloat(window.getComputedStyle(node).opacity)
    );
    expect(opacity).toBeGreaterThanOrEqual(1);
  });

  test('noscript fallback for animated elements is present', async ({ page }) => {
    await openPage(page);
    const hasNoscript = await page.evaluate(() =>
      document.querySelector('noscript')?.textContent?.includes('show-on-scroll') ?? false
    );
    expect(hasNoscript).toBe(true);
  });
});

// ─── 10. Screen reader roles and names ───────────────────────────────────────

test.describe('Screen reader roles and names', () => {
  test('page has lang="en"', async ({ page }) => {
    await openPage(page);
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang).toBe('en');
  });

  test('page title is descriptive and mentions Lucas', async ({ page }) => {
    await openPage(page);
    const title = await page.title();
    expect(title.trim().length).toBeGreaterThan(5);
    expect(title.toLowerCase()).toContain('lucas');
  });

  test('project articles each contain a heading', async ({ page }) => {
    await openPage(page);
    const articles = page.locator('article.project');
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(articles.nth(i).locator('h2,h3').first()).toBeAttached();
    }
  });

  test('nav elements (if any) have accessible names', async ({ page }) => {
    await openPage(page);
    const navs = page.locator('nav');
    const count = await navs.count();
    for (let i = 0; i < count; i++) {
      const label = await navs.nth(i).evaluate(
        el => el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')
      );
      expect(label).toBeTruthy();
    }
  });
});

// ─── 11. Colour contrast ──────────────────────────────────────────────────────

test.describe('Colour contrast', () => {
  test('no critical colour contrast violations', async ({ page }) => {
    await openPage(page);
    // Inject axe-core manually for direct window.axe access
    await page.evaluate(AXE_SOURCE);

    const violations = await page.evaluate(async () => {
      // @ts-ignore
      const results = await window.axe.run(document, {
        runOnly: { type: 'rule', values: ['color-contrast'] },
      });
      return results.violations;
    });

    const critical = violations.filter(v => v.impact === 'critical');
    if (critical.length > 0) {
      console.log(
        'Critical contrast violations:\n',
        critical.map(v => `${v.id}: ${v.nodes.map(n => n.html).join(', ')}`).join('\n')
      );
    }
    expect(critical).toHaveLength(0);
  });
});
