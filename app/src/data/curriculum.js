// The shared curriculum. Every language course teaches these same words and
// sentences; translations live in ./lang/<code>.js keyed by lesson id.
// To add content: add a lesson here, then its translations to each language file.

export const curriculum = [
  {
    id: "u1",
    title: "Meet Kobe",
    description: "Greet people, name animals, order food",
    color: "#e0772f",
    lessons: [
      {
        id: "u1l1", title: "Greetings", icon: "👋",
        words: [
          { en: "hello", emoji: "👋" },
          { en: "goodbye", emoji: "🚪" },
          { en: "thank you", emoji: "🙏" },
          { en: "yes", emoji: "✅" },
          { en: "no", emoji: "❌" },
        ],
        sentences: [
          { en: "Hello, Kobe", enAlt: ["Hi, Kobe"] },
          { en: "Goodbye, Kobe", enAlt: ["Bye, Kobe"] },
          { en: "Yes, thank you", enAlt: ["Yes, thanks"] },
          { en: "No, thank you", enAlt: ["No, thanks"] },
          { en: "Thank you, Kobe", enAlt: ["Thanks, Kobe"] },
        ],
      },
      {
        id: "u1l2", title: "Animals", icon: "🐕",
        words: [
          { en: "the dog", emoji: "🐕" },
          { en: "the cat", emoji: "🐈" },
          { en: "the sheep", emoji: "🐑" },
          { en: "the cow", emoji: "🐄" },
          { en: "the horse", emoji: "🐴" },
        ],
        sentences: [
          { en: "Kobe is a dog" },
          { en: "The cat and the dog" },
          { en: "A dog and a sheep" },
          { en: "The cow is big", enAlt: ["The cow is large"] },
          { en: "Kobe loves the sheep", enAlt: ["Kobe loves sheep"] },
        ],
      },
      {
        id: "u1l3", title: "Food", icon: "🍎",
        words: [
          { en: "the water", emoji: "💧" },
          { en: "the bread", emoji: "🍞" },
          { en: "the apple", emoji: "🍎" },
          { en: "the milk", emoji: "🥛" },
          { en: "the cheese", emoji: "🧀" },
        ],
        sentences: [
          { en: "Kobe eats meat", enAlt: ["Kobe is eating meat"] },
          { en: "I drink water", enAlt: ["I am drinking water"] },
          { en: "The bread and the cheese" },
          { en: "She eats an apple", enAlt: ["She is eating an apple"] },
          { en: "You drink milk", enAlt: ["You are drinking milk"] },
        ],
      },
      {
        id: "u1l4", title: "People", icon: "🧑",
        words: [
          { en: "the boy", emoji: "👦" },
          { en: "the girl", emoji: "👧" },
          { en: "the man", emoji: "👨" },
          { en: "the woman", emoji: "👩" },
          { en: "the friend", emoji: "🤝" },
        ],
        sentences: [
          { en: "I am a boy" },
          { en: "She is a woman" },
          { en: "Kobe is my friend" },
          { en: "The man eats bread", enAlt: ["The man is eating bread"] },
          { en: "The girl has a dog" },
        ],
      },
    ],
  },
  {
    id: "u2",
    title: "At the Park",
    description: "Run, play, and teach Kobe tricks",
    color: "#4f86b8",
    lessons: [
      {
        id: "u2l1", title: "Actions", icon: "🏃",
        words: [
          { en: "to run", emoji: "🏃" },
          { en: "to jump", emoji: "🦘" },
          { en: "to play", emoji: "🎾" },
          { en: "to sleep", emoji: "😴" },
          { en: "to eat", emoji: "🍽️" },
        ],
        sentences: [
          { en: "Kobe runs in the park", enAlt: ["Kobe is running in the park"] },
          { en: "The dog jumps", enAlt: ["The dog is jumping"] },
          { en: "I like to play", enAlt: ["I like playing"] },
          { en: "Kobe sleeps a lot" },
          { en: "We play with the ball", enAlt: ["We are playing with the ball"] },
        ],
      },
      {
        id: "u2l2", title: "Outside", icon: "🌳",
        words: [
          { en: "the ball", emoji: "⚽" },
          { en: "the park", emoji: "🏞️" },
          { en: "the tree", emoji: "🌳" },
          { en: "the sun", emoji: "☀️" },
          { en: "the house", emoji: "🏠" },
        ],
        sentences: [
          { en: "The ball is red" },
          { en: "The sun is big", enAlt: ["The sun is large"] },
          { en: "Kobe catches the frisbee", enAlt: ["Kobe is catching the frisbee"] },
          { en: "There is a tree in the park" },
          { en: "The house is small" },
        ],
      },
      {
        id: "u2l3", title: "Colors", icon: "🎨",
        words: [
          { en: "red", emoji: "🔴" },
          { en: "blue", emoji: "🔵" },
          { en: "green", emoji: "🟢" },
          { en: "yellow", emoji: "🟡" },
          { en: "white", emoji: "⚪" },
        ],
        sentences: [
          { en: "The dog is white and black", enAlt: ["The dog is black and white"] },
          { en: "Kobe has a blue eye" },
          { en: "The tree is green" },
          { en: "The sun is yellow" },
          { en: "My house is red" },
        ],
      },
      {
        id: "u2l4", title: "Tricks", icon: "🦴",
        words: [
          { en: "sit", emoji: "🪑" },
          { en: "come", emoji: "👉" },
          { en: "stay", emoji: "✋" },
          { en: "the paw", emoji: "🐾" },
          { en: "the trick", emoji: "🎩" },
        ],
        sentences: [
          { en: "Kobe, sit", enAlt: ["Kobe, sit down","Sit, Kobe"] },
          { en: "Come here, Kobe" },
          { en: "Good dog" },
          { en: "Kobe knows many tricks", enAlt: ["Kobe knows a lot of tricks"] },
          { en: "Give me the paw", enAlt: ["Give me your paw","Shake"] },
        ],
      },
    ],
  },
  {
    id: "u3",
    title: "Everyday Life",
    description: "Family, time, and feelings",
    color: "#3fa66b",
    lessons: [
      {
        id: "u3l1", title: "Family", icon: "👨‍👩‍👧",
        words: [
          { en: "the mother", emoji: "👩" },
          { en: "the father", emoji: "👨" },
          { en: "the brother", emoji: "👦" },
          { en: "the sister", emoji: "👧" },
          { en: "the family", emoji: "👨‍👩‍👧" },
        ],
        sentences: [
          { en: "My family has a dog" },
          { en: "My sister is tall" },
          { en: "He is my father" },
          { en: "My mother reads a book", enAlt: ["My mother is reading a book"] },
          { en: "My brother plays with Kobe", enAlt: ["My brother is playing with Kobe"] },
        ],
      },
      {
        id: "u3l2", title: "Time", icon: "⏰",
        words: [
          { en: "today", emoji: "📅" },
          { en: "tomorrow", emoji: "🌅" },
          { en: "the night", emoji: "🌙" },
          { en: "the day", emoji: "🌞" },
          { en: "now", emoji: "⏰" },
        ],
        sentences: [
          { en: "Today is a good day" },
          { en: "Good night, Kobe" },
          { en: "Tomorrow we go to the park", enAlt: ["Tomorrow we are going to the park"] },
          { en: "Kobe eats now", enAlt: ["Kobe is eating now"] },
          { en: "The night is quiet", enAlt: ["The night is calm"] },
        ],
      },
      {
        id: "u3l3", title: "Feelings", icon: "😊",
        words: [
          { en: "happy", emoji: "😊" },
          { en: "sad", emoji: "😢" },
          { en: "tired", emoji: "🥱" },
          { en: "angry", emoji: "😠" },
          { en: "calm", emoji: "😌" },
        ],
        sentences: [
          { en: "Kobe is happy" },
          { en: "I am tired" },
          { en: "You are sad" },
          { en: "Kobe is hungry" },
          { en: "The cat is angry" },
        ],
      },
    ],
  },
  {
    id: "u4",
    title: "Kobe's Day Out",
    description: "Places, questions, and the weather",
    color: "#9b6bc2",
    lessons: [
      {
        id: "u4l1", title: "Places", icon: "🏖️",
        words: [
          { en: "the beach", emoji: "🏖️" },
          { en: "the store", emoji: "🏪" },
          { en: "the school", emoji: "🏫" },
          { en: "the vet", emoji: "🩺" },
          { en: "the city", emoji: "🏙️" },
        ],
        sentences: [
          { en: "Kobe goes to the beach", enAlt: ["Kobe is going to the beach"] },
          { en: "The store is near", enAlt: ["The store is close","The shop is near"] },
          { en: "Kobe does not want to go to the vet", enAlt: ["Kobe doesn't want to go to the vet"] },
          { en: "My school is big", enAlt: ["My school is large"] },
          { en: "We live in the city" },
        ],
      },
      {
        id: "u4l2", title: "Questions", icon: "❓",
        words: [
          { en: "where", emoji: "📍" },
          { en: "what", emoji: "❓" },
          { en: "who", emoji: "🕵️" },
          { en: "when", emoji: "🗓️" },
          { en: "how", emoji: "🤔" },
        ],
        sentences: [
          { en: "Where is Kobe" },
          { en: "What does the dog eat", enAlt: ["What is the dog eating"] },
          { en: "Who is your friend" },
          { en: "How are you" },
          { en: "When are we going to the park", enAlt: ["When do we go to the park"] },
        ],
      },
      {
        id: "u4l3", title: "Weather", icon: "🌦️",
        words: [
          { en: "the rain", emoji: "🌧️" },
          { en: "the snow", emoji: "❄️" },
          { en: "the wind", emoji: "💨" },
          { en: "the cloud", emoji: "☁️" },
          { en: "hot", emoji: "🔥" },
        ],
        sentences: [
          { en: "It is very hot", enAlt: ["It's very hot"] },
          { en: "Kobe likes the snow", enAlt: ["Kobe likes snow"] },
          { en: "Today it is very windy", enAlt: ["It is very windy today","It's very windy today"] },
          { en: "Kobe does not go out in the rain", enAlt: ["Kobe doesn't go out in the rain"] },
          { en: "There is a cloud in the sky" },
        ],
      },
    ],
  },
];
