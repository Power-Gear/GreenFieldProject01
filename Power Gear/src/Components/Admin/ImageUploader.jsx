import React from 'react';
import { uploadImage } from './cloudinaryService';

const ImageUploader = () => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await uploadImage(file);
    console.log('Uploaded image URL:', imageUrl);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUploader;
