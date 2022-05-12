const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:4200' : 'http://45.32.134.40';
