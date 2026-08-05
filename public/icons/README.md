# Icons directory for Paradise Soap

This folder should contain generated PNG icons and a favicon for the web app.

I could not generate the raster icon files in this environment, so please run the provided script to create them locally.

How to generate (from project root):

1. Make the script executable:
   chmod +x scripts/generate-icons.sh

2. Run the script (requires ImageMagick `convert`):
   ./scripts/generate-icons.sh

3. Commit the generated files:
   git add public/icons/* public/favicon.ico
   git commit -m "PWA: add generated icons and favicon"
   git push origin main

Notes:
- The script will crop/center the image and create square PNGs for common sizes, plus an apple-touch-icon and favicon.ico.
- If you prefer different cropping or background, edit scripts/generate-icons.sh accordingly.
