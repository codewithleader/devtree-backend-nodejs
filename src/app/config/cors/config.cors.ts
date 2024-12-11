import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173', // TODO: Get from .env
      // 'https://www.example.com',
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      console.log('Origin:', origin);
      callback(null, true);
    } else {
      console.log('nopasó');
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// export const corsConfig: CorsOptions = {
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };
