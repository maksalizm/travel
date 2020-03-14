import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';

import FileUpload from '../../utils/FileUpload';

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
  const [Images, setImages] = useState([]);
  
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
  
  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <Title level={2}>Upload Travel Product</Title>
      </div>
      <Form action="">
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
        <Button
          onClick>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;