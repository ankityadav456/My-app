// HomePage.js
import React from 'react';
import Dashboard from './Body';

function Home({ logout }) {
  return (
    <div>
        <div className="container mx-auto p-8">
          {/* <h2 className="text-3xl font-bold mb-6">Welcome to the Home Page</h2> */}
          <Dashboard />
      </div>
    </div>
  );
}

export default Home;
