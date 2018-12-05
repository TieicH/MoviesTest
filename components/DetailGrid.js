import Link from "next/link";
class DetailGrid extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <div>
        <h1 className="title">{movie.Title}</h1>
        <div className="movieContainer">
          <div className="imgMovie">
            <img
              src={
                movie.Poster == "N/A"
                  ? "http://placecorgi.com/300/420"
                  : movie.Poster
              }
              alt=""
            />
          </div>
          <div className="movieInfo">
            <div className="description">
              <p>Description: </p>
              <p>{movie.Plot}</p>
            </div>
            <div className="description">
              <p>Year: </p>
              <p>{movie.Year}</p>
            </div>
            <div className="description">
              <p>Release: </p>
              <p>{movie.Release}</p>
            </div>
            <div className="description">
              <p>Rating: </p>
              <p>{movie.imdbRating}</p>
            </div>
            <Link href="/">
              <a className="back">Back</a>
            </Link>
          </div>
        </div>
        <style jsx>
          {`
            .back {
              background: black;
              color: white;
              padding: 5px 18px;
              border-radius: 4px;
              text-decoration: none;
            }
            .title {
              text-align: center;
            }
            .imgMovie {
              width: 300px;
            }
            .movieContainer {
              border: 2px solid black;
              border-radius: 8px;
              overflow: hidden;
              width: 90%;
              margin: 0 auto;
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
            }

            .movieInfo {
              padding: 10px 20px;
              flex: 1;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DetailGrid;
