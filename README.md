# Quire — a fictional AI startup site

A complete 17-page marketing site for a company that does not exist. Built as a
design and copywriting exercise. MIT licensed — take the whole thing, swap the
name, ship your own.

**Live:** https://tomerdamari.github.io/ai-startup/

## What this is

Quire is an invented company: an AI workspace that indexes your team's existing
documents, answers questions with clickable citations, and runs scheduled agents.
Its positioning wedge is that **it refuses to answer when it can't cite a source**.

Everything on the site is fabricated — the company, the customers, the quotes,
the benchmark numbers, the certifications, the funding round, the job listings.
Nothing is a real claim about a real organization. Every page footer says so, and
the privacy and terms pages carry explicit disclaimers.

## What's real

- The **design system** is derived from a published style spec (colors, type
  scale, spacing, radii, motion timings). See below.
- The **markup and CSS** are functional and reusable.
- The **content structure** — what sections a startup site needs and in what
  order — is a usable template.

## Stack

Static HTML. One stylesheet. About 30 lines of JavaScript. No framework, no build
step, no dependencies, no package.json.

```
index.html            Home
product.html          Library / Notebook / Agents + architecture
solutions.html        Five verticals
pricing.html          Four tiers + comparison table
about.html            Origin, beliefs, team, timeline
customers.html        Four case studies
careers.html          Eight roles with salary bands
blog.html             Blog index
blog-refusal.html     Long-form post
blog-rag-benchmark.html  Long-form post
docs.html             API reference with code samples
security.html         Certifications, architecture, subprocessors
changelog.html        Release history
contact.html          Forms and addresses
privacy.html          Privacy policy
terms.html            Terms of service
404.html              Styled as the product's own refusal state
assets/style.css      Design tokens and every component
assets/site.js        Mobile nav, FAQ accordion, scroll reveal
```

## Run it

Open `index.html` in a browser. That's the whole setup. For a local server:

```bash
python -m http.server 8000
```

## Design source

The visual language follows a style spec published on
[refero.design](https://styles.refero.design/style/2ffd50d4-93b7-4acf-9bc2-e86e61b63f27)
— a "soft daylight notebook" aesthetic. The spec supplied tokens only; no page
copy was taken from it or from the site it describes.

Applied as specified:

| Token | Value | Spec |
|---|---|---|
| Canvas | `#f3f9ff` | lightened from `#ebf5ff` |
| Card surface | `#fdfeff` | lightened from `#fafdff` |
| Ink / headings | `#0a0d12` | as specified |
| Filled buttons | `#181d27` | as specified |
| Accent | `#0069e0` | as specified |
| Card radius | 32px | as specified |
| Pill radius | 9999px | as specified |
| Section gap | 80–120px | as specified |
| Base unit | 8px | as specified |

Constraints the spec imposes and this site keeps: display type is weight 500
only, never bold. No shadows on content cards. No sharp corners below 16px. No
saturated blue as a button fill. Never more than two pastel washes in one
section.

Fonts: Geist loads from Google Fonts. Aeonik is commercial, so **Inter Tight**
stands in for the display face. License Aeonik and swap the `--display` variable
in `assets/style.css` if you want exact fidelity.

## Reusing this

The design system is the useful part. `assets/style.css` is organized as tokens
first, then reset, type, layout, components. Rename the brand, replace the copy,
and you have a working startup site.

If you reuse the **content** structure, delete the fabricated trust signals
before going live — the SOC 2 and ISO badges, the named customer quotes, the
benchmark tables, the funding figure. Those are placeholders, and shipping them
as real claims would be a lie about your own company.

## Provenance

Written by Claude Opus 5 via Claude Code, in one session, from the prompt
"create a full AI startup site, all the pages, using this design." All prose is
original to that session — the design spec was the only external input.

## License

MIT. See [LICENSE](LICENSE).
