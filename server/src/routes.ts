import express from 'express';
import knex from './database/connection';
import multer from 'multer';

import multerConfig from '../src/config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

//Index, show, create, update e delete

//Items
routes.get('/items', itemsController.index);
//Points
routes.post('/points', upload.single('image'), pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
