import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: object) => {
  console.log('🔐 Generating Access Token for payload:', payload);

  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m',
  });

  console.log('✅ Access Token Generated');
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
    console.log('✔️ Access Token Verified:', decoded);
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
  console.log('🧐 Verifying Refresh Token...');

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    console.log('✔️ Refresh Token Verified:', decoded);
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
