import React from "react";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import MovieGrid from "../components/MovieGrid";
import { setTotalResults, firstCharged } from "../store/store";
import Search from "../components/Search";

class Detail extends React.Component {
  static async getInitialProps({ query }) {
    const { id } = query;
    const req = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=33936251`);
    return { movie: await req.json() };
  }

  render() {
    const { movie } = this.props;
    return (
      <Layout title={movie.Title}>
        <h1>{movie.Title}</h1>
      </Layout>
    );
  }
}

export default Detail;
