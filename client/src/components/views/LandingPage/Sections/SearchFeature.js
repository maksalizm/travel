import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
  
  const [searchTerms, setSearchTerms] = useState('')
  
  const onChangeSearch = (e) => {
    setSearchTerms(e.currentTarget.value);
    
    props.refreshFunction(e.currentTarget.value);
  };
  
  return (
    <div>
      <Search
        value={searchTerms}
        onChange={onChangeSearch}
        placeholder="Search" />
    </div>
  );
}

export default SearchFeature;