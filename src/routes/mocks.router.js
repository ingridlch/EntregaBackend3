import { Router} from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingpets',mocksController.createPets); // genera 100 mascotas
router.get('/mockingusers',mocksController.createUsers); // genera 50 usuarios
router.post('/generateData',mocksController.createUsersPets); // genera :users y :pets

export default router;