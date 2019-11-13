import React from "react";

import {
  Menu,
  Input,
  Icon,
  Dropdown,
  Select,
  AutoComplete,
  Button
} from "antd";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Cookies from "universal-cookie";
// import "./Login.css";

import logo from "../Images/logo.png";

const { SubMenu } = Menu;
const cookies = new Cookies();

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      searchList: [],
      value: "",
      accType: null,
      loggedin: this.props.loggedin,
      searchDisabled: false,
      cartDisabled: false
    };
    this.state.accType = cookies.get("type");
    this.state.cartDisabled =
      this.state.accType == "admin"
        ? true
        : this.state.accType == "seller"
        ? true
        : this.state.loggedin == false
        ? true
        : false;
    this.state.searchDisabled =
      this.state.accType == "admin"
        ? true
        : this.state.accType == "seller"
        ? true
        : false;
  }

  handleChange = e => {
    let items = this.state.productList;
    items = items.filter(item => {
      return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({
      values: items
    });
    console.log(items);
  };
  onChange = value => {
    this.setState({ value });
  };

  onSearch = search => {
    console.log(search);
  };

  logoutFunc = () => {
    cookies.remove("userid");
    cookies.remove("type");
    cookies.remove("auth");
  };

  loginButton = () => {
    return this.state.loggedin == false ? (
      <Link to="/login">
        <Icon type="user" />
        Login
      </Link>
    ) : (
      <Link to="/login" replace>
        <Button type="link" onClick={this.logoutFunc}>
          <Icon type="logout" />
          Logout
        </Button>
      </Link>
    );
  };

  render() {
    const { Option } = Select;

    try {
      var name = this.props.product.map(Pname => {
        return Pname.Pname;
      });
    } catch (e) {
      // console.log(e);
    }

    this.state.productList = name;

    return (
      <Menu theme="light" mode="horizontal" style={{ lineHeight: "75px" }}>
        <Menu.Item key="1" disabled>
          {/* <Icon component={() => <img src="../Images/logo.png" />} />
           */}
          <img
            src={require("../Images/logo.png")}
            style={{ width: 150, height: 75 }}
          />
        </Menu.Item>
        <AutoComplete
          showSearch
          dataSource={this.state.productList}
          style={{ width: 500, marginLeft: 20 }}
          //   onSelect={onSelect}
          onSearch={this.onSearch}
          placeholder="Search"
          onChange={this.onChange}
          value={this.state.value}
          disabled={this.state.searchDisabled}
        >
          {/* <Input suffix={<Icon type="search" className="certain-category-icon" />} /> */}
        </AutoComplete>

        <Menu.Item key="4" style={{ float: "right" }}>
          <this.loginButton />
        </Menu.Item>
        <Menu.Item
          key="3"
          style={{ float: "right" }}
          disabled={this.state.cartDisabled}
        >
          <Link to="/cart">
            <Icon type="shopping-cart" />
            Cart
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Nav;
