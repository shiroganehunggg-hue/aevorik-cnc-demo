# Cobalt Ridge Machining — fictional CNC website concept

A fictional, responsive CNC supplier website concept designed by Aevorik to demonstrate website design and development for CNC machining businesses. Cobalt Ridge Machining is not a real business; service descriptions, specifications and imagery are illustrative, not verified offers or customer projects. The provisional demo name has not received final trademark or domain clearance.

Built with semantic HTML, CSS, and vanilla JavaScript. There is no build step, backend, or configured form provider.

## Project files

- `index.html` — page content, navigation, metadata, and the quote-form fields.
- `style.css` — color tokens, layout, responsive rules, and interaction styles.
- `site-config.js` — public demo-brand, website-provider, service, contact, and optional verified-capability settings.
- `script.js` — menu behavior, configuration display, and client-side form validation.
- `favicon.svg` — an abstract geometric demo icon; it is not a finalized Cobalt Ridge Machining logo.
- `README.md` — setup and handover information.

## Run locally on Windows with VS Code

1. In VS Code, choose **File > Open Folder...** and open the project folder.
2. Open `index.html` in File Explorer, or right-click it in VS Code and choose **Reveal in File Explorer**.
3. Double-click `index.html` to view it in your browser. A web server or extension is not required.
4. Refresh the browser after editing files. Resize it to check mobile, tablet, and desktop layouts.

## Configure the demo

Edit `site-config.js`. Every value in this file is public because it is downloaded by the visitor's browser. Never put passwords, private tokens, API keys, or other secrets here.

- `demoBrandName` controls the fictional CNC business wordmark and page title.
- `websiteProviderName` controls the website design/development attribution.
- `demoMode` is `true` for this project. Keep the page clearly labelled as a demo.
- `services` is retained as public demo configuration, but the RFQ demo currently uses its approved fixed process categories rather than this setting.
- `verifiedCapabilities` starts empty. Only enter confirmed business information. The specifications panel stays hidden when the values are empty.
- `contactEmail` is blank and is not used by the RFQ demo. The page has no external contact link; do not add a Cobalt Ridge Machining or Aevorik contact address without approval.

The optional `verifiedCapabilities` keys are `materials`, `processes`, `maxPartDimensions`, `tolerances`, `orderQuantities`, `inspectionMethods`, `finishingOptions`, `fileFormats`, and `leadTime`. List fields accept arrays of confirmed values; the remaining fields accept text. Do not publish values until the business approves them.

## RFQ demo: current behavior and limitations

The RFQ interaction is **demo-only** and uses three client-side stages: enter example categories, review the selections, then explicitly generate an on-screen preview. It asks for part category, process preference, material category, quantity range, optional timing preference, and optional notes (up to 250 characters). It does not collect names, email addresses, company names, or other contact details.

All entered values remain in page memory only. They are not submitted, transmitted, or stored in browser storage, and are cleared when the page is refreshed or closed. The preview is clearly marked **NOT SENT — NOT STORED**. Do not enter real contact details, confidential drawings, proprietary specifications, or sensitive project information. There is no file upload, email action, backend, or form provider.

No submission provider has been selected or configured. For a real business, first choose a provider with the owner, review its current documentation, pricing, privacy, and data-retention terms, then implement and test that provider's documented response contract. Do not expose private credentials in this static site. A public endpoint, if a provider requires one, is not a secret but still must be configured and tested. Update the privacy information to reflect any collection and provider processing before collecting personal data. This repository intentionally has no endpoint setting because there is no implemented provider integration.

### Test the RFQ demo locally

1. Select **Review Demo Details** while required selections are blank; confirm field-specific errors appear and focus moves to the first invalid control.
2. Select all four required categories and choose **Review Demo Details**. Confirm the review stage displays the selected values.
3. Choose **Edit Details** and confirm the selections remain intact.
4. Choose **Generate RFQ Preview** and confirm the preview is marked **NOT SENT — NOT STORED** and states that no supplier receives it.
5. Choose **Edit Details** from the preview and confirm values are preserved.
6. Choose **Start Over** and confirm values, errors, review, and preview content are cleared.
7. Leave timing and notes blank to confirm they are optional. Confirm notes are limited to 250 characters.
8. Use a CNC Milling or CNC Turning capability link and confirm it selects that process preference in the demo form.

## Images and external resources

The hero image is remotely loaded from Unsplash and requires an internet connection:

- `https://images.unsplash.com/photo-1740209475472-aa7d280f7452?auto=format&fit=crop&w=1400&q=85`

The hero image is illustrative; its licensing and commercial-use provenance has not been independently verified for this project. Verify current terms before using it for a real client, or replace it with an image the business owns or has licensed. The part illustrations are inline SVGs authored for this demo. Google Fonts (DM Sans and Manrope) are loaded remotely from `https://fonts.googleapis.com/`; review current font terms and privacy implications before client use. System-font fallbacks are provided.

## Publish on GitHub Pages

The repository is `https://github.com/shiroganehunggg-hue/aevorik-cnc-demo/` and the expected project-site URL is `https://shiroganehunggg-hue.github.io/aevorik-cnc-demo/`. All local CSS, JavaScript, and favicon references are relative, so they work from the project-site subpath. During the B5 QA check, the Pages URL loaded an older Aevorik-branded manufacturing page rather than this Cobalt Ridge fictional demo. The current demo therefore omits canonical and Open Graph URL metadata; verify the live page matches the approved demo before sharing or adding a canonical URL.

To publish changes:

1. Save the files in the repository folder.
2. In VS Code, open **Source Control**, review the changed files, enter a commit message, and commit.
3. Push the `main` branch to `origin` (or use **Sync Changes** in VS Code).
4. In the GitHub repository, check **Settings > Pages** for the configured deployment source and wait for the deployment to complete.
5. Open the Pages URL above, refresh, and test navigation and form validation. Check the Actions/deployment status if the new page is not live.

GitHub Pages serves static files; it does not provide form submission or file storage.

## Before adapting this demo for a real business

- [ ] Obtain trademark/domain clearance for the provisional Cobalt Ridge Machining demo name before public use.
- [ ] Confirm the business name, services, processes, materials, dimensions, tolerances, order ranges, inspection methods, finishes, file formats, and lead-time statements with the owner.
- [ ] Replace sample copy and illustrative imagery with approved business content; do not imply sample images are customer projects.
- [ ] Set only an explicitly approved contact email for the intended party. Test the mail link on a device with an email app configured.
- [ ] Confirm Aevorik's contact destination and approved brand assets before adding a service CTA or replacing the abstract favicon.
- [ ] Choose and configure an actual form provider before accepting inquiries. Test success and failure responses and update the privacy information.
- [ ] Do not request confidential CAD files until an approved, secure upload process exists.
- [ ] Verify image and font licensing, contact details, and any legal or quality statements.
- [ ] Test links, form validation, keyboard operation, responsive layouts, and the published Pages URL.
- [ ] Retain a clear disclosure that this is a website portfolio demo until the business approves a customized live site.
