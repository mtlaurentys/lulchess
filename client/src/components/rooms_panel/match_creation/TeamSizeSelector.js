import React from "react";
import "./TeamSizeSelector.css";

export const option_selected = {
  m1v1: 0,
  m2v2: 1,
  m3v3: 2,
  custom: 3,
};

export const re = "/^[0-9\b]$/";

class TeamSizeSelector extends React.Component {
  state = {};

  componentDidMount() {
    this.setState({ selected: option_selected.m1v1 });
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
          1v1
        </button>
        <button
          onClick={() => {
            this.setState({ selected: 1 });
          }}
          className={"oSel" + (1 - this.state.selected)}
        >
          2v2
        </button>
        <button
          onClick={() => {
            this.setState({ selected: 2 });
          }}
          className={"oSel" + (2 - this.state.selected)}
        >
          3v3
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
    return (
      <div>
        <div id="numPlayerSelector">{this.drawOptionSelector()}</div>
      </div>
    );
  }
}

export default TeamSizeSelector;
