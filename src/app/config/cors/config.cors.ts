import { CorsOptions } from 'cors';
import { envs } from '@app/config';

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = envs.ALLOWED_ORIGINS;
    // if (process.argv[2] === '--api') allowedOrigins.push(undefined); // For thunder client or Postman run `npm run dev:api`
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};

// export const corsConfig: CorsOptions = {
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };
