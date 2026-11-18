# Shashank Raj — Portfolio

A personal software engineering portfolio built with React, TypeScript, and Vite. Plain CSS, no UI library, and no router dependency.

## Commands

```bash
npm install
npm run dev      # local dev server
npm run lint     # ESLint
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Where things live

| What | Where |
| --- | --- |
| Name, email, location, profile links, resume | `src/data/site.ts` |
| Experience entries | `src/data/experience.ts` |
| Project metadata, tags, cover images, repo links | `src/data/projects.ts` |
| One page per project | `src/pages/projects/` (registered in `index.ts`) |
| Shared building blocks | `src/components/` |
| Project cover illustrations | `public/projects/<slug>/cover.svg` |
| Colors, fonts, spacing tokens | `src/index.css` |
| Page title, description, Open Graph tags | `index.html` |

## Content rules

Everything on the site should be something that can be backed up. Optional sections are hidden until they have real content, so there are no empty placeholder panels:

- **Resume.** `public/resume.pdf` is a sanitized public version, rebuilt from `resume-source/resume.html` (no phone number, address, or employer-internal details). To change it, edit the HTML and re-render: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=public/resume.pdf file://$PWD/resume-source/resume.html`, then check the extracted text. The original resume stays outside the project (and `.gitignore` blocks `Resume_*`); never copy it into `public/`. `resume` in `src/data/site.ts` controls the Resume links in the navbar and Contact section (new tab; the browser's PDF viewer offers download). Remove that value to hide them.
- **GitHub links.** Set `github` on a project in `src/data/projects.ts`. A project with no `github` shows no source link. Do not guess repository URLs; open them first.
- **Live demo.** Set `demo` on a project only when there is a working URL.
- **Screenshots.** Put images in `public/projects/<slug>/` and add `image: { src: '/projects/<slug>/name.png', alt: '...' }` to a slot in the project's `screenshots`. The gallery appears only when at least one slot has an image (click to open the lightbox; arrow keys to navigate, Esc to close). Never include real patient data or confidential employer material.
- **Code excerpts.** Pass real code to `<CodeSnippet>` (`code`, `filename`, `sourceUrl`, explanation). Without `code` it renders nothing. The compiler excerpts live in `src/pages/projects/compilerExcerpts.ts` and were copied verbatim from the public repository, so re-check them if that code changes.
- **Metrics and results.** Add them only when they can be backed up.

### Adding a project

1. Add an entry to `projects` in `src/data/projects.ts` (the `slug` becomes `/projects/<slug>`).
2. Add a 4:3 cover at `public/projects/<slug>/cover.svg` and reference it as `cover`.
3. Create a page component in `src/pages/projects/` using `ProjectPageLayout` and `DetailSection`.
4. Register it in `src/pages/projects/index.ts`.

## Routing and deployment

Routing uses the History API (`src/router/`), so project pages have real URLs like `/projects/cityquest`. The router also saves and restores the scroll position of each history entry so back and forward behave. A static host must serve `index.html` for unknown paths so direct links and refreshes work:

- **Vercel:** `vercel.json` already contains the rewrite.
- **Netlify / Cloudflare Pages:** `public/_redirects` already contains the rule.
- Other hosts: configure an equivalent "fallback to `/index.html`" rule.

Once there is a deployed URL, consider adding `og:url`, a canonical link, and an `og:image` to `index.html` for link previews. They are left out on purpose because the final URL is not known yet.

## Before publishing

The site is public. Only add descriptions, screenshots, metrics, and code that you are free to publish. Do not include internal details from employers.
