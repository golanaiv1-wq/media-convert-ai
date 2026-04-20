export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing URL' });

    try {
        const response = await fetch('https://api.cobalt.tools/', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                videoQuality: '720',
                downloadMode: 'audio',
                audioFormat: 'mp3',
                filenamePattern: 'basic'
            })
        });

        const data = await response.json();
        
        // בגרסה החדשה התשובה נמצאת בשדה data.url או data.text
        if (data && data.url) {
            return res.status(200).json({ url: data.url });
        } else {
            return res.status(500).json({ error: 'Cobalt error', details: data });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server fetch failed', message: error.message });
    }
}
