import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <main>
                <h2>Página Home</h2>
            </main>
            <nav>
                <Link to="/about">About</Link>
            </nav>
        </>
    );
}
export default Home;