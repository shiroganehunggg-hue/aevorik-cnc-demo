# Aevorik — precision manufacturing website demo

A fictional, responsive website concept and freelance web-development portfolio sample for small CNC machining and 3D-printing businesses. Aevorik is not a real manufacturing company. The service descriptions and workshop imagery are illustrative, not verified offers or customer projects.

Built with semantic HTML, CSS, and vanilla JavaScript. There is no build step, backend, or configured form provider.

## Project files

- `index.html` — page content, navigation, metadata, and the quote-form fields.
- `style.css` — color tokens, layout, responsive rules, and interaction styles.
- `site-config.js` — public brand, service, contact, and optional verified-capability settings.
- `script.js` — menu behavior, configuration display, and client-side form validation.
- `favicon.svg` — the geometric Aevorik demo icon.
- `README.md` — setup and handover information.

## Run locally on Windows with VS Code

1. In VS Code, choose **File > Open Folder...** and open the project folder.
2. Open `index.html` in File Explorer, or right-click it in VS Code and choose **Reveal in File Explorer**.
3. Double-click `index.html` to view it in your browser. A web server or extension is not required.
4. Refresh the browser after editing files. Resize it to check mobile, tablet, and desktop layouts.

## Configure the demo

Edit `site-config.js`. Every value in this file is public because it is downloaded by the visitor's browser. Never put passwords, private tokens, API keys, or other secrets here.

- `brandName` controls the text logo and page title.
- `demoMode` is `true` for this project. Keep the page clearly labelled as a demo.
- `services` controls the quote-form service list. These are only example categories until a real business confirms its offerings.
- `verifiedCapabilities` starts empty. Only enter confirmed business information. The specifications panel stays hidden when the values are empty.
- `contactEmail` is blank. If a business supplies an approved contact address, add it here; the page will then show it as a contact link. This link opens the visitor's email application and does not send or verify a message.
- `formSubmissionEndpoint` is intentionally blank and is not used by this demo. Adding an endpoint alone does not configure a provider or make the form submit.

The optional `verifiedCapabilities` keys are `materials`, `processes`, `maxPartDimensions`, `tolerances`, `orderQuantities`, `inspectionMethods`, `finishingOptions`, `fileFormats`, and `leadTime`. List fields accept arrays of confirmed values; the remaining fields accept text. Do not publish values until the business approves them.

## Quote form: current behavior and limitations

The form is **demo-only**. It checks required fields, native email validity, whitespace-only values, and a minimum project-description length. After valid input, it displays a message confirming only that browser validation passed. It does not send or save form details, open an email draft, or claim that an inquiry was received.

Do not enter confidential project information. CAD and PDF uploads are not enabled; do not add a file input unless an approved upload provider and its privacy, retention, size, and file-type requirements have been established.

No submission provider has been selected or configured. For a real business, first choose a provider with the owner, review its current documentation, pricing, privacy, and data-retention terms, then implement and test that provider's documented response contract. Do not expose private credentials in this static site. A public endpoint, if a provider requires one, is not a secret but still must be configured and tested. Update the privacy information to reflect any collection and provider processing before collecting personal data.

### Test the form locally

1. Submit it empty and confirm the first invalid field is focused and field-specific errors appear.
2. Enter an invalid email address and confirm it is rejected.
3. Enter only spaces or fewer than 10 non-space characters for project details and confirm validation fails.
4. Complete all required fields and submit. The status should say validation passed but no data was sent or saved.
5. Confirm optional material, quantity, and deadline values are not required.

## Images and external resources

Images are remotely loaded from these Unsplash image URLs and require an internet connection:

- `https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1400&q=85`
- `https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85`
- `https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=85`
- `https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=85`

The images are illustrative. Verify current image licensing and commercial-use terms before using them for a real client; prefer images the business owns or has licensed. Google Fonts (DM Sans and Manrope) are also loaded remotely from `https://fonts.googleapis.com/`; review the current font terms and privacy implications before client use. System-font fallbacks are provided.

## Publish on GitHub Pages

The repository is `https://github.com/shiroganehunggg-hue/aevorik-cnc-demo/` and the expected project-site URL is `https://shiroganehunggg-hue.github.io/aevorik-cnc-demo/`. All local CSS, JavaScript, and favicon references are relative, so they work from the project-site subpath.

To publish changes:

1. Save the files in the repository folder.
2. In VS Code, open **Source Control**, review the changed files, enter a commit message, and commit.
3. Push the `main` branch to `origin` (or use **Sync Changes** in VS Code).
4. In the GitHub repository, check **Settings > Pages** for the configured deployment source and wait for the deployment to complete.
5. Open the Pages URL above, refresh, and test navigation and form validation. Check the Actions/deployment status if the new page is not live.

GitHub Pages serves static files; it does not provide form submission or file storage.

## Before adapting this demo for a real business

- [ ] Confirm the business name, services, processes, materials, dimensions, tolerances, order ranges, inspection methods, finishes, file formats, and lead-time statements with the owner.
- [ ] Replace sample copy and illustrative imagery with approved business content; do not imply sample images are customer projects.
- [ ] Set only a business-approved contact email. Test the mail link on a device with an email app configured.
- [ ] Choose and configure an actual form provider before accepting inquiries. Test success and failure responses and update the privacy information.
- [ ] Do not request confidential CAD files until an approved, secure upload process exists.
- [ ] Verify image and font licensing, contact details, and any legal or quality statements.
- [ ] Test links, form validation, keyboard operation, responsive layouts, and the published Pages URL.
- [ ] Retain a clear disclosure that this is a website portfolio demo until the business approves a customized live site.
