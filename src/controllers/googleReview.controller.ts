import { Request, Response } from 'express';
import axios from 'axios';

export const getGoogleReviews = async (_req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = process.env.PLACE_ID;

    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          fields: 'name,rating,reviews',
          key: apiKey,
        },
      }
    );

    const reviews = response.data.result?.reviews?.slice(0, 5) || [];

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error: any) {
    console.error('❌ Error fetching Google reviews:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch Google reviews',
    });
  }
};
