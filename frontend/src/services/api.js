import Axios from '../axiosConfig';

export const convertImage = async (imageFile, threshold, optimize) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('threshold', threshold);
  formData.append('optimize', optimize);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    console.log('Sending request to server...', {
      file: imageFile.name,
      threshold,
      optimize
    });
    
    const response = await Axios.post('/convert', formData, config);
    console.log('Server response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('API Error:', error.response || error);
    throw new Error(error.response?.data?.error || 'Failed to convert image');
  }
}