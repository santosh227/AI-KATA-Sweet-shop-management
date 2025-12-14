import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET_CODE;

// POST /api/auth/register
export const register_user = async (req, res) => {
  try {
    console.log('Incoming body:', req.body);

    const { name, email, password } = req.body;
     // valid data or not 
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }
    // find if exist email
    const existing = await User.findOne({ email });
    console.log('Existing user:', existing);

    if (existing) {
      // if email all ready exists return 409
      return res.status(409).json({ message: 'Email already registered' });
    }
    // password hasing for security in database
    const hashed = await bcrypt.hash(password, 10);
   
    // creating an new user
    const user = await User.create({ name, email, password: hashed });
    console.log('User created:', user._id);
     // jwt token 
    const token_secret = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }

    );
    // success reponse
    res.status(201).json({
      token_secret,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    // error res
    console.error('Register error:', err);
    res.status(500).json({ message: 'error from server side' });
  }
};



// POST /api/auth/login
export const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;
     // validating detials
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
     // find user from db
    const user = await User.findOne({ email });
    // if not exist
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // if user exist , compare password with registerd pass
    const match = await bcrypt.compare(password, user.password);
    // if not match the pass
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // generating token for 1 day 
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
  // seccess res
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    // if err occured
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
