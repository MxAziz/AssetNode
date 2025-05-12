import React from 'react';
import About from './About';
import Banner from './Banner';
import Packages from './Packages';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>AssetNode.</title>
            </Helmet>
            <Banner></Banner>
            <About></About>
            <Packages></Packages>
        </div>
    );
};

export default Home;