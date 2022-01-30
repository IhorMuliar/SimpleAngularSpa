var faker = require('@faker-js/faker');

var database = { products: []};

for (var i = 1; i<= 10; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    quantity: faker.datatype.number(),
    description: faker.lorem.sentences(),
    imageUrl: "https://source.unsplash.com/1600x900/?product"
  });
}

console.log(JSON.stringify(database));