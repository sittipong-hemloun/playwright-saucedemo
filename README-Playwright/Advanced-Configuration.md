# Advanced Configuration

playwright.config.ts

```tsx
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 2, // Retry failed tests twice
  reporter: 'html',
  use: {
    headless: true,  // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://example.com',
  },
});
```