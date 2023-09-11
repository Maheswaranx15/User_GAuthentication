import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return ( 
        <div>
            <h2>Home page</h2>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Signup</button>
            </Link>
        </div>
    );
}

export default Home;
