import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'

const SearchBar = ({ queryText, handleQueryChange, handleSearch }) => {
  return (
    <div className="search-box">
      <InputGroup>
        <Input value={queryText} onChange={handleQueryChange} />
        <InputGroupAddon addonType="append">
          <Button onClick={handleSearch}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default SearchBar