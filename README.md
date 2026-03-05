# agus-balles.github.io

This repo deploys to GitHub Pages from the Vite app in `app/`.

## Structure

- `app/`: React + Vite source code
- `.github/workflows/deploy-pages.yml`: CI build and Pages deploy

## Deploy flow

1. Push to `main`
2. GitHub Actions runs `npm ci` and `npm run build` in `app/`
3. The generated `app/dist` artifact is deployed to GitHub Pages

## GitHub Pages settings

- In GitHub repository settings:
  - Go to `Pages`
  - Set `Source` to `GitHub Actions`
