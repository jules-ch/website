"use client"

import { useState, useEffect, useMemo } from "react"
import { PhotoModal } from "@/components/photo-modal"

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

function shuffle<T>(array: T[], seed: number = 1): T[] {
  let currentIndex = array.length, temporaryValue: T, randomIndex: number;
  let random = function() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
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
  }, [selectedTag, shuffledPhotos, now]);

  if (!now) return null;
  return (
    <div className="">
      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`tag-button ${!selectedTag ? "active" : ""}`}
          onClick={() => setSelectedTag(null)}
        >
          All
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${selectedTag === tag ? "active" : ""}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPhotos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative overflow-hidden rounded-lg"
          >
            <img
              key={photo.id}
              src={`https://photos.julescheron.com/cdn-cgi/image/width=400,format=webp,slow-connection-quality=50/${photo.id}`}
              alt={photo.alt}
              className="rounded-xl object-cover w-full h-72 cursor-pointer hover:opacity-80 transition"
              onClick={() => setActivePhoto(photo)}
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

      {/* CSS */}
      <style jsx>{`
        .tag-button {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid #4b5563; /* Tailwind gray-700 */
          background-color: #374151; /* Tailwind gray-700 */
          color: #d1d5db; /* Tailwind gray-300 */
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tag-button:hover {
          background-color: #4b5563; /* slightly lighter on hover */
        }

        .tag-button.active {
          background-color: oklch(50.5% 0.213 27.518); /* Tailwind yellow-400 / accent */
          color: #111827; /* Tailwind gray-900 / dark font */
          font-weight: 600;
        }
      `}</style>



    </div>
  )
}

