
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Popover, theme } from 'antd';
import Sidebar from './Sidebar';
const { Header, Sider, Content } = Layout;
import "./layout.css"
import { Outlet } from 'react-router-dom';
import AdminAuth from '../components/admin/adminAuth/adminAuth';
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider width={250} style={{height:"100vh",background:"#E63946"}} trigger={null} collapsible collapsed={collapsed}>
       <Sidebar/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className='flex justify-between pe-10'>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
           <div className="hidden sm:block md:order-3 order-2 !text-[#fff] cursor-pointer">
                <Popover trigger="click" placement="bottomRight" content={<AdminAuth/>}   >
                <Avatar/>
                </Popover>
               </div>
               </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;