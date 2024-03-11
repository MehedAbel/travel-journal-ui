import { Outlet } from "react-router-dom";

import "./index.css";

const Content = () => {
    return (
        <div id="content">
            <Outlet />
        </div>
    );
}

export default Content;