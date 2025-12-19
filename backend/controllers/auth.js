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

    // 1. Find the buyer
    const buyer = await Buyer.findOne({ username });
    if (!buyer) return res.status(400).json({ message: 'Wrong username' });

    // 2. NEW: Check if the buyer is blocked due to flags
    if (buyer.FlagS && buyer.FlagS.length > 50) {
      return res.status(403).json({ 
        message: 'This account has been suspended due to multiple reports from sellers.' 
      });
    }

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) return res.status(400).json({ message: 'Wrong password' });
    // console.log(buyer.FlagS ? buyer.FlagS.length : 0);
    // 4. Success
    res.status(200).json({
      user: { 
        id: buyer._id, 
        username: buyer.username, 
        email: buyer.email, 
        location: buyer.location, 
        phone: buyer.phone,
        flagCount: buyer.FlagS ? buyer.FlagS.length : 0
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 75cd1e026c71340e749b9e58fd7614d9fb4154cc
