import React, { useEffect, useState } from 'react';

const OriginalImage = ({ image }) => {
  const [imageInfo, setImageInfo] = useState({
    resolution: '0x0',
    size: '0 KB'
  });

  useEffect(() => {
    if (image) {
      // Get image resolution
      const img = new Image();
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        setImageInfo(prev => ({
          ...prev,
          resolution: `${img.width}x${img.height}`
        }));
      };

      // Get file size
      const sizeInKB = (image.size / 1024).toFixed(2);
      const sizeText = sizeInKB > 1024 
        ? `${(sizeInKB / 1024).toFixed(2)} MB` 
        : `${sizeInKB} KB`;
      
      setImageInfo(prev => ({
        ...prev,
        size: sizeText
      }));
    }
  }, [image]);

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Original Image</h3>
      <div className="relative w-full aspect-square">
        <img
          src={image ? URL.createObjectURL(image) : ''}
          alt="Original"
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

export default OriginalImage;