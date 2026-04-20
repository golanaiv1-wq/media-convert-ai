export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing URL' });

    try {
        // שרת הורדות חלופי ומהיר
        const response = await fetch('https://cobalt.shun.codes/', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                downloadMode: 'audio',
                audioFormat: 'mp3'
            })
        });

        const data = await response.json();
        
        if (data && data.url) {
            return res.status(200).json({ url: data.url });
        } else {
            return res.status(500).json({ error: 'Server is busy', details: data });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Connection failed', message: error.message });
    }
}
