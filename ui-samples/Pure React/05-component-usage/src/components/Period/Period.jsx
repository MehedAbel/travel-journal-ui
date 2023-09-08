import React, { Component } from "react";

import './Period.css'

class Period extends Component {
    render() {
        return (
            <div className="period">
                <div className="from-period">
                    <p>From: </p><span>21.07.2023</span>
                </div>
                <div  className="to-period">
                    <p>To:</p> <span>01.08.2023</span>
                </div>
            </div>
        )
    }
}

export default Period;