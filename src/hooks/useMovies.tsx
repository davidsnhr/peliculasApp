import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB'
import { Movie, MovieDBResponse } from '../interfaces/movieInterface'


interface MovieState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [moviesState, setMoviesState] = useState<MovieState>({
            nowPlaying:[],
            popular:[],
            topRated:[],
            upcoming:[],
    })

    const getMovies = async() => {
        const nowPlayingPromise = await movieDB.get<MovieDBResponse>('/now_playing');
        const popularPromise = await movieDB.get<MovieDBResponse>('/popular');
        const topRatedPromise = await movieDB.get<MovieDBResponse>('/top_rated');
        const upcomingPromise = await movieDB.get<MovieDBResponse>('/upcoming');
        // setMoviesInTheather(res.data.results)

        const response = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ])

        setMoviesState({
            nowPlaying: response[0].data.results,
            popular: response[1].data.results,
            topRated: response[2].data.results,
            upcoming: response[3].data.results
        })
        setIsLoading(false);
    }
    useEffect(() => {
        getMovies();
     }, [])
    return {
        ...moviesState,
        isLoading,
    }
}

export default useMovies
