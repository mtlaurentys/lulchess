import React from "react";
import "./PowerUpSelector.css";

class PowerUpSelector extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({ numPowerUps: "3" });
    this.changeNPUps = this.changeNPUps.bind(this);
  }

  changeNPUps(e) {
    if (e.target.value === "") this.setState({ numPowerUps: "" });
    else if ("0" <= e.target.value && e.target.value <= "9")
      this.setState({ numPowerUps: e.target.value });
  }

  drawNumPups() {
    return (
      <label>
        # of Pups
        <input
          id="numPowerUps"
          value={this.state.numPowerUps}
          onChange={this.changeNPUps}
          maxLength="1"
        />
      </label>
    );
  }

  drawMultiBoardCheckbox() {
    return (
      <label>
        Multiboard
        <input type="checkbox" id="multiboard" />
      </label>
    );
  }

  render() {
    return (
      <div id="PowerUpSelector">
        {this.drawNumPups()}
        {this.drawMultiBoardCheckbox()}
      </div>
    );
  }
}

export default PowerUpSelector;
