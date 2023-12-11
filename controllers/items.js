const User = require('../models/user')
const Item = require('../models/item')

module.exports = {
    index,
}

const storeItems = [];

// for (let i = 1; i <= 50; i++) {
//     const newItem = {
//         image: `/images/weapons/${i}.png`,
//         name: `Weapon`,
//         cost: Math.floor(Math.random() * 1000) + 1,
//     };
//     storeItems.push(newItem);
// }

// for (let i = 1; i <= 50; i++) {
//     const newItem = {
//         image: `/images/books/${i}.png`,
//         name: `Book`,
//         cost: Math.floor(Math.random() * 1000) + 1,
//     };
//     storeItems.push(newItem);
// }

// for (let i = 1; i <= 50; i++) {
//     const newItem = {
//         image: `/images/alchemy/${i}.png`,
//         name: `Alchemy Item`,
//         cost: Math.floor(Math.random() * 1000) + 1,
//     };
//     storeItems.push(newItem);
// }

// for (let i = 1; i <= 50; i++) {
//     const newItem = {
//         image: `/images/boots/${i}.png`,
//         name: `Boots`,
//         cost: Math.floor(Math.random() * 1000) + 1,
//     };
//     storeItems.push(newItem);
// }

// for (let i = 1; i <= 50; i++) {
//     const newItem = {
//         image: `/images/mushrooms/${i}.png`,
//         name: `Mushroom`,
//         cost: Math.floor(Math.random() * 1000) + 1,
//     };
//     storeItems.push(newItem);
// }

// console.log(storeItems);

// async function seedStore() {
//     try {
//         await Item.deleteMany({});
//         await Item.insertMany(storeItems);
//         console.log('Store items seeded successfully.');
//     } catch (error) {
//         console.error('Error seeding store items:', error);
//     }
// }

// async function index(req, res) {
//     const items = await Item.find({})
//     res.render('items/index', {
//         items, 
//         title: 'All Store Items'
//     })
// }


// seedStore();