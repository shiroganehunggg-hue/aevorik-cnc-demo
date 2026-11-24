# Aevorik website demos

This repository publishes two separate static websites with GitHub Pages:

- [Cobalt Ridge CNC demo](https://shiroganehunggg-hue.github.io/aevorik-cnc-demo/) — the original fictional CNC machining website at the project root.
- [Nail studio template](https://shiroganehunggg-hue.github.io/aevorik-cnc-demo/nail/) — a reusable nail salon website with its own design, assets, and configuration.

Both websites use plain HTML, CSS, and JavaScript. There is no build step or backend. Changes pushed to `main` are published through GitHub Pages.

## Customize the nail salon template

Open [`nail/README.md`](nail/README.md) for instructions. Change a salon's name, contact details, theme, services, photos, and hours in `nail/site-config.js`. Keep personal copies of the salon template in their own project folders.

## Cobalt Ridge CNC demo

The original fictional CNC concept remains at the repository root. Its files are `index.html`, `style.css`, `site-config.js`, `script.js`, and `favicon.svg`. The business name and capabilities are illustrative; review the original demo disclosures and do not present sample specifications as confirmed services.

The RFQ interaction is a local-only preview, not a working quote submission. The demo does not send or store information.

## Publish changes

Commit and push changes to the `main` branch. GitHub Pages serves the CNC demo at the root and the nail site under `/nail/`. Verify both published URLs after the Pages deployment completes.
