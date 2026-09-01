import { Badge } from "./Badge";
import { Button } from "./Button";

/*
  design/site/web/home-web9.png · design/site/mobile/home-mobile17-18.png

  TODO(review): "Talk to our team" has no destination in the Figma. Pointed at
  /contact — the nav's "Contact Us" — since the footer already carries the contact
  form. Swap it for /request-access if that is the intent.

  TODO(review): the card is overlaid with a subtle darker wave texture (flat areas
  sample ~10% below --color-primary; the crests sample it exactly). That pattern is
  an unexported Figma asset, so the card ships flat rust.
*/
export function ReadyToGoDigital() {
  return (
    <div className="rounded-lg bg-primary px-6 py-10 text-center lg:rounded-xl lg:py-20">
      <Badge tone="dark">Get started</Badge>

      <h2
        id="ready-title"
        className="mt-6 font-heading text-display text-primary-foreground lg:text-display-lg"
      >
        Ready to go digital?
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground">
        Replace paper files and scattered spreadsheets with a secure, searchable archive
        your whole organisation can trust.
      </p>

      <Button href="/contact" variant="wash" className="mt-8 w-full sm:w-auto sm:px-20">
        Talk to our team
      </Button>
    </div>
  );
}
