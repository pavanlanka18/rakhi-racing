'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star, ChevronDown } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { PRODUCTS } from '@/lib/fixtures/products';
import { useEffect, useRef, useState } from 'react';

/* ─── Countdown to Raksha Bandhan ──────────────────────────────────────── */
function useCountdown(target: Date) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

/* ─── Animated Speed Lines ─────────────────────────────────────────────── */
function SpeedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-mauli-500/40 to-transparent"
          style={{
            top: `${8 + i * 6.5}%`,
            left: 0,
            right: 0,
          }}
          animate={{ opacity: [0, 0.7, 0], x: ['-100%', '100%'] }}
          transition={{
            duration: 2.2 + (i % 4) * 0.4,
            delay: i * 0.18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Floating Particles ────────────────────────────────────────────────── */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(22)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            left: `${5 + (i * 4.3) % 90}%`,
            top: `${10 + (i * 7.1) % 80}%`,
            background: i % 2 === 0 ? '#D4A24A' : '#C8341F',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + (i % 5) * 0.6,
            delay: i * 0.22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Marquee Strip ─────────────────────────────────────────────────────── */
function MarqueeStrip() {
  const items = [
    '🏎 Mercedes AMG F1 Rakhi',
    '⭐ Up to 65% Off',
    '🏆 Red Bull Racing Edition',
    '✦ Limited Stock',
    '🔥 Alpine F1 Chakra Edition',
    '🎁 Free Gift Box',
    '🚀 Williams Racing — Limited',
    '💎 9 Chakra Gemstones',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-mauli-500/20 bg-circuit-900/80 backdrop-blur py-2.5">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/60 flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Countdown Block ───────────────────────────────────────────────────── */
function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-14 h-14 rounded-lg bg-circuit-800 border border-mauli-500/30 flex items-center justify-center shadow-inner">
          <motion.span
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="font-display text-2xl font-bold text-mauli-400 leading-none"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
        <div className="absolute -inset-px rounded-lg border border-mauli-500/10 pointer-events-none" />
      </div>
      <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/40">{label}</span>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
const RAKSHA_BANDHAN = new Date('2026-08-29T00:00:00+05:30');

export function Hero() {
  const { add } = useCart();
  const flagship = PRODUCTS[0];
  const countdown = useCountdown(RAKSHA_BANDHAN);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="relative">
      {/* ── Marquee ── */}
      <MarqueeStrip />

      {/* ── Main Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-circuit-900">

        {/* Background Layers */}
        <div className="absolute inset-0 circuit-grid opacity-30 pointer-events-none"
          style={{ backgroundSize: '40px 40px' }} />
        <SpeedLines />
        <Particles />

        {/* Radial Glow — left */}
        <div className="absolute -left-60 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-mauli-500/8 blur-[120px] pointer-events-none" />
        {/* Radial Glow — right */}
        <div className="absolute -right-60 top-1/3 w-[600px] h-[600px] rounded-full bg-vermillion-500/8 blur-[100px] pointer-events-none" />
        {/* Top vignette */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-circuit-900 to-transparent pointer-events-none" />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-circuit-900 to-transparent pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* ── LEFT: Copy ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Pre-label */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-mauli-500/40 bg-mauli-500/10">
                <Zap className="w-3 h-3 text-mauli-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mauli-400">
                  Raksha Bandhan 2026 Collection
                </span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-mauli-500/40 to-transparent max-w-[80px]" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display leading-[0.9] tracking-tight text-balance"
            >
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-ivory uppercase">
                Hot Wheels.
              </span>
              <span className="block text-5xl sm:text-6xl xl:text-7xl uppercase mt-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mauli-400 via-mauli-500 to-vermillion-400">
                  Rakhi Thread.
                </span>
              </span>
              <span className="block text-5xl sm:text-6xl xl:text-7xl text-ivory/80 uppercase mt-1">
                One Gift.
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              variants={fadeUp}
              className="mt-7 text-base sm:text-lg text-ivory/60 font-body leading-relaxed max-w-lg"
            >
              Die-cast legends — F1 cars, Porsches, Land Rovers — with a{' '}
              <span className="text-mauli-400 font-medium">traditional rakhi thread</span>{' '}
              tied around the front wheel hub. The most unique Raksha Bandhan
              gift for the racing soul in your life.
            </motion.p>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-4">
              {[
                { icon: Star, text: 'Up to 65% OFF' },
                { icon: Shield, text: 'Gift Box Included' },
                { icon: Zap, text: 'Pre-bookings Open' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-ivory/50">
                  <Icon className="w-3.5 h-3.5 text-mauli-500" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-mauli-500 to-mauli-600 text-circuit-900 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:from-mauli-400 hover:to-mauli-500 transition-all duration-300 shadow-lg shadow-mauli-500/25 hover:shadow-mauli-500/40 hover:scale-[1.02]"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/919929931917"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl border border-circuit-600 bg-circuit-800/60 text-ivory font-mono text-xs uppercase tracking-[0.2em] hover:border-mauli-500/60 hover:bg-circuit-800 transition-all duration-300 hover:scale-[1.02] backdrop-blur"
              >
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Custom Order
              </a>
            </motion.div>

            {/* Countdown */}
            <motion.div variants={fadeUp} className="mt-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-ivory/35 mb-3">
                🪡 Raksha Bandhan countdown
              </p>
              <div className="flex items-start gap-2">
                <CountdownBlock label="Days" value={countdown.d} />
                <span className="font-display text-2xl text-mauli-500/60 mt-3">:</span>
                <CountdownBlock label="Hours" value={countdown.h} />
                <span className="font-display text-2xl text-mauli-500/60 mt-3">:</span>
                <CountdownBlock label="Mins" value={countdown.m} />
                <span className="font-display text-2xl text-mauli-500/60 mt-3">:</span>
                <CountdownBlock label="Secs" value={countdown.s} />
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Product Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute w-[420px] h-[420px] rounded-full border border-mauli-500/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[340px] h-[340px] rounded-full border border-vermillion-500/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glow blob behind image */}
            <div className="absolute w-72 h-72 rounded-full bg-mauli-500/20 blur-3xl" />
            <div className="absolute w-52 h-52 rounded-full bg-vermillion-500/15 blur-2xl translate-x-12 translate-y-8" />

            {/* Product image */}
            <motion.div
              className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border border-circuit-700/60 shadow-2xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/hero-product.jpg"
                alt="Hot Wheels Rakhi — Mercedes AMG F1 with rakhi thread on the front wheel hub"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-circuit-900/50 via-transparent to-transparent" />

              {/* Floating badge — discount */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="absolute top-4 right-4 bg-vermillion-500 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-vermillion-500/40 uppercase tracking-widest"
              >
                Up to 65% OFF
              </motion.div>

              {/* Floating badge — edition */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="absolute bottom-4 left-4 flex items-center gap-2 bg-circuit-900/80 backdrop-blur border border-mauli-500/30 rounded-xl px-3 py-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-mauli-400 animate-pulse" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-ivory/50">
                    F1 Chakra Edition
                  </p>
                  <p className="font-display text-sm text-ivory uppercase tracking-wide mt-0.5">
                    Mercedes AMG Petronas
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Spec pills floating around */}
            {[
              { label: '9-Ply Silk', sub: 'Thread', x: '-left-4', y: 'top-1/4' },
              { label: 'Die-Cast', sub: 'Zinc Body', x: '-right-4', y: 'top-1/3' },
              { label: 'Gift Box', sub: 'Included', x: '-right-6', y: 'bottom-1/4' },
            ].map(({ label, sub, x, y }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                className={`absolute ${x} ${y} hidden xl:flex flex-col items-center bg-circuit-800/90 backdrop-blur border border-circuit-600 rounded-xl px-3 py-2 shadow-xl`}
              >
                <span className="font-display text-sm text-mauli-400 uppercase tracking-wide">{label}</span>
                <span className="font-mono text-[9px] text-ivory/40 uppercase tracking-widest mt-0.5">{sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ivory/25">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-ivory/25" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
