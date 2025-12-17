const Buyer = require('../models/buyerModel');
const bcrypt = require('bcryptjs');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password, location, phone } = req.body;

    const existingBuyer = await Buyer.findOne({ username });
    if (existingBuyer) return res.status(400).json({ message: 'Username already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBuyer = new Buyer({
      username,
      email,
      password: hashedPassword,
      location,
      phone
    });

    await newBuyer.save();

    res.status(201).json({
      user: { id: newBuyer._id, username, email, location, phone }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const buyer = await Buyer.findOne({ username });
    if (!buyer) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    res.status(200).json({
      user: { id: buyer._id, username: buyer.username, email: buyer.email, location: buyer.location, phone: buyer.phone }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};