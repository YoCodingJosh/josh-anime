"use client"

import { useState } from "react"
import { Info, Star } from "lucide-react"

type AnimeCardProps = {
  id: number
  title: string
  posterUrl: string
  genres: string[]
  episodes: number
  score: number
  startSeason: string | {
    year: number
    season: 'Winter' | 'Spring' | 'Summer' | 'Fall'
  }
  jpTitle?: string
  onClick: () => void
}

export function AnimeCard({ title, posterUrl, genres, episodes, score, startSeason, jpTitle, onClick }: AnimeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Card Container */}
      <div className="relative w-64 h-96 perspective-[1000px] cursor-pointer hover:scale-[1.02] duration-300 ease-in-out transition-transform">
        <button
          onClick={onClick}
          className="absolute inset-0 transform-3d transition-transform duration-700"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-lg">
            <img src={posterUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />

            {/* Info Icon Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(!isFlipped)
              }}
              className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              aria-label="Toggle card info"
            >
              <Info className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 backface-hidden bg-card border border-border rounded-lg shadow-lg p-6 flex flex-col justify-between overflow-y-scroll"
            style={{ transform: "rotateY(180deg)" }}
          >
            {/* Info Icon Button on back */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(!isFlipped)
              }}
              className="absolute top-3 right-3 w-8 h-8 bg-muted hover:bg-accent rounded-full flex items-center justify-center transition-colors"
              aria-label="Toggle card info"
            >
              <Info className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="flex flex-col gap-4 mt-8">
              {jpTitle && (
                <div>
                  <h2 className="text-base font-medium text-foreground">{jpTitle}</h2>
                </div>
              )}

              {/* Score */}
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold text-foreground">{score.toFixed(2)}</span>
              </div>

              { /* Start Season */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">Released</h3>
                <p className="text-lg font-medium text-foreground capitalize">
                  {typeof startSeason === 'string'
                    ? startSeason
                    : `${startSeason.season} ${startSeason.year}`}
                </p>
              </div>

              {/* Episodes */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">Episodes</h3>
                <p className="text-lg font-medium text-foreground">{episodes}</p>
              </div>

              {/* Genres */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {genres.map((genre) => (
                    <span key={genre} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Title Below Card */}
      <h2 className="text-lg font-semibold text-foreground text-center max-w-64 text-balance">{title}</h2>
    </div>
  )
}
