# Florima Hugo Site

Hugo-powered landing page for an AI automation and workflow consulting business. The project is structured for Cloudflare Pages with a Pages Function contact endpoint at `functions/api/contact.js`.

## Structure

- `hugo.toml` - Hugo site configuration
- `layouts/index.html` - homepage template
- Tailwind CSS CDN - responsive page styling through utility classes
- `static/script.js` - contact form submission logic
- `static/assets/ai-workflow-hero.png` - generated hero image
- `functions/api/contact.js` - Cloudflare Pages Function for form submissions

## Local Development

```sh
npm run serve
```

Build the static site into `public/`:

```sh
npm run build
```

## Cloudflare Pages

Connect this repository to Cloudflare Pages with:

- Framework preset: `None`
- Build command: `hugo --minify`
- Build output directory: `public`
- Functions directory: `functions`

For direct Wrangler deploys, use:

```sh
npm run deploy
```

If your Cloudflare project currently uses `npx wrangler deploy`, change it to
`npm run deploy` so Wrangler deploys the generated Hugo `public/` directory as a
Pages site.

The contact function accepts `POST /api/contact` with `name`, `email`, and `message`.

Optional environment variable:

- `CONTACT_WEBHOOK_URL` - webhook endpoint that receives contact submissions as JSON. If unset, submissions are logged in the Pages Function runtime.
