import Head from "next/head";

export const SITE_URL = "https://terpmetrix.com";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT = "Precision built for the plant — Terpmetrix";
export const HERO_DESCRIPTION =
  "Precision built for the plant. Hardware, optics, and market intelligence built in Colorado since 2023.";

const Layout = ({
  children,
  pageTitle = "Precision Cannabis Technology & Hardware | Terpmetrix",
  ogTitle = "Terpmetrix — Precision Cannabis Technology & Hardware",
  description = HERO_DESCRIPTION,
  canonicalPath = "/",
  noindex = false,
  structuredData = null,
}) => {
  const normalizedPath = canonicalPath.startsWith("/")
    ? canonicalPath
    : `/${canonicalPath}`;
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta key="description" name="description" content={description} />
        <meta key="robots" name="robots" content={robotsContent} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050506" />
        <meta name="application-name" content="Terpmetrix" />
        {!noindex && (
          <link key="canonical" rel="canonical" href={canonicalUrl} />
        )}

        {/* Favicons & App Icons (all devices & browsers) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#050506" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Open Graph & Mobile Link Previews */}
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:locale" property="og:locale" content="en_US" />
        <meta key="og:site_name" property="og:site_name" content="Terpmetrix" />
        <meta key="og:url" property="og:url" content={canonicalUrl} />
        <meta key="og:title" property="og:title" content={ogTitle} />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
        <meta key="og:image" property="og:image" content={OG_IMAGE} />
        <meta
          key="og:image:secure_url"
          property="og:image:secure_url"
          content={OG_IMAGE}
        />
        <meta key="og:image:type" property="og:image:type" content="image/png" />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="630" />
        <meta
          key="og:image:alt"
          property="og:image:alt"
          content={OG_IMAGE_ALT}
        />

        {/* Twitter / X Link Preview */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@terpmetrix" />
        <meta key="twitter:title" name="twitter:title" content={ogTitle} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={description}
        />
        <meta key="twitter:image" name="twitter:image" content={OG_IMAGE} />
        <meta
          key="twitter:image:alt"
          name="twitter:image:alt"
          content={OG_IMAGE_ALT}
        />

        {structuredData && (
          <script
            key="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
      </Head>
      <div className="tmx-shell">{children}</div>
    </>
  );
};

export default Layout;
