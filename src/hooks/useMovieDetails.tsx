import { useEffect, useState } from "react"
import movieDB from "../api/movieDB"
import { Cast, CreditsResponse } from "../interfaces/creditInterface"
import { MovieFull } from "../interfaces/movieInterface"


interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
     const [state, setstate] = useState<MovieDetails>({
         isLoading: true,
         movieFull: undefined,
         cast: []
     })

     useEffect(() => {
         getMovieDetails()
     }, [])

     const getMovieDetails = async() => {
         const movieDetailsPromise  =  movieDB.get<MovieFull>(`/${movieId}`);
         const castPromise  =  movieDB.get<CreditsResponse>(`/${movieId}/credits`);

         const [movieDetailsResponse, castPromiseResponse] = await Promise.all([movieDetailsPromise, castPromise])
        
         setstate({
             isLoading: false,
             movieFull: movieDetailsResponse.data,
             cast: castPromiseResponse.data.cast
         })
     }

     return {...state}
}