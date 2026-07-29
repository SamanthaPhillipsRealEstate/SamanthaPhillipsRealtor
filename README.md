# SamanthaPhillipsRealtor — redirect stub

This repo is **not** the website. It exists only to forward the old GitHub
Pages URL to the live site:

    https://samanthaphillipsrealestate.github.io/SamanthaPhillipsRealtor/...
                          ↓
    https://samanthaphillipsrealtor.com/...

The site itself lives in the private `website` repo and deploys to Cloudflare
Pages via GitHub Actions.

## Files

| File | Purpose |
|---|---|
| `index.html` | Old homepage → new homepage. `canonical` + meta-refresh + JS. |
| `404.html` | GitHub Pages serves this for every path not in this repo — i.e. every old deep link. JS strips the `/SamanthaPhillipsRealtor` prefix and forwards to the same path on the new origin. Unknown paths go to the homepage instead of being blindly rewritten. |
| `.nojekyll` | Skip Jekyll processing. |

## Caveat

These are soft redirects, not 301s — GitHub Pages cannot issue real redirect
status codes for a static site. Humans land correctly; crawlers treat it as a
hint. Re-indexing is driven by the homepage canonical, the new sitemap, and
Search Console.

## If slugs ever change

`404.html` assumes old and new property slugs are identical. If a listing is
ever renamed on the new site, add an explicit mapping in the script there.
