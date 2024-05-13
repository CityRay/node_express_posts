import { firebaseAdmin } from '../connections/firebase';
import { v4 as uuidv4 } from 'uuid';
import { handleResponse, handleAppError } from '../services/handleResponse';
import { type NextFunction, type Request, type Response } from 'express';
import { type GetSignedUrlConfig } from '@google-cloud/storage';

const bucket = firebaseAdmin.storage().bucket();

export const uploadController = {
  // 上傳圖片
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    const files = req.files as Express.Multer.File[];
    if (!files?.length) {
      handleAppError(400, '請選擇圖片', next);
      return;
    }

    const file = files[0];
    const fileName = `images/${uuidv4()}.${file.originalname.split('.').pop()}`;
    // 建立一個 blob 物件
    const blob = bucket.file(fileName);
    // 建立一個可以寫入 blob 的物件
    const blobStream = blob.createWriteStream();

    // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
    blobStream.on('finish', () => {
      // 設定檔案的存取權限
      const config: GetSignedUrlConfig = {
        action: 'read', // 權限
        expires: '06-31-2024' // 網址的有效期限
      };

      // 取得檔案的網址
      blob
        .getSignedUrl(config)
        .then((url) => {
          handleResponse(res, { url }, '上傳成功');
        })
        .catch(() => {
          handleAppError(500, '上傳失敗', next);
        });
    });

    // 如果上傳過程中發生錯誤，會觸發 error 事件
    blobStream.on('error', () => {
      handleAppError(500, '上傳失敗', next);
    });

    // 將檔案的 buffer 寫入 blobStream
    blobStream.end(file.buffer);
  }
};
