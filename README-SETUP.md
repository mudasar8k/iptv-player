# VLC IPTV Central Admin — local-only Phase 2 prototype

This ZIP only adds `server/server.js` and `web/admin/index.html`. It does not modify the existing Windows app or TV frontend. It intentionally does **not** stream IPTV content yet, and has not been deployed or audited for public use.

- Node 22 built-in modules; no npm install necessary.
- Encryption key must remain stable, or saved provider passwords cannot be recovered.
- Admin password is held in process environment only; production needs user accounts/sessions, HTTPS, CSRF protection, rate limiting, audit logs, restricted network egress, and a database migration.
- Temporary pairing codes are not rate-limited in this local prototype. DO NOT bind to 0.0.0.0 or publish to VPS.
- Local web browser identity and LG TV pairing UI will be the next phase.
