function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
return ( <article className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-violet-500/50"> <div className="relative overflow-hidden">
<img
src={`https://picsum.photos/id/${photo.id}/600/400`}
alt={`Photograph by ${photo.author}`}
loading="lazy"
className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
/>

    <button
      type="button"
      onClick={() => onToggleFavourite(photo)}
      aria-label={
        isFavourite
          ? 'Remove from favourites'
          : 'Add to favourites'
      }
      aria-pressed={isFavourite}
      className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-lg transition ${
        isFavourite
          ? 'bg-rose-500 text-white'
          : 'bg-black/60 text-white hover:bg-rose-500'
      }`}
    >
      {isFavourite ? '♥' : '♡'}
    </button>
  </div>

  <div className="flex items-center justify-between gap-3 p-4">
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wider text-zinc-500">
        Photographer
      </p>

      <h3 className="mt-1 truncate font-medium text-white">
        {photo.author}
      </h3>
    </div>

    <span className="shrink-0 rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
      Photo #{photo.id}
    </span>
  </div>
</article>


)
}

export default PhotoCard