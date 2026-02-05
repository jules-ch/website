import { notFound } from "next/navigation"
import { MDX } from "./mdx"
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog"

type PageProps = {
  params: Promise<{ slug: string }>
}


/**
 * Tells Next.js to pre-render every possible slug for the blog posts
 * at build time. This is what makes the page "Static".
 */
export async function generateStaticParams() {
  // 1. Fetch all available slugs for your blog posts
  const slugs = getAllPostSlugs()

  // 2. Map the slugs to the format required by Next.js:
  //    [{ slug: 'post-a' }, { slug: 'post-b' }, ...]
  return slugs.map((slug) => ({
    slug: slug,
  }))
}


export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    return
  }

  const publishedTime = formatDate(post.metadata.date)

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      type: "article",
      url: `https://www.nexxel.dev/blog/${post.slug}`,
      images: [
        {
          url: `https://www.nexxel.dev/og/blog?title=${post.metadata.title}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@nexxeln",
      images: [
        `https://www.nexxel.dev/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
      ],
    },
  }
}

export default async function Post({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  return (
    <section className="animate-fade-in-up">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.description,
            image: `https://nexxel.dev/og/blog?title=${post.metadata.title
              }&top=${formatDate(post.metadata.date)}`,
            url: `https://nexxel.dev/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Shoubhit Dash",
            },
          }),
        }}
      />

      <h1 className="text-4xl font-bold mb-4 text-white">
        <span className="text-accent mr-2">*</span>
        {post.metadata.title}
      </h1>

      <div className="mb-8 flex items-center justify-between text-sm text-gray-400">
        <span>{formatDate(post.metadata.date)}</span>
      </div>

      <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-white hover:prose-a:underline">
        <MDX source={post.content} />
      </article>
    </section>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
