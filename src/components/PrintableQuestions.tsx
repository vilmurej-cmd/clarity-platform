interface PrintableQuestionsProps {
  questions: string[];
  conditionName: string;
}

export default function PrintableQuestions({ questions, conditionName }: PrintableQuestionsProps) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (questions.length === 0) return null;

  return (
    <div className="hidden print:block" aria-hidden="true">
      <div className="max-w-xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-black mb-1">
          My Questions for My Doctor
        </h1>
        <p className="text-sm text-gray-600 mb-1">{conditionName}</p>
        <p className="text-sm text-gray-400 mb-8">{today}</p>

        <ol className="space-y-6 list-decimal list-inside">
          {questions.map((q, i) => (
            <li key={i} className="text-base text-black">
              <span className="font-medium">{q}</span>
              <div className="mt-2 ml-5 border-b border-gray-300 pb-6">
                <p className="text-xs text-gray-400 italic">Notes:</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            Prepared with CLARITY &mdash; clarityhealth.ai
          </p>
        </div>
      </div>
    </div>
  );
}
