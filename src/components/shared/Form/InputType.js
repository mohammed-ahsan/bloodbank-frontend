import React from "react";
import {Input } from "antd";
const InputType = ({
  labelText,
  labelFor,
  inputType,
  value,
  onChange,
  name,
}) => {
  return (
    <>
      <div className="flex flex-row">
        <label  className="flex flex-row mr-2" >
          {labelText} <p></p>:
        </label>
        <Input
        
          type={inputType}
          className="bg-gray-100  rounded-lg "
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputType;
