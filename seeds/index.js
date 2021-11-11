const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '618a3fbcb287b81942868fad',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto id amet ipsam atque eaque, reprehenderit harum autem rem placeat quis repellat unde ipsum ullam nam pariatur! Quo quod harum ipsa?",
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dumfnxt6s/image/upload/v1636638598/YelpCamp/phlt736x0alkrjpglaxw.jpg',
                    filename: 'YelpCamp/phlt736x0alkrjpglaxw',
                },
                {
                    url: 'https://res.cloudinary.com/dumfnxt6s/image/upload/v1636638598/YelpCamp/xho8c6vwp6sx9a84swm0.jpg',
                    filename: 'YelpCamp/xho8c6vwp6sx9a84swm0',
                },
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

