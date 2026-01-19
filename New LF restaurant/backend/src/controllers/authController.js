import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();

const generateToken = (id, role, hotelId) => {
    return jwt.sign({ id, role, hotelId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

import fs from 'fs';

export const signup = async (req, res) => {
    const logData = `\n[${new Date().toISOString()}] REQUEST BODY: ${JSON.stringify(req.body)}`;
    fs.appendFileSync('debug_log.txt', logData);
    console.log('SIGNUP REQUEST BODY:', req.body);
    const { name, email, password, phone, address, gender, age, job, image } = req.body;

    try {
        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER', // Default role
                phone,
                address,
                gender,
                age: age ? parseInt(age) : null,
                job,
                image
            },
        });
        fs.appendFileSync('debug_log.txt', `\n[${new Date().toISOString()}] CREATED USER: ${JSON.stringify(user)}`);

        if (user) {
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                age: user.age,
                job: user.job,
                image: user.image,
                token: generateToken(user.id, user.role, null),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { hotel: true }
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                age: user.age,
                job: user.job,
                image: user.image,
                hotelId: user.hotel ? user.hotel.id : null,
                token: generateToken(user.id, user.role, user.hotel ? user.hotel.id : null),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, phone, address, gender, age, job, image } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                phone,
                address,
                gender,
                age: age ? parseInt(age) : undefined,
                job,
                image
            },
        });

        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            address: updatedUser.address,
            gender: updatedUser.gender,
            age: updatedUser.age,
            job: updatedUser.job,
            image: updatedUser.image,
            token: generateToken(updatedUser.id, updatedUser.role, null),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
