import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  database_url: process.env.DB_URL,
  bcrypt_solt_round: process.env.BCRYPT_SOLT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET,
  payment_url:process.env.PAYMENT_URL,
  signature_key:process.env.SIGNATURE_KEY,
  store_id:process.env.STORE_ID,
  frontend_url:process.env.FRONTEND_URL,
  backend_url:process.env.BACKEND_URL,
};
