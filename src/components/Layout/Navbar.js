import React from "react";

function Navbar() {
    return (
        <nav className="navbar navbar-light bg-success">
            <div className="container">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-dark d-flex align-items-center" type="submit">
                        <i className="fa fa-search me-2"></i>
                        Search
                    </button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar;