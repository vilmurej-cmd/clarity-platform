// Demo report data — shown when no OPENAI_API_KEY is configured.
// This lets prospects experience the full platform without burning API credits.

export const demoReport = {
  diagnosisSummary:
    "Type 2 Diabetes is a condition where your body has trouble using insulin — a hormone that helps sugar (glucose) move from your blood into your cells for energy. Think of insulin as a key that unlocks your cells so sugar can get in. With Type 2 Diabetes, the key doesn't work as well as it should, so sugar builds up in your blood instead. It's one of the most common health conditions in the world, and there are many effective ways to manage it.",
  conditionName: "Type 2 Diabetes",
  prevalence:
    "About 37 million Americans — roughly 1 in 10 — have diabetes, and about 90-95% of those have Type 2. You are far from alone in this. It's one of the most well-studied and well-understood conditions in medicine, which means there are excellent tools and treatments available to you.",
  causes:
    "Type 2 Diabetes develops when your body gradually becomes less responsive to insulin (called insulin resistance) and your pancreas can't keep up with the extra demand. Several factors contribute: genetics play a significant role (it often runs in families), and lifestyle factors like diet, physical activity level, and weight can influence when and whether it develops. It's important to understand this is not your fault — many people with healthy lifestyles develop it because of their genetic makeup.",
  severity: "manageable" as const,
  affectedBodyRegions: ["pancreas", "blood", "kidneys", "eyes"],
  mechanismSteps: [
    { step: 1, title: "You eat food", description: "Food is broken down into glucose (sugar), your body's main fuel source.", icon: "🍽️" },
    { step: 2, title: "Glucose enters your blood", description: "Sugar from food enters your bloodstream and your blood sugar rises.", icon: "🩸" },
    { step: 3, title: "Pancreas makes insulin", description: "Your pancreas detects the sugar rise and releases insulin — a hormone that acts like a key.", icon: "🔑" },
    { step: 4, title: "In diabetes, cells resist insulin", description: "With Type 2 Diabetes, your cells don't respond well to insulin — like a rusty lock. Sugar can't get in.", icon: "🔒" },
    { step: 5, title: "Glucose builds up in blood", description: "Because sugar can't enter cells efficiently, it stays in your blood. Over time, high blood sugar can cause damage.", icon: "⚠️" },
  ],
  keyTerms: [
    {
      term: "Insulin",
      definition:
        "A hormone made by your pancreas that acts like a key, unlocking your cells so sugar can enter and be used for energy.",
      whyItMatters:
        "Understanding insulin helps you understand why certain treatments work and why blood sugar management is the core goal.",
    },
    {
      term: "Glucose",
      definition:
        "The sugar in your blood that comes from the food you eat — it's your body's main source of fuel.",
      whyItMatters:
        "Monitoring your glucose levels helps you and your doctor understand how well your treatment plan is working.",
    },
    {
      term: "A1C (Hemoglobin A1C)",
      definition:
        "A blood test that shows your average blood sugar over the past 2-3 months, expressed as a percentage. Think of it as your blood sugar 'report card.'",
      whyItMatters:
        "This is the main number your doctor uses to track how well your diabetes is being managed over time — it's more reliable than a single day's reading.",
    },
    {
      term: "Insulin Resistance",
      definition:
        "When your cells stop responding well to insulin, like a lock that's getting rusty — the key (insulin) doesn't turn as easily.",
      whyItMatters:
        "This is the core issue in Type 2 Diabetes and the target of many treatments.",
    },
    {
      term: "Pancreas",
      definition:
        "An organ behind your stomach that produces insulin. In Type 2 Diabetes, it's often working overtime trying to make enough insulin.",
      whyItMatters:
        "Some treatments work by helping your pancreas, while others work by making your body more sensitive to the insulin you already make.",
    },
    {
      term: "Hypoglycemia",
      definition:
        "When your blood sugar drops too low (below 70 mg/dL), causing shakiness, sweating, confusion, or dizziness.",
      whyItMatters:
        "Some diabetes medications can cause low blood sugar, so it's important to recognize the signs and know how to treat it quickly.",
    },
    {
      term: "Neuropathy",
      definition:
        "Nerve damage that can develop over time if blood sugar stays too high, often causing tingling or numbness in the hands and feet.",
      whyItMatters:
        "Good blood sugar management significantly reduces the risk of developing neuropathy.",
    },
    {
      term: "Metformin",
      definition:
        "The most commonly prescribed first-line medication for Type 2 Diabetes — it helps your body use insulin more effectively.",
      whyItMatters:
        "You'll likely hear this name from your doctor, and it has decades of safety data behind it.",
    },
  ],
  treatmentOptions: [
    {
      name: "Metformin",
      type: "medication" as const,
      howItWorks:
        "Metformin works in two main ways: it reduces the amount of sugar your liver releases into your blood, and it helps your muscle cells respond better to insulin. Think of it as both turning down the sugar faucet and fixing the rusty locks on your cells. It's been used safely for over 60 years.",
      effectiveness:
        "Metformin helps approximately 7-8 out of 10 people lower their A1C by 1-1.5 percentage points, which is clinically significant.",
      effectivenessScore: 8,
      involves:
        "Taking a pill once or twice daily with meals. Your doctor will usually start you on a low dose and gradually increase it.",
      timeline:
        "Starts working within days, full effects in 2-3 months. Most people stay on it long-term.",
      costRange: "$",
      sideEffects: [
        { effect: "Stomach upset or nausea", severity: "mild" as const, frequency: "common" as const },
        { effect: "Diarrhea", severity: "mild" as const, frequency: "common" as const },
        { effect: "Metallic taste", severity: "mild" as const, frequency: "uncommon" as const },
        { effect: "B12 deficiency (long-term)", severity: "moderate" as const, frequency: "uncommon" as const },
      ],
      questionsToAsk: [
        "Should I take regular or extended-release Metformin?",
        "What if the stomach side effects don't go away?",
      ],
    },
    {
      name: "GLP-1 Receptor Agonists (e.g., Ozempic, Trulicity)",
      type: "medication" as const,
      howItWorks:
        "These medications mimic a natural hormone called GLP-1. They help your pancreas release the right amount of insulin, slow digestion so sugar enters your blood more gradually, and reduce appetite.",
      effectiveness:
        "Helps approximately 7-9 out of 10 people significantly lower their A1C by 1.5-2 points. Many also lose 10-15% of body weight.",
      effectivenessScore: 9,
      involves:
        "Most are a weekly injection using a small, pre-filled pen with a tiny needle. Some newer versions are daily pills.",
      timeline:
        "Blood sugar improvements within weeks. Weight loss builds over 3-6 months. Full benefits by 6 months.",
      costRange: "$$$",
      sideEffects: [
        { effect: "Nausea (usually improves)", severity: "mild" as const, frequency: "common" as const },
        { effect: "Decreased appetite", severity: "mild" as const, frequency: "common" as const },
        { effect: "Diarrhea or constipation", severity: "mild" as const, frequency: "uncommon" as const },
        { effect: "Pancreatitis", severity: "serious" as const, frequency: "rare" as const },
      ],
      questionsToAsk: [
        "Am I a candidate for a GLP-1 medication?",
        "Is there a pill version that would work for me?",
      ],
    },
    {
      name: "SGLT2 Inhibitors (e.g., Jardiance, Farxiga)",
      type: "medication" as const,
      howItWorks:
        "These work on your kidneys, causing them to remove extra sugar from your blood through urine. They also have proven benefits for heart health and kidney protection.",
      effectiveness:
        "Helps approximately 6-7 out of 10 people lower A1C by 0.5-1 point. Added heart and kidney benefits make them especially valuable.",
      effectivenessScore: 7,
      involves: "Taking one pill daily, with or without food.",
      timeline: "Blood sugar improvements start within the first week. Heart and kidney benefits build over months.",
      costRange: "$$",
      sideEffects: [
        { effect: "Increased urination", severity: "mild" as const, frequency: "common" as const },
        { effect: "Urinary tract infections", severity: "moderate" as const, frequency: "uncommon" as const },
        { effect: "Yeast infections", severity: "mild" as const, frequency: "uncommon" as const },
        { effect: "Diabetic ketoacidosis", severity: "serious" as const, frequency: "rare" as const },
      ],
      questionsToAsk: [
        "Would an SGLT2 inhibitor give me extra heart/kidney protection?",
        "How much extra water should I drink?",
      ],
    },
    {
      name: "Lifestyle Changes",
      type: "lifestyle" as const,
      howItWorks:
        "Lifestyle changes attack insulin resistance directly. Exercise makes cells more sensitive to insulin. A balanced diet prevents blood sugar spikes. Even modest weight loss — 5-7% — can dramatically improve how your body handles insulin.",
      effectiveness:
        "For sustained changes, helps approximately 5-7 out of 10 people lower A1C by 0.5-2 points. In studies, lifestyle changes were MORE effective than medication at preventing progression.",
      effectivenessScore: 7,
      involves:
        "Working with your healthcare team on a personalized plan: 150 minutes/week of moderate activity, balanced carbohydrates, and gradual weight management.",
      timeline: "Some improvements within days of regular exercise. Sustained benefits build over weeks and months.",
      costRange: "$",
      sideEffects: [
        { effect: "Muscle soreness (temporary)", severity: "mild" as const, frequency: "common" as const },
        { effect: "Low blood sugar during exercise", severity: "moderate" as const, frequency: "uncommon" as const },
      ],
      questionsToAsk: [
        "Can you refer me to a diabetes educator or dietitian?",
        "Are there exercises I should avoid?",
        "How should I adjust medications if I start losing weight?",
      ],
    },
    {
      name: "Insulin Therapy",
      type: "medication" as const,
      howItWorks:
        "Insulin therapy supplements or replaces the insulin your pancreas can no longer make enough of. Needing insulin is NOT a failure — it means your pancreas needs more help than pills alone can provide.",
      effectiveness:
        "The most powerful blood sugar tool available, helping approximately 9 out of 10 people achieve significant A1C reductions of 1.5-3.5 points.",
      effectivenessScore: 9,
      involves:
        "Injections using a pen device with extremely thin needles. Many start with one long-acting injection at bedtime.",
      timeline: "Blood sugar improvements are immediate. Finding the right dose takes a few weeks.",
      costRange: "$$",
      sideEffects: [
        { effect: "Low blood sugar", severity: "moderate" as const, frequency: "common" as const },
        { effect: "Weight gain", severity: "mild" as const, frequency: "common" as const },
        { effect: "Injection site bruising", severity: "mild" as const, frequency: "uncommon" as const },
      ],
      questionsToAsk: [
        "Would starting with just a long-acting insulin at bedtime work for me?",
        "How do I recognize and treat low blood sugar?",
        "Will I need insulin forever?",
      ],
    },
  ],
  questionsForDoctor: {
    askFirst: [
      { question: "What is my current A1C level, and what should my goal be?", whyItMatters: "Your A1C is the single most important number for tracking your diabetes management." },
      { question: "Should I be screened for any complications now, like eye or kidney issues?", whyItMatters: "Early screening can catch problems when they're most treatable." },
      { question: "What medication do you recommend starting with, and why?", whyItMatters: "Understanding your doctor's reasoning helps you make informed decisions." },
    ],
    alsoAsk: [
      { question: "How often should I check my blood sugar at home?", whyItMatters: "Different medications call for different monitoring schedules." },
      { question: "Are any of my other medications affecting my blood sugar?", whyItMatters: "Some common medications can raise blood sugar, and adjustments may help." },
      { question: "Is it possible to put my diabetes into remission with lifestyle changes?", whyItMatters: "Some people, especially early in diagnosis, can achieve remission through lifestyle changes." },
      { question: "What should I do on sick days?", whyItMatters: "Illness can cause blood sugar to spike unpredictably. Having a sick-day plan prevents dangerous situations." },
    ],
    ifTimeAllows: [
      { question: "Can you refer me to a Certified Diabetes Educator?", whyItMatters: "Diabetes educators spend much more time teaching day-to-day management skills." },
      { question: "Are there diabetes support groups you recommend?", whyItMatters: "Connecting with others who understand reduces isolation and provides practical tips." },
      { question: "What should I tell my family about my diagnosis?", whyItMatters: "Family support significantly improves diabetes outcomes." },
      { question: "Is it safe for me to drink alcohol, and how much?", whyItMatters: "Alcohol interacts with blood sugar in complex ways, especially with certain medications." },
    ],
  },
  clinicalTrialSearchTerm: "Type 2 Diabetes new treatments 2026",
  supportResources: {
    medical: [
      { name: "American Diabetes Association", description: "Free educational resources, community forums, meal planning guides, local support groups, and a 24/7 helpline.", url: "https://diabetes.org" },
    ],
    medication: [
      { name: "NeedyMeds", description: "Database of patient assistance programs for prescription medications. Find discount cards and manufacturer programs.", url: "https://needymeds.org" },
      { name: "GoodRx", description: "Compare prescription drug prices and find coupons to save on your medications.", url: "https://goodrx.com" },
    ],
    supportGroups: [
      { name: "Beyond Type 2", description: "Community built by and for people with Type 2 Diabetes. Personal stories, practical guides, and online community.", url: "https://beyondtype2.org" },
      { name: "TuDiabetes", description: "Online community for people with all types of diabetes. Forums, blogs, and support groups.", url: "https://tudiabetes.org" },
    ],
    financial: [
      { name: "Patient Advocate Foundation", description: "Helps patients with chronic illness access care and financial assistance." },
      { name: "Medicare Extra Help", description: "If you qualify, can lower or eliminate prescription drug costs." },
    ],
    mentalHealth: [
      { name: "SAMHSA National Helpline", description: "Free, confidential, 24/7 treatment referral and information. 1-800-662-4357.", url: "https://samhsa.gov/find-help/national-helpline" },
      { name: "Mental Health America", description: "Screening tools, resources, and support for mental health conditions.", url: "https://mhanational.org" },
    ],
    nutrition: [
      { name: "Diabetes Food Hub (ADA)", description: "Free recipes, meal plans, and nutrition tips specifically for people with diabetes.", url: "https://diabetesfoodhub.org" },
      { name: "ChooseMyPlate (USDA)", description: "General nutrition guidance with tools to build a healthy eating plan.", url: "https://myplate.gov" },
    ],
    exercise: [
      { name: "Exercise is Medicine", description: "Evidence-based exercise guidelines for people with chronic conditions, including diabetes." },
      { name: "Silver Sneakers", description: "Free fitness program for adults 65+ with Medicare. Includes gym access and classes." },
    ],
  },
  livingWith: {
    dailyChecklist: [
      "Check blood sugar as recommended by your doctor",
      "Take medications on schedule",
      "Eat balanced meals with controlled carbohydrates",
      "Get 30 minutes of physical activity",
      "Drink at least 8 glasses of water",
      "Check your feet for any cuts or sores",
      "Log your meals and blood sugar readings",
      "Get 7-8 hours of sleep",
    ],
    foodGuide: {
      eat: [
        { name: "Leafy Greens", icon: "🥬", reason: "Very low carb, high in fiber and nutrients" },
        { name: "Berries", icon: "🫐", reason: "Lower sugar than most fruits, high in antioxidants" },
        { name: "Nuts & Seeds", icon: "🥜", reason: "Healthy fats that help stabilize blood sugar" },
        { name: "Fish", icon: "🐟", reason: "Omega-3 fatty acids support heart health" },
        { name: "Beans & Lentils", icon: "🫘", reason: "Excellent plant protein with slow-releasing carbs" },
        { name: "Non-starchy vegetables", icon: "🥦", reason: "Fill half your plate — very low impact on blood sugar" },
      ],
      moderate: [
        { name: "Whole Grains", icon: "🍞", reason: "Better than white bread, but still raises blood sugar" },
        { name: "Fruit", icon: "🍎", reason: "Natural sugar — enjoy in portions, pair with protein" },
        { name: "Sweet Potatoes", icon: "🍠", reason: "Higher in fiber than white potatoes, but still starchy" },
        { name: "Dairy", icon: "🥛", reason: "Good protein source, but watch for added sugars in yogurt" },
      ],
      limit: [
        { name: "Sugary Drinks", icon: "🥤", reason: "Rapidly spikes blood sugar — the single biggest offender" },
        { name: "White Bread/Rice", icon: "🍚", reason: "Refined carbs that quickly convert to blood sugar" },
        { name: "Candy & Sweets", icon: "🍬", reason: "Concentrated sugar with minimal nutritional value" },
        { name: "Fried Foods", icon: "🍟", reason: "High in unhealthy fats that worsen insulin resistance" },
      ],
    },
    exercises: [
      { name: "Brisk Walking", icon: "🚶", duration: "30 minutes", frequency: "Daily", difficulty: "easy" as const, safetyNote: "Start with 10 minutes and build up. Walk after meals for best blood sugar benefit." },
      { name: "Swimming", icon: "🏊", duration: "30-45 minutes", frequency: "3-4 times/week", difficulty: "moderate" as const, safetyNote: "Excellent low-impact option. Great for people with joint issues." },
      { name: "Resistance Training", icon: "💪", duration: "20-30 minutes", frequency: "2-3 times/week", difficulty: "moderate" as const, safetyNote: "Building muscle improves insulin sensitivity. Start with light weights or resistance bands." },
      { name: "Yoga", icon: "🧘", duration: "20-30 minutes", frequency: "2-3 times/week", difficulty: "easy" as const, safetyNote: "Reduces stress hormones that raise blood sugar. Also improves balance and flexibility." },
      { name: "Cycling", icon: "🚴", duration: "30-45 minutes", frequency: "3-5 times/week", difficulty: "moderate" as const, safetyNote: "Stationary or outdoor. Easy on joints, great for cardiovascular health." },
    ],
    emotionalHealth:
      "It's completely normal to feel overwhelmed, frustrated, or even angry about a diabetes diagnosis. Many people go through a grieving process for the health they expected to have. Some days managing diabetes will feel like a full-time job on top of everything else in your life — and that's an incredibly valid feeling. Please be gentle with yourself. You don't have to be perfect. Missing a blood sugar check, eating something 'off plan,' or having a high reading does NOT make you a failure. Diabetes management is a marathon, not a sprint, and what matters is the overall trend, not any single moment. If you find that worry about your health is affecting your sleep, relationships, or ability to enjoy life, please talk to your doctor — depression and anxiety are more common in people with diabetes, and there is excellent help available.",
    copingStrategies: [
      "Take it one day at a time — don't try to change everything at once",
      "Celebrate small wins (a good A1C reading, choosing a healthy meal, taking a walk)",
      "Connect with others who understand — support groups can be incredibly helpful",
      "Practice mindfulness or deep breathing when feeling overwhelmed",
      "Keep a gratitude journal — it's been shown to improve both mood and health outcomes",
      "Set realistic goals with your healthcare team, not based on social media",
    ],
    watchFor: [
      { sign: "Blood sugar consistently above 250 mg/dL", action: "Contact your doctor to discuss medication adjustments." },
      { sign: "Excessive thirst, frequent urination, blurred vision", action: "These are signs of very high blood sugar — check your levels and call your doctor." },
      { sign: "Shakiness, sweating, rapid heartbeat, confusion", action: "Signs of low blood sugar — treat immediately with 15 grams of fast-acting carbs." },
      { sign: "Numbness or tingling in hands/feet", action: "Could indicate nerve changes — report to your doctor promptly." },
      { sign: "Slow-healing cuts or sores on feet", action: "Check feet daily. Diabetes affects healing — report concerns right away." },
      { sign: "Sudden vision changes", action: "Diabetes can affect eye health — early treatment prevents serious problems." },
    ],
    forCaregivers:
      "If someone you love has been diagnosed with Type 2 Diabetes, the most important thing you can do is learn alongside them. Attend a doctor's appointment or diabetes education class together. Make dietary changes as a household rather than singling them out — the whole family benefits from healthier eating. Avoid being the 'food police' — nagging about what they eat creates stress and shame, which actually worsens blood sugar. Instead, offer to cook a healthy meal together, suggest a walk after dinner, or simply ask 'How are you doing with everything?' Your patience, understanding, and quiet support mean more than you know.",
  },
  kidsVersion: {
    simpleExplanation:
      "You know how a car needs gas to run? Your body needs sugar (called glucose) for energy, kind of like fuel. There's a special helper in your body called insulin that helps the sugar get from your blood into your body's cells where it's needed. With Type 2 Diabetes, the insulin helper isn't working as well as it should, so the sugar stays in the blood instead of going where it needs to go. The doctors and medicines are helping fix this so the body works better.",
    siblingNote:
      "Your family member has something called diabetes. It means their body needs a little extra help handling sugar. You might notice they need to check their blood sugar (a tiny finger prick), take medicine, or be more careful about what they eat. They aren't sick in a way you can catch. The best thing you can do is be understanding and maybe join them on walks or try healthy foods together.",
  },
};

