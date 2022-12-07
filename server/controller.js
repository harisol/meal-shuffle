import fs from 'fs';
import express from 'express';
import { sendMessage } from './rabbitmq-service.js';
import { addUser } from './user-service.js';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
 export const register = (req, res) => {
    const { password, name, email } = req.body;
    if (!password || !name || !email) {
        return res.status(400).json({ message: 'please fill required data'});
    }

    addUser(name, email, password).then(() => {
        res.json({ message: 'register succeeded' });
    });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
 export const getUserProfile = (req, res) => {
    res.json({ user: req.user });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const listMeal = (req, res) => {
    const meals = [
        { name: 'Rice', price: 5000 },
        { name: 'Chicken', price: 15000 }
    ] 
    res.json({ meals });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const login = (req, res) => {
    const viewFile = fs.readFileSync('./server/login-form.html', 'utf-8');
    res.send(viewFile);
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/api/login');
    });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const publishMessage = (req, res) => {
    sendMessage('hello')
    res.json({message: 'message published'})
}
