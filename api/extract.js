export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing URL' });

    try {
        // פנייה למנוע ההורדה החיצוני
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
            res.status(500).json({ error: 'Could not extract audio' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
