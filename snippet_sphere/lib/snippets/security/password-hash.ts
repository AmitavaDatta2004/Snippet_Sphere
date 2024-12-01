import { type CodeSnippet } from '../types';

export const passwordHash: CodeSnippet = {
  id: 'password-hash',
  title: 'Secure Password Hashing',
  description: 'Implementation of secure password hashing using bcrypt',
  language: 'javascript',
  code: `const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

async function verifyPassword(password, hash) {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    throw new Error('Error verifying password');
  }
}`,
  tags: ['security', 'web', 'utility', 'intermediate'],
  author: {
    name: 'Amitava Datta',
    github: 'https://github.com/amitavadatta',
  },
};