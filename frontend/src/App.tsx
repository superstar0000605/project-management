import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './store';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import DeveloperList from './components/developera/DeveloperList';
import ProjectList from './components/projecta/ProjectList';


const { Header, Sider, Content } = Layout;

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick = (e:any) => {
    switch(e.key) {
      case '1':
        navigate("/developers");
        break;
      case '2':
        navigate("/projects");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    location.pathname === "/" && navigate('/developers');
  },[])
  return (
    <Provider store={store}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={location.pathname === "/projects"?['2']:['1']}
            onClick={onClick}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'Developers',
              },
              {
                key: '2',
                icon: <FileOutlined />,
                label: 'Projects',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
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
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 609,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path='projects' element={<ProjectList />} />
              <Route path="developers" element={<DeveloperList />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>

    </Provider>
  );
}

export default App;
