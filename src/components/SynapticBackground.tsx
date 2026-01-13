import React, { useEffect, useRef } from 'react';

// Synaptic Network Background
// Creates a neural network / constellation effect with connecting lines
// Optimized for dark mode (slate/blue themes)

// Curated images for Bioconversion, Organic Waste, and BSF themes
const BG_IMAGES = [
    'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&q=80&w=2000', // Compost/Soil
    'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&q=80&w=2000', // Organic Produce/Waste
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000', // Nature/Cycle (Original)
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=2000', // Sprouting/Regeneration
    'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=2000', // Organic Texture
    'https://images.unsplash.com/photo-1581093450065-081e74f67160?auto=format&fit=crop&q=80&w=2000', // Lab/Biotech
    'https://images.unsplash.com/photo-1504411139708-25f0a28f8045?auto=format&fit=crop&q=80&w=2000', // Food Waste
    'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?auto=format&fit=crop&q=80&w=2000', // Sustainable Agriculture
    'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=2000', // Farming/Soil
    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=2000', // Hands in Soil
];

export const SynapticBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentBgIndex, setCurrentBgIndex] = React.useState(0);

    // Rotate background every 15 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBgIndex(prev => (prev + 1) % BG_IMAGES.length);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
        }

        const particles: Particle[] = [];
        // Density: 1 particle per 15000 pixels roughly
        const particleCount = Math.floor((width * height) / 12000);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5
            });
        }

        let animationFrameId: number;

        const render = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(167, 243, 208, ${0.5 + Math.random() * 0.2})`; // Emerald 200 light
                ctx.fill();
            });

            // Draw Connections (Synapses)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);

                        // Very subtle opacity for "tenue" effect
                        const opacity = Math.max(0.01, 0.2 - (distance / 150) * 0.2);
                        // Emerald 400 for MetaBioconversion theme
                        ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Base Dark Green Layer - MetaBioconversion Theme */}
            <div className="fixed inset-0 z-[-2] bg-[#022c22]" />

            {/* Bioconversion Image Layer (Rotator) */}
            {BG_IMAGES.map((img, index) => (
                <div
                    key={img}
                    className={`fixed inset-0 z-[-1] bg-cover bg-center pointer-events-none mix-blend-overlay transition-opacity duration-[2000ms] ease-in-out ${index === currentBgIndex ? 'opacity-40' : 'opacity-0'}`}
                    style={{
                        backgroundImage: `url("${img}")`,
                        filter: 'blur(2px) contrast(1.2)'
                    }}
                />
            ))}

            {/* Gradient Overlay for Depth */}
            <div className="fixed inset-0 z-[-1] bg-gradient-to-t from-[#022c22] via-transparent to-[#064e3b]/30 opacity-80" />

            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none opacity-60"
            />
        </div>
    );
};
