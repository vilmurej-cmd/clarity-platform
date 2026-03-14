import { MessageSquare, BookOpen, FileText, UserCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: MessageSquare,
    title: 'Tell us what your doctor told you',
    description:
      'Describe your diagnosis, condition, or medical term in your own words. No medical jargon required.',
  },
  {
    number: 2,
    icon: BookOpen,
    title: 'CLARITY reads the latest research',
    description:
      'Our AI reviews trusted medical literature and translates it into plain language you can understand.',
  },
  {
    number: 3,
    icon: FileText,
    title: 'Get your personalized report',
    description:
      'Receive a clear breakdown: what it means, treatment options, side effects, and questions to ask.',
  },
  {
    number: 4,
    icon: UserCheck,
    title: 'Walk into your next appointment prepared',
    description:
      'Print or save your questions. Have a real, informed conversation with your healthcare team.',
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2
          id="how-it-works-heading"
          className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl"
        >
          How CLARITY Works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
          From confusion to confidence in four simple steps.
        </p>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connecting line — vertical on mobile, horizontal on desktop */}
          <div
            className="absolute left-6 top-0 hidden h-full w-px border-l-2 border-dashed border-blue-200 sm:block lg:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute left-6 top-0 h-full w-px border-l-2 border-dashed border-blue-200 sm:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 top-6 hidden h-px w-full border-t-2 border-dashed border-blue-200 lg:block"
            aria-hidden="true"
          />

          <ol className="relative grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 1;

              return (
                <li
                  key={step.number}
                  className={`relative flex gap-5 lg:flex-col lg:items-center lg:text-center ${
                    isEven ? 'sm:flex-row-reverse sm:text-right lg:flex-col lg:text-center' : ''
                  }`}
                >
                  {/* Number circle */}
                  <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold text-sm shadow-md shadow-blue-200">
                    {step.number}
                  </div>

                  <div className={`flex-1 ${isEven ? 'sm:pr-5 lg:pr-0' : ''}`}>
                    <div
                      className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 lg:mx-auto"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5 text-[#3B82F6]" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