export const demoKidsReport = {
  simpleExplanation:
    "You know how you breathe in and out all day without even thinking about it? Air goes through tubes in your body called airways to get to your lungs. With asthma, sometimes those tubes get a little puffy and tight, kind of like when you squeeze a straw — it's harder for the air to get through. That's why sometimes it might feel hard to breathe or you might cough or wheeze (make a whistling sound). The good news is that doctors have really great medicines that help open up those tubes so you can breathe easily again!",
  whatToExpect: [
    {
      title: "You'll have a special action plan",
      description:
        "Your doctor will create a plan just for you that tells you exactly what to do if you start feeling wheezy or short of breath. It's like having a superhero instruction manual!",
    },
    {
      title: "You might use an inhaler",
      description:
        "An inhaler is a small device that puffs medicine right into your lungs where it's needed. It doesn't hurt — it just tastes a little funny.",
    },
    {
      title: "You can still play and be active",
      description:
        "Lots of Olympic athletes have asthma! You can still run, play sports, and do everything your friends do.",
    },
    {
      title: "You'll learn your triggers",
      description:
        "Certain things might make your asthma act up — like cold air, dust, pet fur, or running really hard. Once you know what bothers YOUR airways, you can be prepared.",
    },
    {
      title: "Some days are better than others",
      description:
        "Sometimes your breathing will be totally fine, and sometimes your asthma might flare up. Both are normal.",
    },
  ],
  siblingExplanation:
    "Your brother or sister has asthma, which means the breathing tubes in their lungs sometimes get puffy and tight. It's NOT something you can catch. Sometimes they might cough a lot or need to use a special device called an inhaler. If that happens, don't panic — just help them find their inhaler or get a grown-up.",
  schoolAccommodationLetter:
    "Dear Teacher/School Nurse,\n\nThis letter is to inform you that your student has been diagnosed with asthma. Please ensure the following accommodations are in place:\n\n1. INHALER ACCESS: The student should have unrestricted access to their rescue inhaler at all times.\n\n2. PHYSICAL EDUCATION: The student can participate fully in PE. They may need to use their rescue inhaler 15 minutes before vigorous exercise.\n\n3. ENVIRONMENTAL TRIGGERS: Please be mindful of strong chemical fumes, dust, chalk dust, cold air, and pet dander.\n\n4. ASTHMA ACTION PLAN: A copy of the student's Asthma Action Plan is attached.\n\n5. FIELD TRIPS: Ensure rescue inhaler accompanies the student.\n\n6. MISSED SCHOOL: During flare-ups, please provide make-up work without academic penalty.\n\nSincerely,\n[Parent/Guardian Name]\n[Date]",
  copingActivities: [
    {
      title: "Belly Breathing Practice",
      description:
        "Put a stuffed animal on your belly while lying down. Breathe in slowly through your nose and watch it rise. Breathe out slowly and watch it fall.",
      ageRange: "3-8",
    },
    {
      title: "The Straw Game",
      description:
        "Practice breathing out slowly through a straw — try to make a cotton ball roll across a table using only your breath!",
      ageRange: "5-12",
    },
    {
      title: "Asthma Superhero Journal",
      description:
        "Create a journal where you're the superhero who battles the 'Wheeze Monster.' Draw your triggers as villains and your inhaler as your superpower!",
      ageRange: "6-12",
    },
    {
      title: "Trigger Detective",
      description:
        "Become a detective and track what makes your asthma act up. Keep a log and look for patterns — knowing your triggers puts YOU in control.",
      ageRange: "8-17",
    },
    {
      title: "Sports & Asthma Role Models",
      description:
        "Look up famous athletes with asthma: David Beckham, Jerome Bettis, Amy Van Dyken. World-class athletes manage asthma successfully!",
      ageRange: "9-17",
    },
    {
      title: "Teach a Friend",
      description:
        "Practice explaining your asthma to a friend. Being open about it reduces awkwardness and helps your friends know how to support you.",
      ageRange: "7-17",
    },
  ],
};
