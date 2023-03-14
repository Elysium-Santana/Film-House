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
  return { json: json.results, request };
}
export default {
  getFilms: async () => {
    return [
      {
        genreName: 'Netflix',
        films: await request(
          `/discover/tv?with_network=212&language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        genreName: 'Recomendado',
        films: await request(
          `/trending/all/week?language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        genreName: 'Em Alta',
        films: await request(
          `/movie/top_rated?language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        genreName: 'Ação',
        films: await request(
          `/discover/movie?with_genres=28&language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        genreName: 'Comédia',
        films: await request(
          `/discover/movie?with_genres=35&language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        genreName: 'Romance',
        films: await request(
          `/discover/movie?with_genres=10749&language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        genreName: 'Terror',
        films: await request(
          `/discover/movie?with_genres=27&language=pt-BR&api_key=${apiKey}`,
        ),
      },
      {
        genreName: 'Documentary',
        films: await request(
          `/discover/movie?with_genres=99&language=pt-BR&api_key=${apiKey}`,
        ),
      },
    ];
  },
};
