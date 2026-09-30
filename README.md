# Local PDF Tools

A mobile-first, local-processing PDF Progressive Web App (PWA).

## Features

- Merge multiple PDFs and reorder files before merging.
- Split a PDF into three default ranges or add more ranges.
- Compress PDFs locally with Ghostscript WebAssembly using Low, Recommended, or Extreme presets.
- Convert multiple JPG/JPEG/PNG images to one PDF with reordering, A4/Fit-to-image sizing, and margin options.
- Explicit save only: generated results remain temporary until the user saves them.
- No PDF upload, backend, processing history, or application database.
- Temporary object URLs and Ghostscript virtual input/output files are released after processing/new jobs.
- PWA manifest, service worker, and launcher icon support.

## Architecture

- HTML/CSS/JavaScript UI
- PDF-lib for merge, split, and image-to-PDF operations
- Ghostscript WebAssembly for PDF compression
- Web App Manifest + Service Worker for PWA behavior

The PDF/image contents are processed on the device. External JavaScript/WebAssembly dependencies are currently obtained from jsDelivr and may then be browser-cached by the PWA service worker.

## Validated Android POC

The application was tested successfully on Android for all four core tools. Compression was validated on real PDFs, including a roughly 49.6 MB PDF reduced to about 15.4 MB with Recommended compression and about 8.4 MB with Extreme compression.

## Branches

- `main`: finalized validated application source.
- `poc`: development/prototyping history.
- `release`: snapshot of the validated release.
- `gh-pages`: deployment snapshot intended for GitHub Pages.
