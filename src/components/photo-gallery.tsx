"use client"

import { useState, useEffect, useMemo } from "react"
import { PhotoModal } from "@/components/photo-modal"
import styles from "./photo-gallery.module.css"  // Import the CSS Module
import photos from "@/data/photos.json"
function getDailySeed(date: Date): number {
  // Get today's date at midnight UTC to ensure consistency across timezones
  const today = date;

  // Get a fixed reference date (e.g., Jan 1, 2020)
  const epoch = new Date('2020-01-01T00:00:00.000Z');

  // Calculate the difference in milliseconds
  const diffTime = today.getTime() - epoch.getTime();

  // Convert milliseconds to days and use as the seed
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Mulberry32 pseudorandom number generator
 * @param a - Seed value for the RNG
 * @returns A function that generates pseudorandom numbers between 0 and 1
 */
function mulberry32(a: number) {
  return function() {
    let t = (a += 0x6D2B79F5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(array: T[], seed: number): T[] {
  const arr = [...array]
  const rng = mulberry32(seed)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}



const allTags = Array.from(
  new Set(photos.flatMap((photo) => photo.tags))
)
export function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState<null | typeof photos[0]>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [now, setNow] = useState<Date | null>(null); // start empty

  useEffect(() => {
    const current = new Date();
    setNow(current); // only runs on the client
  }, []);


  // Filter photos by selected tag


  // Shuffle photos using the daily seed, only when `now` is ready
  const shuffledPhotos = useMemo(() => {
    if (!now) return []; // don't call getDailySeed until now is set
    const seed = getDailySeed(now); // now is guaranteed to be a Date
    return shuffle([...photos], seed);
  }, [now]);
  const filteredPhotos = useMemo(() => {
    return selectedTag
      ? shuffledPhotos.filter((photo) => (photo.tags as string[]).includes(selectedTag))
      : shuffledPhotos;
  }, [selectedTag, shuffledPhotos]);

  if (!now) return null;
  return (
    <div className="">
      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`${styles.tagButton} ${!selectedTag ? styles.active : ""}`}
          onClick={() => setSelectedTag(null)}
        >
          All
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagButton} ${selectedTag === tag ? styles.active : ""}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPhotos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative overflow-hidden rounded-lg"
          >
            <img
              src={`https://photos.julescheron.com/cdn-cgi/image/width=400,format=webp,slow-connection-quality=50/${photo.id}`}
              alt={photo.alt}
              loading={index < 6 ? "eager" : "lazy"}
              className="rounded-xl object-cover w-full h-72 cursor-pointer hover:opacity-80 transition"
            />
            {/* Tooltip */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
              <span className="text-white text-sm text-center px-2">{photo.alt}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {activePhoto && (
        <PhotoModal
          id={activePhoto.id}
          // blurSrc={activePhoto.blur}
          alt={activePhoto.alt || ""}
          onClose={() => setActivePhoto(null)}
        />
      )}
    </div>
  )
}

