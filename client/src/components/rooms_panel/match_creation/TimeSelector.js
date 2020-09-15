import React from "react";
import "./TimeSelector.css";

class TimeSelector extends React.Component {
  state = {};

  componentDidMount() {
    this.setState({ selected: 0 });
  }

  drawOptionSelector() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ selected: 0 });
          }}
          className={"oSel" + this.state.selected}
        >
          3'
        </button>
        <button
          onClick={() => {
            this.setState({ selected: 1 });
          }}
          className={"oSel" + (1 - this.state.selected)}
        >
          5'
        </button>
        <button
          onClick={() => {
            this.setState({ selected: 2 });
          }}
          className={"oSel" + (2 - this.state.selected)}
        >
          10'
        </button>
        <button
          onClick={() => {
            this.setState({ selected: 3 });
          }}
          className={"oSel" + (3 - this.state.selected)}
        >
          CUSTOM
        </button>
      </div>
    );
  }

  render() {
    return <div id="TimeSelector">{this.drawOptionSelector()}</div>;
  }
}

export default TimeSelector;
