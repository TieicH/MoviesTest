import { connect } from "react-redux";
import { clickButton } from "../store/store";

class Example extends React.Component {
  clickButton = () => {
    const { dispatch } = this.props;
    dispatch(clickButton());
  };

  componentDidMount() {}

  render() {
    const { count } = this.props;
    return (
      <div>
        <h1>
          Count: <span>{count}</span>
        </h1>
        <button onClick={this.clickButton}>+1</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { count } = state;
  return { count };
}

export default connect(mapStateToProps)(Example);
