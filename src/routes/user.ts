import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get(
  '/',
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '取得所有User資料'
   */
  /* #swagger.responses[200] = {
      description: '取得所有User資料',
      schema: {
        "data": [{
          "_id": "661f4919e7a934d777e3cf1f",
          "name": "XXX",
          "photo": "https://thispersondoesnotexist.com/"
        }]
      }
    }
  */

  userController.getUserList
);

router.get(
  '/:id',
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '取得User資料'
   */
  /**
    #swagger.responses[200] = {
      description: '取得User資料',
      schema: {
        "data": {
          "_id": "661f4919e7a934d777e3cf1f",
          "name": "XXX",
          "photo": "https://thispersondoesnotexist.com/"
        }
      }
    }
  */
  userController.getUser
);

export default router;
