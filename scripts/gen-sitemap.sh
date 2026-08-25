#!/bin/sh
# Regenerate sitemap.xml from the flat HTML files. Run after adding a page.
cd "$(dirname "$0")/.."
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  for f in *.html; do
    [ "$f" = "404.html" ] && continue
    [ "$f" = "index.html" ] && loc="https://getquire.github.io/" || loc="https://getquire.github.io/${f%.html}"
    lastmod=$(git log -1 --format=%cs -- "$f")
    printf '  <url><loc>%s</loc><lastmod>%s</lastmod></url>\n' "$loc" "$lastmod"
  done
  echo '</urlset>'
} > sitemap.xml
