import express from 'express';
import db from '../db/connection.js';

const users = async(req, res) => {
    res.status(201).json({ message: req.user });
  }

export {users};