import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to My Notes Website</h1>
      <Link to="/notes">Go to Notes</Link>
    </div>
  );
}

export default Home;
