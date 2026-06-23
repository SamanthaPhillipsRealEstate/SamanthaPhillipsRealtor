/* ============================================================================
   LISTINGS — the single place to manage every property on the site.
   ----------------------------------------------------------------------------
   This one file drives BOTH:
     • the Featured Properties grid on the homepage (auto-built + auto-sorted)
     • the SOLD / PENDING banner that appears on each property's own page

   TO UPDATE A PROPERTY (e.g. it just sold):
     1. Find its entry below.
     2. Change  status: 'live'  ->  status: 'sold'   (or 'pending').
     3. Optionally update the  date:  to today (newest shows first in its group).
     4. Save and commit. That's it — the homepage card moves to the right spot
        AND a red "SOLD" banner appears automatically on its page.

   TO ADD A NEW PROPERTY:
     • Create its folder under  properties/<slug>/  with an index.html (copy an
       existing one), then add a new { ... } block to the list below.

   FIELD GUIDE:
     slug        Folder name under properties/ (and the card's id). For external
                 (off-site) listings this can be any unique label.
     title       Headline shown on the card.
     city        Smaller line under the title.
     status      'live' | 'pending' | 'sold'   (lowercase). Controls sort order
                 (Live first, then Pending, then Sold) and the page banner.
     date        'YYYY-MM-DD'. Within a status group, newest date shows first.
     href        Where the card links. In-repo: 'properties/<slug>/'.
                 External (Keller Williams) listings: the full https:// URL.
     thumb       Card image path, RELATIVE TO THE SITE ROOT.
     external    true  = listing lives off-site (KW). It will NEVER show a banner
                         and its card just links out.
                 false = a normal in-repo property page in this site.
     statusLabel (optional) Override the word shown. e.g. 'LEASED' still sorts
                 and banners like a 'sold' listing but reads "LEASED".
   ========================================================================== */

window.LISTINGS = [

  /* ---- LIVE ---- */
  {
    slug: '4369-the-heights',
    title: '4369 The Heights',
    city: 'Oakland Township',
    status: 'live',
    date: '2026-06-01',
    href: 'properties/4369-the-heights/',
    thumb: 'properties/4369-the-heights/images/TheHeights.jpg',
    external: false
  },
  {
    slug: '2706-heights-view-court',
    title: '2706 Heights View Court',
    city: 'The Heights of Oakland',
    status: 'live',
    date: '2026-05-25',
    href: 'properties/2706-heights-view-court/',
    thumb: 'properties/2706-heights-view-court/images/image-000.jpg',
    external: false
  },
  {
    slug: '1220-n-pine',
    title: '1220 N Pine Street',
    city: 'Rochester',
    status: 'live',
    date: '2026-05-20',
    href: 'properties/1220-n-pine/',
    thumb: 'properties/1220-n-pine/images/image-1.jpg',
    external: false
  },
  {
    slug: '2605-fairway-court',
    title: '2605 Fairway Court',
    city: 'Oakland Township',
    status: 'live',
    date: '2026-05-15',
    href: 'properties/2605-fairway-court/',
    thumb: 'properties/2605-fairway-court/images/image-1.jpg',
    external: false
  },
  {
    slug: '602-wellington-cir',
    title: '602 Wellington Cir',
    city: 'Rochester Hills',
    status: 'live',
    date: '2026-05-10',
    href: 'properties/602-wellington-cir/',
    thumb: 'properties/602-wellington-cir/images/gallery/01-Wellington.jpg',
    external: false
  },
  {
    slug: '9899-sunset-blvd',
    title: '9899 Sunset Blvd',
    city: 'Caseville',
    status: 'live',
    date: '2026-05-05',
    href: 'properties/9899-sunset-blvd/',
    thumb: 'properties/9899-sunset-blvd/images/9899_sunset_01.jpg',
    external: false
  },
  {
    slug: '9859-sunset-blvd',
    title: '9859 Sunset Blvd',
    city: 'Caseville',
    status: 'live',
    date: '2026-05-01',
    href: 'properties/9859-sunset-blvd/',
    thumb: 'properties/9859-sunset-blvd/images/9859_sunset_01.jpg',
    external: false
  },

  /* ---- PENDING ---- */
  {
    slug: '54381-pelican-lane',
    title: '54381 Pelican Lane',
    city: 'Shelby Township',
    status: 'pending',
    date: '2026-04-15',
    href: 'properties/54381-pelican-lane/',
    thumb: 'properties/54381-pelican-lane/images/05-Pelican.jpg',
    external: false
  },
  {
    slug: '3411-ashley-drive',
    title: '3411 Ashley Drive',
    city: 'Lake Orion',
    status: 'pending',
    date: '2026-04-10',
    href: 'properties/3411-ashley-drive/',
    thumb: 'properties/3411-ashley-drive/images/01-Ashley.jpg',
    external: false
  },

  /* ---- SOLD / LEASED ---- */
  {
    slug: '1031-n-sherman-drive',
    title: '1031 N. Sherman Drive',
    city: 'Royal Oak',
    status: 'sold',
    statusLabel: 'LEASED',
    date: '2026-03-20',
    href: 'properties/1031-n-sherman-drive/',
    thumb: 'properties/1031-n-sherman-drive/images/Sherman-1.jpeg',
    external: false
  },
  {
    slug: '152-randolph',
    title: '152 Randolph',
    city: 'Rochester Hills',
    status: 'sold',
    date: '2026-03-10',
    href: 'properties/152-randolph/',
    thumb: 'properties/152-randolph/images/01-Randolph.jpg',
    external: false
  },
  {
    slug: '54468-flamingo-drive',
    title: '54468 Flamingo Drive',
    city: 'Shelby Township',
    status: 'sold',
    date: '2026-02-20',
    href: 'properties/54468-flamingo-drive/',
    thumb: 'properties/54468-flamingo-drive/images/01-Flamingo.jpg',
    external: false
  },
  {
    slug: '3906-thatcher-drive',
    title: '3906 Thatcher Drive',
    city: 'Rochester Hills',
    status: 'sold',
    date: '2026-01-15',
    href: 'properties/3906-thatcher-drive/',
    thumb: 'properties/3906-thatcher-drive/images/image-1.jpg',
    external: false
  },
  {
    slug: '1238-pine-knoll-lane',
    title: '1238 Pine Knoll Lane',
    city: 'Rochester',
    status: 'sold',
    date: '2025-12-01',
    href: 'properties/1238-pine-knoll-lane/',
    thumb: 'properties/1238-pine-knoll-lane/images/image-1.jpg',
    external: false
  }

];
