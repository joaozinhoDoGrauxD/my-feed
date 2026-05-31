
import * as rssParser from 'react-native-rss-parser';

 export const fetchFeed = async (req: any, res: any) => {
    const { url } = req.body;
    try { 
        const response = await fetch(url);
        const responseData = await response.text();
        const rss = await rssParser.parse(responseData);
        const items = rss.items;
        const filteredItems = items.map(({title, description, content, authors, published }) => ({title, description, content, authors, published }))
        res.status(200).json({items: filteredItems, message : "Sucesso ao dar fetch "})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro ao buscar o feed" })
    }

};

