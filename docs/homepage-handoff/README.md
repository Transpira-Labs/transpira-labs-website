# Manifest homepage: build handoff

This folder hands the approved homepage design to Claude Code to build for production.

- `design/homepage.dc.html` is the source of truth. It is the "OpenTag-style flow" variant from the design canvas.
- This README is the spec: what to build, how it behaves, and what is still a placeholder.

## How to use this with Claude Code

1. Copy this folder into the website repo, for example at `docs/homepage-handoff/`.
2. Open Claude Code in the repo and paste this prompt:

> Build the new homepage from `docs/homepage-handoff/`. Treat `design/homepage.dc.html` as the visual source of truth and `README.md` as the spec. Port it into this project's existing stack and component conventions, not as one big HTML file. Match spacing, type and colour exactly. Make every interaction in the "Interactions" section work. Keep the placeholder content listed under "Before launch" and add a TODO comment beside each one. Check the page at 1440px, 1024px, 768px and 390px wide.

## Reading the design file

The file is in the design canvas's component format. It is close to plain HTML, with these additions:

| In the file | What it means |
|---|---|
| `<x-dc>…</x-dc>` | The page markup |
| `<helmet>` | Head content: the font links, keyframes and global CSS |
| `{{name}}` | A value computed in `renderVals()` at the bottom of the file |
| `<sc-for list="{{items}}" as="item">` | Loop: render the children once per item |
| `<sc-if value="{{flag}}">` | Render the children only when the flag is true |
| `onClick="{{fn}}"` | Click handler returned from `renderVals()` |
| `class Component extends DCLogic` | Component state (`this.state`, `setState`) and all the data arrays |
| `./support.js` | The canvas runtime. Do not ship it. |

All styling is inline. Lift the repeated values into the tokens below.

## Design tokens

**Colour**

| Token | Hex | Use |
|---|---|---|
| paper | `#F7F5EF` | Page background |
| paper-deep | `#ECE9E1` | Section bands, document stage |
| line | `#E6E3DA` / `#DCD8CC` | Borders and dividers |
| ink | `#1A1C1E` | Text, dark sections, footer |
| steel | `#5F666C` | Secondary text |
| amber | `#F5A300` | The only accent: primary buttons, active markers, the road line. Text on it is always ink. |
| amber-ink | `#B86E00` / `#8A5200` | Amber used as text or links on paper (readable contrast) |
| manila | `#EFDFB8` | Load tags |
| ok | `#2E7D4F` | Paid, booked, done |
| alert | `#B33A22` | Problems: wrong COI, detention |
| imessage-blue | `#007AFF` | Your messages, inside phone mockups only |
| imessage-grey | `#E9E9EB` | Agent messages, inside phone mockups only |
| logo-teal | `#2A8FA0`, `#5FC3D0` → `#1F7385` gradient | The logo only |

**Type** (all from Google Fonts)

- Display: Young Serif 400. Used for h1 (68px), h2 (54px), step and stop titles (24 to 26px) and the footer wordmark (280px).
- Body and UI: Hanken Grotesk 400, 500, 600 and 700. Body text is 17 to 20px.
- Data: Overpass Mono. Used for load IDs, timestamps and document labels.
- Inside phone mockups only, use the system font stack (`-apple-system, …`) so the phone reads as real iOS.

**Shape**

- Radius: 8px for buttons and inputs, 12 to 14px for cards and documents, 20 to 28px for stages, 999px for pills.
- Shadows: soft and large on paper documents and phones only. Nothing else gets a shadow.

## Page structure, in order

1. **Sticky nav.** Logo and the Manifest wordmark. Links: One load · How it works · The board · Pricing · FAQ. A dark "Book a call" button.
2. **Hero, centered.**
   - h1: "Quote, cover and get paid with a one-letter **A** text." The "A" is drawn inline as a dark reply bubble.
   - The subcopy, three trust pills, and two buttons.
   - The scene beneath them is layered:
     - A realistic iMessage phone in front. It shows the morning thread and is not interactive.
     - Erin's email in a mail window, behind and to the left.
     - The L-2041 rate confirmation stamped "SENT 9:12 AM", behind and to the right.
     - A road along the bottom of the hero, with the line-art flatbed truck driving behind the phone.
3. **Works-with carousel.** Tool cards that scroll on an endless loop and pause on hover.
4. **One load (`#jobs`).** A horizontal dashed road with five stops: Quote · Cover · Paperwork · On the road · Get paid. Below it, the document that stop produced, plus a "Your part" line.
5. **How Manifest works (`#how`).** A vertical stepper with five steps on a dashed connector. Beside it, a panel with a timestamped log for the active step.
6. **Behind the texts, one board (`#board`).** A browser-window mockup of the kanban board with an agent activity rail.
7. **Connections.** A settings-style list of on/off switches.
8. **Pricing band.** "From $500 a month" and a "See the tiers" link.
9. **FAQ (`#faq`).** An accordion of five questions.
10. **Closing CTA (`#call`).** A heading and an email input with a "Book a call" button.
11. **Footer.** Dark, with link columns, the legal line, a dashed road line, and a giant cropped "Manifest" wordmark.

## Interactions

| Element | Behaviour |
|---|---|
| Hero truck | CSS keyframe `mf-drive`, 26s linear infinite, moving left to right behind the hero art. With `prefers-reduced-motion`, it is parked in the center. |
| Carousel | CSS keyframe `mf-scroll`, 40s linear infinite, over a duplicated list (the second copy is `aria-hidden`). Pauses on hover. Stops with reduced motion. Fades out at both edges with a mask. |
| One-load stops | A tab list. Clicking a stop shows its document. It also advances to the next stop every 5 seconds until the visitor clicks, then stays put. |
| How-it-works steps | Clicking a step expands it and swaps the log panel. Step 3, "You approve with one text", is active on load. |
| Connection switches | `role="switch"` with `aria-checked` toggling. Visual only, no backend. |
| FAQ | Opens one question at a time; the first is open on load. Uses `aria-expanded`. |
| Forms | The hero and closing email forms post to whatever booking flow the site uses now. |

## Assets to supply

- **Logo:** export the real Manifest mark as an SVG. The design uses a redrawn approximation.
- **Integration logos:** the carousel uses generic icons. Swap in the official logos from each company's brand or press kit: Gmail, Outlook, DAT, Truckstop, WhatsApp, Telegram and Apple Messages.
- **Truck illustration:** an inline SVG in the design file. It can ship as is.

## Before launch: placeholders and demo details to check

These are illustrative and need confirming against the real product, or swapping for real examples:

- Delta Haul's Friday pickup and the Bluegrass $1,750 bid.
- `heroOpts` and the `data` array in the script are left over from earlier interactive phones and aren't shown on the page. Don't port them.
- Thread and document times (7:00, 8:06, 9:10, 9:12, 9:20, Thu 9:04) and the $350 margin.
- "Inbox · 1,400 unread" in the hero email window.
- The Connections list: confirm which integrations exist today. Telegram is shown switched off.
- The pricing copy, and whether "See the tiers" has a page to link to.
- Page titles, meta description and share image. The design sets none.

## Not covered by the design

- No breakpoints were checked below desktop width. Layouts use flex-wrap, so they will stack, but each section needs a proper mobile pass. In particular, the one-load road needs a vertical layout on phones.
- The Pricing, About and Walkthrough pages are not redesigned. Match them to these tokens.
