import { useEffect, useReducer } from 'react'

const STORAGE_KEY = 'celebrare-favourites'

function favouritesReducer(state, action) {
switch (action.type) {
case 'TOGGLE_FAVOURITE': {
const photoExists = state.some(
(photo) => photo.id === action.photo.id
)

  if (photoExists) {
    return state.filter(
      (photo) => photo.id !== action.photo.id
    )
  }

  return [...state, action.photo]
}

default:
  return state
}
}

function getInitialFavourites() {
try {
const saved = localStorage.getItem(STORAGE_KEY)
return saved ? JSON.parse(saved) : []
} catch {
return []
}
}

function useFavourites() {
const [favourites, dispatch] = useReducer(
favouritesReducer,
undefined,
getInitialFavourites
)

useEffect(() => {
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(favourites)
)
}, [favourites])

function toggleFavourite(photo) {
dispatch({
type: 'TOGGLE_FAVOURITE',
photo,
})
}

return { favourites, toggleFavourite }
}

export default useFavourites
