import React, { useEffect, useState } from 'react';

const ConvertedImage = ({ imageUrl }) => {
  const [imageInfo, setImageInfo] = useState({
    resolution: '0x0',
    size: '0 KB'
  });

  useEffect(() => {
    if (imageUrl) {
      // Get image resolution and size
      fetch(imageUrl)
        .then(response => {
          const size = response.headers.get('content-length');
          const sizeInKB = (size / 1024).toFixed(2);
          return { sizeInKB, blobPromise: response.blob() };
        })
        .then(({ sizeInKB, blobPromise }) => {
          const sizeText = sizeInKB > 1024 
            ? `${(sizeInKB / 1024).toFixed(2)} MB` 
            : `${sizeInKB} KB`;
          return blobPromise.then(blob => ({ sizeText, blob }));
        })
        .then(({ sizeText, blob }) => {
          const img = new Image();
          img.src = URL.createObjectURL(blob);
          img.onload = () => {
            setImageInfo({
              resolution: `${img.width}x${img.height}`,
              size: sizeText
            });
          };
        });
    }
  }, [imageUrl]);

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Converted Image</h3>
      <div className="relative w-full aspect-square">
        <img
          src={imageUrl}
          alt="Converted"
          className="object-contain w-full h-full"
        />
      </div>
      <div className="w-full mt-4 space-y-2">
        <p className="text-sm text-gray-600">
          Resolution: {imageInfo.resolution}
        </p>
        <p className="text-sm text-gray-600">
          File size: {imageInfo.size}
        </p>
      </div>
    </div>
  );
};

export default ConvertedImage;