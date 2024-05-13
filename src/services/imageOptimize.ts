import sharp from 'sharp';

// 圖片壓縮服務
export const imageOptimize = async (file: Express.Multer.File): Promise<Buffer> => {
  return await new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('請選擇圖片'));
    } else {
      sharp(file.buffer)
        // 浮水印功能
        .composite([
          {
            input: './public/images/mark.jpg',
            blend: 'lighten',
            gravity: 'southeast',
            top: 30,
            left: 30
          }
        ])
        // .composite([
        //   {
        //     input: {
        //       text: {
        //         text: 'Just a test !!!',
        //         justify: true,
        //         width: 180,
        //         height: 35,
        //         align: 'center'
        //       }
        //     }
        //   }
        // ])
        .jpeg({ mozjpeg: true })
        .toBuffer()
        .then((bufferData) => {
          resolve(bufferData);
        })
        .catch(() => {
          reject(new Error('圖片上傳失敗'));
        });
    }
  });
};
