import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: object) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m',
  });
  return token;
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d',
  });
};

export const verifyAccessToken = (token: string) => {
  console.log('🧐 Verifying Access Token...');

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    return decoded;
  } catch (err) {
    if (err instanceof Error) {
      console.log('❌ Invalid Access Token:', err.message);
    } else {
      console.log('❌ Unknown error verifying Access Token:', err);
    }
    throw err;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    return decoded;
  } catch (err) {
    if (err instanceof Error) {
      console.log('❌ Invalid Refresh Token:', err.message);
    } else {
      console.log('❌ Unknown error verifying Refresh Token:', err);
    }
    throw err;
  }
};
