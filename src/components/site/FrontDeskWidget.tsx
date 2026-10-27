import Script from "next/script";

/*
  Ohevai AI Front Desk ("Ask Tzuri"), from the TDARS hub's Integrations › Website
  snippet. The widget key is public by design: Ohevai only answers on the hub's
  allowed domains, so this host must be listed there or the chat stays silent.

  `data-accent` is pasted raw into the widget's CSS, so it takes the brand token
  (follows dark mode too), not the console's "dark_blue", which is not a colour.
*/
export function FrontDeskWidget() {
  return (
    <Script
      id="ohevai-front-desk"
      src="https://ohevai.com/frontdesk.js"
      strategy="lazyOnload"
      data-widget-key="mYYlvR_zewB53lzGq-mP11fKaM39QYZcXBDSDob8m0o"
      data-api="https://benita-backend-cl-m3bg8.ondigitalocean.app/api/v1"
      data-title="Ask-Tzuri"
      data-accent="var(--primary)"
      data-greeting="Hello! How can I help?"
      data-position="bottom-right"
    />
  );
}
