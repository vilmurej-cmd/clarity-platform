import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ExternalLink,
  ArrowRight,
  FlaskConical,
  ClipboardList,
  TestTubes,
  CreditCard,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Health Resources — Trusted Organizations & Patient Guides',
  description:
    'Curated health resources from trusted organizations like NIH, CDC, Mayo Clinic, and more. Plus patient guides for doctor appointments, lab results, and health insurance.',
};

const majorOrgs = [
  {
    name: 'National Institutes of Health (NIH)',
    domain: 'nih.gov',
    description:
      'The primary federal agency for biomedical and public health research. Their MedlinePlus resource is one of the best plain-language health information sources available.',
  },
  {
    name: 'Centers for Disease Control and Prevention (CDC)',
    domain: 'cdc.gov',
    description:
      'America\'s health protection agency. Provides reliable information on diseases, conditions, healthy living, and public health emergencies.',
  },
  {
    name: 'World Health Organization (WHO)',
    domain: 'who.int',
    description:
      'The United Nations\' specialized health agency. Offers global health guidance, disease information, and international health standards.',
  },
  {
    name: 'Mayo Clinic',
    domain: 'mayoclinic.org',
    description:
      'One of the world\'s most respected medical institutions. Their patient education library covers thousands of conditions with clear, accurate information.',
  },
  {
    name: 'Cleveland Clinic',
    domain: 'clevelandclinic.org',
    description:
      'A nonprofit academic medical center with an extensive health library. Known for clear explanations of conditions, treatments, and procedures.',
  },
];

