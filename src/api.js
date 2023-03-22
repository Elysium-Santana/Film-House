const API_BASE = 'https://api.themoviedb.org/3';
const apiKey = '18eac5939442dfdfc6416078341aae6c';

async function request(endPoit) {
  let response;
  let json;
  try {
    response = await fetch(`${API_BASE}${endPoit}`);
    json = await response.json();
    if (response.ok === false) throw new Error(json.message);
  } catch (err) {
    console.log(err.message);
  }
  return { json, request };
}
export default {
  getFilms: async (p) => {
    return [
      {
        pathName: 'sessions',
        genreName: 'Séries',
        films: await request(
          `/discover/tv?with_network=212&language=pt-BR&page=${p}&api_key=${apiKey}`,
        ),
      },
      {
        pathName: 'recomendado',
        genreName: 'Recomendado',
        films: await request(
          `/trending/all/week?language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        pathName: 'trending',
        genreName: 'Em Alta',
        films: await request(
          `/movie/top_rated?language=pt-BR&api_key=${apiKey}&page=${p}`,
        ),
      },
      {
        pathName: 'action',
        genreName: 'Ação',
        films: await request(
          `/discover/movie?with_genres=28&language=pt-BR&api_key=${apiKey}&page=${p}`,
        ),
      },
      {
        pathName: 'comedy',
        genreName: 'Comédia',
        films: await request(
          `/discover/movie?with_genres=35&language=pt-BR&api_key=${apiKey}&page=${p}`,
        ),
      },
      {
        pathName: 'romance',
        genreName: 'Romance',
        films: await request(
          `/discover/movie?with_genres=10749&language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        pathName: 'horror',
        genreName: 'Terror',
        films: await request(
          `/discover/movie?with_genres=27&language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        pathName: 'documentary',
        genreName: 'Documentarios',
        films: await request(
          `/discover/movie?with_genres=99&language=pt-BR&api_key=${apiKey}`,
        ),
      },
    ];
  },
  aboutMoreWithId: async (id, type) => {
    return {
      detailsWithId: await request(
        `/tv/${id}?api_key=${apiKey}&language=pt-BR`,
      ),
    };
  },
};
