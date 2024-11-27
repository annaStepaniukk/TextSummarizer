export async function getAnswer(question: string, context: string): Promise<string> {
    const token = process.env.HUGGING_FACE_API_KEY;
    
    if (!token) {
        throw new Error('Токен не знайдено. Будь ласка, перевірте налаштування середовища');
    }

    const response = await fetch(
        'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: {
                    question: question,
                    context: context,
                },
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Помилка API: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.answer) {
        return result.answer;
    } else {
        throw new Error('Неможливо знайти відповідь. Будь ласка, перевірте вхідні дані.');
    }
}
