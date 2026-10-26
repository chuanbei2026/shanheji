# GitHub Pages

This is a static website. All deployable files live in `dist/`; no dependency installation, build step, API key or backend is required.

## Current status

The repository is private. GitHub rejected Pages activation for the current account plan with: "Your current plan does not support GitHub Pages for this repository." No Pages site is currently active. The website itself is compatible with Pages; publishing would require an eligible plan or an explicitly approved change to a public repository.

The `gh-pages` branch is already uploaded and includes a `.nojekyll` marker. Once the account/repository is eligible, select that branch and its root as the Pages publishing source. Alternatively, deploy `dist/` to AWS using the included guide.

Official eligibility reference: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Repository layout

- `main`: editable website sources in `dist/`, provenance, export inventory and deployment guides.
- `gh-pages`: the contents of `dist/` at the branch root, ready for Pages branch publishing.

## Publishing

In the repository Pages settings, select **Deploy from a branch**, then `gh-pages` and `/ (root)`. Pages eligibility depends on the account plan and repository visibility. Enabling Pages does not imply that a private repository produces a private website.

All assets use relative paths, so the atlas supports the project-site path `/shanheji/` as well as domain-root hosting. Query links such as `?year=1911` remain supported.

For future updates, commit changes on `main`, publish the updated contents of `dist/` to `gh-pages`, and wait for the Pages deployment to finish. Keep the `.nojekyll` marker on the publishing branch.

The bundled licenses and provenance notices must accompany the deployed files.
