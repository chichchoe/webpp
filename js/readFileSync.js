const fs = require('fs');
const faker = require('@faker-js/faker/locale/de');

const originData = [];

for (let i = 0; i < 50; i++) {
    originData.push({
        key: faker.datatype.uuid(),
        color: faker.commerce.color(),
        department: faker.commerce.department(),
        productName: faker.commerce.productName(),
        price: +faker.commerce.price(),
        productAdjective: faker.commerce.productAdjective(),
        productMaterial: faker.commerce.productMaterial(),
        productDescription: faker.commerce.productDescription(),
        product: faker.commerce.product(),
    });
}
let student = {
    data: originData,
};
let data = JSON.stringify(student, null, 2);

fs.writeFile('src/config/json/dataProduct.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
console.log('This is after the write call');
