import React from "react";
import "./time_selector.css";

const BaseTimeFormats = {
    t3: "3-0-3-0",
    t5: "5-0-5-0",
    t10: "10-0-10-0",
};

class TimeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.changeCallback = props.callback;
    }

    drawOptionSelector() {
        let selected = 3;
        let cur = this.props.clock;
        if (cur === BaseTimeFormats.t3) selected = 0;
        else if (cur === BaseTimeFormats.t5) selected = 1;
        else if (cur === BaseTimeFormats.t10) selected = 2;
        return (
            <div>
                <button
                    onClick={() => {
                        this.changeCallback(BaseTimeFormats.t3);
                    }}
                    className={"oSel" + selected}
                >
                    3'
                </button>
                <button
                    onClick={() => {
                        this.changeCallback(BaseTimeFormats.t5);
                    }}
                    className={"oSel" + (1 - selected)}
                >
                    5'
                </button>
                <button
                    onClick={() => {
                        this.changeCallback(BaseTimeFormats.t10);
                    }}
                    className={"oSel" + (2 - selected)}
                >
                    10'
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
        return <div id="TimeSelector">{this.drawOptionSelector()}</div>;
    }
}

export default TimeSelector;
