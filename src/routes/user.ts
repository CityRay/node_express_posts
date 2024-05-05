import express from 'express';
import { userController } from '../controllers';
import { handleErrorAsync } from '../services/handleResponse';
import { verifyToken } from '../services/auth';

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
          $gender: 'male',
          $password: 'password',
          $confirmPassword: 'password'
        }
      }
   */
    userController.signup
  )
);

router.post(
  '/signin',
  handleErrorAsync(
    /**
     * #swagger.tags = ['User']
     * #swagger.description = '登入功能'
        #swagger.parameters['post'] = {
        in: 'body',
        description: '登入資料',
        required: true,
        schema: {
          $email: 'email',
          $password: 'password',
        }
      }
   */
    userController.signin
  )
);

router.patch(
  '/updatePassword',
  verifyToken,
  handleErrorAsync(
    /**
     * #swagger.tags = ['User']
     * #swagger.security = [{ "bearerAuth": [] }]
     * #swagger.description = '修改密碼功能'
        #swagger.parameters['patch'] = {
        in: 'body',
        description: '修改密碼',
        required: true,
        schema: {
          $password: 'password',
          $confirmPassword : 'confirmPassword '
        }
      }
   */
    userController.resetPassword
  )
);

export default router;
