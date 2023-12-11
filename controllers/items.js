const User = require('../models/user')
const Item = require('../models/item')

const storeItems = [];

module.exports = {
    index,
    // updateUserItem
}

// async function updateUserItem(req, res) {
//     try {
//         // Assuming the selected item's value is sent in the request body
//         const selectedItemValue = req.body.radio;

//         // Find the user (you might want to use the user ID instead of 'yourGoogleId')
//         const user = await User.findOne(req.user._id);

//         // Add the selected item to the user's items array
//         user.items.push({ image: selectedItemValue, name: 'Item Name', cost: 10 }); // Modify accordingly

//         // Save the user to update the items array
//         await user.save();

//         res.redirect('/'); // Redirect to the user's profile or another appropriate page
//     } catch (error) {
//         console.error('Error updating user items:', error);
//         // Handle the error or render an error page
//         res.status(500).send('Internal Server Error');
//     }
// };

async function index(req, res) {
    const items = await Item.find({})
    res.render('items/index', {
        items, 
        title: 'All Store Items'
    })
}


// seedStore();