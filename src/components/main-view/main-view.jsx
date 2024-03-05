import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
const allMovies = [
  {
    id: 1,
    title: 'Silence of the Lambs',
    description:
      'A young FBI cadet must recieve the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
    genre: {
      name: 'Thriller',
      description:
        'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excittement and suspense in the audience.',
    },
    director: {
      name: 'Jonathan Demme',
      bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
      birth: '1944',
      death: '2017',
    },
    imagePath:
      'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    featured: true,
    actors: ['Anthony Hopkins', 'Jodie Foster'],
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    description:
      'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    genre: {
      name: 'Drama',
      description:
        'Drama film is a genre that relies on the emotional and relational development of realistic characters',
    },
    director: {
      name: 'Frank Darabont',
      bio: 'Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution.',
      birth: '1959',
      death: '--',
    },
    imagePath:
      'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    featured: true,
    actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
  },
  {
    id: 3,
    title: 'The Godfather',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    genre: {
      name: 'Drama',
      description:
        'Drama film is a genre that relies on the emotional and relational development of realistic characters',
    },
    director: {
      name: 'Francis ford Coppola',
      bio: 'Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family.',
      birth: '1939',
      death: '--',
    },
    imagePath:
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg',
    featured: true,
    actors: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Diane Keaton'],
  },
];
export const MainView = () => {

    return (
      <div>

        
      </div>
    );
  }
};
