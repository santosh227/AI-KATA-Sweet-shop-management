import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import database_conn from './src/connection/index.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/auth', authRoutes);


// database connection 
database_conn()

app.listen(process.env.PORT, ()=>{
  console.log(`server created successfully ${process.env.PORT}`);
  
})




