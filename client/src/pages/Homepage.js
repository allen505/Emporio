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
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Carousel autoplay dots = "false">
                        <div align = "center"><img src ={require('../Images/mobile.jpg')} alt="Please display" height="400" width="1500"/><h1>Mobiles</h1></div>
                        <div align = "center"><img src ={require('../Images/laptop.jpg')} alt="Please display" height="400" width="1500" /><h1>Laptops</h1></div>
                        <div align = "center"><img src ={require('../Images/television.jpg')} alt="Please display" height="400" width="1500" /><h1>Televisions</h1></div>
                        <div align = "center"><img src ={require('../Images/headphone.jpg')} alt="Please display" height="400" width="1500" /><h1>Headphone</h1></div>
                    </Carousel>
                </div>
              </Content>

            </Layout>

        );
    }
}
export default Homepage;