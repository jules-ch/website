import { ScrambleText } from "@/components/scramble-text"
import { MapPin, Building2 } from "lucide-react"

export function Header() {
  return (
    <header className="mb-16 space-y-4">
      <h1 className="text-4xl font-bold mb-4 animate-fade-in text-white">
        <span className="inline-block">
          <ScrambleText text="jules chéron" />
        </span>
        <span className="text-accent">_</span>
      </h1>
      <div className="flex flex-col gap-2 text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          marseille, france
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          software engineer @ deepki
        </div>
      </div>
      <p className="leading-relaxed animate-fade-in-up">
        i&apos;m a 32 y/o software engineer. i'm passionate about science, math & physics in general. i enjoy language design, theoretical computer science
        and i live on the terminal. if i&apos;m not coding, i&apos;m probably
        exploring outdoor, riding my bike or taking pictures.
      </p>
      <p className="leading-relaxed animate-fade-in-up">
        Mainly coding in <b>rust</b> & <b>python</b>.
      </p>
    </header>
  )
}
