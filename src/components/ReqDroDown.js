import { Button, Dropdown } from "antd";
import React from "react";
const items = [
    {
      key: '1',
        label:'Male',
    },
    {
      key: '2',
      label:'Female',
    },
    {
      key: '3',
      label:'Other',
    }]
const ReqDroDown = () => {
    const [GenderState,setGenderState] = React.useState(items[0].label)
    return (
    <Dropdown
    menu={{
        items,
        selectable: true,
       // defaultSelectedKeys: ['9'],
        onSelect: ({ item, key, keyPath, selectedKeys, domEvent  }) => {


      }
      }}
    ><Button>{GenderState}</Button>
        </Dropdown>
)}

export default ReqDroDown;