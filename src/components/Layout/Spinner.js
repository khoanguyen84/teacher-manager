import React from "react";

function Spinner() {
    return (
        <div className="loading d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span>Loading...</span>
            </div>
        </div>

    )
}

export default Spinner;