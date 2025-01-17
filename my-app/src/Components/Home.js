// HomePage.js
import React from 'react';
import Dashboard from './Body';

function Home({ logout }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex flex-between">
          <a className="navbar-brand" href="/">Home</a>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Logout
          </button>
          <button className="navbar-toggler btn size" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
        <div className="container mx-auto p-8">
          <h2 className="text-3xl font-bold mb-6">Welcome to the Home Page</h2>
          <Dashboard />
      </div>
    </div>
  );
}

export default Home;
