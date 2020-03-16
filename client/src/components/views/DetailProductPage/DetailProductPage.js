import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Col, Row } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

function DetailProductPage(props) {
  
  const productId = props.match.params.productId;
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(res => {
        setProduct(res.data[0]);
      })
    
    
  },[]);
  
  return (
    <div className="postPage" style={{width: '100%', padding: '3rem 4rem'}}>
      <div style={{display: 'flex', justifyContnet: 'center'}}>
        <h1>{product.title}</h1>
      </div>
      <br/>
      
      <Row gutter={[16,16]}>
        <Col lg={12} xs={24}>
          <ProductImage detail={product} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo detail={product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
