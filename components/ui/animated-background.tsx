"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface Beam {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    opacity: number;
    direction: number;
}

function createBeam(width: number, height: number): Beam {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        width: 2 + Math.random() * 3,
        height: 100 + Math.random() * 200,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.03 + Math.random() * 0.07,
        direction: Math.random() > 0.5 ? 1 : -1,
    };
}

export function AnimatedBackground({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let beams: Beam[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            beams = Array.from({ length: 12 }, () =>
                createBeam(canvas.width, canvas.height),
            );
        };

        resize();
        window.addEventListener("resize", resize);

        const isDark = () =>
            document.documentElement.classList.contains("dark");

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            beams.forEach((beam) => {
                const gradient = ctx.createLinearGradient(
                    beam.x,
                    beam.y,
                    beam.x,
                    beam.y + beam.height,
                );

                const color = isDark()
                    ? `rgba(255,255,255,${beam.opacity})`
                    : `rgba(0,0,0,${beam.opacity})`;

                gradient.addColorStop(0, "transparent");
                gradient.addColorStop(0.5, color);
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.fillRect(beam.x, beam.y, beam.width, beam.height);

                beam.y += beam.speed * beam.direction;

                if (beam.y > canvas.height + beam.height) beam.y = -beam.height;
                if (beam.y < -beam.height * 2)
                    beam.y = canvas.height + beam.height;
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={cn("fixed inset-0 pointer-events-none z-0", className)}
        />
    );
}
