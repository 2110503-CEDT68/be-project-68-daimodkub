const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const MassageShop = require('./models/MassageShop');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const massageShopsData = [
    {
        name: "Siam Serenity Massage",
        address: "123 Sukhumvit Road",
        tel: "02-123-4567",
        opentime: "10:00",
        closetime: "22:00"
    },
    {
        name: "Lotus Leaf Spa",
        address: "456 Silom Road",
        tel: "02-987-6543",
        opentime: "09:00",
        closetime: "21:00"
    },
    {
        name: "Thai Traditional Healing",
        address: "789 Phaya Thai Road",
        tel: "02-555-1234",
        opentime: "08:00",
        closetime: "20:00"
    }
];

// Import into DB
const importData = async () => {
    try {
        await MassageShop.create(massageShopsData);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete data
const deleteData = async () => {
    try {
        await MassageShop.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log("Please use -i to import or -d to delete");
    process.exit();
}
