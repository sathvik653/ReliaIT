
import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Industries } from '../components/Industries';
import { About } from '../components/About';
import { Stats } from '../components/Stats';
import { Contact } from '../components/Contact';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Industries />
      <Stats />
      <About />
      <Contact />
    </>
  );
};
