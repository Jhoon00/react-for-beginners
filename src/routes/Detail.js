import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

function Detail() {
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const getMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <h1>{movie.title}</h1>
          <div>
            <span>
              <img src={movie.medium_cover_image} alt="movie_image" />
            </span>
            <span>{movie.description_full}</span>
            <span>
              <div>{`rate : ${movie.rating}`}</div>
              <div>{`year : ${movie.year}`}</div>
              <div>
                <ul>
                  {movie.genres.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
