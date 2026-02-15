import { getAllPostSlugs } from "@/lib/blog"
import { ImageResponse } from "next/og"


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



async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error("failed to load font data")
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // const { searchParams } = new URL(request.url)
  const title = "julesch's blog"

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111",
          fontFamily: "Geist Mono",
          padding: "40px",
          position: "relative",
        }}
      >
        <img
          src="https://www.julescheron.com/julesch.jpg"
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            maxWidth: "90%",
          }}
        >
          <span
            style={{
              color: "#ff6b35",
              fontSize: 48,
              flexShrink: 0,
            }}
          >
            *
          </span>
          <h1
            style={{
              fontSize: 48,
              color: "#fff",
              margin: 0,
              lineHeight: 1.2,
              wordBreak: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Geist Mono",
          data: await loadGoogleFont("Geist Mono", title),
          style: "normal",
        },
      ],
    }
  )
}
