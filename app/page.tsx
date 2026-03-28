"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brush,
  CheckCircle2,
  CircleDot,
  Layers,
  Menu,
  Palette,
  Printer,
  Sparkles,
  Star,
  Target,
  Upload,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: Brush,
    title: "Graphic Designing",
    desc: "Brand identities, social media creatives, brochures, packaging, and visual systems that look premium and feel memorable.",
  },
  {
    icon: Printer,
    title: "Printing Solutions",
    desc: "Business cards, flyers, brochures, banners, signage, and marketing materials designed for a sharp offline presence.",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    desc: "Social media, SEO, ads, and content strategies that help your brand reach the right audience and grow faster.",
  },
  {
    icon: Layers,
    title: "Brand Strategy",
    desc: "A clear visual direction built around your audience, your goals, and the story you want your brand to tell.",
  },
];

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
  { value: 8, suffix: "+", label: "Years of Creative Experience" },
  { value: 24, suffix: "/7", label: "Support & Collaboration" },
];

const process = [
  {
    step: "01",
    title: "Discover",
    desc: "We learn about your brand, audience, and business goals before starting any design work.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Our creative team turns ideas into modern visuals that feel polished, strategic, and on-brand.",
  },
  {
    step: "03",
    title: "Deliver",
    desc: "You receive production-ready assets and marketing materials optimized for real-world use.",
  },
  {
    step: "04",
    title: "Grow",
    desc: "We continue refining your visual presence so your brand stays consistent as you scale.",
  },
];

const portfolio = [
  {
    title: "Brand Identity System",
    category: "Graphic Design",
    detail: "Logo, color palette, typography, and brand guidelines for a premium, modern look.",
  },
  {
    title: "High-Impact Print Campaign",
    category: "Printing",
    detail: "Flyers, banners, and product leaflets designed to convert attention into action.",
  },
  {
    title: "Social Media Growth Kit",
    category: "Digital Marketing",
    detail: "Template system, ad creatives, and launch visuals built for consistency and engagement.",
  },
];

const testimonials = [
  {
    quote:
      "Design Point understood our brand instantly and delivered visuals that felt premium, modern, and sales-focused.",
    name: "Aarav Patel",
    role: "Business Owner",
  },
  {
    quote:
      "Their printing and digital marketing support gave our brand a much stronger presence across every channel.",
    name: "Meera Shah",
    role: "Marketing Manager",
  },
  {
    quote:
      "Working with Design Point was a game-changer — the new identity elevated our product and boosted conversions.",
    name: "Rahul Singh",
    role: "Founder",
  },
  {
    quote:
      "Their print execution is flawless — colours, finishes and turnaround all exceeded expectations.",
    name: "Priya Kapoor",
    role: "E-commerce Lead",
  },
  {
    quote:
      "The social creative templates they delivered made our campaign consistent and easy to scale.",
    name: "Vikram Rao",
    role: "Creative Head",
  },
  {
    quote:
      "Fast, communicative, and deeply creative. Design Point helped our early-stage brand look and feel professional instantly.",
    name: "Sana Ali",
    role: "Startup Founder",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function SafeIcon({ Icon, className, ...props }: { Icon?: any; className?: string }) {
  if (!Icon) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }
  return <Icon className={className} {...props} />;
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm">
        <SafeIcon Icon={Sparkles} className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{desc}</p>
    </div>
  );
}

