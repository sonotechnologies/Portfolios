import { siteConfig } from "@/content/site-config";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsapp.international}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    jobTitle: "Web Developer & Designer",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.brand,
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.github].filter(
      (v): v is string => Boolean(v),
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
