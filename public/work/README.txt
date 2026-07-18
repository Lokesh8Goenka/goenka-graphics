HOW TO ADD YOUR REAL PHOTOS
===========================

EASIEST WAY — the Gallery Manager portal (no computer skills needed):

  1. Open  https://<your-site>/admin  in any browser (phone works too).
  2. Enter the admin password.
  3. Tap "choose a photo", add a caption in English (Hindi optional),
     press "Upload photo". Done — it appears on the "Our Work" page
     within a minute. You can also delete photos there.

  One-time setup (ask whoever manages Vercel):
  - In Vercel: Storage -> Create Blob store -> connect to this project.
  - In Vercel: Settings -> Environment Variables -> add ADMIN_PASSWORD.
  - Redeploy once. After that, never again.

OLD WAY (still works as a fallback): save files into THIS folder
(goenka-graphics/public/work/) with EXACTLY these names, commit and push.
These placeholders only show when nothing has been uploaded via /admin.

  wedding-card-1.jpg     -> a wedding / marriage card
  wedding-card-2.jpg     -> another wedding card design
  wedding-card-3.jpg     -> a foil / laser-cut card
  wedding-card-4.jpg     -> another wedding invitation
  business-card.jpg      -> a visiting / business card
  flyer.jpg              -> a flyer or poster
  brochure.jpg           -> a brochure
  bill-book.jpg          -> a bill / invoice / estimate book
  menu.jpg               -> a printed menu
  id-card.jpg            -> an ID / lanyard card
  letterhead.jpg         -> a letterhead
  book.jpg               -> a printed book

TIPS
----
- Portrait photos look best (the tiles are 4:5, slightly taller than wide).
- Aim for at least 800px wide, well-lit, on a clean surface.
- Photos uploaded via /admin are resized automatically — phone photos are fine.
