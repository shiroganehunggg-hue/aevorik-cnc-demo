# Aevorik — precision manufacturing website demo

A fictional, responsive brand concept for a precision manufacturing business, with a graphite and dark-steel palette and restrained aerospace-blue accents. It uses semantic HTML, CSS, and vanilla JavaScript; there is no backend or build step.

## Project files

- `index.html` — page content, navigation, and quote form.
- `style.css` — colors, layout, responsive styles, and focus states.
- `script.js` — mobile navigation and the demo email-form workflow.
- `README.md` — setup, customization, and launch checklist.

## Run locally on Windows with VS Code

1. In VS Code, choose **File > Open Folder...** and open the folder containing these files.
2. In the Explorer, right-click `index.html` and choose **Reveal in File Explorer**, or open it from File Explorer.
3. Double-click `index.html` to open it in your browser. A local web server or extension is not required.
4. Refresh the browser after changing a file. Resize the window to check the mobile, tablet, and desktop layouts.

## Test the quote form

1. Submit the form empty and confirm the browser identifies required fields.
2. Enter an invalid email address and confirm the browser blocks submission.
3. Enter project details with fewer than 10 non-space characters and confirm the form asks for more detail.
4. Complete all fields and submit. The browser will be asked to open an email application with a prefilled draft addressed to `hello@example.com`.
5. If the email application does not open, create a draft manually and copy the form details into it.

This is a static demo form. It does not send, store, or verify inquiries. Opening a draft does not mean the inquiry was sent or received. Do not use this workflow for confidential project files or sensitive information.

### Replace the placeholder email

Before presenting a customized version, replace `hello@example.com` in `script.js` with the business's approved inquiry address. Also update the form explanation in `index.html`. Test that the address, subject, and all form fields appear correctly in the visitor's email application. `mailto:` behavior depends on the visitor's device and email settings; use a properly configured form service or backend if reliable online submission is required.

## Customize images and business content

- Replace the fictional company name, service descriptions, process, and contact details with information confirmed by the business.
- The hero and card images are remote Unsplash images. They need an internet connection. Their direct source URLs are:
  - `https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1400&q=85`
  - `https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85`
  - `https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=85`
  - `https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=85`
- Verify each image's current license and commercial-use terms with Unsplash before using it for a real business. Replace images with client-owned or appropriately licensed files when possible, and update their `alt` text to describe the new image. The card images are illustrative and are not Aevorik customer projects.
- Google Fonts are loaded remotely: DM Sans and Manrope from `https://fonts.googleapis.com/`. Review the applicable font terms and privacy requirements before using them for a client; system-font fallbacks are defined in `style.css`.
- Keep the demo disclosure in the footer until the page is genuinely configured and approved for a real business.

## Publish with GitHub Pages

1. Create a GitHub repository and add the four project files.
2. In the repository, open **Settings > Pages**.
3. Under the build and deployment settings, select **Deploy from a branch**, choose the branch containing the files and the repository root (`/`), then save.
4. Wait for GitHub Pages to publish, then open the URL shown in the Pages settings and test the site on desktop and mobile.

GitHub Pages hosts static files only. It does not make the `mailto:` form send or verify messages.

## Before presenting this demo to a real prospect

- [ ] Confirm and replace all fictional company details and sample service claims.
- [ ] Confirm the business's actual services, capabilities, and inquiry address.
- [ ] Replace illustrative imagery with approved images, or retain a clear notice that imagery is illustrative.
- [ ] Verify rights and usage terms for all images and fonts.
- [ ] Replace `hello@example.com` and test the form on a device with the intended email application configured.
- [ ] Explain the form's `mailto:` limitations, or arrange a real submission service with the business.
- [ ] Test navigation, keyboard focus, validation, and responsive layouts at mobile, tablet, and desktop widths.
- [ ] Check page links, spelling, and contact details.
- [ ] Keep the fictional-demo disclosure unless the business has approved the live content.
