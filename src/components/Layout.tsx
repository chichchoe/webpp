import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>
            <Link to="" className="topnav active">
                Invoices
            </Link>
            <Link to="Narwhal" className="topnav">
                Dashboard
            </Link>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}
