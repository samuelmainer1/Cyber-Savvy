export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "modern-full-stack-architecture-nextjs",
    title: "Why Modern Businesses are Replacing Monoliths with Next.js & Serverless APIs",
    summary:
      "How shifting to Next.js App Router, edge caching, and typed TypeScript backends reduces infrastructure costs by 60% while accelerating page performance.",
    date: "Sep 2026",
    category: "Software Engineering",
    readTime: "6 min read",
    author: "Sam Maina",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Software engineer working on a modern web application",
  },
  {
    slug: "technical-seo-google-page-one-rankings",
    title: "The Exact Technical SEO Framework We Use to Rank Commercial Clients on Page 1",
    summary:
      "A deep dive into Core Web Vitals, JSON-LD schema graphs, search intent content clusters, and high-authority link acquisition tactics.",
    date: "Sep 2026",
    category: "Digital Marketing & SEO",
    readTime: "8 min read",
    author: "Sam Maina",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Digital marketing analytics and search growth dashboard",
  },
  {
    slug: "custom-erp-vs-spreadsheets",
    title: "From 12 Spreadsheets to 1 Custom ERP: How We Automated an Entire Supply Chain",
    summary:
      "Case study breakdown of how custom software eliminated human copy-paste errors and saved 20+ hours weekly for a regional logistics provider.",
    date: "Aug 2026",
    category: "Custom Systems",
    readTime: "5 min read",
    author: "Sam Maina",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Business team planning a custom operations system",
  },
  {
    slug: "zero-trust-cybersecurity-smb-guide",
    title: "Zero-Trust Architecture on a Budget: Protecting Your Company from Ransomware",
    summary:
      "Essential security controls: air-gapped backups, automated MFA enforcement, endpoint detection, and staff phishing defense drills.",
    date: "Aug 2026",
    category: "Managed IT & Security",
    readTime: "7 min read",
    author: "Sam Maina",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Cybersecurity professional protecting a digital network",
  },
  {
    slug: "mpesa-daraja-api-integration-guide",
    title: "Architecting High-Volume Safaricom M-Pesa Daraja STK Push & Reconciliations",
    summary:
      "Best practices for handling asynchronous IPN callbacks, automated balance polling, and instant order fulfillment with zero payment drops.",
    date: "Jul 2026",
    category: "APIs & Fintech",
    readTime: "9 min read",
    author: "Sam Maina",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Customer making a secure mobile payment",
  },
  {
    slug: "conversion-rate-optimization-playbook",
    title: "7 Landing Page UX Changes That Doubled Inbound B2B Qualified Inquiries",
    summary:
      "Practical heuristic analysis, headline restructuring, social proof positioning, and form friction reduction techniques.",
    date: "Jul 2026",
    category: "Growth & CRO",
    readTime: "5 min read",
    author: "Sam Maina",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Team reviewing website conversion analytics",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
