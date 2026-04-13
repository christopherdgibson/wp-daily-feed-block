# WordPress Plugin

Gutenberg block built from scratch using React —  a daily API display block with calendar navigation.

## Daily Feed
Displays a daily fact or quote from an external API, navigable by date via an integrated calendar. API requests are routed through a WordPress PHP proxy to avoid CORS restrictions, with a retry mechanism handling timeouts and malformed responses. Normalises both JSON and raw HTML API responses.

## Tech stack
- React / JavaScript
- PHP (WordPress admin-ajax.php proxy)
- WordPress / Gutenberg
- XAMPP / Apache (local development)

## Demo
[View on WordPress Playground](https://playground.wordpress.net) ← coming soon

## Architecture
Plugin avoids WordPress block data APIs in favour of custom implementations — the editor (`edit.js`) and frontend (`save.js`) interfaces are written directly for full control over both the authoring experience and rendered output.

## Running locally
1. Install [XAMPP](https://www.apachefriends.org)
2. Clone into your WordPress plugins directory:
```bash
git clone https://github.com/christopherdgibson/wp-daily-feed-block.git wp-content/plugins/wp-daily-feed-block
```
3. Activate the plugin in WordPress admin
4. Add block via the Gutenberg editor

## Screenshots
![Daily Feed Block screenshot](docs/screenshots/daily-feed-screenshot.png)# wp-daily-feed-block