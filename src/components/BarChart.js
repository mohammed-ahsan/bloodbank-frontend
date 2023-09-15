import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { ConfigProvider, Space } from 'antd';
const DemoColumn = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: '城市',
    yField: '销售额',
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    slider: {
      start: 0.1,
      end: 0.2,
    },
  };

  return  <ConfigProvider
  theme={{
    token: {
      // Seed Token
      colorPrimary: ' #dc2626',
      borderRadius: 10,

      // Alias Token
      
    },
  }}
>
  <Space
  direction="vertical"
  >
    <Column
  height={300}
  className='bg-white rounded-lg shadow-lg shadow-gray-300 p-2'
  {...config} /></Space>
  </ConfigProvider>;

};

export default DemoColumn
