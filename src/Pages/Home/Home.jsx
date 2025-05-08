import React from 'react';
import About from './About';
import Banner from './Banner';
import Packages from './Packages';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Packages></Packages>
        </div>
    );
};

export default Home;