import React from 'react';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Mystical Santa!</h1>
            <p>Your journey to the magical world begins here.</p>
            <button onClick={() => alert('Let the adventure begin!')}>Start Adventure</button>
        </div>
    );
};

export default Home;