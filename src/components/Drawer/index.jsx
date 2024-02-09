import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
const DrawerSideBar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <Space>
        {/* <Radio.Group value={placement} onChange={onChange}>
          <Radio value="left">left</Radio>
        </Radio.Group> */}
        <Button type="primary" onClick={showDrawer}>
        <MenuOutlined />
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default DrawerSideBar;
