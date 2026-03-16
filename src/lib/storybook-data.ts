/* ------------------------------------------------------------------ */
/*  Book Recommendations by Condition                                  */
/* ------------------------------------------------------------------ */

export interface BookRecommendation {
  title: string;
  author: string;
  description: string;
}

export const bookRecommendations: Record<string, BookRecommendation[]> = {
  asthma: [
    { title: "Just Ask! Be Different, Be Brave, Be You", author: "Sonia Sotomayor", description: "Celebrates kids of all abilities, including a character with asthma." },
    { title: "I Have Asthma", author: "Golden Books", description: "Shows kids that with proper care, asthma can be managed and kids can live happy, active lives." },
  ],
  autism: [
    { title: "A Friend for Henry", author: "Jenn Bailey", description: "Henry has autism and wants a friend. A gentle story about connection." },
    { title: "El Deafo", author: "Cece Bell", description: "A girl turns her hearing aid into a superpower. Newbery Honor graphic novel." },
    { title: "ThunderBoom", author: "Jack Briglio", description: "Luke can't speak but transforms into a superhero in his imagination." },
  ],
  "down syndrome": [
    { title: "Unstoppable", author: "Various", description: "A boy with Down syndrome goes on a superhero journey and learns what makes him truly unstoppable." },
    { title: "Superb (Comic Series)", author: "Lion Forge", description: "Jonah, a teenager with Down syndrome, discovers superpowers of strength and telepathy." },
  ],
  wheelchair: [
    { title: "Olive's Extraordinary Journey", author: "Natalie Lloyd", description: "Olive and her wheelchair take on adventures and she discovers she doesn't want to be anyone else." },
    { title: "Zoom!", author: "Robert Munsch", description: "Lauretta's 92-speed wheelchair gets her a speeding ticket! A funny, empowering story." },
  ],
  diabetes: [
    { title: "Just Ask!", author: "Sonia Sotomayor", description: "Features Justice Sotomayor's own experience with diabetes." },
  ],
  "cerebral palsy": [
    { title: "Karmzah (Comic)", author: "Farida Bedwei", description: "A superheroine with cerebral palsy fights to protect her community. Created by an author with CP." },
    { title: "Howie Helps Himself", author: "Joan Fassler", description: "Howie has cerebral palsy and wants to move his wheelchair by himself." },
  ],
  "hearing loss": [
    { title: "El Deafo", author: "Cece Bell", description: "Cece's hearing aid becomes her superpower. Newbery Honor graphic novel." },
    { title: "Dancing Hands", author: "Joanna Que", description: "A beautiful story about friendship through Filipino sign language." },
  ],
  epilepsy: [
    { title: "Team Supreme (Comic)", author: "Josh Leonard", description: "A team of kid superheroes with different disabilities including epilepsy." },
  ],
  cancer: [
    { title: "The Invisible String", author: "Patrice Karst", description: "A comforting story about the unbreakable connection between loved ones, even during hard times." },
  ],
  adhd: [
    { title: "Percy Jackson & the Olympians", author: "Rick Riordan", description: "The hero has ADHD and dyslexia — which turn out to be signs he's a demigod. His differences are his strengths." },
  ],
  anxiety: [
    { title: "Wemberly Worried", author: "Kevin Henkes", description: "Wemberly worries about everything — until she finds a friend who understands." },
  ],
  default: [
    { title: "Just Ask! Be Different, Be Brave, Be You", author: "Sonia Sotomayor", description: "A beautiful book about how every child's differences make the world more interesting and richer." },
    { title: "Team Supreme", author: "Josh Leonard", description: "Kid superheroes with different disabilities banding together to save the day." },
  ],
};

export function getBookRecommendations(condition: string): BookRecommendation[] {
  const lower = condition.toLowerCase();
  for (const [key, books] of Object.entries(bookRecommendations)) {
    if (key === 'default') continue;
    if (lower.includes(key)) return books;
  }
  return bookRecommendations.default;
}

/* ------------------------------------------------------------------ */
/*  Storybook Types                                                    */
/* ------------------------------------------------------------------ */

export interface StoryIllustration {
  description: string;
  mood: string;
  colors: string[];
}

