import { useCallback, useMemo, useState } from 'react'
import useFetchPhotos from './hooks/useFetchPhotos'
import useFavourites from './hooks/useFavourites'
import PhotoCard from './PhotoCard'

function App() {
  const { photos, loading, error } = useFetchPhotos()
  const { favourites, toggleFavourite } = useFavourites()

  const [search, setSearch] = useState('')
  const [showFavourites, setShowFavourites] = useState(false)

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const sourcePhotos = showFavourites ? favourites : photos

    return sourcePhotos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    )
  }, [photos, favourites, search, showFavourites])

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Celebrare · React Assignment
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Photo Gallery
          </h1>

          <p className="mt-3 text-zinc-400">
            Discover beautiful photographs and save your favourites.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowFavourites(false)}
              className={`rounded-xl px-5 py-3 font-medium transition ${
                !showFavourites
                  ? 'bg-violet-600 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              All Photos ({photos.length})
            </button>

            <button
              type="button"
              onClick={() => setShowFavourites(true)}
              className={`rounded-xl px-5 py-3 font-medium transition ${
                showFavourites
                  ? 'bg-violet-600 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              ♥ Favourites ({favourites.length})
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {showFavourites
                ? 'Your Favourites'
                : 'Explore the Collection'}
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              {filteredPhotos.length} photos found
            </p>
          </div>

          <input
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search photographer..."
            aria-label="Search photographer"
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 sm:max-w-sm"
          />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500" />

            <p className="mt-4 text-zinc-400">
              Loading beautiful photos...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center">
            <p className="text-rose-300">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-rose-600"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.some(
                  (item) => item.id === photo.id
                )}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-zinc-900 px-6 py-16 text-center">
            <p className="text-2xl">📷</p>

            <h3 className="mt-4 text-xl font-semibold">
              No photos found
            </h3>

            <p className="mt-2 text-zinc-400">
              Try another photographer name or explore all photos.
            </p>
          </div>
        )}
      </section>

      <footer className="border-t border-white/10 px-5 py-6 text-center text-sm text-zinc-500">
        Built with React, Vite and Tailwind CSS
      </footer>
    </main>
  )
}

export default App