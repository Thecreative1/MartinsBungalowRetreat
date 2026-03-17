# Martins Bungalow Retreat

This repository now uses a simple static-site structure that is ready for real bungalow photos and future blog content without needing a build step.

## Structure

- `index.html` is the main landing page for the bungalow.
- `assets/css/site.css` contains the shared styles for the homepage and blog pages.
- `assets/js/site.js` contains the homepage language switcher and shared footer year script.
- `assets/images/placeholders/` contains the temporary local artwork used across the site.
- `assets/images/gallery/` is where final accommodation photos can be added.
- `assets/images/blog/` is where future blog cover images and inline article images can be added.
- `blog/index.html` is the journal landing page.
- `blog/post-template.html` is the starter template for future blog posts.
- `blog/posts/` contains the live article pages.
- `sitemap.xml` and `robots.txt` provide search-engine support.

## Adding real photos

1. Add final files inside `assets/images/gallery/` or `assets/images/blog/`.
2. Update the relevant `src` values in the HTML files, or replace the placeholder files if you want to keep the existing paths.
3. Keep image file names descriptive for easier maintenance.

## Adding a new blog post

1. Copy `blog/post-template.html` into `blog/posts/`.
2. Rename the file using a URL-friendly name such as `best-spring-walks-near-guimaraes.html`.
3. Update the page title, meta description, cover image, article copy, and breadcrumb labels.
4. Add a new card to `blog/index.html`.
5. Add the article to the homepage journal section if it should be featured.
6. Add the new URL to `sitemap.xml`.

## Notes

- The Google Maps embed on the homepage still points to a generic Guimaraes map and should be updated when the exact property pin is ready.
- `sitemap.xml` currently assumes the public domain will be `https://martinsbungalow.com/`. Update that if the final live domain is different.
