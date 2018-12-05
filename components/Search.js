import { connect } from "react-redux";
import { writeTest } from "../store/store";
import {
  setTotalResults,
  firstCharged,
  changedMovie,
  changedCategory
} from "../store/store";

class Search extends React.Component {
  handleChangeMovie = e => {
    const { dispatch } = this.props;
    dispatch(changedMovie(e.target.value));
  };

  handleChangeCategory = e => {
    const { dispatch } = this.props;
    dispatch(changedCategory(e.target.value));
  };

  handleSubmitSearch = e => {
    e.preventDefault();
    const { dispatch, movie, category } = this.props;
    const req = fetch(
      `http://www.omdbapi.com/?s=${movie}&type=${category}&apikey=33936251&page=1`
    )
      .then(data => data.json())
      .then(result => {
        const { Search, totalResults } = result;
        console.log(totalResults);
        dispatch(firstCharged(Search));
        const totalPages =
          totalResults % 10 > 0
            ? Math.ceil(totalResults / 10 + 1 - (totalResults % 10) / 10)
            : totalResults / 10;
        dispatch(setTotalResults(totalPages, totalResults));
      });
  };

  render() {
    const { test } = this.props;
    return (
      <div className="searchContainer">
        <form onSubmit={this.handleSubmitSearch}>
          <input type="text" onChange={this.handleChangeMovie} />
          <select name="category" onChange={this.handleChangeCategory}>
            <option value="movie">movie</option>
            <option value="series">series</option>
            <option value="episode">episode</option>
          </select>
          <button>apachurra</button>
        </form>
        <style jsx>
          {`
            .searchContainer {
              width: 100%;
              padding: 20px 0;
            }
            form {
              width: 80%;
              margin: 0 auto;
              display: flex;
            }
            input {
              width: 60%;
              font-size: 18px;
              padding: 10px;
            }
            select {
              background: rgba(142, 84, 233, 0.8);
              font-size: 18px;
              padding: 10px;
              color: #fff;
              border: 1px solid black;
            }
            button {
              background: rgba(142, 84, 233, 0.8);
              font-size: 18px;
              padding: 10px;
              color: #fff;
              border: 1px solid black;
            }
          `}
        </style>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { totalPages, movie, category } = state;
  return { totalPages, movie, category };
}

export default connect(mapStateToProps)(Search);
