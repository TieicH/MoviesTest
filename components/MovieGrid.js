import "isomorphic-fetch";
import Link from "next/link";
import { connect } from "react-redux";
import {
  checkMoreMovies,
  setTotalResults,
  fillMovie,
  nextPaged
} from "../store/store";

class Movie extends React.Component {
  handlePage = () => {
    const { dispatch, page, totalPages, movie, category } = this.props;
    dispatch(nextPaged(page + 1));
    const req = fetch(
      `http://www.omdbapi.com/?s=${movie}&type=${category}&apikey=33936251&page=${page +
        1}`
    )
      .then(data => data.json())
      .then(result => {
        const { Search, totalResults } = result;
        const totalPages =
          totalResults % 10 > 0
            ? Math.ceil(totalResults / 10 + 1 - (totalResults % 10) / 10)
            : totalResults / 10;
        dispatch(setTotalResults(totalPages));
        Search.map(item => {
          dispatch(fillMovie(item));
        });
      });
    dispatch(checkMoreMovies(page, totalPages));
  };

  render() {
    const { search, morePages } = this.props;
    return (
      <div>
        <div className="moviesContainer">
          {search == undefined ? (
            <h1>No hay resultados</h1>
          ) : (
            search.map(item => {
              //console.log(item);
              return (
                <Link key={item.imdbID} href={`/details?id=${item.imdbID}`}>
                  <a className="movieContainer">
                    <div>
                      <img
                        className="imgMovie"
                        src={
                          item.Poster == "N/A"
                            ? "http://placecorgi.com/236/350"
                            : item.Poster
                        }
                        alt={item.title}
                      />
                      <div className="resumen">
                        <h3>{item.Title}</h3>
                        <p>{item.Year}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })
          )}
        </div>
        {morePages ? (
          <p className="vermas" onClick={this.handlePage}>
            Ver más
          </p>
        ) : (
          <p className="nohay">No hay mas peliculas</p>
        )}
        <style jsx>
          {`
            .resumen h3,
            .resumen p {
              color: black;
              text-decoration: none;
            }
            .vermas {
              cursor: pointer;
              background: red;
              text-align: center;
              padding: 20px;
              background: rgba(142, 84, 233, 0.8);
              font-size: 20px;
              color: #fff;
            }
            .nohay {
              font-size: 20px;
              text-align: center;
              color: red;
            }
            .mainContainer {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
            .moviesContainer {
              margin: 0 auto;
              display: flex;
              align-items: flex-start;
              justify-content: space-around;
              flex-wrap: wrap;
              width: 90%;
            }
            .movieContainer {
              width: calc((100% / 4) - 20px);
              text-decoration: none;
            }
            .imgMovie {
              width: 100%;
            }
          `}
        </style>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { morePages, page, totalPages, search, movie, category } = state;
  return { morePages, page, totalPages, search, movie, category };
}

export default connect(mapStateToProps)(Movie);
