import axios from "axios";
import { apiKey } from "../constants";

// EndPoints
const apiBaseUrl = `https://api.themoviedb.org/3`;
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const trendingTVEndpoint = `${apiBaseUrl}/trending/tv/day?api_key=${apiKey}`
const topRatedMovieEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const trendingPersonEndpoint = `${apiBaseUrl}/trending/person/day?api_key=${apiKey}`

// Dinamic API
const MovieDetailEndPoint = (id) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const MovieCreditsEndPoint = (id) => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const MovieSimilarEndPoint = (id) => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

export const image500 = path=> path? `https://image.tmdb.org/t/p/w500/${path}`: null;
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342/${path}`: null;
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185/${path}`: null;

const apiCall = async (endpoint, params) => {
    const options = {
        method : 'GET',
        url: endpoint,
        params: params? param:{}
    }

    try{
        const response = await axios.request(options);
        return response.data;
    } catch (error){
        console.log('error', error);
        return {}
    }
}

export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTrendingTV = ()=>{
    return apiCall(trendingTVEndpoint);
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMovieEndpoint);
}
export const fetchMovieDetail = (id)=>{
    return apiCall(MovieDetailEndPoint(id));
}
export const fetchMovieCredits = (id)=>{
    return apiCall(MovieCreditsEndPoint(id));
}
export const fetchMovieSimilar = (id)=>{
    return apiCall(MovieSimilarEndPoint(id));
}