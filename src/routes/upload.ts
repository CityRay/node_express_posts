import express from 'express';
import { uploadService } from '../services/upload';
import { uploadController } from '../controllers';
import { handleErrorAsync } from '../services/handleResponse';
import { isAuth } from '../services/auth';

const router = express.Router();

router.post(
  '/image',
  isAuth,
  uploadService,
  /**
   * #swagger.tags = ['Upload']
   * #swagger.security = [{ "bearerAuth": [] }]
   * #swagger.description = '上傳圖片(限制 1MB 以下)'
   * #swagger.consumes = ['multipart/form-data']
   *  #swagger.parameters['file'] = {
        in: 'formData',
        type: 'file',
        required: 'true',
        description: 'File data',
      }
    #swagger.responses[200] = {
        description: '路徑',
        schema: {
          "data": [{
            "url": "xxxxxxxxxxxxxxxx"
          }]
        }
      }
  */
  handleErrorAsync(uploadController.uploadImage)
);

export default router;
