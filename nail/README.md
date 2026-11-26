# ÉLORA nail studio demo

A responsive, one-page ÉLORA nail studio demo built with plain HTML, CSS, and JavaScript. Change the salon's details, services, photos, hours, booking link, and colors in `site-config.js`. There is no build step, framework, or backend.

## Open the website

Open this folder's `index.html` in a browser. In VS Code, you can also right-click the file and choose **Open with Live Server** if that extension is installed. The published salon website lives at `/aevorik-cnc-demo/nail/`; the CNC demo remains at the repository root. An internet connection is needed for the sample photos and Google Fonts; the page layout and system-font fallbacks work without them.

## Make a copy for a new salon

1. Copy the project folder and rename the copy for the salon.
2. Open `site-config.js` and update `name`, `title`, `description`, `about`, and `announcement`.
3. Add the owner's approved `phone`, `email`, `address`, `mapUrl`, and `bookingUrl`. Leave fields blank if the salon does not use them.
4. Replace the sample `services`, `gallery`, and `hours` with information the salon has confirmed.
5. Add salon-owned or properly licensed photos and set helpful image descriptions in `heroImageAlt` and the gallery `alt` fields. Use external `https://` URLs only after permission is recorded.
6. Adjust the colors in `theme`. Use six-digit hex colors such as `#b86f71`.
7. Preview `index.html` on a phone-sized screen and a desktop screen. Test the menu, appointment links, directions, email, and phone links before publishing.

The script builds the service list, gallery, hours, contact links, page title, and theme from this configuration. It inserts text as text rather than HTML. Use an `https://` URL for the map and online booking links. Phone and email links are generated from `phone` and `email`.

## Important before publishing

- Every value in `site-config.js` is public. Do not put passwords, API keys, or private information in it.
- The default ÉLORA name, prices, hours, wording, and visual placeholders are examples. Replace them only with information confirmed by the salon; do not imply sample prices or hours are current.
- The current demo intentionally uses rights-cleared visual placeholders. Replace them only with photos the salon owns or has permission to use.
- Online booking opens the salon's configured booking URL in a new tab. If none is provided, the booking buttons point to the contact section; if a phone number is configured, they offer a call link instead.
- This static template does not collect or transmit customer information and has no appointment form or booking backend. Connect a booking provider if online appointment scheduling is needed.
- Review the finished site with the salon owner, including contact details, service descriptions, prices, accessibility, and any privacy obligations.
