import React from 'react';
import Hero from '../components/Hero';
import ProjectGrid from '../components/ProjectGrid';
import About from '../components/About';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <div id="object-detection"></div>
      <div id="nlp"></div>
      <div id="web-dev"></div>
      <ProjectGrid />
      <About />
    </main>
  );
};

export default Home;
