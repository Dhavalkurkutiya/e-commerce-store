import { Category } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error('NEXT_PUBLIC_API_URL is not defined');
      return [];
    }

    const res = await fetch(URL, {
      next: { revalidate: 0 },
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch categories:', {
        status: res.status,
        statusText: res.statusText,
        url: URL,
      });
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', {
      error,
      url: URL,
      env: process.env.NEXT_PUBLIC_API_URL,
    });
    return [];
  }
};

export default getCategories;