const conditionOrgs = [
  {
    name: 'American Cancer Society',
    domain: 'cancer.org',
    description:
      'Comprehensive cancer information, support programs, and resources for patients and caregivers navigating a cancer diagnosis.',
  },
  {
    name: 'American Diabetes Association',
    domain: 'diabetes.org',
    description:
      'Education, advocacy, and research for all types of diabetes. Offers meal planning tools, medication guides, and community support.',
  },
  {
    name: 'American Heart Association',
    domain: 'heart.org',
    description:
      'Heart disease and stroke prevention resources. Includes risk assessment tools, lifestyle guidance, and emergency response education.',
  },
  {
    name: 'Arthritis Foundation',
    domain: 'arthritis.org',
    description:
      'Resources for the 54 million Americans with arthritis. Covers treatment options, exercise programs, and daily living tips.',
  },
  {
    name: 'National Alliance on Mental Illness (NAMI)',
    domain: 'nami.org',
    description:
      'The largest grassroots mental health organization in America. Provides education, support groups, and advocacy for individuals and families.',
  },
  {
    name: 'American Lung Association',
    domain: 'lung.org',
    description:
      'Lung health resources including asthma, COPD, lung cancer, and air quality information. Offers a free lung helpline.',
  },
  {
    name: 'Alzheimer\'s Association',
    domain: 'alz.org',
    description:
      'Support and education for Alzheimer\'s and dementia patients and caregivers. Offers a 24/7 helpline and local chapter resources.',
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-blue-50 pb-16 pt-16 sm:pt-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Health Resources
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Trusted resources to support your health journey. Every organization listed
            here is well-established, reputable, and committed to patient education.
          </p>
        </div>
      </section>

      {/* Major Organizations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
            Major Health Organizations
          </h2>
          <p className="mt-3 text-slate-500">
            These organizations are among the most trusted sources of health information
            in the world.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {majorOrgs.map((org) => (
              <a
                key={org.name}
                href={`https://${org.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">
                    {org.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 flex-shrink-0 text-slate-300 group-hover:text-[#3B82F6] transition-colors mt-1" />
                </div>
                <p className="mt-1 text-xs font-medium text-[#3B82F6]">{org.domain}</p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {org.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Condition-Specific Organizations */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
            Condition-Specific Organizations
          </h2>
          <p className="mt-3 text-slate-500">
            Specialized organizations that focus on specific conditions, offering
            targeted support, education, and community.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {conditionOrgs.map((org) => (
              <a
                key={org.name}
                href={`https://${org.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">
                      {org.name}
                    </h3>
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-slate-300 group-hover:text-[#3B82F6] transition-colors" />
                  </div>
                  <p className="text-xs font-medium text-[#3B82F6]">{org.domain}</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {org.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Trials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <FlaskConical className="h-6 w-6 text-[#14B8A6]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Clinical Trials
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Clinical trials are research studies that test new treatments, drugs, or
              procedures in people. They are a critical part of how medicine advances
              and can offer access to cutting-edge treatments before they are widely
              available.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              The U.S. National Library of Medicine maintains{' '}
              <span className="font-semibold text-[#14B8A6]">ClinicalTrials.gov</span>,
              a database of over 400,000 clinical studies from around the world. You can
              search by condition, location, or treatment type.
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                How to search for clinical trials:
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#14B8A6]" />
                  Search by your specific condition or diagnosis
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#14B8A6]" />
                  Filter by your location to find nearby studies
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#14B8A6]" />
                  Look for studies that are &quot;Recruiting&quot; for current opportunities
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#14B8A6]" />
                  Always discuss with your doctor before enrolling
                </li>
              </ul>
            </div>
            <a
              href="https://clinicaltrials.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#14B8A6] hover:text-teal-700 transition-colors"
            >
              Visit ClinicalTrials.gov
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Patient Guides */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Patient Guides
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Practical advice to help you navigate your healthcare experience.
          </p>

          <div className="mt-12 space-y-8">
            {/* Guide 1: Doctor Appointments */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <ClipboardList className="h-5 w-5 text-[#3B82F6]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  How to Prepare for a Doctor&apos;s Appointment
                </h3>
              </div>
              <ol className="space-y-3 text-slate-600">
                {[
                  'Write down your symptoms — when they started, how often they occur, and what makes them better or worse.',
                  'Make a list of all medications you take, including over-the-counter drugs, vitamins, and supplements.',
                  'Prepare your questions in advance. Write them down and bring the list with you.',
                  'Bring your CLARITY report if you have one — it gives you and your doctor a shared starting point.',
                  'Know your family medical history, especially for conditions that run in families.',
                  'Bring a trusted friend or family member if you want support or a second pair of ears.',
                  'Be honest with your doctor, even about things that feel embarrassing. They have heard it all.',
                  'Take notes during the appointment or ask if you can record it for your reference.',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-[#3B82F6]">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Guide 2: Lab Results */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                  <TestTubes className="h-5 w-5 text-[#14B8A6]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Understanding Your Lab Results
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Lab results can look like a foreign language. Here are some of the most
                common tests and what they measure:
              </p>
              <div className="space-y-4">
                {[
                  {
                    test: 'Complete Blood Count (CBC)',
                    what: 'Measures red blood cells, white blood cells, and platelets. Helps detect infections, anemia, and other conditions.',
                  },
                  {
                    test: 'Basic Metabolic Panel (BMP)',
                    what: 'Checks blood sugar, calcium, and electrolytes. Gives a snapshot of your metabolism and organ function.',
                  },
                  {
                    test: 'Lipid Panel',
                    what: 'Measures cholesterol levels (HDL, LDL, triglycerides). Helps assess heart disease risk.',
                  },
                  {
                    test: 'Hemoglobin A1C',
                    what: 'Shows average blood sugar over 2-3 months. Key test for diabetes management. Below 5.7% is normal.',
                  },
                  {
                    test: 'Thyroid Panel (TSH, T3, T4)',
                    what: 'Checks how well your thyroid is working. An underactive or overactive thyroid affects energy, weight, and mood.',
                  },
                  {
                    test: 'Urinalysis',
                    what: 'Examines your urine for signs of kidney disease, diabetes, urinary tract infections, and other conditions.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-slate-50 p-4"
                  >
                    <p className="font-semibold text-slate-900 text-sm">
                      {item.test}
                    </p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {item.what}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                Remember: a single abnormal result does not necessarily mean something
                is wrong. Your doctor interprets results in the context of your overall
                health, symptoms, and history.
              </p>
            </div>

            {/* Guide 3: Health Insurance */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                  <CreditCard className="h-5 w-5 text-[#F59E0B]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Navigating Health Insurance
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Health insurance can be confusing. Here are the key terms and tips you
                need to know:
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    term: 'Premium',
                    def: 'The monthly amount you pay for your insurance plan, regardless of whether you use it.',
                  },
                  {
                    term: 'Deductible',
                    def: 'The amount you pay out-of-pocket before your insurance starts covering costs.',
                  },
                  {
                    term: 'Copay',
                    def: 'A fixed amount you pay for a specific service (like $30 for a doctor visit).',
                  },
                  {
                    term: 'Coinsurance',
                    def: 'Your share of costs after meeting your deductible, usually a percentage (like 20%).',
                  },
                  {
                    term: 'Out-of-Pocket Maximum',
                    def: 'The most you will pay in a year. After this, your insurance covers 100%.',
                  },
                  {
                    term: 'In-Network',
                    def: 'Doctors and hospitals that have agreements with your insurer, meaning lower costs for you.',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl bg-amber-50/50 border border-amber-100 p-4">
                    <p className="font-semibold text-slate-900 text-sm">{item.term}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {item.def}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-amber-50 border border-amber-100 p-4">
                <p className="text-sm font-semibold text-amber-800 mb-2">
                  Tips for Managing Health Insurance
                </p>
                <ul className="space-y-1.5 text-sm text-amber-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F59E0B]" />
                    Always verify a provider is in-network before scheduling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F59E0B]" />
                    Request pre-authorization for procedures when required
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F59E0B]" />
                    Keep copies of all bills, EOBs, and correspondence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F59E0B]" />
                    You can appeal denied claims — most insurers have a formal process
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-slate-50 to-blue-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Get your personalized report
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            These resources are a great starting point. For information specific to
            your situation, try CLARITY.
          </p>
          <div className="mt-8">
            <Link
              href="/understand"
              className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-[#2563EB] hover:shadow-xl hover:shadow-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            >
              Start Understanding
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
