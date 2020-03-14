import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';

import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

const Continents = [
  {key: 1, value: "Africa"},
  {key: 2, value: "Europe"},
  {key: 3, value: "Asia"},
  {key: 4, value: "North America"},
  {key: 5, value: "South America"},
  {key: 6, value: "Australia"},
  {key: 7, value: "Antarctica"}
];

function UploadProductPage(props) {
  
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [continentsValue, setContinentsValue] = useState(1);
  const [images, setImages] = useState([]);
  
  const onTitleChange = (e) => {
    setTitleValue(e.currentTarget.value);
  };
  
  const onDescriptionChange = (e) => {
    setDescriptionValue(e.currentTarget.value);
  };
  
  const onPriceChange = (e) => {
    setPriceValue(e.currentTarget.value);
  };
  
  const onContinentSelectChange = (e) => {
    setContinentsValue(e.currentTarget.value);
  };
  
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  
  
  
  const onSubmit = (e) => {
    e.preventDefault();
  
    if(!titleValue || !descriptionValue || !priceValue ||
    !images || !continentsValue) {
      return alert('fill all the fields first');
    }
    
    const postData = {
      writer: props.user.userData._id,
      title: titleValue,
      description: descriptionValue,
      price: priceValue,
      images: images,
      continents: continentsValue
    };
    Axios.post('/api/product/uploadProduct', postData)
      .then(res => {
        if(res.data.success) {
          alert('Product Successfully Uploaded');
          props.history.push('/');
        } else {
          alert('Failed to upload Product')
        }
      });
  };
  
  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <Title level={2}>Upload Travel Product</Title>
      </div>
      <Form action="" onSubmit={onSubmit}>
        <FileUpload refreshFrunction={updateImages}/>
        <br/>
        <br/>
        <label htmlFor="">Title</label>
        <Input
          onChange={onTitleChange}
          value={titleValue}
        />
        <br/>
        <br/>
        <label htmlFor="">Description</label>
        <TextArea
          onChange={onDescriptionChange}
          value={descriptionValue}
        />
        <br/>
        <br/>
        <label htmlFor="">Price($)</label>
        <Input type="number"
               onChange={onPriceChange}
               value={priceValue}
        />
        <select onChange={onContinentSelectChange}>
          {Continents.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}
        </select>
        <br/>
        <br/>
        <Button onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;