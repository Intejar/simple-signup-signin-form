import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className=''>
            <nav className='d-flex justify-content-center'>
                <Link to='/register'>Signup</Link>
                <Link to='/login'>Login</Link>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;