export interface StoryPage {
  pageNumber: number;
  text: string;
  illustration: StoryIllustration;
}

export interface StoryConditionInfo {
  forKids: string;
  forParents: string;
}

export interface GeneratedStory {
  title: string;
  dedication: string;
  pages: StoryPage[];
  aboutTheCondition: StoryConditionInfo;
}

export interface StorybookData {
  story: GeneratedStory;
  childName: string;
  childAge: number;
  condition: string;
  recommendations: BookRecommendation[];
  createdAt: string;
}

/* ------------------------------------------------------------------ */
/*  Demo Story: "Sam and the Breathing Dragon"                         */
/* ------------------------------------------------------------------ */

export const demoStory: GeneratedStory = {
  title: "Sam and the Breathing Dragon",
  dedication: "For Sam, who is braver than they know",
  pages: [
    {
      pageNumber: 1,
      text: "Sam loved two things more than anything in the world: their golden retriever Biscuit, and running as fast as the wind across Maple Park.",
      illustration: {
        description: "A child with a big smile running through a sunny park with a golden retriever beside them",
        mood: "joyful",
        colors: ["#F5D98C", "#87CEEB", "#90EE90"],
      },
    },
    {
      pageNumber: 2,
      text: "But sometimes, when Sam ran really fast, their chest would feel tight — like a tiny dragon had curled up inside, breathing hot, huffy air.",
      illustration: {
        description: "The child stopping mid-run, hand on chest, with a tiny friendly cartoon dragon on their shoulder looking concerned",
        mood: "gentle concern",
        colors: ["#FFB347", "#DDA0DD", "#FFF8E7"],
      },
    },
    {
      pageNumber: 3,
      text: '"That\'s your asthma," Mom said one day. "It means the little tunnels in your lungs sometimes get puffy and tight. But guess what? You have a secret weapon."',
      illustration: {
        description: "A mom kneeling down to child's level, holding a small inhaler that glows softly, in a warm kitchen",
        mood: "warm, reassuring",
        colors: ["#FFF8E7", "#FFB5C2", "#F5D98C"],
      },
    },
    {
      pageNumber: 4,
      text: 'Mom held up a small, blue inhaler. "This," she whispered, "is a Dragon Whisper. One puff, and it tells the dragon to calm right down. Cool, right?"',
      illustration: {
        description: "Close-up of the child holding a glowing blue inhaler like a magic wand, sparkles around it",
        mood: "magical, empowering",
        colors: ["#A8D8EA", "#F5D98C", "#E8E8FF"],
      },
    },
    {
      pageNumber: 5,
      text: "Sam practiced using the Dragon Whisper. Breathe in slowly... hold it... breathe out like blowing birthday candles. The tiny dragon purred happily.",
      illustration: {
        description: "The child breathing calmly with eyes closed, the tiny dragon curled up peacefully, sparkles and soft clouds around them",
        mood: "peaceful, focused",
        colors: ["#E8E8FF", "#B5D99C", "#FFF8E7"],
      },
    },
    {
      pageNumber: 6,
      text: "The next day at the park, Sam ran and ran and RAN. Biscuit barked with joy. The dragon stayed quiet. The Dragon Whisper had worked!",
      illustration: {
        description: "The child running joyfully through the park again, dog running alongside, wind in their hair, bright sunny day",
        mood: "triumphant, free",
        colors: ["#87CEEB", "#F5D98C", "#90EE90"],
      },
    },
    {
      pageNumber: 7,
      text: 'Then Sam heard a sound. Their friend Maya was sitting on a bench, wheezing. "My chest... feels tight," Maya said, looking scared.',
      illustration: {
        description: "Another child sitting on a park bench looking worried, hand on chest, while Sam approaches with concern",
        mood: "concern, empathy",
        colors: ["#FFB5C2", "#FFF8E7", "#DDA0DD"],
      },
    },
    {
      pageNumber: 8,
      text: '"I know what that is!" Sam said, sitting next to Maya. "You might have a little dragon too. It\'s not scary — it just means your lungs need some help sometimes."',
      illustration: {
        description: "Sam sitting next to Maya on the bench, arm around her shoulder, explaining with a brave smile",
        mood: "brave, kind",
        colors: ["#F5D98C", "#FFB5C2", "#A8D8EA"],
      },
    },
    {
      pageNumber: 9,
      text: "Sam taught Maya the birthday candle breathing. In through the nose... out through the mouth... slow and steady. Maya's face relaxed. The tightness eased.",
      illustration: {
        description: "Both children sitting together doing breathing exercises, with tiny friendly dragons on their shoulders looking peaceful",
        mood: "calm, connected",
        colors: ["#B5D99C", "#E8E8FF", "#FFF8E7"],
      },
    },
    {
      pageNumber: 10,
      text: '"You should tell your mom about the dragon," Sam said. "She\'ll get you a Dragon Whisper too. And then nothing can stop you."',
      illustration: {
        description: "Sam and Maya standing up together, both looking brave and happy, golden retriever wagging tail beside them",
        mood: "empowering, friendship",
        colors: ["#F5D98C", "#FFB347", "#A8D8EA"],
      },
    },
    {
      pageNumber: 11,
      text: 'Maya smiled the biggest smile. "Thanks, Sam. You\'re the bravest person I know." And Sam stood a little taller, because maybe Maya was right.',
      illustration: {
        description: "Maya hugging Sam, both smiling, with sparkles and a warm glow around them, the park in golden hour light",
        mood: "proud, warm",
        colors: ["#FFB347", "#FFB5C2", "#F5D98C"],
      },
    },
    {
      pageNumber: 12,
      text: "And every night before bed, Sam would whisper to Biscuit: \"I'm not just a kid with asthma. I'm Sam the Dragon Tamer. And tomorrow, we run again.\"",
      illustration: {
        description: "The child in bed with golden retriever curled up beside them, tiny dragon sleeping peacefully at the foot of the bed, moonlight through the window",
        mood: "peaceful, proud",
        colors: ["#A8D8EA", "#FFF8E7", "#F5D98C"],
      },
    },
  ],
  aboutTheCondition: {
    forKids: "Asthma means the tiny tubes in your lungs sometimes get puffy and tight. Your inhaler sends special medicine that calms them right down. Lots of amazing people have asthma — even Olympic athletes! Having asthma doesn't mean you can't run, play, and do everything you love. It just means you have an extra tool in your pocket.",
    forParents: "This story uses metaphor to help children understand asthma in non-frightening terms. The 'dragon' represents the chest tightness, and the inhaler is reframed as the child's tool of power — not a burden, but a superpower. Research shows that children who understand their condition and feel a sense of agency over their treatment have better adherence to medication and better health outcomes. The story also models teaching others, which reinforces the child's own understanding and builds confidence.",
  },
};

