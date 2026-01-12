import React, { useEffect, useRef } from 'react';

// Synaptic Network Background
// Creates a neural network / constellation effect with connecting lines
// Optimized for dark mode (slate/blue themes)

export const SynapticBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
                ctx.fillStyle = `rgba(148, 163, 184, ${0.5 + Math.random() * 0.2})`;
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
                        ctx.strokeStyle = `rgba(100, 149, 237, ${opacity})`;
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
            // Re-init particles on resize to avoid gaps? 
            // Optional, but might be nice. For now, just let them persist.
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {/* Base Dark Layer */}
            <div className="fixed inset-0 z-[-2] bg-[#0F172A]" />

            {/* Bioconversion Image Layer (Blurred) */}
            <div
                className="fixed inset-0 z-[-1] opacity-20 bg-cover bg-center pointer-events-none"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000")', // Forest/Organic Texture
                    filter: 'blur(40px)'
                }}
            />

            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
            />
        </>
    );
};
