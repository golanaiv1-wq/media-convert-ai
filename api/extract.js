export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing URL' });

    try {
        // שימוש בכתובת המנוע הרשמית והיציבה ביותר
        const response = await fetch(`https://api.cobalt.tools/api/json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                downloadMode: 'audio',
                audioFormat: 'mp3'
            })
        });

        const data = await response.json();
        
        if (data.url) {
            res.status(200).json({ url: data.url });
        } else {
            // אם המנוע מחזיר שגיאה, נציג אותה
            res.status(500).json({ error: data.text || 'Manoe error' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server connection error' });
    }
}
