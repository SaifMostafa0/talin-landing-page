import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { ButtonLink } from "../components/site/ButtonLink";
import { PageHero } from "../components/site/PageHero";
import { SiteFooter } from "../components/site/SiteFooter";
import { SiteHeader } from "../components/site/SiteHeader";
import { SITE_URL, contactDetails } from "../content/site";
import { jsonLd } from "../lib/json-ld";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Talin",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  email: contactDetails.email,
  telephone: "+20227364479",
  address: {
    "@type": "PostalAddress",
    streetAddress: "17 El Mara'shly Street, 7th Floor",
    addressLocality: "Zamalek, Cairo",
    postalCode: "11211",
    addressCountry: "EG",
  },
  sameAs: [contactDetails.linkedin.company.url],
  parentOrganization: { "@type": "Organization", name: "CID Consulting", url: "https://www.cidconsulting.com" },
};

function NotFound() {
  return (
    <PageHero headline="Page not found" subheading="The page you're looking for doesn't exist or has been moved.">
      <div className="hero__actions">
        <ButtonLink to="/">Go to the home page</ButtonLink>
      </div>
    </PageHero>
  );
}

function ErrorPage({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <PageHero headline="This page didn't load" subheading="Something went wrong on our end. Please try again.">
      <div className="hero__actions">
        <button
          type="button"
          className="button button--primary focus-ring"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </button>
      </div>
    </PageHero>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#000c3e" },
      { title: "Talin | Human-Led Intelligence" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,600;0,700;1,600;1,700&family=Urbanist:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [{ type: "application/ld+json", children: jsonLd(organizationJsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
