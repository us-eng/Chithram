import React from 'react';
import type { Product, Feature, MarketData, SlideContent } from './types';
import { CameraIcon, GiftIcon, GlobeAltIcon, SparklesIcon, VideoCameraIcon, PhotoIcon, ShareIcon, PaintBrushIcon, HeartIcon } from './components/IconComponents';

export const SLIDES: SlideContent[] = [
  { id: 'home', name: 'Home' },
  { id: 'problem', name: 'Problem' },
  { id: 'solution', name: 'Our Booths' },
  { id: 'features', name: 'Features' },
  { id: 'market', name: 'Market' },
  { id: 'demo', name: 'AI Demo' },
  { id: 'contact', name: 'Contact' },
];

export const PRODUCTS: Product[] = [
    {
        name: "360 Photobooth",
        category: "video",
        vibe: "High-energy, dynamic, slow-motion video content ready for Instagram and TikTok.",
        mechanic: "Guests stand on a platform while a rotating camera arm captures a 360-degree slow-motion video.",
        features: "360-degree rotation, adjustable speed (slow-mo/boomerang), custom video overlays (music, branding), remote control operation.",
        delivery: "HD Video file sent instantly via email/SMS.",
        idealFor: "Product Launches, High-end Weddings, Gala Dinners, Parties requiring maximum guest spectacle.",
        image: 'https://picsum.photos/seed/360photo/800/600',
        icon: <VideoCameraIcon className="w-8 h-8 text-white" />,
    },
    {
        name: "Digital Selfie (iPad)",
        category: "digital",
        vibe: "Flexible, sleek, and instantly gratifying—the ultimate social media content creator.",
        mechanic: "An elegant, portable photo booth using high-quality iPad technology for capturing content.",
        features: "Still Photos, Animated GIFs, Boomerang GIFs, color-changing LED ambient lighting, skin-smoothening filters, live online galleries.",
        delivery: "Digital files (JPEG, GIF) shared via QR code, SMS, or email.",
        idealFor: "Trade Shows, Retail Activations, Smaller Venues, or as a secondary content station.",
        image: 'https://picsum.photos/seed/digitalselfie/800/600',
        icon: <ShareIcon className="w-8 h-8 text-white" />,
    },
    {
        name: "AI Photobooth",
        category: "generative",
        vibe: "Hyper-personalized, artistic, and entirely unique content creation driven by text and visual prompts.",
        mechanic: "Uses advanced generative AI models to take a guest photo and transform their likeness into new artistic styles and contexts.",
        features: "AI-based image generation, style transfer (painting, sketch), avatar creation, customized themes, real-time digital enhancement.",
        delivery: "High-resolution, artistic image file, shared via email/QR code.",
        idealFor: "Forward-thinking Tech Events, Art Galas, Luxury Brand Experiences, Events focused on innovation.",
        image: 'https://picsum.photos/seed/aibooth/800/600',
        icon: <SparklesIcon className="w-8 h-8 text-white" />,
    },
    {
        name: "Magic Mirror",
        category: "digital",
        vibe: "Elegant, theatrical, and highly interactive. The photo booth is disguised as a stylish, full-length mirror.",
        mechanic: "A full-length mirror provides visual guidance via animations and voice prompts while a hidden DSLR captures the photo.",
        features: "Interactive touchscreen, customizable animations, voice guidance, digital photo signing, emoji stamping, social sharing.",
        delivery: "Instant physical prints (strip or 4x6) and digital sharing.",
        idealFor: "Weddings, Fashion Events, Formal Corporate Galas.",
        image: 'https://picsum.photos/seed/magicmirror/800/600',
        icon: <ShareIcon className="w-8 h-8 text-white" />,
    },
    {
        name: "Classic Photobooth",
        category: "physical",
        vibe: "Intimate, nostalgic, and providing a classic physical keepsake.",
        mechanic: "Traditional, enclosed booth providing privacy for intimate and playful poses.",
        features: "Classic black and white or color options, instant physical photo strips, iconic design.",
        delivery: "Physical photo strips (often two copies per session).",
        idealFor: "Retro Themes, Weddings, Any event where a physical, lasting souvenir is prioritized.",
        image: 'https://picsum.photos/seed/classicbooth/800/600',
        icon: <PhotoIcon className="w-8 h-8 text-white" />,
    },
    {
        name: "AR Booth",
        category: "digital",
        vibe: "Blending the real and virtual worlds to create imaginative, fantastical photos and videos.",
        mechanic: "Integrates digital 3D props, masks, characters, and environments that interact with the user's movements in real-time.",
        features: "Real-time face tracking, virtual prop placement, themed digital backgrounds, motion-activated effects.",
        delivery: "Branded photos/videos with digital overlays, shared instantly.",
        idealFor: "Tech Conferences, Comic-Cons, Themed Parties, Gaming Activations.",
        image: 'https://picsum.photos/seed/arbooth/800/600',
        icon: <ShareIcon className="w-8 h-8 text-white" />,
    },
    {
        name: "Mosaic Wall",
        category: "physical",
        vibe: "Turning individual moments into one grand, collaborative piece of art.",
        mechanic: "Guest photos are instantly printed and placed onto a board to form a much larger, pre-designed mosaic image.",
        features: "Real-time photo curation, creation of a massive final image, available in physical (stickers) or digital formats.",
        delivery: "Physical prints placed on a wall; final digital mosaic image.",
        idealFor: "Long-duration Events, Team Building, Large-scale Corporate Anniversaries, Community Events.",
        image: 'https://picsum.photos/seed/mosaicwall/800/600',
        icon: <PhotoIcon className="w-8 h-8 text-white" />,
    },
    {
        name: "Boomerang Booth",
        category: "video",
        vibe: "Simple, fast, and purpose-built for creating instantly viral social media loops.",
        mechanic: "Optimized to capture short bursts of photos and instantly stitch them into a seamless, back-and-forth looping video.",
        features: "High frame rate capture, rapid processing, strong focus on instant social media sharing (SMS, Airdrop).",
        delivery: "Looping video file (often a GIF or MP4).",
        idealFor: "Casual Events, Music Festivals, University Events, Quick Brand Activations.",
        image: 'https://picsum.photos/seed/boomerang/800/600',
        icon: <VideoCameraIcon className="w-8 h-8 text-white" />,
    },
    {
        name: "180 Photobooth",
        category: "video",
        vibe: "Creating a cinematic, 'Matrix-style' bullet-time effect or a panoramic video clip.",
        mechanic: "Uses multiple cameras in a semi-circle to capture simultaneous images, stitched into a single, moving sequence.",
        features: "Specialty video capture, frozen motion effect, unique perspective.",
        delivery: "Short, high-impact video clip (often MP4 or GIF).",
        idealFor: "High-concept Brand Activations, Movie Premières, Events focusing on technical innovation.",
        image: 'https://picsum.photos/seed/180booth/800/600',
        icon: <VideoCameraIcon className="w-8 h-8 text-white" />,
    },
];

