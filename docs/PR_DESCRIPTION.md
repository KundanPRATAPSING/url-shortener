Feature: analytics + service refactor (redirect preserved)

Short summary
- Extracted URL business logic into a dedicated service (src/services/urlService.ts) so DB operations are separated from HTTP handlers.
- Kept browser redirect behavior on GET /:shortId so short links still navigate users.
- Added an analytics endpoint: GET /url/analytics/:shortId — returns { totalClicks, visitHistory }.
- Added POST /url to create short URLs (returns { id }).

Why this change
- Service/controller separation improves testability and reuse: services return values, controllers format HTTP responses.
- Preserving the browser redirect keeps expected UX for end users.
- Analytics endpoint provides a programmatic way to fetch click data without following redirects (useful for admin dashboards / clients).

Files changed (high level)
- src/services/urlService.ts — new: createShortUrl, recordVisit, getAnalytics
- src/controllers/url.ts — now delegates to service; added handleGetAnalytics
- src/routes/url.ts — POST / and GET /analytics/:shortId
- src/index.ts — GET /:shortId records visit and performs redirect

How to test locally
1. Start server:
   npm start
2. Create a short URL:
   curl -s -X POST http://localhost:8001/url -H "Content-Type: application/json" -d '{"url":"https://www.youtube.com/"}'
   -> returns: { "id": "<shortId>" }
3. Verify redirect:
   curl -i http://localhost:8001/<shortId>
   -> returns a 3xx redirect with a Location header
4. Check analytics:
   curl -s http://localhost:8001/url/analytics/<shortId>
   -> returns: { "totalClicks": <n>, "visitHistory": [ ... ] }

Notes / optional changes
- If you want a programmatic resolver endpoint (no redirect) I can add GET /url/resolve/:shortId.
- recordVisit records clicks when the browser redirect endpoint is used. The analytics endpoint currently reads stats only (I can make it optionally increment if you want).
- I can add unit tests for createShortUrl and recordVisit if you want coverage.
