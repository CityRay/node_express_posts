import express from 'express';
import { userController } from '../controllers';
import { handleErrorAsync } from '../services/handleResponse';
import { isAuth } from '../services/auth';

const router = express.Router();

router.get(
  '/profile',
  isAuth,
  /**
   * #swagger.tags = ['User']
   * #swagger.security = [{ "bearerAuth": [] }]
   * #swagger.description = '取得個人資料'
      #swagger.responses[200] = {
        description: '個人資料',
        schema: {
          "data": [{
            "_id": "xxxxxxxxxxxxxxxx",
            "name": "XXX",
            "email": "",
            "photo": "https://thispersondoesnotexist.com/",
            "gender": "male",
            "phone": "09xxxxxxxx",
          }]
        }
      }
  */
  handleErrorAsync(userController.getProfile)
);

router.patch(
  '/profile',
  isAuth,
  /**
   * #swagger.tags = ['User']
   * #swagger.security = [{ "bearerAuth": [] }]
   * #swagger.description = '修改個人資料'
      #swagger.parameters['patch'] = {
        in: 'body',
        description: '修改個人資料',
        required: true,
        schema: {
          $name: 'name',
          $gender: 'male',
          $phone: '09xxxxxxxx',
          $photo: 'https://thispersondoesnotexist.com/'
        }
      }
  */
  handleErrorAsync(userController.updateProfile)
);

router.post(
  '/sign_up',
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
  handleErrorAsync(userController.signup)
);

router.post(
  '/sign_in',
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
  handleErrorAsync(userController.signin)
);

router.patch(
  '/updatePassword',
  isAuth,
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
  handleErrorAsync(userController.resetPassword)
);

export default router;
