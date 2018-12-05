import React from "react";
import Layout from "../components/Layout";
import DetailGrid from "../components/DetailGrid";

class Detail extends React.Component {
  static async getInitialProps({ query }) {
    const { id } = query;
    const req = await fetch(
      `http://www.omdbapi.com/?i=${id}&plot=full&apikey=33936251`
    );
    return { movie: await req.json() };
  }

  render() {
    const { movie } = this.props;
    return (
      <Layout title={movie.Title}>
        <DetailGrid movie={movie} />
      </Layout>
    );
  }
}

export default Detail;
