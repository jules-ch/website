
import { Metadata } from "next"
import { ScrambleText } from "@/components/scramble-text"
import { PhotoGallery } from "@/components/photo-gallery"
import { GearAccordion } from "@/components/gear-accordion"

export const metadata: Metadata = {
  title: "Photography",
  description: "A collection of my outdoor photography.",
}

export default function PhotographyPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="photography" />
        <span className="text-accent">&</span>
      </h1>
      <section className="mb-12">
        <div className="lg:flex lg:gap-8">
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            <p className="text-gray-400 leading-relaxed">
              a collection of my favorite photos taken during my trips. Enjoy moments captured through my lens.
            </p>
          </div>
          <div className="lg:w-1/3 lg:pl-4">
            <GearAccordion />
          </div>
        </div>
      </section>

      <PhotoGallery />
    </main >
  )
}


