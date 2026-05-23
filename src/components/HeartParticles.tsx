import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'heart' | 'sparkle';
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export const HeartParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const colors = [
      'rgba(230, 57, 70, 0.7)',  // deep pink/red
      'rgba(183, 110, 121, 0.6)', // rose gold
      'rgba(255, 182, 193, 0.5)', // soft pink
      'rgba(255, 255, 255, 0.4)',  // soft white
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      // Move to top center
      c.moveTo(x, y - size / 4);
      // Left curve
      c.bezierCurveTo(x - size / 2, y - size * 0.85, x - size, y - size / 3, x, y + size * 0.8);
      // Right curve
      c.bezierCurveTo(x + size, y - size / 3, x + size / 2, y - size * 0.85, x, y - size / 4);
      c.closePath();
      c.fill();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.lineTo(x + Math.cos((i * Math.PI) / 2) * size, y + Math.sin((i * Math.PI) / 2) * size);
        c.lineTo(x + Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size / 3), y + Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size / 3));
      }
      c.closePath();
      c.fill();
    };

    const createParticle = (): Particle => {
      const type = Math.random() > 0.4 ? 'sparkle' : 'heart';
      const size = type === 'heart' ? 6 + Math.random() * 12 : 3 + Math.random() * 5;
      
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20, // Spawn just below bottom
        size,
        speedY: -(0.5 + Math.random() * 1.5),
        speedX: -0.5 + Math.random() * 1.0,
        opacity: 0.1 + Math.random() * 0.6,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.02 + Math.random() * 0.04,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Randomly spawn particles
      if (particles.length < 80 && Math.random() < 0.1) {
        particles.push(createParticle());
      }

      particles.forEach((p, index) => {
        // Move particle
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.001; // Fade out slowly as they rise

        // Remove out-of-screen or faded particles
        if (p.y < -30 || p.opacity <= 0) {
          particles[index] = createParticle(); // Recycle particle
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color.replace(/[^,]+(?=\))/, p.opacity.toFixed(3));
        ctx.shadowBlur = p.type === 'heart' ? 6 : 4;
        ctx.shadowColor = p.color;

        if (p.type === 'heart') {
          drawHeart(ctx, 0, 0, p.size);
        } else {
          drawSparkle(ctx, 0, 0, p.size);
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 bg-transparent block"
    />
  );
};
