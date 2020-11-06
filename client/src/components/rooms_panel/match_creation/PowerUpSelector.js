import React from "react";
import "./PowerUpSelector.css";

class PowerUpSelector extends React.Component {
    constructor(props) {
        super(props);
        this.changeCallback = props.callback;
        this.powerUps = props.options;
        this.changeNPUps = this.changeNPUps.bind(this);
        this.DrawNumPups = this.DrawNumPups.bind(this);
    }

    changeNPUps(newPowerUpAmt) {
        if (newPowerUpAmt.target.value === "") this.powerUps.powerAmt = 0;
        else this.powerUps.powerAmt = Number(newPowerUpAmt.target.value);
        this.changeCallback(this.powerUps);
    }

    DrawNumPups() {
        let val = this.powerUps.powerAmt;
        return (
            <label>
                # of Pups
                <input
                    id="numPowerUps"
                    value={val ? val : ""}
                    onChange={this.changeNPUps}
                    maxLength="1"
                />
            </label>
        );
    }

    DrawMultiBoardCheckbox() {
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
                {this.DrawNumPups()}
                {this.DrawMultiBoardCheckbox()}
            </div>
        );
    }
}

export default PowerUpSelector;
