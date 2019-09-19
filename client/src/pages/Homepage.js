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
        const { Search } = Input;        
        return (
            <Layout className="layout">
              <Content style={{ padding: '0 10px' }}>
              <br/>
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