export default function DesignPointLandingPage() {
  useEffect(() => {
    document.title = "Design Point | Graphic Designing, Printing & Digital Marketing Agency";

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMeta(
      "description",
      "Design Point offers modern graphic design, high-quality printing, and performance-driven digital marketing to help your brand grow and stand out."
    );

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);
  }, []);

  const [open, setOpen] = useState(false);

  // Testimonials carousel state
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupSize, setGroupSize] = useState(2);
  const [direction, setDirection] = useState(0); // -1 prev, 1 next
  const [isPaused, setIsPaused] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const visibleGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleResize() {
      // show 1 on small screens, 2 on md+
      setGroupSize(window.innerWidth < 640 ? 1 : 2);
      setGroupIndex(0);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function chunk<T>(arr: T[], size: number) {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  const testimonialGroups = chunk(testimonials, groupSize || 2);

  // No programmatic measurement: rely on CSS min-heights for carousel sizing

  // Autoplay: advance slides every N ms when not paused
  useEffect(() => {
    if (isPaused) return;
    const INTERVAL = 4200;
    const id = window.setInterval(() => {
      setDirection(1);
      setGroupIndex((i) => (i + 1) % (testimonialGroups.length || 1));
    }, INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, testimonialGroups.length]);

  // Measure the currently visible group's height and lock container to it
  useEffect(() => {
    function measure() {
      if (!visibleGroupRef.current) return;
      const h = visibleGroupRef.current.offsetHeight || Math.ceil(visibleGroupRef.current.getBoundingClientRect().height);
      if (h && h !== containerHeight) setContainerHeight(h);
    }

    measure();

    const ro = (window as any).ResizeObserver ? new (window as any).ResizeObserver(measure) : null;
    if (ro && visibleGroupRef.current) ro.observe(visibleGroupRef.current);
    window.addEventListener('resize', measure);

    // re-measure after fonts load
    if ((document as any).fonts && (document as any).fonts.ready) {
      (document as any).fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      window.removeEventListener('resize', measure);
      if (ro && visibleGroupRef.current) ro.unobserve(visibleGroupRef.current);
    };
  }, [groupIndex, groupSize, containerHeight]);

  function prevGroup() {
    setDirection(-1);
    setGroupIndex((i) => (i - 1 + testimonialGroups.length) % testimonialGroups.length);
  }

  function nextGroup() {
    setDirection(1);
    setGroupIndex((i) => (i + 1) % testimonialGroups.length);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fcff_0%,#ffffff_45%,#f4faff_100%)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 shadow-lg shadow-sky-200">
              <SafeIcon Icon={Palette} className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold leading-none text-slate-900">Design Point</p>
              <p className="mt-1 text-xs text-slate-500">Graphic Designing • Printing • Digital Marketing</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {['Home', 'Services', 'Work', 'Process', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 transition hover:text-sky-600">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-700"
            >
              Get a Free Consultation
              <SafeIcon Icon={ArrowRight} className="h-4 w-4" />
            </a>
          </div>

            <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-100 bg-white text-slate-700 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <SafeIcon Icon={Menu} className="h-5 w-5" />
          </button>
        </div>

        {open && (
          <div className="border-t border-sky-100 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {['Home', 'Services', 'Work', 'Process', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.20),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_32%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="max-w-2xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-sm">
                <SafeIcon Icon={CircleDot} className="h-4 w-4" />
                Modern creative agency built for brands that want to stand out
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Design that looks premium,
                <span className="text-sky-600"> prints beautifully,</span> and grows your brand online.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Design Point creates sharp visuals, memorable print materials, and performance-driven digital marketing that help businesses build trust and attract more customers.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-700">
                  Start Your Project
                  <SafeIcon Icon={ArrowRight} className="h-4 w-4" />
                </a>
                <a href="#work" className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-100 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:bg-sky-50">
                  View Our Work
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                    <div className="text-2xl font-semibold text-slate-900">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <div className="relative">
              <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-sky-200/50 blur-3xl" />
              <div className="absolute -bottom-10 right-8 h-32 w-32 rounded-full bg-cyan-200/40 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-5 shadow-[0_20px_80px_rgba(14,165,233,0.12)]">
                <div className="rounded-[1.6rem] bg-gradient-to-br from-sky-50 via-white to-sky-100 p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-sky-700">Design Point Studio</p>
                      <h3 className="mt-1 text-2xl font-semibold text-slate-900">A clean system for bold brands</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <SafeIcon Icon={Zap} className="h-6 w-6 text-sky-500" />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      'Fresh brand identity',
                      'Modern print materials',
                      'High-converting ad creatives',
                      'Consistent social content',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur">
                        <SafeIcon Icon={CheckCircle2} className="h-5 w-5 shrink-0 text-sky-500" />
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.6rem] bg-slate-950 p-6 text-white shadow-xl">
                    <div className="flex items-center gap-2 text-sm text-sky-300">
                      <SafeIcon Icon={Target} className="h-4 w-4" />
                      Performance-focused creative direction
                    </div>
                    <p className="mt-4 text-xl font-medium leading-8">
                      “We design with purpose, so every visual supports your brand story and business goals.”
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Services"
            title="Everything your brand needs in one creative partner"
            desc="From visual identity to print production and digital growth, Design Point brings every touchpoint together with a consistent, modern look."
          />

          <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-sky-100 opacity-40 blur-2xl group-hover:scale-125 transition" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-md">
                        <SafeIcon Icon={Icon} className="h-6 w-6" />
                      </div>
                      <span className="text-5xl font-bold text-sky-100">0{index + 1}</span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-slate-900 group-hover:text-sky-600 transition">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {service.desc}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-sky-600 opacity-0 transition group-hover:opacity-100">
                      Explore Service
                      <SafeIcon Icon={ArrowRight} className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.25rem] border border-sky-100 bg-white p-8 shadow-sm lg:grid-cols-2 lg:p-12">
            <div>
              <SectionTitle
                eyebrow="Why Choose Design Point"
                title="A modern agency experience built around clarity, creativity, and results"
                desc="We combine thoughtful design, premium print execution, and smart digital strategy to help your business look stronger at every stage of the customer journey."
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  'Custom designs, never generic templates',
                  'Balanced focus on beauty and performance',
                  'Brand consistency across online and offline media',
                  'Fast communication and collaborative workflow',
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-sky-100 bg-sky-50/60 p-4">
                    <SafeIcon Icon={CheckCircle2} className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white sm:col-span-2">
                <div className="flex items-center gap-2 text-sm text-sky-300">
                  <Sparkles className="h-4 w-4" />
                  Strategy-led creative process
                </div>
                <p className="mt-4 text-2xl font-semibold leading-9">
                  We study your audience, shape the visual message, and refine every detail until the output feels right.
                </p>
              </div>

                  <div className="rounded-[1.75rem] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6">
                <SafeIcon Icon={Upload} className="h-6 w-6 text-sky-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Digital-ready output</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Optimized graphics for web, social media, and paid campaigns.</p>
              </div>

              <div className="rounded-[1.75rem] border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-6">
                <SafeIcon Icon={Printer} className="h-6 w-6 text-sky-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Print-ready precision</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Clean layouts with the right resolution, color accuracy, and finish.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Selected Work"
            title="A polished portfolio that reflects modern thinking"
            desc="Every project is crafted to feel cohesive, elevated, and ready for the real world."
          />
          <div className="mx-auto mt-14 grid max-w-7xl gap-6 lg:grid-cols-3">
            {portfolio.map((item, index) => (
              <div key={item.title} className={`group flex flex-col rounded-[1.75rem] p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl ${index === 0 ? 'bg-gradient-to-br from-sky-50 to-white border border-sky-200' : index === 1 ? 'bg-gradient-to-br from-white to-cyan-50 border border-cyan-200' : 'bg-gradient-to-br from-slate-50 to-white border border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">{item.category}</span>
                  {index === 0 ? <SafeIcon Icon={Star} className="h-5 w-5 text-sky-500" /> : index === 1 ? <SafeIcon Icon={Target} className="h-5 w-5 text-cyan-500" /> : <SafeIcon Icon={Sparkles} className="h-5 w-5 text-slate-500" />}
                </div>

                <div className="mt-6 flex flex-1 flex-col rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(255,255,255,0.95))] p-5">
                  <div className="flex h-full flex-col justify-between rounded-[1.2rem] border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur">
                    <div className="flex items-center gap-2 text-sm text-sky-700">
                      <SafeIcon Icon={Sparkles} className="h-4 w-4" />
                      {index === 0 ? 'Brand identity' : index === 1 ? 'Print campaign' : 'Digital growth'}
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Our Process"
            title="A simple workflow that keeps projects moving"
            desc="Clear steps, collaborative feedback, and thoughtful execution help us deliver faster without losing quality."
          />
          <div className="mx-auto mt-14 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item) => (
              <div
                key={item.step}
                className="group relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-sky-100 opacity-40 blur-2xl group-hover:scale-125 transition" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-md">
                      <SafeIcon Icon={Target} className="h-6 w-6" />
                    </div>
                    <span className="text-5xl font-bold text-sky-100">{item.step}</span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 items-stretch">
            <div className="h-full rounded-[2rem] border border-sky-100 bg-white p-8 shadow-sm">
              <SectionTitle
                eyebrow="Testimonials"
                title="Trusted by brands that care about presentation"
                desc="Our clients choose us for clean communication, dependable delivery, and polished visuals that make a strong impression."
              />
              <div className="mt-10 relative">
                <div className="flex items-center justify-end gap-2 mb-4">
                  <button
                    onClick={prevGroup}
                    aria-label="Previous testimonials"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-100 bg-white text-slate-700 shadow-sm hover:bg-sky-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <button
                    onClick={nextGroup}
                    aria-label="Next testimonials"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-100 bg-white text-slate-700 shadow-sm hover:bg-sky-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div
                  className="relative overflow-visible"
                  style={containerHeight ? { height: `${containerHeight}px` } : undefined}
                  onPointerEnter={() => setIsPaused(true)}
                  onPointerLeave={() => setIsPaused(false)}
                  onPointerDown={() => setIsPaused(true)}
                  onPointerUp={() => setIsPaused(false)}
                >
                  <AnimatePresence initial={false} custom={direction}>
                    {/** variants use custom (direction) to pick enter/exit translation */}
                    <motion.div
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                      key={groupIndex}
                      custom={direction}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.18}
                      onDragEnd={(_, info) => {
                        const threshold = 80; // px
                        const velocityThreshold = 400; // px/s
                        const offset = info.offset.x;
                        const velocity = info.velocity.x;
                        if (offset < -threshold || velocity < -velocityThreshold) {
                          // swipe left -> next
                          setDirection(1);
                          setGroupIndex((i) => (i + 1) % (testimonialGroups.length || 1));
                        } else if (offset > threshold || velocity > velocityThreshold) {
                          // swipe right -> prev
                          setDirection(-1);
                          setGroupIndex((i) => (i - 1 + (testimonialGroups.length || 1)) % (testimonialGroups.length || 1));
                        }
                        // unpause after a short delay so autoplay resumes
                        setTimeout(() => setIsPaused(false), 350);
                      }}
                      variants={{
                        enter: (d: number) => ({ x: d === 1 ? 60 : -60, opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (d: number) => ({ x: d === 1 ? -60 : 60, opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.36 }}
                    >
                      <div className="w-full" ref={visibleGroupRef}>
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 items-stretch">
                          {(testimonialGroups[groupIndex] || []).map((t) => (
                            <div
                              key={t.name}
                              className="rounded-[1.5rem] border border-sky-100 bg-sky-50/50 p-6 flex flex-col min-h-[9rem] md:min-h-[11rem]"
                            >
                              <div className="flex-1">
                                <p className="text-sm leading-7 text-slate-700 mb-4">“{t.quote}”</p>
                              </div>

                              <div className="mt-4">
                                <div className="font-semibold text-slate-900">{t.name}</div>
                                <div className="text-sm text-slate-500">{t.role}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div id="contact" className="h-full rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-sky-100">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-sky-200">
                <SafeIcon Icon={Sparkles} className="h-4 w-4" />
                Let us bring your brand to life
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Ready for a cleaner, smarter, more modern brand presence?</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                From first impression to final delivery, Design Point creates the visual quality your business deserves.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {['Free consultation', 'Custom creative plan', 'Fast turnaround', 'Ongoing support'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                    <SafeIcon Icon={CheckCircle2} className="h-5 w-5 text-sky-300" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="mailto:hello@designpoint.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400">
                  Contact Us Today
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="tel:+910000000000" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                  Call for a Quote
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-100 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500">© 2026 Design Point. Graphic Designing, Printing & Digital Marketing Agency.</p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <a href="#home" className="hover:text-sky-600">Back to top</a>
            <span>•</span>
            <a href="#contact" className="hover:text-sky-600">Get in touch</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
