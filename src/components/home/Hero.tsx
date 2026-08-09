'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Gift,
  MessageCircle,
  ShieldCheck,
  Timer,
  Truck,
  Mail,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { PRODUCTS } from '@/lib/fixtures/products';

const RAKSHA_BANDHAN = new Date('2026-08-29T00:00:00+05:30');

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

function SpeedLines() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-mauli-500/25 to-transparent"
          style={{
            top: `${16 + i * 9}%`,
            left: 0,
            right: 0,
          }}
          animate={{ opacity: [0, 0.45, 0], x: ['-60%', '80%'] }}
          transition={{
            duration: 4 + (i % 3) * 0.6,
            delay: i * 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function AnnouncementBar() {
  const items = ['Raksha Bandhan drop now open', 'Gift box included', 'Limited numbered editions'];

  return (
    <div className="border-y border-circuit-700 bg-circuit-800/95">
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <div key={item} className="flex shrink-0 items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-mauli-500" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/65">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-14 text-center">
      <div className="rounded-lg border border-circuit-600 bg-circuit-900 px-2.5 py-2 shadow-inner">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="block font-display text-2xl font-semibold leading-none text-mauli-400"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="mt-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/45">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const countdown = useCountdown(RAKSHA_BANDHAN);
  const flagship = PRODUCTS[0];

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    }),
    [],
  );

  return (
    <div className="relative bg-circuit-900">
      <AnnouncementBar />

      <section className="relative overflow-hidden border-b border-circuit-700">
        <div
          className="absolute inset-0 circuit-grid opacity-35 pointer-events-none"
          style={{ backgroundSize: '40px 40px' }}
        />
        <SpeedLines />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-circuit-900 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-circuit-900 to-transparent pointer-events-none" />

        <div className="relative mx-auto grid min-h-[calc(100svh-116px)] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(460px,1fr)] lg:gap-12 lg:py-16">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl" variants={{}}>
            <motion.div variants={fadeUp} className="mb-5 flex flex-wrap items-center gap-3">
              <span className="placard rounded-sm px-3 py-1.5 text-mauli-400 placard-glow">
                Drop 2026
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/50">
                Hot Wheels rakhi collection
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(3.25rem,11vw,6.75rem)] font-semibold uppercase leading-[0.88] tracking-normal text-ivory text-balance"
            >
              Racing gifts for Raksha Bandhan.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-8 text-ivory/68 sm:text-lg"
            >
              Limited die-cast cars finished with a traditional rakhi thread, packed for gifting,
              and ready for siblings who would rather talk lap times than laddoos.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Gift, title: 'Gift-ready', detail: 'Display box included' },
                { icon: ShieldCheck, title: 'Numbered', detail: 'Limited editions' },
                { icon: Truck, title: 'Ships fast', detail: 'Pre-bookings open' },
              ].map(({ icon: Icon, title, detail }) => (
                <div key={title} className="rounded-lg border border-circuit-700 bg-circuit-800/70 p-3">
                  <Icon className="h-4 w-4 text-mauli-400" aria-hidden="true" />
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/80">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-ivory/48">{detail}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-mauli-500 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink shadow-mauli-glow transition hover:bg-mauli-400 focus-ring"
              >
                Shop collection
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="https://wa.me/918008578757"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-chrome-400/70 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-ivory transition hover:border-mauli-500 hover:text-mauli-400 focus-ring"
              >
                <MessageCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href="mailto:Rakhiwheels@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-chrome-400/70 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-ivory transition hover:border-mauli-500 hover:text-mauli-400 focus-ring"
              >
                <Mail className="h-4 w-4 text-mauli-400" aria-hidden="true" />
                Email
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-l border-mauli-500/50 pl-4"
            >
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-mauli-400" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/55">
                  Raksha Bandhan countdown
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CountdownBlock label="Days" value={countdown.d} />
                <CountdownBlock label="Hours" value={countdown.h} />
                <CountdownBlock label="Mins" value={countdown.m} />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:pl-4"
          >
            <div className="absolute -inset-x-8 top-10 h-64 rounded-full bg-mauli-500/10 blur-3xl pointer-events-none lg:-inset-x-12" />
            <div className="relative overflow-hidden rounded-lg border border-circuit-600 bg-circuit-800 shadow-2xl">
              <div className="relative aspect-[5/4] bg-circuit-900 sm:aspect-[4/3] lg:aspect-[5/4]">
                <Image
                  src="/images/hero-product.jpg"
                  alt="Mercedes AMG Petronas F1 rakhi gift box with rakhi thread detail"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-circuit-900/78 via-circuit-900/8 to-transparent" />
              </div>

              <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-end sm:p-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mauli-400">
                    Flagship pick
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold uppercase leading-none tracking-normal text-ivory sm:text-3xl">
                    {flagship.name}
                  </h2>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-ivory/58">
                    {flagship.description.short}
                  </p>
                </div>
                <div className="flex items-center justify-end sm:flex-col sm:items-end mt-4 sm:mt-0">
                  <AddToCartButton product={flagship} size="sm" />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ['Thread', '9-ply silk'],
                ['Charm', 'Chakra stones'],
                ['Run', '1 of 500'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-circuit-700 bg-circuit-800/65 p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/40">
                    {label}
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold uppercase tracking-normal text-ivory">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ivory/25 lg:flex">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em]">Explore</span>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </div>

        <div className="relative mx-auto hidden max-w-7xl px-6 pb-5 lg:block">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-circuit-600 to-transparent" />
        </div>
      </section>
    </div>
  );
}
