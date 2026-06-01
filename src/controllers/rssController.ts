
import axios from 'axios'
import iconv from 'iconv-lite'

 export const fetchFeed = async (req: any, res: any) => {
    const { url } = req.body;
    try { 
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        const contentType = String(response.headers['content-type'] || '');
        const match = contentType.match(/charset=([^;]+)/i);
        let charset = match ? match[1].toLowerCase().trim() : 'utf-8';

        if (!match) {
            const head = response.data.slice(0, 200).toString('utf-8');
            const xmlMatch = head.match(/encoding=["'](.*?)["']/i);
            if (xmlMatch) {
                charset = xmlMatch[1].toLowerCase().trim();
            }
        }

        if (!iconv.encodingExists(charset)) {
            charset = 'utf-8';
        }

        const responseData = iconv.decode(response.data, charset);
        res.set('Content-Type', 'text/xml; charset=utf-8');
        return res.send(responseData)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erro ao buscar o feed" })
    }

};

