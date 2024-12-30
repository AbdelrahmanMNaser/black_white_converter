import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import OriginalImage from '../components/OriginalImage';
import ConvertedImage from '../components/ConvertedImage';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalImage, convertedImageUrl } = location.state || {};

  // Create full URL for converted image
  const fullConvertedImageUrl = convertedImageUrl 
    ? `http://localhost:5000${convertedImageUrl}`
    : null;

  return (
    <PageTransition>
      <div className="min-h-screen p-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Back to Upload
          </button>
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <OriginalImage image={originalImage} />
          </div>
          <div className="flex-1">
            <ConvertedImage imageUrl={fullConvertedImageUrl} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Result;