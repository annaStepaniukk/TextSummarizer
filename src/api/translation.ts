import { Language } from "../enums/languages";

export async function translateText(
    fromLanguage: Language, 
    toLanguage: Language, 
    text: string
): Promise<string> {
    const token = process.env.HUGGING_FACE_API_KEY;
    
    if (!token) {
        throw new Error('Токен не знайдено. Будь ласка, перевірте налаштування середовища');
    }

    const response = await fetch(
        `https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-${fromLanguage}-${toLanguage}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: text,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Помилка API: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result && result[0] && result[0].translation_text) {
        return result[0].translation_text;
    } else {
        throw new Error('Не вдалося здійснити переклад. Перевірте вхідні дані.');
    }
}