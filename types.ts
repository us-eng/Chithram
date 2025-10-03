import React from 'react';

export interface Product {
  name: string;
  vibe: string;
  image: string;
  icon: React.ReactNode;
  category: 'video' | 'digital' | 'physical' | 'generative';
  mechanic: string;
  features: string;
  delivery: string;
  idealFor: string;
}

export interface Feature {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface MarketData {
  name: string;
  value: number;
}

export interface SlideContent {
  id: string;
  name: string;
}
