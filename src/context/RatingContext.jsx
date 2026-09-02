import { createContext, useContext, useState } from "react"

const RatingContext = createContext(null)

export function RatingProvider({ children }) {
  const [ratings, setRatings] = useState({})

  const setMovieRating = (movieId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [movieId]: rating,
    }))
  }

  const getMovieRating = (movieId) => {
    return ratings[movieId] ?? 0
  }

  return (
    <RatingContext.Provider
      value={{
        ratings,
        setMovieRating,
        getMovieRating,
      }}
    >
      {children}
    </RatingContext.Provider>
  )
}

export function useRating() {
  const context = useContext(RatingContext)

  if (!context) {
    throw new Error(
      "useRating должен использоваться внутри RatingProvider"
    )
  }

  return context
}