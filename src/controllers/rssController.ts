
import * as rssParser from 'react-native-rss-parser';

 export const fetchFeed = async (req: any, res: any) => {
    const { url } = req.body;
    try { 
        const response = await fetch(url);
        const responseData = await response.text();
        const rss = await rssParser.parse(responseData);
        const items = rss.items;
        console.log(`Total de items ${items.length}`) 
        console.log(items[0]) 
         res.status(200).json({items: items, message : "Sucesso ao dar fetch "})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro ao buscar o feed" })
    }

};

