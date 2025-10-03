import React, { useState, useRef, createRef, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Product, Feature } from './types';
import { SLIDES, PRODUCTS, FEATURES, MARKET_DATA, COMPANY_NAME } from './constants';
import { generateBackdropIdea, generateBackdropImage } from './services/geminiService';
import Navbar from './components/Navbar';
import { ArrowDownIcon, SparklesIcon } from './components/IconComponents';
import { useOnScreen } from './hooks/useOnScreen';

const Section: React.FC<{ children: React.ReactNode; id: string; className?: string, ref?: React.Ref<HTMLDivElement> }> = React.forwardRef<HTMLDivElement, { children: React.ReactNode; id: string; className?: string }>(({ children, id, className = '' }, ref) => (
  <section ref={ref} id={id} className={`min-h-screen w-full flex flex-col justify-center items-center p-8 md:p-16 ${className}`}>
    <div className="max-w-7xl mx-auto w-full">
      {children}
    </div>
  </section>
));

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('home');
    const [activeFilter, setActiveFilter] = useState('all');

    const sectionRefs = useRef(SLIDES.map(() => createRef<HTMLDivElement>()));

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionRefs.current.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            sectionRefs.current.forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);

    const [theme, setTheme] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [backdropIdea, setBackdropIdea] = useState<string | null>(null);
    const [backdropImage, setBackdropImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!theme.trim()) {
            setError('Please enter an event theme.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setBackdropIdea(null);
        setBackdropImage(null);

        try {
            const idea = await generateBackdropIdea(theme);
            setBackdropIdea(idea);
            const image = await generateBackdropImage(idea);
            setBackdropImage(`data:image/jpeg;base64,${image}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const AnimateOnVisible: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
        const ref = useRef<HTMLDivElement>(null);
        const onScreen = useOnScreen(ref, '-100px');
        return (
            <div ref={ref} className={`${className || ''} ${onScreen ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`} style={{ animationFillMode: 'forwards' }}>
                {children}
            </div>
        );
    };

    const boothCategories = ['all', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
    const filteredProducts = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeFilter);


    return (
        <div className="bg-black text-white font-sans antialiased">
            <Navbar slides={SLIDES} scrollToSection={scrollToSection} activeSection={activeSection} />
            <main>
                <Section id="home" ref={sectionRefs.current[0]} className="!min-h-screen relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src="https://picsum.photos/seed/hero/1920/1080" alt="Joyful event" className="w-full h-full object-cover opacity-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    </div>
                    <div className="relative z-10 text-center">
                        <AnimateOnVisible>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 text-white">
                                {COMPANY_NAME}
                            </h1>
                        </AnimateOnVisible>
                        <AnimateOnVisible className="[animation-delay:200ms]">
                            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
                                Capture Moments. Create Memories. Elevate Your Events.
                            </p>
                        </AnimateOnVisible>
                        <AnimateOnVisible className="[animation-delay:400ms]">
                            <button onClick={() => scrollToSection('problem')} className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
                                Explore Our Vision
                            </button>
                        </AnimateOnVisible>
                    </div>
                    <div
                        onClick={() => scrollToSection('problem')}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-gray-400 animate-bounce">
                        <ArrowDownIcon className="w-8 h-8"/>
                    </div>
                </Section>
                
                <Section id="problem" ref={sectionRefs.current[1]}>
                    <AnimateOnVisible className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Events are Fleeting.</h2>
                        <p className="text-2xl md:text-3xl text-gray-300 mb-12">Memories Shouldn't Be.</p>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-white">Boring Photos</h3>
                                <p className="text-gray-400">Standard event photography often feels staged and lacks the genuine fun of the moment.</p>
                            </div>
                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-white">Low Engagement</h3>
                                <p className="text-gray-400">Guests take a quick photo and move on. There's no lasting interaction or shareable experience.</p>
                            </div>
                            <div className="bg-gray-900 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-white">Lost Memories</h3>
                                <p className="text-gray-400">Digital photos get lost in camera rolls, and physical prints are rare. The magic of the event fades.</p>
                            </div>
                        </div>
                    </AnimateOnVisible>
                </Section>

                <Section id="solution" ref={sectionRefs.current[2]}>
                    <AnimateOnVisible className="text-center">
                         <h2 className="text-4xl md:text-5xl font-bold mb-4">The Next Generation of Photo Experiences</h2>
                        <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">Explore our curated collection of modern photo booth solutions designed to maximize guest interaction, social sharing, and brand visibility.</p>
                    </AnimateOnVisible>
                    
                     <AnimateOnVisible className="[animation-delay:200ms] flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
                        {boothCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`capitalize py-2 px-5 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
                                    activeFilter === category
                                        ? 'bg-white text-black shadow-lg'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </AnimateOnVisible>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product: Product, index) => (
                            <AnimateOnVisible key={product.name} className={`[animation-delay:${index*100}ms]`}>
                                <div className="bg-gray-900 rounded-xl overflow-hidden group transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 flex flex-col h-full">
                                    <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center space-x-3 mb-2">
                                            {product.icon}
                                            <h3 className="text-2xl font-bold">{product.name}</h3>
                                        </div>
                                        <p className="italic text-gray-400 mb-4 text-sm">{product.vibe}</p>
                                        <div className="space-y-3 text-sm text-gray-400 flex-grow">
                                            <p><strong className="font-semibold text-gray-200">Features:</strong> {product.features}</p>
                                            <p><strong className="font-semibold text-gray-200">Ideal For:</strong> {product.idealFor}</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimateOnVisible>
                        ))}
                    </div>
                </Section>

                <Section id="features" ref={sectionRefs.current[3]}>
                     <AnimateOnVisible className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Packed with Features</h2>
                        <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">Technology that creates smiles, sparks creativity, and amplifies the fun.</p>
                    </AnimateOnVisible>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {FEATURES.map((feature: Feature, index) => (
                            <AnimateOnVisible key={feature.name} className={`[animation-delay:${index*100}ms] text-center bg-gray-900 p-6 rounded-lg`}>
                                {feature.icon}
                                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.name}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </AnimateOnVisible>
                        ))}
                    </div>
                </Section>

                 <Section id="market" ref={sectionRefs.current[4]}>
                    <AnimateOnVisible className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">A Booming Market</h2>
                        <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">The demand for unique event experiences is at an all-time high across multiple sectors.</p>
                    </AnimateOnVisible>
                    <AnimateOnVisible className="h-96 w-full [animation-delay:200ms]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MARKET_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" label={{ value: 'Market Size ($M)', angle: -90, position: 'insideLeft', fill: '#d1d5db' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                                <Legend wrapperStyle={{ color: '#d1d5db' }}/>
                                <Bar dataKey="value" fill="#ffffff" name="Est. Annual Spend ($M)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </AnimateOnVisible>
                </Section>
                
                <Section id="demo" ref={sectionRefs.current[5]}>
                    <div className="text-center">
                        <AnimateOnVisible>
                            <SparklesIcon className="w-16 h-16 mx-auto text-white" />
                            <h2 className="text-4xl md:text-5xl font-bold my-4">Dream Up Your Perfect Backdrop</h2>
                            <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-8">Describe your event theme and let our AI bring your vision to life. Try "enchanted forest wedding" or "80s retro arcade party".</p>
                        </AnimateOnVisible>

                        <AnimateOnVisible className="[animation-delay:200ms] max-w-2xl mx-auto">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    placeholder="Enter your event theme..."
                                    className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white transition duration-300"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleGenerate}
                                    className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center disabled:bg-gray-500 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating...
                                        </>
                                    ) : 'Generate with AI'}
                                </button>
                            </div>
                            {error && <p className="text-gray-300 mt-4">{error}</p>}
                        </AnimateOnVisible>
                        
                        {(isLoading || backdropIdea || backdropImage) && (
                            <div className="mt-12 max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center text-left">
                                <div className={`transition-opacity duration-1000 ${backdropImage ? 'opacity-100' : 'opacity-0'}`}>
                                    {isLoading && !backdropImage && (
                                         <div className="w-full aspect-[4/3] bg-gray-800 rounded-lg flex items-center justify-center animate-subtle-pulse">
                                             <p className="text-gray-400">Generating image...</p>
                                         </div>
                                    )}
                                    {backdropImage && <img src={backdropImage} alt="AI generated backdrop" className="rounded-lg shadow-2xl w-full aspect-[4/3] object-cover" />}
                                </div>
                                <div className={`transition-opacity duration-700 ${backdropIdea ? 'opacity-100' : 'opacity-0'}`}>
                                    {isLoading && !backdropIdea && <p className="text-gray-400">Generating idea...</p>}
                                    {backdropIdea && (
                                        <>
                                            <h3 className="text-2xl font-bold mb-2 text-white">Your AI-Powered Backdrop</h3>
                                            <p className="text-gray-300">{backdropIdea}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </Section>
                
                <Section id="contact" ref={sectionRefs.current[6]} className="bg-gray-900">
                    <AnimateOnVisible className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Create Together</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">Ready to make your next event unforgettable? Reach out to us for a personalized quote and consultation.</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                           <a href="mailto:hello@chithram.co" className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
                                Get a Quote
                            </a>
                            <p className="text-lg text-gray-400">or email us at <span className="text-white font-semibold">hello@chithram.co</span></p>
                        </div>
                    </AnimateOnVisible>
                </Section>
            </main>
            <footer className="bg-black text-center p-6 border-t border-gray-900">
                <p className="text-gray-500">&copy; {new Date().getFullYear()} {COMPANY_NAME}. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default App;