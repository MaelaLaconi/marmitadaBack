/**
 * This script is to create index inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('recipes').createIndex(
  { name: 1, author: 1 },
  { unique: true }
);
