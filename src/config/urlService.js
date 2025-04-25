import dotenv from 'dotenv';
dotenv.config();

const urlService = {
    DataBaseUrl: process.env.DATABASE_URL,
    DataPort: process.env.DATABASE_PORT
};

export default urlService;
