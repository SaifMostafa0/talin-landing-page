import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { ArticleBody as Body } from "../../lib/content/schema";

type ImageValue = { asset?: { _ref?: string }; alt?: string; caption?: string };

// Sanity image refs look like "image-<id>-<width>x<height>-<ext>".
function imageUrl(ref: string, project: { projectId: string; dataset: string }, width = 1400) {
  const match = /^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/.exec(ref);
  if (!match) return null;
  const [, id, w, h, ext] = match;
  return {
    src: `https://cdn.sanity.io/images/${project.projectId}/${project.dataset}/${id}-${w}x${h}.${ext}?w=${width}&fit=max&auto=format`,
    width: Number(w),
    height: Number(h),
  };
}

function components(project: { projectId: string; dataset: string }): PortableTextComponents {
  return {
    types: {
      image: ({ value }: { value: ImageValue }) => {
        const image = value.asset?._ref ? imageUrl(value.asset._ref, project) : null;
        if (!image) return null;
        return (
          <figure className="prose__figure">
            <img src={image.src} alt={value.alt ?? ""} width={image.width} height={image.height} loading="lazy" />
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        );
      },
    },
    marks: {
      link: ({ value, children }) => {
        const href = typeof value?.href === "string" ? value.href : "";
        if (!/^(https?:|mailto:|\/)/.test(href)) return <>{children}</>;
        const external = /^https?:/.test(href);
        return (
          <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
            {children}
          </a>
        );
      },
    },
  };
}

export function ArticleBody({ body }: { body: Body }) {
  if (body.format === "html") {
    // Repository Markdown, reviewed with the code.
    return <div className="prose" dangerouslySetInnerHTML={{ __html: body.html }} />;
  }
  return (
    <div className="prose">
      <PortableText value={body.blocks as never} components={components(body.image)} />
    </div>
  );
}
