"use client"
import React, { useEffect } from 'react'

export default function InteractiveCursorProvider({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId = null;
    let currentX = -500;
    let currentY = -500;
    let targetX = -500;
    let targetY = -500;

    const root = document.documentElement;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
      }

      // Only apply 3D tilt on desktop (mouse pointer), skip on mobile touch screens to prevent overflow
      if (window.innerWidth >= 768 && !window.matchMedia('(pointer: coarse)').matches) {
        const target = e.target.closest('[data-cursor-3d], .btn-3d-interactive, .card-3d-interactive');
        if (target && !target.hasAttribute('data-no-tilt')) {
          handleElementTilt(e, target);
        }
      }
    };

    const updateCursor = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      root.style.setProperty('--mouse-x', `${currentX.toFixed(1)}px`);
      root.style.setProperty('--mouse-y', `${currentY.toFixed(1)}px`);

      const normX = ((currentX / window.innerWidth) - 0.5) * 2;
      const normY = ((currentY / window.innerHeight) - 0.5) * 2;
      root.style.setProperty('--norm-x', normX.toFixed(3));
      root.style.setProperty('--norm-y', normY.toFixed(3));

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(updateCursor);
      } else {
        rafId = null;
      }
    };

    const handleElementTilt = (e, el) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const isBtn = el.classList.contains('btn-3d-interactive') || el.tagName.toLowerCase() === 'button';
      const maxTilt = parseFloat(el.getAttribute('data-tilt-deg')) || (isBtn ? 10 : 7);
      const scale = parseFloat(el.getAttribute('data-tilt-scale')) || (isBtn ? 1.03 : 1.015);

      const rx = ((y - cy) / cy) * -maxTilt;
      const ry = ((x - cx) / cx) * maxTilt;

      el.style.transform = `perspective(650px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
      el.style.setProperty('--sheen-x', `${((x / rect.width) * 100).toFixed(1)}%`);
      el.style.setProperty('--sheen-y', `${((y / rect.height) * 100).toFixed(1)}%`);
    };

    const onPointerOut = (e) => {
      const target = e.target.closest('[data-cursor-3d], .btn-3d-interactive, .card-3d-interactive');
      if (target) {
        // If cursor moves into a child element within the same target, do not reset
        if (e.relatedTarget && target.contains(e.relatedTarget)) {
          return;
        }
        target.style.transform = 'perspective(650px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Global Ambient Cursor Reactive Glow for the entire web application */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 opacity-60 will-change-transform"
        style={{
          background: `radial-gradient(750px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255, 66, 77, 0.07), rgba(245, 158, 11, 0.035) 45%, transparent 75%)`
        }}
      />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </>
  );
}
