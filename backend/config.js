import dotenv from 'dotenv';
dotenv.config();

export default{
    MONGODB_URL : process.env.MONGODB_URL || 'mongodb://localhost/articledb',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || "5000",
}