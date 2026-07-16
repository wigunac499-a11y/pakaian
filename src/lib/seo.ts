export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const siteTitle = 'Web Pakai - Platform Pembuatan Website Instan';
const defaultDescription = 'Platform pembuatan website instan dengan template siap pakai. Cepat, responsif, dan SEO-friendly.';

export function buildSEO(props: SEOProps) {
  const fullTitle = props.title
    ? `${props.title} | Web Pakai`
    : siteTitle;

  return {
    title: fullTitle,
    description: props.description || defaultDescription,
    canonical: props.canonical,
    ogImage: props.ogImage || '/og-default.png',
    ogType: props.ogType || 'website',
    noIndex: props.noIndex || false,
  };
}
