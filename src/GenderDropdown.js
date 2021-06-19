import { Dropdown } from 'react-bootstrap';
import React from "react";

export default function GenderDropdown({genderSelected}) {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Select Gender
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onSelect={()=>genderSelected('men')}>Male</Dropdown.Item>
          <Dropdown.Item onSelect={()=>genderSelected('women')}>Female</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
