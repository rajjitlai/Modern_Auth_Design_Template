import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Hello {user ? user.username : ''}</h1>
            {user ? (
                <button>Logout</button>
            ) : (
                <>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Home;
