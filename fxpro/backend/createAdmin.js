const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel'); // make sure this path is correct

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    const existingAdmin = await User.findOne({ email: 'fellowz9771@gmail.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = await User.create({
      name: 'Admin',
      email: 'fellowz9771@gmail.com',
      password: 'admin123', // plain text for now; can hash later
      isAdmin: true,
      wallet: 0
    });

    console.log('Admin created:', admin);
    process.exit();
  })
  .catch(err => console.error(err));
