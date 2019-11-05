import React from "react";
import { Menu, Input, Icon, Dropdown, Select, AutoComplete } from "antd";
import "./Login.css";

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productList : [],
			searchList : [],
			value: '',
		}
	}

	handleChange = e => {
		let items = this.state.productList;
		items = items.filter((item) => {
		  return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
		});
		this.setState({
			values : items
		});
		console.log(items)
	}
	onChange = value => {
		this.setState({ value });
	  };

	onSearch = search => {
		console.log(search)
	}

	render() {

	const { Option } = Select;

	var name = this.props.product.map(Pname => {
		return Pname.Pname;
	})

	this.state.productList = name;

	return (
		<Menu
			theme="dark"
			mode="horizontal"
			defaultSelectedKeys={["2"]}
			style={{ lineHeight: "64px" }}
		>
			<Menu.Item key="1">Emporio</Menu.Item>
			<AutoComplete
			showSearch
          dataSource={this.state.productList}
          style={{ width: 200 }}
        //   onSelect={onSelect}
          onSearch={this.onSearch}
		  placeholder="input here"
		  onChange = {this.onChange}   
		  value = {this.state.value}
        >
			 {/* <Input suffix={<Icon type="search" className="certain-category-icon" />} /> */}
			 </AutoComplete>
			<Menu.Item key="2"><Icon type= "home" />Home</Menu.Item>
			<Menu.Item key="3"><Icon type = "shopping-cart"/>Cart</Menu.Item>
			<Menu.Item key="4"><Icon type = "user"/>User</Menu.Item>
		</Menu>
	);
}
};

export default Nav;
