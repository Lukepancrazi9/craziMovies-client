import PropType from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
};

MovieCard.propTypes = {
    movie: PropType.shape({
      Title: PropType.string.isRequired,
      ImagePath: PropType.string, 
    }).isRequired
  };

// MovieCard.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired,
//         Description: PropTypes.string.isRequired,
//         imagePath: PropTypes.string,
//         Genre: PropTypes.arrayOf(
//             PropTypes.shape({
//                 Name: PropTypes.string.isRequired,
//                 Description: PropTypes.string.isRequired
//             })
//         ),
//         Director: PropTypes.shape({
//             Name: PropTypes.string.isRequired,
//             Bio: PropTypes.string.isRequired,
//             Birth: PropTypes.string,
//             Death: PropTypes.string
//         }),
//         featured: PropTypes.bool
//     }).isRequired,
//     onMovieClick: PropTypes.func.isRequired
// };