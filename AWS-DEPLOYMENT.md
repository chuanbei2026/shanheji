# AWS Deployment

## What to upload

Publish the **contents of dist/** as the website root. index.html must be at the root of the uploaded site, alongside app.js, atlas.json and assets/. Upload every file, including JSON data and nested image assets. There is no build command.

Keep README.md, this deployment guide and EXPORT-MANIFEST.json outside the published website root. Retain the bundled license and provenance files in dist/.

## Option 1: Managed static hosting

AWS Amplify Hosting supports static website content and HTTPS delivery. Supply dist/ as the deployment artifact. No environment variables or backend bindings are needed.

Official reference: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html

## Option 2: S3 with CloudFront

1. Create an S3 bucket and upload the contents of dist/ at its root.
2. Create a CloudFront distribution using the regular S3 bucket origin, with Origin Access Control (OAC), signed requests and an appropriate bucket policy. Keep the S3 bucket private.
3. Set the default root object to index.html and redirect HTTP viewers to HTTPS.
4. Serve the supplied secondary pages with their explicit .html paths, including /lettering-gallery.html, /ancient-guide.html and /research-review.html. No SPA route rewrite is required; selected years and stages use query parameters on the main page.
5. Preserve file content types: text/html, text/css, application/javascript, application/json and image/png. Refresh or invalidate cached files when updating assets with unchanged filenames.
6. Add your custom domain and TLS certificate if desired.

OAC requires a regular S3 origin; it cannot be used with an S3 website endpoint.
Official reference: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html

## Access

The previous platform's owner-only authentication is not exported. Choose the AWS site's audience explicitly; configure authentication separately if you want a private website. No AWS resources were created by this export.

## After deployment

Verify the main page with ?year=1137&stage=s_nansong_a0, change years, play the timeline, check a dynasty card, open the evidence dialogs and load /lettering-gallery.html. Confirm that all nine wordmark images load.
