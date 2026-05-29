
import * as rssParser from 'react-native-rss-parser';

 export const fetchFeed = async (req: any, res: any) => {
    const { url } = req.body;
    try { 
        const response = await fetch(url);
        const responseData = await response.text();
        const rss = await rssParser.parse(responseData);
        const items = rss.items;
         for (const item of items) {
            console.log(item)
         }      
         res.status(201).json({message: "Fetch feito com sucesso :)"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro ao buscar o feed" })
    }

};

