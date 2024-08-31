'use server'

export async function getImages(name: any) {
  const response = await fetch(`https://serpapi.com/search.json?q=${name?.trim()}&api_key=${process.env.NEXT_PUBLIC_SER_API}&engine=google_images&ijn=0`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const result = await response.json();

  return result?.images_results[0]?.original;
}
