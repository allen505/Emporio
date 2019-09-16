import React from "react";
import ReactDom from "react-dom";
import {
    Menu,
    Icon,
    Typography,
    Layout,
    Input,
    Button,
    Row,
    Col,
    Breadcrumb
} from "antd";
import "./Homepage.css";
import { rejects } from "assert";
import WrappedLogin from "./Login";

const { Tile } = Typography;
const { Header, Content, Footer} = Layout;

class Homepage extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        
        return (
            <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Brand Name</Menu.Item>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>This project is created by Allen and Abbas
</Footer>
  </Layout>

        );
    }
}
export default Homepage;