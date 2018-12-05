import React from "react";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import MovieGrid from "../components/MovieGrid";
import { setTotalResults, firstCharged } from "../store/store";
import Search from "../components/Search";

class Index extends React.Component {
  static async getInitialProps() {
    const req = await fetch(
      "https://www.omdbapi.com/?s=batman&type=movie&apikey=33936251&page=1"
    );
    const { Search, totalResults } = await req.json();
    return { Search, totalResults };
  }

  componentDidMount() {
    const { totalResults, dispatch, Search } = this.props;
    (function setResults(totalResults) {
      const totalPages =
        totalResults % 10 > 0
          ? Math.ceil(totalResults / 10 + 1 - (totalResults % 10) / 10)
          : totalResults / 10;
      dispatch(setTotalResults(totalPages, totalResults));
      dispatch(firstCharged(Search));
    })(totalResults);
  }

  render() {
    return (
      <Layout title="Movies">
        <Search />
        <MovieGrid />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { movie } = state;
  return { movie };
}

export default connect(mapStateToProps)(Index);
