import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Liquid } from '@ant-design/plots';

const DemoLiquid = () => {
  const config = {
    percent: 0.25,
    shape: function (x, y, width, height) {
      const r = width / 4;
      const dx = x - width / 2;
      const dy = y - height / 2;
      return [
        ['M', dx, dy + r * 2],
        ['A', r, r, 0, 0, 1, x, dy + r],
        ['A', r, r, 0, 0, 1, dx + width, dy + r * 2],
        ['L', x, dy + height],
        ['L', dx, dy + r * 2],
        ['Z'],
      ];
    },
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
    color:'#b91c1c',
  };
  return <Liquid
  height={300}
  className='bg-white rounded-lg shadow-lg shadow-gray-300'
  {...config} />;
};

export default DemoLiquid;
