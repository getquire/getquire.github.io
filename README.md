# Quire — a fictional open-source project site

A complete 17-page website for a developer tool that does not exist. Built as a
design and copywriting exercise. MIT licensed — take the whole thing, swap the
name, ship your own.

**Live:** https://tomerdamari.github.io/ai-startup/

## What this is

Quire is an invented project: an open-source answer engine you run yourself.
Point it at a folder, ask a question, get an answer where every claim links to
the line it came from — or an honest refusal when there's nothing to cite.

The site is written as free-software marketing rather than SaaS marketing, which
turns out to be a different genre with different obligations. Instead of a
pricing table there's a page showing the project's actual budget and its eleven
weeks of runway. Instead of customer logos there's a showcase where every entry
names what broke first. Instead of a compliance badge wall the security page
publishes a threat model and admits what isn't solved.

Everything on it is fabricated — the tool, the CLI, the 12.4k stars, the 340
contributors, the benchmark numbers, the sponsors, the grants, the advisories.
There is nothing to `pipx install`. Every page footer says so, and the home page
carries a section explaining exactly what's invented and what isn't.

## What's real

- The **design system** is derived from a published style spec. See below.
- The **markup and CSS** are functional and reusable.
- The **page structure** — what an open-source project site needs and in what
  order — is a usable template.

## Stack

Static HTML. One stylesheet. About 120 lines of JavaScript. No framework, no
build step, no dependencies, no package.json.

```
index.html            Home — install bar, terminal demo, community, promise
product.html          How it works — the five-stage pipeline
docs.html             Install, CLI reference, config, Python and HTTP APIs
solutions.html        Recipes — five copy-paste configurations
customers.html        Showcase — what people built, and what broke first
pricing.html          Why it's free — the actual budget, both directions
careers.html          Contribute — good first issues, review, code of conduct
about.html            About & governance — who decides, and succession
security.html         Threat model, supply chain, reporting, known limits
changelog.html        Releases, including regressions and security fixes
blog.html             Blog index
blog-refusal.html     Long-form post — refusal calibration
blog-rag-benchmark.html  Long-form post — what to measure instead
contact.html          Community — where to put what, and why it matters
privacy.html          Privacy — the software collects nothing
terms.html            License — Apache-2.0 explained, plus trademark policy
404.html              Styled as the tool's own insufficient_evidence state
assets/style.css      Design tokens and every component
assets/site.js        Nav, accordion, reveals, copy button, stat counters
```

Filenames are deliberately unchanged from an earlier SaaS version of this site,
so `pricing.html` serves the "why it's free" page and `careers.html` serves
"contribute". Renaming them would have broken every inbound link for no gain.

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

| Token | Value | Spec |
|---|---|---|
| Canvas | `#ffffff` | inverted from `#ebf5ff` |
| Card surface | `#f4f8fd` | inverted from `#fafdff` |
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

**One deliberate departure.** The spec puts a blue canvas under near-white
cards, and gets all its depth from that one step — no borders, no shadows. This
site inverts it: white canvas, tinted cards. The step survives, so cards still
read as surfaces, and the daylight tint moves into an ambient wash behind the
hero rather than sitting under the whole page.

The dark terminal blocks are an addition the spec doesn't cover. They reuse the
`#181d27` the spec reserves for filled buttons, which keeps them inside the
"one dense element" rule rather than introducing a second visual weight.

Fonts: Geist loads from Google Fonts. Aeonik is commercial, so **Inter Tight**
stands in for the display face. License Aeonik and swap the `--display` variable
in `assets/style.css` if you want exact fidelity.

## Motion

All of it is CSS except the stat counters, and all of it is disabled under
`prefers-reduced-motion`.

| Where | What |
|---|---|
| Logo | Sheets fan apart on hover |
| Hero | Six-step staggered entrance on load |
| Nav links | Underline wipes in from the left |
| Cards | Lift and tint on hover; icons scale and tilt |
| Links | Underline grows from 0 to full width |
| Stat numbers | Count up from zero when scrolled into view |
| Install bar | Copy button confirms inline, reverts after 1.6s |
| Sections | Fade and rise on scroll, via IntersectionObserver |
| Logos | Continuous marquee, pauses on hover |
| FAQ | `grid-template-rows` expansion over 0.65s |

## Reusing this

The design system is the useful part. `assets/style.css` is organized as tokens
first, then reset, type, layout, components, dev-tool components, motion.
Rename the project, replace the copy, keep the system.

If you reuse the **content** structure, delete the fabricated signals first —
the star count, the contributor numbers, the benchmark tables, the sponsor list,
the security advisories. Inflated community metrics are the open-source version
of a fake logo wall, and they are just as dishonest.

## Provenance

Written by Claude Opus 5 via Claude Code across one session, from an initial
prompt asking for a full startup site in a given design, then reworked into an
open-source project site. All prose is original to that session — the design
spec was the only external input.

## License

MIT. See [LICENSE](LICENSE).
