import React from 'react';

export const FavoriteMovies = ({ favoriteNovieList }) => {
  return (
    <>
      <h2>Favorite Movies</h2>
      {favoriteNovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImagePath} />
            <link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </link>
            <button variant="secondary" onClick={() => this.removeFavorite(movies._id)}>Remove from list </button>
          </div>
        );
      })}
    </>
  );
};
