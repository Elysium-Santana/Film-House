const API_BASE = 'https://api.themoviedb.org/3';
const apiKey = '18eac5939442dfdfc6416078341aae6c';

let response;
let json;
async function request(endPoit) {
  try {
    response = await fetch(`${API_BASE}${endPoit}`);
    json = await response.json();
    if (response.ok === false) {
      throw new Error(json.message);
    }
  } catch (err) {
    console.log(err.message);
  }
  return { json, request };
}

export default {
  getFilms: async (page) => {
    return [
      {
        pathName: 'sessions',
        genreName: 'Séries',
        films: await request(
          `/discover/tv?with_network=212&language=pt-BR&page=${page}&api_key=${apiKey}`,
        ),
      },
      {
        pathName: 'recommended',
        genreName: 'Recomendado',
        films: await request(
          `/movie/popular?language=pt-BR=&api_key=${apiKey}&page=${page}`,
        ),
      },
      {
        pathName: 'trending',
        genreName: 'Em Alta',
        films: await request(
          `/movie/top_rated?language=pt-BR&api_key=${apiKey}&page=${page}`,
        ),
      },
      {
        pathName: 'action',
        genreName: 'Ação',
        films: await request(
          `/discover/movie?with_genres=28&language=pt-BR&api_key=${apiKey}&page=${page}`,
        ),
      },
      {
        pathName: 'comedy',
        genreName: 'Comédia',
        films: await request(
          `/discover/movie?with_genres=35&language=pt-BR&api_key=${apiKey}&page=${page}`,
        ),
      },
      {
        pathName: 'romance',
        genreName: 'Romance',
        films: await request(
          `/discover/movie?with_genres=10749&language=pt-BR&api_key=${apiKey}&page=${page}`,
        ),
      },
      {
        pathName: 'horror',
        genreName: 'Terror',
        films: await request(
          `/discover/movie?with_genres=27&language=pt-BR&api_key=${apiKey}&page=${page}`,
        ),
      },
      {
        pathName: 'documentary',
        genreName: 'Documentarios',
        films: await request(
          `/discover/movie?with_genres=99&language=pt-BR&api_key=${apiKey}&page=${page}`,
        ),
      },
    ];
  },
  aboutMoreWithId: async (id, type) => {
    if (type === 'session') {
      return {
        detailsWithId: await request(
          `/tv/${id}?api_key=${apiKey}&language=pt-BR`,
        ),
      };
    } else if (type === 'movie') {
      return {
        detailsWithId: await request(
          `/movie/${id}?api_key=${apiKey}&language=pt-BR`,
        ),
      };
    }
  },
};
