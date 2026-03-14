// Demo report data — shown when no ANTHROPIC_API_KEY is configured.
// This lets prospects experience the full platform without burning API credits.

export const demoReport = {
  diagnosisSummary:
    "Type 2 Diabetes is a condition where your body has trouble using insulin — a hormone that helps sugar (glucose) move from your blood into your cells for energy. Think of insulin as a key that unlocks your cells so sugar can get in. With Type 2 Diabetes, the key doesn't work as well as it should, so sugar builds up in your blood instead. It's one of the most common health conditions in the world, and there are many effective ways to manage it.",
  conditionName: "Type 2 Diabetes",
  prevalence:
    "About 37 million Americans — roughly 1 in 10 — have diabetes, and about 90-95% of those have Type 2. You are far from alone in this. It's one of the most well-studied and well-understood conditions in medicine, which means there are excellent tools and treatments available to you.",
  causes:
    "Type 2 Diabetes develops when your body gradually becomes less responsive to insulin (called insulin resistance) and your pancreas can't keep up with the extra demand. Several factors contribute: genetics play a significant role (it often runs in families), and lifestyle factors like diet, physical activity level, and weight can influence when and whether it develops. It's important to understand this is not your fault — many people with healthy lifestyles develop it because of their genetic makeup.",
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
        "Metformin helps approximately 7-8 out of 10 people lower their A1C by 1-1.5 percentage points, which is clinically significant. Many people see noticeable improvements in their blood sugar within the first two weeks.",
      effectivenessScore: 8,
      involves:
        "Taking a pill once or twice daily with meals. Your doctor will usually start you on a low dose and gradually increase it to minimize side effects.",
      timeline:
        "Starts working within days, but full effects are typically seen over 2-3 months. Most people stay on Metformin long-term as it continues to be effective.",
      sideEffects: [
        {
          effect: "Stomach upset or nausea",
          severity: "mild" as const,
          frequency: "common" as const,
        },
        {
          effect: "Diarrhea",
          severity: "mild" as const,
          frequency: "common" as const,
        },
        {
          effect: "Metallic taste in mouth",
          severity: "mild" as const,
          frequency: "uncommon" as const,
        },
        {
          effect: "Vitamin B12 deficiency (with long-term use)",
          severity: "moderate" as const,
          frequency: "uncommon" as const,
        },
      ],
      questionsToAsk: [
        "Should I take the regular or extended-release version of Metformin?",
        "What should I do if the stomach side effects don't go away after a few weeks?",
      ],
    },
    {
      name: "GLP-1 Receptor Agonists (e.g., Ozempic, Trulicity, Mounjaro)",
      type: "medication" as const,
      howItWorks:
        "These medications mimic a natural hormone called GLP-1 that your body releases after eating. They help your pancreas release the right amount of insulin at the right time, slow down digestion so sugar enters your blood more gradually, and reduce appetite. They've become one of the most exciting developments in diabetes treatment.",
      effectiveness:
        "These medications help approximately 7-9 out of 10 people significantly lower their A1C, often by 1.5-2 percentage points. Many people also experience weight loss of 10-15%, and some newer versions show heart and kidney protective benefits.",
      effectivenessScore: 9,
      involves:
        "Most are given as a weekly injection using a small, pre-filled pen (the needle is very tiny — most people say they barely feel it). Some newer versions are daily pills.",
      timeline:
        "Blood sugar improvements begin within the first few weeks. Weight loss effects build over 3-6 months. Full benefits are typically achieved by 6 months.",
      sideEffects: [
        {
          effect: "Nausea (usually improves after a few weeks)",
          severity: "mild" as const,
          frequency: "common" as const,
        },
        {
          effect: "Decreased appetite",
          severity: "mild" as const,
          frequency: "common" as const,
        },
        {
          effect: "Diarrhea or constipation",
          severity: "mild" as const,
          frequency: "uncommon" as const,
        },
        {
          effect: "Injection site reaction",
          severity: "mild" as const,
          frequency: "uncommon" as const,
        },
        {
          effect: "Pancreatitis (inflammation of the pancreas)",
          severity: "serious" as const,
          frequency: "rare" as const,
        },
      ],
      questionsToAsk: [
        "Am I a candidate for a GLP-1 medication, and would it help with both my blood sugar and weight?",
        "Is there a pill version available that might work for me?",
      ],
    },
    {
      name: "SGLT2 Inhibitors (e.g., Jardiance, Farxiga)",
      type: "medication" as const,
      howItWorks:
        "These medications work on your kidneys, causing them to remove extra sugar from your blood through your urine. Think of it as your kidneys acting like a safety valve — releasing excess sugar so it doesn't build up. They also have proven benefits for heart health and kidney protection.",
      effectiveness:
        "Helps approximately 6-7 out of 10 people lower their A1C by 0.5-1 percentage point. The added heart and kidney benefits make them especially valuable for people with those risk factors. Modest weight loss of 4-6 pounds is common.",
      effectivenessScore: 7,
      involves:
        "Taking one pill daily, with or without food. No injections needed.",
      timeline:
        "Blood sugar improvements start within the first week. Heart and kidney benefits build over months of use.",
      sideEffects: [
        {
          effect: "Increased urination",
          severity: "mild" as const,
          frequency: "common" as const,
        },
        {
          effect: "Urinary tract infections",
          severity: "moderate" as const,
          frequency: "uncommon" as const,
        },
        {
          effect: "Yeast infections",
          severity: "mild" as const,
          frequency: "uncommon" as const,
        },
        {
          effect: "Dehydration",
          severity: "moderate" as const,
          frequency: "uncommon" as const,
        },
        {
          effect: "Diabetic ketoacidosis (DKA)",
          severity: "serious" as const,
          frequency: "rare" as const,
        },
      ],
      questionsToAsk: [
        "Given my heart and kidney health, would an SGLT2 inhibitor give me extra protection?",
        "How much extra water should I drink while taking this?",
      ],
    },
    {
      name: "Lifestyle Changes (Nutrition, Exercise, Weight Management)",
      type: "lifestyle" as const,
      howItWorks:
        "Lifestyle changes attack insulin resistance directly. Regular physical activity makes your muscle cells more sensitive to insulin (like oiling those rusty locks). A balanced diet with controlled carbohydrate intake prevents blood sugar spikes. Even modest weight loss — 5-7% of body weight — can dramatically improve how your body handles insulin.",
      effectiveness:
        "For people who make sustained changes, lifestyle interventions help approximately 5-7 out of 10 people lower A1C by 0.5-2 percentage points. In the landmark Diabetes Prevention Program study, lifestyle changes were actually MORE effective than medication at preventing diabetes progression.",
      effectivenessScore: 7,
      involves:
        "Working with your healthcare team to develop a personalized plan. Typically includes 150 minutes per week of moderate activity (like brisk walking), learning to balance carbohydrates across meals, and gradual weight management. This is NOT about perfection — every small change adds up.",
      timeline:
        "Some blood sugar improvements can be seen within days of starting regular exercise. Sustained benefits build over weeks and months. This is a long-term approach that works alongside medications.",
      sideEffects: [
        {
          effect: "Muscle soreness when starting exercise (temporary)",
          severity: "mild" as const,
          frequency: "common" as const,
        },
        {
          effect: "Low blood sugar during exercise (if on certain meds)",
          severity: "moderate" as const,
          frequency: "uncommon" as const,
        },
      ],
      questionsToAsk: [
        "Can you refer me to a diabetes educator or dietitian who can help me create a realistic plan?",
        "Are there any exercises I should avoid given my current health?",
        "How should I adjust my medications if I start losing weight?",
      ],
    },
    {
      name: "Insulin Therapy",
      type: "medication" as const,
      howItWorks:
        "Insulin therapy supplements or replaces the insulin your pancreas can no longer make enough of. There are different types: long-acting insulin (provides a steady background level throughout the day) and rapid-acting insulin (covers blood sugar spikes from meals). Needing insulin is NOT a failure — it simply means your pancreas needs more help than pills alone can provide.",
      effectiveness:
        "Insulin is the most powerful blood sugar lowering tool available, helping approximately 9 out of 10 people achieve significant A1C reductions of 1.5-3.5 percentage points. There is essentially no upper limit to its effectiveness — doses can always be adjusted.",
      effectivenessScore: 9,
      involves:
        "Injections using a pen device (much easier than it sounds — the needles are extremely thin). Many people start with just one long-acting injection at bedtime. Your doctor will teach you how to check your blood sugar and adjust doses. Some people use insulin pumps that deliver insulin continuously.",
      timeline:
        "Blood sugar improvements are immediate. Finding the right dose takes a few weeks of adjustments with your doctor. Long-term management involves regular monitoring.",
      sideEffects: [
        {
          effect: "Low blood sugar (hypoglycemia)",
          severity: "moderate" as const,
          frequency: "common" as const,
        },
        {
          effect: "Weight gain",
          severity: "mild" as const,
          frequency: "common" as const,
        },
        {
          effect: "Injection site bruising",
          severity: "mild" as const,
          frequency: "uncommon" as const,
        },
        {
          effect: "Lipodystrophy (skin changes at injection site)",
          severity: "mild" as const,
          frequency: "rare" as const,
        },
      ],
      questionsToAsk: [
        "Would starting with just a long-acting insulin at bedtime be a good first step for me?",
        "How do I recognize and treat low blood sugar?",
        "Will I need insulin forever, or could I eventually manage without it if my numbers improve?",
      ],
    },
  ],
  questionsForDoctor: {
    aboutDiagnosis: [
      {
        question: "What is my current A1C level, and what should my goal be?",
        whyItMatters:
          "Your A1C is the single most important number for tracking your diabetes management. Knowing your target gives you a clear goal to work toward.",
      },
      {
        question:
          "How long have I likely had diabetes? Could I have had it for a while before this diagnosis?",
        whyItMatters:
          "Type 2 Diabetes can be present for years before diagnosis. Knowing this helps your doctor check for any complications that may have developed.",
      },
      {
        question:
          "Should I be screened for any complications now, like eye or kidney issues?",
        whyItMatters:
          "Early screening can catch problems when they're most treatable. Common baseline tests include eye exams, kidney function tests, and foot exams.",
      },
      {
        question:
          "Is there a chance this is actually Type 1 or LADA (latent autoimmune diabetes)?",
        whyItMatters:
          "About 5-10% of adults diagnosed with Type 2 actually have a slow-onset autoimmune form that requires different treatment.",
      },
    ],
    aboutTreatment: [
      {
        question:
          "What medication do you recommend starting with, and why that one?",
        whyItMatters:
          "Understanding your doctor's reasoning helps you make informed decisions and stay motivated with your treatment plan.",
      },
      {
        question:
          "What A1C level would make you consider adding or changing my medication?",
        whyItMatters:
          "Knowing the benchmarks in advance helps you feel prepared rather than surprised by treatment changes.",
      },
      {
        question: "Are any of my other medications affecting my blood sugar?",
        whyItMatters:
          "Some common medications (like steroids or certain blood pressure drugs) can raise blood sugar, and adjustments may help.",
      },
    ],
    aboutDailyLife: [
      {
        question:
          "How often should I check my blood sugar at home, and what times of day?",
        whyItMatters:
          "Different medications and stages of diabetes call for different monitoring schedules. Your doctor can personalize this for you.",
      },
      {
        question:
          "What should I do on sick days when I can't eat normally or keep medications down?",
        whyItMatters:
          "Illness can cause blood sugar to spike unpredictably. Having a sick-day plan prevents dangerous situations.",
      },
      {
        question: "Is it safe for me to drink alcohol, and if so, how much?",
        whyItMatters:
          "Alcohol interacts with blood sugar in complex ways and can cause dangerous lows, especially with certain medications.",
      },
      {
        question:
          "Should I wear a medical ID bracelet or carry glucose tablets?",
        whyItMatters:
          "If you ever experience a severe low blood sugar episode, these precautions can help others assist you quickly.",
      },
    ],
    aboutOutlook: [
      {
        question:
          "Is it possible to put my diabetes into remission with lifestyle changes?",
        whyItMatters:
          "Research shows some people, especially early in their diagnosis, can achieve remission through significant lifestyle changes. It's worth discussing if this is realistic for you.",
      },
      {
        question:
          "What are the most important things I can do to prevent complications long-term?",
        whyItMatters:
          "Blood sugar management is key, but blood pressure and cholesterol control are equally important for preventing heart disease and other complications.",
      },
      {
        question:
          "How often should I come in for check-ups and blood work going forward?",
        whyItMatters:
          "Regular monitoring catches changes early. Most people with diabetes see their doctor every 3-6 months and get A1C tested 2-4 times per year.",
      },
    ],
    aboutSupport: [
      {
        question:
          "Can you refer me to a Certified Diabetes Educator or diabetes management program?",
        whyItMatters:
          "Diabetes educators are specialists who can spend much more time teaching you day-to-day management skills than a typical doctor's appointment allows.",
      },
      {
        question:
          "Are there any diabetes support groups in our area or online that you recommend?",
        whyItMatters:
          "Connecting with others who understand what you're going through can reduce feelings of isolation and provide practical tips from lived experience.",
      },
      {
        question:
          "What should I tell my family about my diagnosis and how they can support me?",
        whyItMatters:
          "Family support significantly improves diabetes outcomes. Having everyone on the same page about diet and lifestyle changes helps enormously.",
      },
    ],
  },
  clinicalTrialSearchTerm: "Type 2 Diabetes new treatments 2026",
  supportOrganizations: [
    {
      name: "American Diabetes Association (ADA)",
      description:
        "The largest diabetes organization in the U.S. Offers free educational resources, community forums, meal planning guides, local support groups, and a 24/7 helpline (1-800-DIABETES). Their website is an excellent starting point.",
      website: "https://diabetes.org",
    },
    {
      name: "diaTribe",
      description:
        "A patient-focused publication that translates the latest diabetes research into plain language. Excellent for staying up-to-date on new treatments, technology, and practical management tips without the medical jargon.",
      website: "https://diatribe.org",
    },
    {
      name: "Beyond Type 2",
      description:
        "A community built by and for people living with Type 2 Diabetes. Features personal stories, practical guides, and a strong online community where you can connect with others who truly understand what you're going through.",
      website: "https://beyondtype2.org",
    },
  ],
  livingWith: {
    dailyTips: [
      "Start with a 10-minute walk after meals — this is one of the simplest and most effective things you can do to lower post-meal blood sugar spikes.",
      "Fill half your plate with non-starchy vegetables (broccoli, salad, green beans) at every meal to naturally reduce carbohydrate intake.",
      "Keep a small notebook or use an app to track what you eat and your blood sugar readings — patterns will emerge that help you make better choices.",
      "Stay hydrated with water throughout the day. Dehydration can concentrate blood sugar and make readings appear worse.",
      "Set a consistent sleep schedule — poor sleep directly worsens insulin resistance. Aim for 7-8 hours per night.",
      "Learn to read nutrition labels, focusing on total carbohydrates and fiber. Higher fiber foods cause slower, more gentle blood sugar rises.",
      "Keep glucose tablets or juice boxes accessible in your car, desk, and bedside in case of low blood sugar episodes.",
    ],
    watchFor: [
      "Blood sugar readings consistently above 250 mg/dL — contact your doctor to discuss medication adjustments.",
      "Symptoms of very high blood sugar: excessive thirst, frequent urination, blurred vision, or unexplained fatigue.",
      "Symptoms of low blood sugar: shakiness, sweating, rapid heartbeat, confusion, or dizziness — treat immediately with 15 grams of fast-acting carbs.",
      "Any numbness, tingling, or burning sensations in your hands or feet — this could indicate early nerve changes.",
      "Cuts or sores on your feet that heal slowly — check your feet daily and report concerns promptly.",
      "Sudden vision changes — diabetes can affect eye health, and early treatment prevents serious problems.",
    ],
    emotionalHealth:
      "It's completely normal to feel overwhelmed, frustrated, or even angry about a diabetes diagnosis. Many people go through a grieving process for the health they expected to have. Some days managing diabetes will feel like a full-time job on top of everything else in your life — and that's an incredibly valid feeling. Please be gentle with yourself. You don't have to be perfect. Missing a blood sugar check, eating something 'off plan,' or having a high reading does NOT make you a failure. Diabetes management is a marathon, not a sprint, and what matters is the overall trend, not any single moment. If you find that worry about your health is affecting your sleep, relationships, or ability to enjoy life, please talk to your doctor — depression and anxiety are more common in people with diabetes, and there is excellent help available. You deserve support for your emotional health just as much as your physical health.",
    forCaregivers:
      "If someone you love has been diagnosed with Type 2 Diabetes, the most important thing you can do is learn alongside them. Attend a doctor's appointment or diabetes education class together. Make dietary changes as a household rather than singling them out — the whole family benefits from healthier eating. Avoid being the 'food police' — nagging about what they eat creates stress and shame, which actually worsens blood sugar. Instead, offer to cook a healthy meal together, suggest a walk after dinner, or simply ask 'How are you doing with everything?' When they have a bad blood sugar day, resist the urge to problem-solve and instead just listen. Your patience, understanding, and quiet support mean more than you know.",
  },
  kidsVersion: {
    simpleExplanation:
      "You know how a car needs gas to run? Your body needs sugar (called glucose) for energy, kind of like fuel. There's a special helper in your body called insulin that helps the sugar get from your blood into your body's cells where it's needed. With Type 2 Diabetes, the insulin helper isn't working as well as it should, so the sugar stays in the blood instead of going where it needs to go. The doctors and medicines are helping fix this so the body works better.",
    siblingNote:
      "Your family member has something called diabetes. It means their body needs a little extra help handling sugar. You might notice they need to check their blood sugar (a tiny finger prick), take medicine, or be more careful about what they eat. They aren't sick in a way you can catch — you can't get diabetes from being near someone. The best thing you can do is be understanding if they sometimes feel tired or grumpy, and maybe join them on walks or try the healthy foods your family is eating together. You're an important part of helping them feel supported.",
  },
};

