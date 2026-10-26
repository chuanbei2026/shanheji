# Shan He Ji — Local Export

Complete editable static website, updated on 2026-10-26. China and Europe are independent editions within the same project.

Live China edition: **https://shanheji.chuanbei.dev/**

Live Europe edition: **https://shanheji.chuanbei.dev/europe/index.html**
Source revision: 829725e9ee732cf364adf9d2ccab36c0ca40b1d7.

## Layout

- dist/: deployable website, including HTML, CSS, JavaScript, historical JSON data, local D3 library, images, evidence pages, licenses and source archive.
- AWS-DEPLOYMENT.md: deployment notes for AWS.
- EXPORT-MANIFEST.json: SHA-256 inventory for verifying the exported website.

## Editions and validation

- China: dist/index.html; source-linked territorial references, annual reigns, events and war locations.
- Europe: dist/europe/index.html; documented event places, coexistence spans and independently navigable chronology.
- Data checks: run node dist/check-data.cjs. These validate references and selected calendar/visibility regressions; they do not certify every historical assertion.

## Local preview

Serve dist/ with any static HTTP server. For example, if Python 3 is available:

```sh
cd ~/workplace/shanheji
python3 -m http.server 8765 --directory dist --bind 127.0.0.1
```

Open http://127.0.0.1:8765/?year=1137&stage=s_nansong_a0 .
Open http://127.0.0.1:8765/lettering-gallery.html for the nine dynasty wordmarks.
Do not open index.html through file://: the application loads local JSON using fetch.
No installation, build step, API key, database or application server is required.
All runtime scripts, map data and images are bundled locally. External evidence links open their original sources.

## Editing and licensing

Edit the files under dist/ directly. See dist/README.md for data provenance and historical limitations, dist/LICENSE.txt and dist/D3-LICENSE.txt for licensing, and dist/assets/dynasty-lettering/ART-DIRECTION.md for original wordmark prompts.
The original site's Git remote, credentials and platform hosting identity are not included. Its access controls are not part of the static export; configure access separately on AWS.

## GitHub repository

Personal repository: https://github.com/chuanbei2026/shanheji

See [GITHUB-PAGES.md](GITHUB-PAGES.md) for static publishing from the `gh-pages` branch. [AWS-DEPLOYMENT.md](AWS-DEPLOYMENT.md) remains available as an alternative.
