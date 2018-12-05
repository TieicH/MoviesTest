import Head from "next/head";
import Link from "next/link";

class Layout extends React.Component {
  render() {
    const { children, title } = this.props;
    return (
      <div className="mainContainer">
        <Head>
          <title>{title}</title>
        </Head>
        <header>
          <Link href="/">
            <a className="linkHeader">Movies</a>
          </Link>
        </header>
        {children}
        <style global jsx>
          {`
            body {
              padding: 0 !important;
              margin: 0 !important;
              font-family: system-ui;
            }
            header {
              width: 100%;
              background: #8e54e9;
              color: #fff;
              padding: 15px 0;
              text-align: center;
              font-size: 30px;
            }
            .linkHeader {
              color: #fff;
              text-decoration: none;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Layout;
