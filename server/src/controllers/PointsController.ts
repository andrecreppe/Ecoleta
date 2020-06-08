import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items).split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                //image_url: `http://localhost:3333/uploads/${point.image}` // - web only
                image_url: `http://192.168.100.102:3333/uploads/${point.image}` // - mobile + web
            }
        }); 

        return response.json(serializedPoints);
    }

    async create(request: Request, response: Response) {
        //Quando se sabe a estrutura do body, eu posso desmembrar a variável em várias outras
        //Desestruturação do javascript
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;

        //Transaction -> vai indicar quando as múltiplas querrys executam corretamente
        const trx = await knex.transaction();

        //Short syntax - ao invez de name = name, pode deixar lá só isso
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
          };

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                };
            }
        );

        await trx('point_items').insert(pointItems);

        await trx.commit();

        return response.json({
        id: point_id,
        ...point,
        });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point) { 
            return response.status(400).json({ message: 'Point not found.' });
        }

        const serializedPoint = {
            ...point,
            //image_url: `http://localhost:3333/uploads/${point.image}` // - web only
            image_url: `http://192.168.100.102:3333/uploads/${point.image}` // - mobile + web
        };

        //SELECT * FROM items JOIN point_items ON items.id = point_items.item_id WHERE point_items.point_id = $id

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id);

        return response.json({ point: serializedPoint, items});
    }
}

export default PointsController;
