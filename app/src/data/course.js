// Spanish for English speakers. Shared by the client and the API server.
// Each lesson lists vocabulary (with an emoji for picture questions) and
// example sentences. Exercises are generated from these at lesson start.

export const course = {
  id: 'es-en',
  title: 'Spanish',
  flag: '🇪🇸',
  learningLang: 'es-ES',
  units: [
    {
      id: 'u1',
      title: 'Meet Kobe',
      description: 'Greet people, name animals, order food',
      color: '#e0772f',
      lessons: [
        {
          id: 'u1l1',
          title: 'Greetings',
          icon: '👋',
          words: [
            { es: 'hola', en: 'hello', emoji: '👋' },
            { es: 'adiós', en: 'goodbye', emoji: '🚪' },
            { es: 'gracias', en: 'thank you', emoji: '🙏' },
            { es: 'sí', en: 'yes', emoji: '✅' },
            { es: 'no', en: 'no', emoji: '❌' },
          ],
          sentences: [
            { es: 'Hola, Kobe', en: 'Hello, Kobe', enAlt: ['Hi, Kobe'] },
            { es: 'Adiós, Kobe', en: 'Goodbye, Kobe', enAlt: ['Bye, Kobe'] },
            { es: 'Sí, gracias', en: 'Yes, thank you', enAlt: ['Yes, thanks'] },
            { es: 'No, gracias', en: 'No, thank you', enAlt: ['No, thanks'] },
            { es: 'Gracias, Kobe', en: 'Thank you, Kobe', enAlt: ['Thanks, Kobe'] },
          ],
        },
        {
          id: 'u1l2',
          title: 'Animals',
          icon: '🐕',
          words: [
            { es: 'el perro', en: 'the dog', emoji: '🐕' },
            { es: 'el gato', en: 'the cat', emoji: '🐈' },
            { es: 'la oveja', en: 'the sheep', emoji: '🐑' },
            { es: 'la vaca', en: 'the cow', emoji: '🐄' },
            { es: 'el caballo', en: 'the horse', emoji: '🐴' },
          ],
          sentences: [
            { es: 'Kobe es un perro', en: 'Kobe is a dog' },
            { es: 'El gato y el perro', en: 'The cat and the dog' },
            { es: 'Un perro y una oveja', en: 'A dog and a sheep' },
            { es: 'La vaca es grande', en: 'The cow is big', enAlt: ['The cow is large'] },
            { es: 'Kobe ama las ovejas', en: 'Kobe loves the sheep', enAlt: ['Kobe loves sheep'] },
          ],
        },
        {
          id: 'u1l3',
          title: 'Food',
          icon: '🍎',
          words: [
            { es: 'el agua', en: 'the water', emoji: '💧' },
            { es: 'el pan', en: 'the bread', emoji: '🍞' },
            { es: 'la manzana', en: 'the apple', emoji: '🍎' },
            { es: 'la leche', en: 'the milk', emoji: '🥛' },
            { es: 'el queso', en: 'the cheese', emoji: '🧀' },
          ],
          sentences: [
            { es: 'Kobe come carne', en: 'Kobe eats meat', enAlt: ['Kobe is eating meat'] },
            { es: 'Yo bebo agua', en: 'I drink water', enAlt: ['I am drinking water'] },
            { es: 'El pan y el queso', en: 'The bread and the cheese' },
            { es: 'Ella come una manzana', en: 'She eats an apple', enAlt: ['She is eating an apple'] },
            { es: 'Tú bebes leche', en: 'You drink milk', enAlt: ['You are drinking milk'] },
          ],
        },
        {
          id: 'u1l4',
          title: 'People',
          icon: '🧑',
          words: [
            { es: 'el niño', en: 'the boy', emoji: '👦' },
            { es: 'la niña', en: 'the girl', emoji: '👧' },
            { es: 'el hombre', en: 'the man', emoji: '👨' },
            { es: 'la mujer', en: 'the woman', emoji: '👩' },
            { es: 'el amigo', en: 'the friend', emoji: '🤝' },
          ],
          sentences: [
            { es: 'Yo soy un niño', en: 'I am a boy' },
            { es: 'Ella es una mujer', en: 'She is a woman' },
            { es: 'Kobe es mi amigo', en: 'Kobe is my friend' },
            { es: 'El hombre come pan', en: 'The man eats bread', enAlt: ['The man is eating bread'] },
            { es: 'La niña tiene un perro', en: 'The girl has a dog' },
          ],
        },
      ],
    },
    {
      id: 'u2',
      title: 'At the Park',
      description: 'Run, play, and teach Kobe tricks',
      color: '#4f86b8',
      lessons: [
        {
          id: 'u2l1',
          title: 'Actions',
          icon: '🏃',
          words: [
            { es: 'correr', en: 'to run', emoji: '🏃' },
            { es: 'saltar', en: 'to jump', emoji: '🦘' },
            { es: 'jugar', en: 'to play', emoji: '🎾' },
            { es: 'dormir', en: 'to sleep', emoji: '😴' },
            { es: 'comer', en: 'to eat', emoji: '🍽️' },
          ],
          sentences: [
            { es: 'Kobe corre en el parque', en: 'Kobe runs in the park', enAlt: ['Kobe is running in the park'] },
            { es: 'El perro salta', en: 'The dog jumps', enAlt: ['The dog is jumping'] },
            { es: 'Me gusta jugar', en: 'I like to play', enAlt: ['I like playing'] },
            { es: 'Kobe duerme mucho', en: 'Kobe sleeps a lot' },
            { es: 'Nosotros jugamos con la pelota', en: 'We play with the ball', enAlt: ['We are playing with the ball'] },
          ],
        },
        {
          id: 'u2l2',
          title: 'Outside',
          icon: '🌳',
          words: [
            { es: 'la pelota', en: 'the ball', emoji: '⚽' },
            { es: 'el parque', en: 'the park', emoji: '🏞️' },
            { es: 'el árbol', en: 'the tree', emoji: '🌳' },
            { es: 'el sol', en: 'the sun', emoji: '☀️' },
            { es: 'la casa', en: 'the house', emoji: '🏠' },
          ],
          sentences: [
            { es: 'La pelota es roja', en: 'The ball is red' },
            { es: 'El sol es grande', en: 'The sun is big', enAlt: ['The sun is large'] },
            { es: 'Kobe atrapa el frisbi', en: 'Kobe catches the frisbee', enAlt: ['Kobe is catching the frisbee'] },
            { es: 'Hay un árbol en el parque', en: 'There is a tree in the park' },
            { es: 'La casa es pequeña', en: 'The house is small' },
          ],
        },
        {
          id: 'u2l3',
          title: 'Colors',
          icon: '🎨',
          words: [
            { es: 'rojo', en: 'red', emoji: '🔴' },
            { es: 'azul', en: 'blue', emoji: '🔵' },
            { es: 'verde', en: 'green', emoji: '🟢' },
            { es: 'amarillo', en: 'yellow', emoji: '🟡' },
            { es: 'blanco', en: 'white', emoji: '⚪' },
          ],
          sentences: [
            { es: 'El perro es blanco y negro', en: 'The dog is white and black', enAlt: ['The dog is black and white'] },
            { es: 'Kobe tiene un ojo azul', en: 'Kobe has a blue eye' },
            { es: 'El árbol es verde', en: 'The tree is green' },
            { es: 'El sol es amarillo', en: 'The sun is yellow' },
            { es: 'Mi casa es roja', en: 'My house is red' },
          ],
        },
        {
          id: 'u2l4',
          title: 'Tricks',
          icon: '🦴',
          words: [
            { es: 'siéntate', en: 'sit', emoji: '🪑' },
            { es: 'ven', en: 'come', emoji: '👉' },
            { es: 'quieto', en: 'stay', emoji: '✋' },
            { es: 'la pata', en: 'the paw', emoji: '🐾' },
            { es: 'el truco', en: 'the trick', emoji: '🎩' },
          ],
          sentences: [
            { es: 'Kobe, siéntate', en: 'Kobe, sit', enAlt: ['Kobe, sit down', 'Sit, Kobe'] },
            { es: 'Ven aquí, Kobe', en: 'Come here, Kobe' },
            { es: 'Buen perro', en: 'Good dog' },
            { es: 'Kobe sabe muchos trucos', en: 'Kobe knows many tricks', enAlt: ['Kobe knows a lot of tricks'] },
            { es: 'Dame la pata', en: 'Give me the paw', enAlt: ['Give me your paw', 'Shake'] },
          ],
        },
      ],
    },
    {
      id: 'u3',
      title: 'Everyday Life',
      description: 'Family, time, and feelings',
      color: '#3fa66b',
      lessons: [
        {
          id: 'u3l1',
          title: 'Family',
          icon: '👨‍👩‍👧',
          words: [
            { es: 'la madre', en: 'the mother', emoji: '👩' },
            { es: 'el padre', en: 'the father', emoji: '👨' },
            { es: 'el hermano', en: 'the brother', emoji: '👦' },
            { es: 'la hermana', en: 'the sister', emoji: '👧' },
            { es: 'la familia', en: 'the family', emoji: '👨‍👩‍👧' },
          ],
          sentences: [
            { es: 'Mi familia tiene un perro', en: 'My family has a dog' },
            { es: 'Mi hermana es alta', en: 'My sister is tall' },
            { es: 'Él es mi padre', en: 'He is my father' },
            { es: 'Mi madre lee un libro', en: 'My mother reads a book', enAlt: ['My mother is reading a book'] },
            { es: 'Mi hermano juega con Kobe', en: 'My brother plays with Kobe', enAlt: ['My brother is playing with Kobe'] },
          ],
        },
        {
          id: 'u3l2',
          title: 'Time',
          icon: '⏰',
          words: [
            { es: 'hoy', en: 'today', emoji: '📅' },
            { es: 'mañana', en: 'tomorrow', emoji: '🌅' },
            { es: 'la noche', en: 'the night', emoji: '🌙' },
            { es: 'el día', en: 'the day', emoji: '🌞' },
            { es: 'ahora', en: 'now', emoji: '⏰' },
          ],
          sentences: [
            { es: 'Hoy es un buen día', en: 'Today is a good day' },
            { es: 'Buenas noches, Kobe', en: 'Good night, Kobe' },
            { es: 'Mañana vamos al parque', en: 'Tomorrow we go to the park', enAlt: ['Tomorrow we are going to the park'] },
            { es: 'Kobe come ahora', en: 'Kobe eats now', enAlt: ['Kobe is eating now'] },
            { es: 'La noche es tranquila', en: 'The night is quiet', enAlt: ['The night is calm'] },
          ],
        },
        {
          id: 'u3l3',
          title: 'Feelings',
          icon: '😊',
          words: [
            { es: 'feliz', en: 'happy', emoji: '😊' },
            { es: 'triste', en: 'sad', emoji: '😢' },
            { es: 'cansado', en: 'tired', emoji: '🥱' },
            { es: 'enojado', en: 'angry', emoji: '😠' },
            { es: 'tranquilo', en: 'calm', emoji: '😌' },
          ],
          sentences: [
            { es: 'Kobe está feliz', en: 'Kobe is happy' },
            { es: 'Yo estoy cansado', en: 'I am tired' },
            { es: 'Estás triste', en: 'You are sad' },
            { es: 'Kobe tiene hambre', en: 'Kobe is hungry' },
            { es: 'El gato está enojado', en: 'The cat is angry' },
          ],
        },
      ],
    },
    {
      id: 'u4',
      title: "Kobe's Day Out",
      description: 'Places, questions, and the weather',
      color: '#9b6bc2',
      lessons: [
        {
          id: 'u4l1',
          title: 'Places',
          icon: '🏖️',
          words: [
            { es: 'la playa', en: 'the beach', emoji: '🏖️' },
            { es: 'la tienda', en: 'the store', emoji: '🏪' },
            { es: 'la escuela', en: 'the school', emoji: '🏫' },
            { es: 'el veterinario', en: 'the vet', emoji: '🩺' },
            { es: 'la ciudad', en: 'the city', emoji: '🏙️' },
          ],
          sentences: [
            { es: 'Kobe va a la playa', en: 'Kobe goes to the beach', enAlt: ['Kobe is going to the beach'] },
            { es: 'La tienda está cerca', en: 'The store is near', enAlt: ['The store is close', 'The shop is near'] },
            { es: 'Kobe no quiere ir al veterinario', en: 'Kobe does not want to go to the vet', enAlt: ["Kobe doesn't want to go to the vet"] },
            { es: 'Mi escuela es grande', en: 'My school is big', enAlt: ['My school is large'] },
            { es: 'Vivimos en la ciudad', en: 'We live in the city' },
          ],
        },
        {
          id: 'u4l2',
          title: 'Questions',
          icon: '❓',
          words: [
            { es: 'dónde', en: 'where', emoji: '📍' },
            { es: 'qué', en: 'what', emoji: '❓' },
            { es: 'quién', en: 'who', emoji: '🕵️' },
            { es: 'cuándo', en: 'when', emoji: '🗓️' },
            { es: 'cómo', en: 'how', emoji: '🤔' },
          ],
          sentences: [
            { es: 'Dónde está Kobe', en: 'Where is Kobe' },
            { es: 'Qué come el perro', en: 'What does the dog eat', enAlt: ['What is the dog eating'] },
            { es: 'Quién es tu amigo', en: 'Who is your friend' },
            { es: 'Cómo estás', en: 'How are you' },
            { es: 'Cuándo vamos al parque', en: 'When are we going to the park', enAlt: ['When do we go to the park'] },
          ],
        },
        {
          id: 'u4l3',
          title: 'Weather',
          icon: '🌦️',
          words: [
            { es: 'la lluvia', en: 'the rain', emoji: '🌧️' },
            { es: 'la nieve', en: 'the snow', emoji: '❄️' },
            { es: 'el viento', en: 'the wind', emoji: '💨' },
            { es: 'la nube', en: 'the cloud', emoji: '☁️' },
            { es: 'caliente', en: 'hot', emoji: '🔥' },
          ],
          sentences: [
            { es: 'Hace mucho calor', en: 'It is very hot', enAlt: ["It's very hot"] },
            { es: 'A Kobe le gusta la nieve', en: 'Kobe likes the snow', enAlt: ['Kobe likes snow'] },
            { es: 'Hoy hay mucho viento', en: 'Today it is very windy', enAlt: ['It is very windy today', "It's very windy today"] },
            { es: 'Kobe no sale con la lluvia', en: 'Kobe does not go out in the rain', enAlt: ["Kobe doesn't go out in the rain"] },
            { es: 'Hay una nube en el cielo', en: 'There is a cloud in the sky' },
          ],
        },
      ],
    },
  ],
};

export const allLessons = course.units.flatMap((u, ui) =>
  u.lessons.map((l, li) => ({ ...l, unitId: u.id, unitIndex: ui, lessonIndex: li, color: u.color })),
);

export function findLesson(id) {
  return allLessons.find((l) => l.id === id);
}
