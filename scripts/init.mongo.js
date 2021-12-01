/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert people array
db.getCollection('recipes').insertMany([
  {
    category:'sweet',
    name: 'Tadragée maison',
    description: 'Comment faire de délicieux dragées à la maison avecs trois fois rien',
    author: {
      pseudo: 'Giuseppe'
    },
    ingredients: [
      'Amandes, si possible bio',
      'Sucre en poudre',
      'sucre vanillé (facultatif ou vanille liquide)',
      'Eau',
      '1/4 sucre',
      '1/4 gomme arabique en poudre',
      '1/2 eau',
    ],
    steps: [
      'Torréfier pendant environ 8 à 9 minutes, les amandes, dans un four préchauffé à 200° en les remuant régulièrement pour unifier la torréfaction.',
      'Mettre les amandes dans la tadaturbine.',
      'Dans une casserole, mélanger ensemble le sucre et la gomme arabique, ajouter l\'eau puis porter à ébullition en mélangeant bien pour homogénéiser le sirop.',
      'Verser un peu de sirop sur les amandes afin de les enrober correctement en laissant tourner la turbine .',
      'Dans une casserole, porter à ébullition du sucre avec 1/3 de son poids en eau (exemple : 150 g de sucre pour 50 g d\'eau).',
      'Monter les blancs en neige ferme.',
      'Ajouter un peu de sucre vanillé (la quantité dépend du goût de chacun)',
      'A ébullition, retirer du feu',
      'Obtenir un sirop à 80% de matières sèches en corrigeant, si nécessaire, la concentration par un apport supplémentaire d\'eau ou le prolongement de la cuisson.',
    ],
    difficulty: 8,
    preparationTime: 120,
    cookingTime: 20,
  },

  {
    category:'sweet',
    name: 'Tadaramisu',
    description: 'Un dessert italien à base de mascarponne, de biscuit boudoire, de sucre et de café',
    author: {
      pseudo: 'Giuseppe'
    },
    ingredients: [
      '3 oeufs',
      '250g de mascarponne',
      '100g de sucre',
      '20cl de café fort',
      '5cl d\'amaretto',
      '20 biscuit cuillères',
      '15g de cacao en poudre',
    ],
    steps: [
      'Préparer un café bien fort.',
      'Séparer les blancs des jaunes d\'oeufs.',
      'Réserver les blancs au réfrigérateur.',
      'Fouetter vivement le sucre aux jaunes d\'oeufs jusqu\'à obtenir un mélange blanchissant.',
      'Mélanger la mascarpone au mélange jaune d\'oeufs/sucre jusqu\'à obtenir un mélange homogène.',
      'Monter les blancs en neige ferme.',
      'Incorporer délicatement les blancs dans le mélange mascarpone/jaune d\'oeufs.',
      'Pour le montage, imbiber légérement les biscuits dans le café et disposer les sur le fond de votre moule.',
      'Recouvrir la première couche de biscuit avec la préparation à base de mascarponne.',
      'Répéter autant que nécessaire ou possible, et finir par une couche de préparation mascarponne.',
      'Laisser refroidir au réfrigérateur. Avant de servir saupoudrer de poudre de cacao.',
    ],
    difficulty: 3,
    preparationTime: 20,
    cookingTime: 0,
  },
  {
    category:'salty',
    name: 'Eau tadagazeuse',
    description: 'De l\'eau gazéifié au carbone de diamants',
    author: {
      firstname: 'Nigel',
      lastname: 'Braun',
      pseudo: 'NileRed',
    },
    ingredients: [
      '1L d\'eau du robinet',
      '10g de diamants'
    ],
    steps: [
      'Déposer les diamants dans un tube en quartz.',
      'Brûler les diamants et récupérer le gaz carbonique dans un ballon.',
      'Refroidir le diamants partis en fûmés pour les compresser dans une bonbonne de votre machine de gazéification de boisson.',
      'Remplir une gourde d\'eau du robinet.',
      'Gazéifier votre eau du robinet avec votre gaz carbonique de diamant pour obtenir de l\'eau tadagazeuse !',
    ],
    difficulty: 5,
    preparationTime: 120,
    cookingTime: 30,
  },
]);
// display the final initial data
db.getCollection('recipes').find({});
