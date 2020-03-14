import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { FaCode } from "react-icons/fa";
import { Card, Col, Icon, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';

function LandingPage() {
  
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    continents: [],
    price: []
  });
  
  useEffect(() => {
    const postData = {
      skip,
      limit
    };
    getProducts(postData);
  }, []);
  
  const getProducts = (postData) => {
      Axios.post('/api/product/getProducts', postData)
           .then(res => {
             if (res.data.success) {
               if(postData.loadMore) {
                 setProducts([...products, ...res.data.products]);
                 setPostSize(res.data.postSize)
               } else {
                 setProducts([...res.data.products])
               }
             } else {
               alert('Failed to fetch product datas')
             }
           })
    }
  ;
  
  
  const onLoadMore = (postData) => {
    let nextSkip = skip + limit;
    
    postData = {
      skip: nextSkip,
      limit,
      loadMore: true
    };
    
    getProducts(postData);
    setSkip(nextSkip);
  };
  
  const renderCards = products.map((product, index) => {
    return <Col lg={6} md={8} xs={24} key={index}>
      <Card hoverable={true} cover={<ImageSlider images={product.images}/>}>
        <Meta
          title={product.title}
          description={`$${product.price}`}
        />
      </Card>
    </Col>
  });
  
  const showFilteredResults = (paramFilters) => {
  
    const postData = {
      skip: 0,
      limit,
      filters: paramFilters
    };
    getProducts(postData);
    
    setSkip(0);
  };
  
  const handleFilters = (paramFilters, category) => {
    const newFilters = {...filters};
    
    newFilters[category] = paramFilters;
    
    if(category === "price") {
    
    }
    
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };
  
  return (
    <div style={{width: "75%", margin: "3rem auto"}}>
      <div style={{textAlign: "center"}}>
        <h2> Let's Travel Anywhere <Icon type="rocket"/></h2>
      </div>
      <CheckBox
        handleFilters={paramFilters => handleFilters(paramFilters, 'continents')}
      />
      {products.length === 0 ?
        <div style={{display: "flex", height: "300px", justifyContent: "center", alignItems: "center"}}>
          <h2>No post yes...</h2>
        </div> :
        <div>
          <Row gutter={[16, 16]}>
            {renderCards}
          </Row>
        </div>
      }
      <br/>
      <br/>
      {postSize  >= limit &&
        <div style={{display: "flex", justifyContent: "center"}}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      }
    </div>
  )
}

export default LandingPage;
