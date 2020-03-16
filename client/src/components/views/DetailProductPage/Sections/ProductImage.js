import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';



function ProductImage(props) {
  
  const [images, setImages] = useState([]);
  
  useEffect(()=> {
    let tempImages = [];
    if( props.detail.images && props.detail.images.length > 0 ) {
      props.detail.images && props.detail.images.map(item => {
        tempImages.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`
        })
      })
    }
    setImages(tempImages);
  }, [props.detail]);
  
  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
}

export default ProductImage;
