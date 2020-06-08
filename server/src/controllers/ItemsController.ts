import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                name: item.title,
                //image_url: `http://localhost:3333/uploads/${item.image}` // - web only
                image_url: `http://192.168.100.102:3333/uploads/${item.image}` // - mobile + web
            }
        }); 
    
        return response.json(serializedItems);
    }
}

export default ItemsController;
