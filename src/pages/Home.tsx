import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectGrid from '../components/ProjectGrid';

const Home: React.FC = () => (
  <main>
    {/* 1. Hero — full-screen intro with photo + CTAs */}
    <Hero />
    {/* 2. About — who you are, skills, CV download */}
    <About />
    {/* Anchor targets for navbar category links */}
    <div id="cv" />
    <div id="nlp" />
    <div id="web" />
    {/* 3. Projects — filterable grid */}
    <ProjectGrid />
  </main>
);

export default Home;
