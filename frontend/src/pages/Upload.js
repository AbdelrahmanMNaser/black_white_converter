import React, { useState, useMemo } from "react";
import PageTransition from "./../components/PageTransition";
import UploadInput from "../components/UploadInput";
import ImageForm from "../components/ImageForm";

function Upload() {
  const [imageData, setImageData] = useState({
    file: null,
    preview: null,
    optimize: false,
    percentage: 100,
  });

  const handleImageSelect = (file) => {
    setImageData((prev) => ({
      ...prev,
      file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSettingsChange = useMemo(() => {
    return (settings) => {
      if (!settings) return;
      setImageData((prev) => ({
        ...prev,
        ...settings,
      }));
    };
  }, [setImageData]);

  return (
    <PageTransition>
      <div className="flex h-screen z-30">
        {/* Left Panel - Settings */}
        <div className="w-1/3 p-4 border-r">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          <ImageForm
            selectedImage={imageData.file}
            onSettingsChange={handleSettingsChange}
          />
        </div>

        {/* Right Panel - Upload & Preview */}
        <div className="w-2/3 p-4 bg-gray-50 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            {imageData.file ? (
              <img
                src={imageData.preview}
                alt="Preview"
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <UploadInput
                onImageSelect={handleImageSelect}
                preview={imageData.preview}
              />
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Upload;
