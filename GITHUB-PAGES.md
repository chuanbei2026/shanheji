# GitHub Pages

This is a static website. All deployable files live in `dist/`; no dependency installation, build step, API key or backend is required.

## Current status

The repository is public with the owner's approval, and GitHub Pages is enabled.

Website: https://chuanbei2026.github.io/shanheji/

Publishing source: `gh-pages`, `/ (root)`. The publishing branch includes `.nojekyll` and contains the complete static atlas. HTTPS is enabled. GitHub republishes updates pushed to this branch.

The former Sites publication is separate from this GitHub Pages deployment.

## Repository layout

- `main`: editable website sources in `dist/`, provenance, export inventory and deployment guides.
- `gh-pages`: the contents of `dist/` at the branch root, ready for Pages branch publishing.

## Publishing

In the repository Pages settings, select **Deploy from a branch**, then `gh-pages` and `/ (root)`. Pages eligibility depends on the account plan and repository visibility. Enabling Pages does not imply that a private repository produces a private website.

All assets use relative paths, so the atlas supports the project-site path `/shanheji/` as well as domain-root hosting. Query links such as `?year=1911` remain supported.

For future updates, commit changes on `main`, publish the updated contents of `dist/` to `gh-pages`, and wait for the Pages deployment to finish. Keep the `.nojekyll` marker on the publishing branch.

The bundled licenses and provenance notices must accompany the deployed files.
