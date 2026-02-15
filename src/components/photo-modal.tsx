"use client"

import { useEffect } from "react"
import Image from "next/image"

import styles from "./photo-modal.module.css"
interface Props {
  id: string
  // blurSrc: string
  alt: string
  onClose: () => void
}

const CDN = "https://photos.julescheron.com"


export function PhotoModal({ id, alt, onClose }: Props) {
  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  // Build URLs
  const low = `${CDN}/cdn-cgi/image/width=512,q=80,blur=50,compression=fast/${id}`
  const base = `${CDN}/cdn-cgi/image/width=1920,slow-connection-quality=50/${id}`


  const srcset = `
    ${CDN}/cdn-cgi/image/width=400,slow-connection-quality=50/${id} 400w,
    ${CDN}/cdn-cgi/image/width=800,slow-connection-quality=50/${id} 800w,
    ${CDN}/cdn-cgi/image/width=1200,slow-connection-quality=50/${id} 1200w,
    ${CDN}/cdn-cgi/image/width=1920,slow-connection-quality=50/${id} 1920w
  `
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg cursor-pointer ${styles.animateFadeIn}`}
      onClick={onClose} // any click closes modal
    >
      <div className="relative w-[90vw] h-[90vh] rounded-xl shadow-2xl">
        {/* 🔹 LOW-RES BLURRED PLACEHOLDER */}
        <img
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={low}
          alt=""
        />

        {/* 🔹 HIGH-RES IMAGE WITH SRCSET */}
        <img
          className="absolute top-0 left-0 w-full h-full object-contain opacity-0 transition-opacity duration-200"
          src={base}
          srcSet={srcset}
          sizes="(max-width: 1900px) 90vw, 1900px"
          onLoad={(e) => (e.currentTarget.style.opacity = "1")}
          alt={alt}
        />


      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

      `}</style>
    </div>
  )
}

