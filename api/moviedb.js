import axios from "axios";
import { apiKey } from "../constants";

//////////////////////////
//// Static Endpoint /////
//////////////////////////
const apiBaseUrl = `https://api.themoviedb.org/3`;
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const trendingTVEndpoint = `${apiBaseUrl}/trending/tv/day?api_key=${apiKey}`;
const topRatedMovieEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const trendingPersonEndpoint = `${apiBaseUrl}/trending/person/day?api_key=${apiKey}`;

///////////////////////////
//// Dynamic Endpoint /////
///////////////////////////
const MovieDetailEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const MovieCreditsEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const MovieSimilarEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const TVDetailEndPoint = (id) => `${apiBaseUrl}/tv/${id}?api_key=${apiKey}`;

const TVCreditsEndPoint = (id) =>
  `${apiBaseUrl}/tv/${id}/credits?api_key=${apiKey}`;
const TVSimilarEndPoint = (id) =>
  `${apiBaseUrl}/tv/${id}/similar?api_key=${apiKey}`;

const PersonDetailEndPoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const RelatedMoviesEndPoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
const RelatedTVEndPoint = (id) =>
  `${apiBaseUrl}/person/${id}/tv_credits?api_key=${apiKey}`;
  
const SearchMultiEndPoint = `${apiBaseUrl}/search/multi?api_key=${apiKey}`;




/////////////////////////
//// Image Endpoint /////
/////////////////////////

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;

export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;




///////////////////////////////
//// Default Function call ////
///////////////////////////////

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};



/////////////////////////
//// Static API Call ////
/////////////////////////

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};
export const fetchTrendingTV = () => {
  return apiCall(trendingTVEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMovieEndpoint);
};
export const fetchTrendingPerson = () => {
  return apiCall(trendingPersonEndpoint);
};



/////////////////////////
//// Dinamic API Call ////
/////////////////////////

///// Movie Detail API CALL /////

export const fetchMovieDetail = (id) => {
  return apiCall(MovieDetailEndPoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(MovieCreditsEndPoint(id));
};

export const fetchMovieSimilar = (id) => {
  return apiCall(MovieSimilarEndPoint(id));
};

///// TV Detail API CALL /////

export const fetchTVDetail = (id) => {
  return apiCall(TVDetailEndPoint(id));
};

export const fetchTVCredits = (id) => {
  return apiCall(TVCreditsEndPoint(id));
};

export const fetchTVSimilar = (id) => {
  return apiCall(TVSimilarEndPoint(id));
};

///// Person Detail API CALL /////

export const fetchPersonDetail = (id) => {
  return apiCall(PersonDetailEndPoint(id));
};

export const fetchRelatedMovies = (id) => {
  return apiCall(RelatedMoviesEndPoint(id));
};

export const fetchRelatedTV = (id) => {
  return apiCall(RelatedTVEndPoint(id));
};

// search screen apis
export const searchMovies = (params) =>{
    return apiCall(SearchMultiEndPoint, params);
}