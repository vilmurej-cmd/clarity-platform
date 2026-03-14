'use client';

import Link from 'next/link';
import {
  Ribbon,
  Droplets,
  HeartPulse,
  ShieldAlert,
  Brain,
  Wind,
  Zap,
  Baby,
  Flame,
  Microscope,
  Flower2,
  Dumbbell,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ConditionCategory {
  slug: string;
  label: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const categories: ConditionCategory[] = [
  { slug: 'cancer', label: 'Cancer', icon: Ribbon, iconBg: 'bg-rose-50', iconColor: 'text-rose-500' },
  { slug: 'diabetes', label: 'Diabetes', icon: Droplets, iconBg: 'bg-blue-50', iconColor: 'text-[#3B82F6]' },
  { slug: 'heart', label: 'Heart & Cardiovascular', icon: HeartPulse, iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  { slug: 'autoimmune', label: 'Autoimmune Diseases', icon: ShieldAlert, iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { slug: 'mental-health', label: 'Mental Health', icon: Brain, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500' },
  { slug: 'respiratory', label: 'Respiratory', icon: Wind, iconBg: 'bg-sky-50', iconColor: 'text-sky-500' },
  { slug: 'neurological', label: 'Neurological', icon: Zap, iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
  { slug: 'childrens-health', label: "Children's Health", icon: Baby, iconBg: 'bg-green-50', iconColor: 'text-green-500' },
  { slug: 'chronic-pain', label: 'Chronic Pain', icon: Flame, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { slug: 'rare-diseases', label: 'Rare Diseases', icon: Microscope, iconBg: 'bg-violet-50', iconColor: 'text-violet-500' },
  { slug: 'womens-health', label: "Women's Health", icon: Flower2, iconBg: 'bg-pink-50', iconColor: 'text-pink-500' },
  { slug: 'mens-health', label: "Men's Health", icon: Dumbbell, iconBg: 'bg-teal-50', iconColor: 'text-[#14B8A6]' },
];

export default function ConditionGrid() {
  return (
    <section aria-labelledby="conditions-heading" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2
          id="conditions-heading"
          className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl"
        >
          Explore by Condition
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
          Select a category to get started, or describe your condition in your own words.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/understand?category=${cat.slug}`}
                className="group rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-200 hover:shadow-md hover:border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${cat.iconBg}`}
                  aria-hidden="true"
                >
                  <Icon className={`h-5 w-5 ${cat.iconColor}`} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  {cat.label}
                </h3>
                <span className="mt-1 inline-block text-xs font-medium text-[#3B82F6] opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
