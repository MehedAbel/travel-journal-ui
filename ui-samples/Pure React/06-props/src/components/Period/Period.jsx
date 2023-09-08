import React, { Component } from "react";

import './Period.css'

class Period extends Component {
    render() {
        return (
            <div className="period">
                <div className="from-period">
                    <p>From: </p><span>{this.props.startDate}</span>
                </div>
                <div  className="to-period">
                    <p>To:</p> <span>{this.props.endDate}</span>
                </div>
            </div>
        )
    }
}

export default Period;