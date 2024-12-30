import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertImage } from '../services/api';

const ImageForm = ({ selectedImage }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [threshold, setThreshold] = useState(128);
  const [optimize, setOptimize] = useState(false);
  const [percentage, setPercentage] = useState(100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await convertImage(
        selectedImage,
        threshold,
        optimize ? percentage : 100
      );
      
      navigate('/result', { 
        state: { 
          originalImage: selectedImage,
          convertedImageUrl: result.output_path
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Threshold
          </label>
          <input
            type="range"
            min="0"
            max="255"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{threshold}</span>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="optimize"
            checked={optimize}
            onChange={(e) => setOptimize(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="optimize" className="text-gray-700">
            Optimize image size
          </label>
        </div>

        {optimize && (
          <div className="flex flex-col space-y-2">
            <label htmlFor="percentage" className="text-gray-700">
              Optimization percentage:
            </label>
            <input
              type="number"
              id="percentage"
              value={percentage}
              onChange={(e) => setPercentage(Math.min(100, Math.max(1, e.target.value)))}
              min="1"
              max="100"
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !selectedImage}
        className={`w-full py-3 px-4 rounded-md text-white font-medium
          ${loading 
            ? 'bg-gray-400 cursor-not-allowed'
            : selectedImage 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
      >
        {loading ? 'Converting...' : 'Convert Image'}
      </button>
    </form>
  );
};

export default ImageForm;