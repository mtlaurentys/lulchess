import React from "react";
import "./TeamSizeSelector.css";

const BaseTeamSizes = {
  m1v1: "1-1",
  m2v2: "2-2",
  m3v3: "3-3",
};

class TeamSizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.changeCallback = props.callback;
  }

  drawOptionSelector() {
    let selected = 3;
    let cur = this.props.teams;
    if (cur === BaseTeamSizes.m1v1) selected = 0;
    else if (cur === BaseTeamSizes.m2v2) selected = 1;
    else if (cur === BaseTeamSizes.m3v3) selected = 2;
    return (
      <div>
        <button
          onClick={() => {
            this.changeCallback(BaseTeamSizes.m1v1);
          }}
          className={"oSel" + selected}
        >
          1v1
        </button>
        <button
          onClick={() => {
            this.changeCallback(BaseTeamSizes.m2v2);
          }}
          className={"oSel" + (1 - selected)}
        >
          2v2
        </button>
        <button
          onClick={() => {
            this.changeCallback(BaseTeamSizes.m3v3);
          }}
          className={"oSel" + (2 - selected)}
        >
          3v3
        </button>
        <button
          onClick={() => {
            this.setState({ selected: 3 });
          }}
          className={"oSel" + (3 - selected)}
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
