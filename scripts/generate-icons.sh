#!/usr/bin/env bash
set -euo pipefail

# Script to generate icon files from public/logo1.jpg using ImageMagick
# Run this from the project root: ./scripts/generate-icons.sh

SRC="public/logo1.jpg"
DEST_DIR="public/icons"

if ! command -v convert >/dev/null 2>&1; then
  echo "Error: ImageMagick 'convert' not found. Install ImageMagick and try again."
  exit 1
fi

if [ ! -f "$SRC" ]; then
  echo "Error: source image $SRC not found."
  exit 1
fi

mkdir -p "$DEST_DIR"

SIZES=(16 32 48 72 96 128 144 152 192 256 384 512)
for s in "${SIZES[@]}"; do
  echo "Generating ${DEST_DIR}/icon-${s}x${s}.png"
  convert "$SRC" -resize ${s}x${s}^ -gravity center -extent ${s}x${s} -background none "$DEST_DIR/icon-${s}x${s}.png"
done

# Apple touch icon
convert "$SRC" -resize 180x180^ -gravity center -extent 180x180 -background none "$DEST_DIR/apple-touch-icon.png"

# Android chrome icons (explicit)
convert "$SRC" -resize 192x192^ -gravity center -extent 192x192 -background none "$DEST_DIR/android-chrome-192x192.png"
convert "$SRC" -resize 512x512^ -gravity center -extent 512x512 -background none "$DEST_DIR/android-chrome-512x512.png"

# Favicon (ICO) from multiple sizes
if command -v convert >/dev/null 2>&1; then
  echo "Generating favicon.ico"
  convert "$DEST_DIR/icon-16x16.png" "$DEST_DIR/icon-32x32.png" "$DEST_DIR/icon-48x48.png" "$DEST_DIR/icon-64x64.png" "$DEST_DIR/icon-128x128.png" public/favicon.ico || true
fi

echo "Done. Add and commit public/icons/* and public/favicon.ico to the repo.\nExample:\n  git add public/icons/* public/favicon.ico\n  git commit -m \"PWA: add generated icons\"\n  git push origin main"