export const demoKidsReport = {
  simpleExplanation:
    "You know how you breathe in and out all day without even thinking about it? Air goes through tubes in your body called airways to get to your lungs. With asthma, sometimes those tubes get a little puffy and tight, kind of like when you squeeze a straw — it's harder for the air to get through. That's why sometimes it might feel hard to breathe or you might cough or wheeze (make a whistling sound). The good news is that doctors have really great medicines that help open up those tubes so you can breathe easily again!",
  whatToExpect: [
    {
      title: "You'll have a special action plan",
      description:
        "Your doctor will create a plan just for you that tells you (and the grown-ups around you) exactly what to do if you start feeling wheezy or short of breath. It's like having a superhero instruction manual!",
    },
    {
      title: "You might use an inhaler",
      description:
        "An inhaler is a small device that puffs medicine right into your lungs where it's needed. You might have a 'rescue' inhaler (for when you feel symptoms) and maybe a daily one (to prevent symptoms). It doesn't hurt — it just tastes a little funny.",
    },
    {
      title: "You can still play and be active",
      description:
        "Lots of Olympic athletes have asthma! You can still run, play sports, and do everything your friends do. You might just need to use your inhaler before exercise or take breaks if you need to.",
    },
    {
      title: "You'll learn your triggers",
      description:
        "Certain things might make your asthma act up — like cold air, dust, pet fur, or running really hard. Once you know what bothers YOUR airways, you can be prepared.",
    },
    {
      title: "Some days are better than others",
      description:
        "Sometimes your breathing will be totally fine, and sometimes your asthma might flare up. Both are normal, and it doesn't mean you did anything wrong. The important thing is to always have your rescue inhaler nearby, just in case.",
    },
  ],
  siblingExplanation:
    "Your brother or sister has asthma, which means the breathing tubes in their lungs sometimes get puffy and tight. It's NOT something you can catch — you can't 'get' asthma from being around someone who has it. Sometimes they might cough a lot, breathe funny, or need to use a special device called an inhaler. If that happens, don't panic — just help them find their inhaler or get a grown-up. You can help by not spraying strong perfumes or sprays around them, and by being patient if they need to take a break during active play. The most important thing is that asthma is very manageable and your sibling is going to be just fine!",
  schoolAccommodationLetter:
    "Dear Teacher/School Nurse,\n\nThis letter is to inform you that your student has been diagnosed with asthma. Please ensure the following accommodations are in place:\n\n1. INHALER ACCESS: The student should have unrestricted access to their rescue inhaler at all times, including during physical education, recess, field trips, and testing. Ideally, the student carries their inhaler on their person. A backup inhaler should be kept in the nurse's office.\n\n2. PHYSICAL EDUCATION: The student can participate fully in PE and recess. They may need to use their rescue inhaler 15 minutes before vigorous exercise. If they show signs of breathing difficulty (coughing, wheezing, chest tightness), allow them to stop and rest. Do not require them to 'push through' breathing difficulty.\n\n3. ENVIRONMENTAL TRIGGERS: Please be mindful of common triggers including strong chemical fumes (art supplies, cleaning products), dust, chalk dust, cold air, and pet dander (classroom animals). Good classroom ventilation is helpful.\n\n4. ASTHMA ACTION PLAN: A copy of the student's Asthma Action Plan is attached, which outlines green/yellow/red zone symptoms and specific steps to take for each. Please keep a copy in the classroom and nurse's office.\n\n5. FIELD TRIPS: Ensure rescue inhaler accompanies the student. Identify nearest medical facility at trip destination.\n\n6. MISSED SCHOOL: During asthma flare-ups, the student may miss school. Please provide make-up work without academic penalty.\n\nPlease do not hesitate to contact us or the student's healthcare provider with any questions. Thank you for helping keep our child safe and healthy at school.\n\nSincerely,\n[Parent/Guardian Name]\n[Date]",
  copingActivities: [
    {
      title: "Belly Breathing Practice",
      description:
        "Put a stuffed animal on your belly while lying down. Breathe in slowly through your nose and watch the stuffie rise. Breathe out slowly through your mouth and watch it fall. This 'belly breathing' helps you stay calm and breathe better when your asthma acts up.",
      ageRange: "3-8",
    },
    {
      title: "The Straw Game",
      description:
        "Practice breathing out slowly through a straw — try to make a cotton ball roll across a table using only your breath through the straw. This is actually a fun way to practice the controlled breathing that helps during asthma flares!",
      ageRange: "5-12",
    },
    {
      title: "Asthma Superhero Journal",
      description:
        "Create a journal where you're the superhero who battles the 'Wheeze Monster.' Draw your triggers as villains, your inhaler as your superpower, and track your victories (symptom-free days). This helps you feel in control of your asthma instead of scared by it.",
      ageRange: "6-12",
    },
    {
      title: "Trigger Detective",
      description:
        "Become a detective and track what makes your asthma act up. Keep a log of when symptoms happen, what you were doing, where you were, and what the weather was like. After a few weeks, you'll start to see patterns — and knowing your triggers puts YOU in control.",
      ageRange: "8-17",
    },
    {
      title: "Sports & Asthma Role Models",
      description:
        "Look up famous athletes with asthma: David Beckham (soccer), Jerome Bettis (football), Amy Van Dyken (Olympic swimming), Paula Radcliffe (marathon world record holder). Knowing that world-class athletes manage asthma successfully can be really motivating when you're feeling limited by it.",
      ageRange: "9-17",
    },
    {
      title: "Teach a Friend",
      description:
        "Practice explaining your asthma to a friend or classmate. Something like: 'I have asthma, which means sometimes my breathing tubes get tight. If I start coughing or need my inhaler, it's no big deal — I just need a minute.' Being open about it reduces awkwardness and helps your friends know how to support you.",
      ageRange: "7-17",
    },
  ],
};
