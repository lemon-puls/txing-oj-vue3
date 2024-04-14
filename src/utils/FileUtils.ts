// 压缩图片并返回压缩后的 File 对象
export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const maxWidth = 800; // 压缩后的最大宽度
        const maxHeight = 800; // 压缩后的最大高度
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob as Blob], file.name, {
              type: "image/jpeg",
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          0.5
        ); // 控制压缩质量，范围为 0 - 1，数值越小质量越差
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// 调用compressImage方法对图片进行压缩
export const handleImageCompression = (file: File) => {
  compressImage(file)
    .then((compressedFile: File) => {
      // 对压缩后的文件进行处理
      // console.log("压缩后的文件：", compressedFile);
      // 在这里可以将压缩后的文件上传至服务器等操作
    })
    .catch((error) => {
      // console.error("压缩图片出错：", error);
    });
};

// // 使用示例
// const fileInput = document.getElementById("fileInput") as HTMLInputElement;
// fileInput.addEventListener("change", () => {
//   const file = fileInput.files?.[0];
//   if (file) {
//     handleImageCompression(file);
//   }
// });

// 根据图片地址获取 Blob 对象
export const getBlobFromImageUrl = async (imageUrl: string): Promise<Blob> => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return blob;
};

// 将 Blob 对象转换为 File 对象
export const getFileByImgUrl = async (imgUrl: string, fileName?: string) => {
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const myFileName = fileName ? fileName : Date.now().toString();
  const file = new File([blob], myFileName, { type: blob.type });
  return file;
};

// 使用示例
// const imageUrl = "https://example.com/image.jpg"; // 图片地址
// const fileName = "image.jpg"; // 文件名
//
// getBlobFromImageUrl(imageUrl)
//   .then((blob: Blob) => {
//     const file = blobToFile(blob, fileName);
//     console.log("创建的 File 对象：", file);
//
//     // 现在你可以对创建的 File 对象进行进一步操作，比如上传至服务器等
//   })
//   .catch((error) => {
//     console.error("获取 Blob 对象出错：", error);
//   });
