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
    Carousel,
    Dropdown
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
        const menu = (
            <Menu>
              <Menu.Item key="0">
                <a href=""><Icon type="mobile"/> Mobiles</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a href=""><Icon type="laptop"/> Laptops</a>
              </Menu.Item>
              <Menu.Item key="2">
                <a href=""><Icon type="desktop"/> Televisions</a>
              </Menu.Item>
              <Menu.Item key="3">
                <a href=""><Icon type="sound"/> Headphones</a>
              </Menu.Item>
              <Menu.Item key="4">
                <a href=""><Icon type="play-circle"/> Consoles</a>
              </Menu.Item>
            </Menu>
          );
        const { Search } = Input;        
        return (
            <Layout className="layout">
              <Content style={{ padding: '0 10px' }}>
            <div align="center" style={{padding:'10px'}}>
              Categories :  <Dropdown.Button overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                    All
                    </a>
                </Dropdown.Button>
                </div>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Carousel autoplay dots = "false">
                        <div align = "center"><img src ={require('../Images/mobile.jpg')} alt="Please display" height="400" width="1500"/><h1>Mobiles</h1></div>
                        <div align = "center"><img src ={require('../Images/laptop.jpg')} alt="Please display" height="400" width="1500" /><h1>Laptops</h1></div>
                        <div align = "center"><img src ={require('../Images/television.jpg')} alt="Please display" height="400" width="1500" /><h1>Televisions</h1></div>
                        <div align = "center"><img src ={require('../Images/headphone.jpg')} alt="Please display" height="400" width="1500" /><h1>Headphone</h1></div>
                        <div align = "center"><img src ={require('../Images/consoles.jpg')} alt="Please display" height="400" width="1500" /><h1>Consoles</h1></div>
                    </Carousel>
                </div>
              </Content>

            </Layout>

        );
    }
}
export default Homepage;