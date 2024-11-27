export async function getSummary(pageContent: string): Promise<string> {
  const token = process.env.HUGGING_FACE_API_KEY;
  
  if (!token) {
      throw new Error('Токен не знайдено. Будь ласка, перевірте налаштування середовища');
  }

  const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              inputs: JSON.stringify(pageContent),
              parameters: {
                  max_length: 550,
                  min_length: 200,
                  truncation: true,
              },
          }),
      }
  );

  if (!response.ok) {
      throw new Error(`Помилка API: ${response.status} - ${response.statusText}`);
  }

  const result = await response.json();
  
  if (result && result[0] && result[0].summary_text) {
      return result[0].summary_text;
  } else {
      throw new Error('Не вдалося обробити вміст веб-сторінки. Будь ласка, перевірте вхідні дані.');
  }
}
