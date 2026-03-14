import { Lock, Heart, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TrustItem {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const trustItems: TrustItem[] = [
  {
    icon: Lock,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#3B82F6]',
    title: 'Completely Private',
    description:
      'Nothing you share is stored. Your information stays on your device.',
  },
  {
    icon: Heart,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    title: 'Written for You',
    description:
      'Complex medical research translated into words you understand.',
  },
  {
    icon: Users,
    iconBg: 'bg-teal-50',
    iconColor: 'text-[#14B8A6]',
    title: 'Made with Care',
    description:
      'Built to help you prepare for conversations with your doctor, not replace them.',
  },
];

export default function TrustStrip() {
  return (
    <section aria-label="Why trust CLARITY" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-8 transition-shadow duration-300 hover:shadow-md"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${item.iconBg}`}
                  aria-hidden="true"
                >
                  <Icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
