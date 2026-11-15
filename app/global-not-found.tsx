import { archivo, geist } from "@/lib/fonts";
import { NotFoundContent } from "@/components/pages/LegalPages";
import { getDict } from "@/lib/i18n";

export const metadata = { title: "404" };

export default function GlobalNotFound() {
  const de = getDict("de").notFound;
  const en = getDict("en").notFound;
  return (
    <html lang="de" className={`${archivo.variable} ${geist.variable}`}>
      <head>
        <link rel="stylesheet" href={`/sc/scrollcraft.css?v=${process.env.NEXT_PUBLIC_ASSET_V}`} />
        <link rel="stylesheet" href={`/sc/site.css?v=${process.env.NEXT_PUBLIC_ASSET_V}`} />
      </head>
      <body>
        <main id="top">
          <section className="sc-section wf-legal" aria-labelledby="hero-h">
            <div className="sc-wrap wf-legal__in">
              <h1 id="hero-h" className="wf-pagehero__h wf-pagehero__h--sm">{de.title}</h1>
              <p>{de.text}</p>
              <p>
                <a className="wf-cta" href="/">{de.home}</a>
              </p>
              <h2 lang="en">{en.title}</h2>
              <p lang="en">{en.text}</p>
              <p lang="en">
                <a className="wf-cta wf-cta--ghost" href="/en/">{en.home}</a>
              </p>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}

export { NotFoundContent };
