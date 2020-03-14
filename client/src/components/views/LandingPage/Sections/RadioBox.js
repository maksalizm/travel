import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {
  
  const [value, setValue] = useState();
  
  const renderRadioBox = () => (
    props.list && props.list.map((value) => (
      <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
    ))
  );
  
  const handleChange = (e) => {
    setValue(e.target.value);
    
    props.handleFilters(e.target.value);
  };
  
  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="price" key="1">
          <Radio.Group onChange={handleChange} value={value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
  
}

export default RadioBox;