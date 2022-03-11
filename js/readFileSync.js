const fs = require('fs');
const faker = require('@faker-js/faker/locale/de');

const originData = [];

for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        avatar: faker.image.avatar(),
        phone: faker.phone.phoneNumber(),
        age: faker.datatype.number({ min: 20, max: 40 }),
        address: faker.address.city(),
    });
}
let student = {
    data: originData,
};
let data = JSON.stringify(student, null, 2);

fs.writeFile('src/config/json/data.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
console.log('This is after the write call');
