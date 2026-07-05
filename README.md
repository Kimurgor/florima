# Florima Landing Page

Plain HTML/CSS/JS landing page for an AI automation and workflow consulting business. The project is structured for Cloudflare Pages with a Pages Function contact endpoint at `functions/api/contact.js`.

## Structure

- `index.html` - landing page markup
- `styles.css` - responsive dark-mode design
- `script.js` - contact form submission logic
- `assets/ai-workflow-hero.png` - generated hero image
- `functions/api/contact.js` - Cloudflare Pages Function for form submissions

## Cloudflare Pages

Connect this repository to Cloudflare Pages with:

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`
- Functions directory: `functions`

The contact function accepts `POST /api/contact` with `name`, `email`, and `message`.

Optional environment variable:

- `CONTACT_WEBHOOK_URL` - webhook endpoint that receives contact submissions as JSON. If unset, submissions are logged in the Pages Function runtime.
