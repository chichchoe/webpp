import React from 'react';

export default function Narwhal() {
    const logout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };
    return (
        <>
            <main>
                <h2>Who are we?</h2>
                <p>That feels like an existential question, don't you think?</p>
            </main>
            <nav>
                <button id="logout" onClick={logout}>
                    logout
                </button>
            </nav>
        </>
    );
}
