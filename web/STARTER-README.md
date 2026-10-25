# VLC IPTV TV-first webOS starter

This is a navigation/UI **preview**, not the completed IPTV product. It contains no credentials, playlist endpoints, server API, DRM or transcoding implementation.

## Files
- `web/index.html`: television home and placeholder categories
- `web/js/tv.js`: arrows, OK, Back (461), pointer hover/click, basic native video helper `VLCTV.openPlayer(url)`
- `web/css/tv.css`: purple/dark 1080p-first design
- `web/appinfo.json` and `web/icon.png`: LG packaging metadata and preview icon

## Test locally
Open `web/index.html` in a browser and use arrow keys, Enter, Escape, and mouse.
`node --check web/js/tv.js` validates JS syntax, not actual webOS compatibility.

## Package for webOS
Install LG webOS TV CLI per official documentation, then in repo root run `ares-package web`.
Check `ares-package -i <package.ipk>` for package metadata. For TV deployment, configure Developer Mode and `ares-setup-device`; see LG webOS Developer CLI documentation.

## Integration tasks
1. Inspect the existing Windows code before porting provider parsing, authentication, pagination, favourites, series and catch-up behavior.
2. Never copy customer credentials or embed privileged APIs in publicly served JS. Use a secure backend proxy where appropriate.
3. Validate HLS and codec support on *actual LG hardware*. Native VLC playback binaries will not run in webOS web app.
4. Replace preview branding/icon with cleared, licensed project artwork; review VideoLAN trademark and third-party code licenses before publication.
5. Production app ID/vendor should match the legitimate publisher. Avoid hard-coding this prototype ID for public release.
