import express from 'express';
import { userController } from '../controllers';
import { handleErrorAsync } from '../services/handleResponse';

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

  handleErrorAsync(userController.getUserList)
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
  handleErrorAsync(userController.getUser)
);

router.post(
  '/signup',
  handleErrorAsync(
    /**
     * #swagger.tags = ['User']
     * #swagger.description = '註冊功能'
        #swagger.parameters['post'] = {
        in: 'body',
        description: '註冊資料',
        required: true,
        schema: {
          $name: 'name',
          $email: 'email',
          $password: 'password',
          $confirmPassword: 'password'
        }
      }
   */
    userController.signup
  )
);
export default router;
