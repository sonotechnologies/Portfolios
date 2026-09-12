# Self-hosted fonts — drop-in required

This build sandbox's egress policy blocks `api.fontshare.com`, so the licensed
Clash Display and General Sans font files could not be downloaded here. The
CSS (`src/app/globals.css`) already declares `@font-face` rules that expect
these exact files in this folder:

```
public/fonts/ClashDisplay-Medium.woff2      (weight 500)
public/fonts/ClashDisplay-Semibold.woff2    (weight 600)
public/fonts/GeneralSans-Regular.woff2      (weight 400)
public/fonts/GeneralSans-Medium.woff2       (weight 500)
```

Download both families (both free) from Fontshare:
- https://www.fontshare.com/fonts/clash-display
- https://www.fontshare.com/fonts/general-sans

Export/convert to `.woff2` if Fontshare gives you `.otf`/`.ttf`, place the
four files above, and the site will pick them up automatically — no code
changes needed. Until then, the stack falls back to the system sans-serif
font, so the site still renders correctly, just not pixel-identical to the
artboards.

JetBrains Mono is loaded from Google Fonts via `next/font/google` in
`src/app/layout.tsx` and needs no manual step.
