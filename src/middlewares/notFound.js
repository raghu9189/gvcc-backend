import express from 'express';

const notFound = (req, res, next) => {
    res.status(404).json({message: 'not found'});
    next();
}

export default notFound;