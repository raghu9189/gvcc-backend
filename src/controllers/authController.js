import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/connection.js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const register = async (req, res) => {
    const { full_name, email, password } = req.body;
    try {
      const checkUserExists = `SELECT id FROM user WHERE email = '${email}';`;
      db.query(checkUserExists, async (error, results)=>{
        if (error) throw error;
        if(results.length == 0){

          // Hash the password before storing it
          const password_hash = await bcrypt.hash(password, 10);
          const insertUser = `INSERT INTO user (id, full_name, email, password_hash) VALUES ('${uuidv4()}', '${full_name}', '${email}', '${password_hash}');`;
          db.query(insertUser, (error, results)=>{
            if (error) throw error;
            return res.status(201).json({ message: 'User registered successfully' });
          });
        }else{
          return res.status(403).json({ message: 'User already exists, Login with existsing credentials!' });
        }
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Registration failed!' });
    }
}

const login = async (req, res) => {

  const { email, password } = req.body;
    try {
      const checkUserExists = `SELECT id, email, password_hash, role FROM user WHERE email = '${email}';`;
      db.query(checkUserExists, async (error, results)=>{
        if (error) throw error;
        
        if(results.length == 0){
          return res.status(404).json({message: 'User does not exists, Please register with your email address!'});
        }

        if(results[0].email === email){
          const userData = results[0];

          // Compare the hashed password
          const isPasswordValid = await bcrypt.compare(password, userData.password_hash);
          if (!isPasswordValid) {
              return res.status(400).json({message: 'Invalid password entered!'});
          }

          const accessToken = jwt.sign({sub: userData.id, role: userData.role}, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1h'});
          const refreshToken = jwt.sign({sub: userData.id, role: userData.role}, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1d'});
          
          return res
          .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
          .header('Authorization', accessToken)
          .status(200)
          .json({
            accessToken: accessToken, 
            refreshToken: refreshToken});
        }
      });
    }catch(error) {
        res.status(500).json({ message: 'Login failed' });
    }
}

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
    return res.status(401).json({message: 'Access Denied. No refresh token provided.'});
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = jwt.sign({ sub: decoded.sub, role: decoded.role }, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1h'});
    const newRefreshToken = jwt.sign({sub: decoded.sub, role: decoded.role}, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1d'});
    return res
      .cookie('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'strict' })
      .header('Authorization', accessToken)
      .status(201)
      .send({accessToken: accessToken, refreshToken: newRefreshToken});
  } catch (error) {
    return res.status(400).json({message: 'Invalid refresh token.'});
  }
}

export {register, login, refreshToken};