/* ------------------------------------------------------------------ */
/*  Common conditions for the form                                     */
/* ------------------------------------------------------------------ */

export const COMMON_CONDITIONS = [
  "Asthma",
  "Diabetes (Type 1)",
  "Cancer",
  "Epilepsy",
  "Autism",
  "ADHD",
  "Down Syndrome",
  "Cerebral Palsy",
  "Food Allergies",
  "Sickle Cell Disease",
  "Cystic Fibrosis",
  "Hearing Loss",
  "Vision Loss",
  "Wheelchair User",
  "Limb Difference",
  "Anxiety",
  "Speech Delay",
  "Heart Condition",
];

export const FAVORITE_THINGS = {
  Animals: ["Dogs", "Cats", "Horses", "Dinosaurs", "Butterflies"],
  Activities: ["Soccer", "Drawing", "Dancing", "Swimming", "Reading", "Music", "Cooking", "Space", "Building"],
  Characters: ["Superheroes", "Princesses", "Pirates", "Astronauts", "Wizards", "Knights", "Mermaids"],
  Colors: ["Red", "Blue", "Pink", "Purple", "Green", "Gold", "Rainbow"],
};

export const STORY_TONES = [
  { value: "adventure", label: "Adventure", emoji: "🌟", description: "A quest to explore" },
  { value: "superhero", label: "Superhero", emoji: "🦸", description: "Discover their power" },
  { value: "fantasy", label: "Fantasy", emoji: "🧚", description: "Magical creatures help" },
  { value: "everyday", label: "Everyday Hero", emoji: "🌈", description: "Helping others" },
];