export const FEATURES: Feature[] = [
  {
    name: 'Instant Digital Sharing',
    description: 'Guests receive photos, GIFs, and videos instantly via email or QR code.',
    icon: <ShareIcon className="w-10 h-10 mx-auto text-white" />,
  },
  {
    name: 'AI Backgrounds',
    description: 'Generate unique backdrops on the fly with our integrated AI technology.',
    icon: <SparklesIcon className="w-10 h-10 mx-auto text-white" />,
  },
  {
    name: 'Custom Branding',
    description: 'Fully customizable interfaces, overlays, and prints to match your event theme.',
    icon: <PaintBrushIcon className="w-10 h-10 mx-auto text-white" />,
  },
  {
    name: 'High-Quality Prints',
    description: 'Lab-quality, smudge-proof prints available in seconds for a tangible memory.',
    icon: <PhotoIcon className="w-10 h-10 mx-auto text-white" />,
  },
  {
    name: 'Live Online Gallery',
    description: 'A real-time gallery of all captures, accessible to all guests during and after the event.',
    icon: <GlobeAltIcon className="w-10 h-10 mx-auto text-white" />,
  },
  {
    name: 'Premium Props & Support',
    description: 'A curated collection of props and a dedicated on-site attendant to ensure everything runs smoothly.',
    icon: <HeartIcon className="w-10 h-10 mx-auto text-white" />,
  },
];

export const MARKET_DATA: MarketData[] = [
    { name: 'Weddings', value: 450 },
    { name: 'Corporate Events', value: 300 },
    { name: 'Private Parties', value: 200 },
    { name: 'Brand Activations', value: 250 },
    { name: 'Festivals', value: 150 },
];

export const COMPANY_NAME = "The Chithram Company";