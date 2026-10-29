# RD's Total Lawn: website demo

Marketing site for RD's Total Lawn LLC, a family-owned lawn care company in Lower Bucks County, PA.
Built with SvelteKit 3 and Svelte 5, deployed to Cloudflare Workers.

## Run it

```sh
npm install
npm run dev
```

## Deploy

```sh
npm run deploy
```

Builds with `@sveltejs/adapter-cloudflare` and runs `wrangler deploy` using `wrangler.jsonc` (Worker name `rds-total-lawn`).

## Where things live

- **All copy and data:** `src/lib/content/site.ts`. Anything marked `placeholder: true` or `PLACEHOLDER` shows a visible tag on the page until it's replaced with the real thing.
- **Web images:** `src/lib/assets/site/` (WebP versions that ship with the site).
- **Original photos:** `src/lib/assets/rds-assets/` (full-size source images from rdtotallawn.com, see its `manifest.md`; not bundled).
- **Design rules:** `DESIGN_GUIDELINES.md`.
- **Pages:** `/` (homepage), `/quote`, `/careers`, `/privacy` (draft).

## Before launch

The quote and careers forms validate and confirm, but they only log submissions (visible in the Worker's logs). Wire them to email or a CRM in `src/routes/quote/+page.server.ts` and `src/routes/careers/+page.server.ts`.

Content still needed from the business: real Google reviews and the owners' replies, review count and Google profile link, email, office hours, PA HIC number and insurance details, BBB and Best of Bucks badge artwork, the confirmed town list, crew roles, season booking dates, careers roles, and the privacy policy.
