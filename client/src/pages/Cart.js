import React from "react";
import { Card, Icon, Button, Table,Layout,Spin } from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Cookies from "universal-cookie"

import Nav from "./Navigator";
const { Header, Content, Footer } = Layout;

const cookies = new Cookies();

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bid: null,
            loggedin:false,
            loading: true,
            data: []
        }
        try {
			this.state.bid = cookies.get("userid");
            this.state.loggedin = true;
		} catch (e) {
			console.log(e);
		}
        this.columns = [
			{
				title: "Product name",
				dataIndex: "Pname",
				width: "20%",
			},
			{
				title: "Seller name",
				dataIndex: "Name",
				width: "15%"
            },
            {
				title: "Quantity",
				dataIndex: "quantity",
				width: "13%",
				// sorter: (a, b) => a.price - b.price
			},
			{
				title: "Category",
				dataIndex: "category",
				width: "13%"
			},
			{
				title: "Price",
				dataIndex: "price",
				width: "13%",
				sorter: (a, b) => a.price - b.price
            },
            {
                title: "Date",
                dataIndex: "date",
                width: "15%"
            }
            ]
            fetch("/api/orders/buyer",{
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({Bid:this.state.bid})
            })
            .then(res => res.json())
            .then(resp => {
                let temp = [];
                for(let i=0; i<resp.length;i++){
                    temp.push({
                        Pname: resp[i].Pname,
                        Name: resp[i].Name,
                        date: resp[i].Date,
                        quantity: resp[i].Quantity,
                        category: resp[i].Category,
                        price: resp[i].Price
                    });
                }
                // this.setState({
                //     data: temp
                // })
                setTimeout(() => {
                    this.setState(() =>
                        ({
                            loading: false,
                            data:temp
                        }))
                }, 800);
            })
            // this.datafetch();
    }

    // datafetch = () => {
        
    // }

    render(){
        console.log(this.state.data)
        return(
            <div >
                <Layout className="layout" style={{ minHeight: "100vh" }}>
					<Nav accType="seller" loggedin={true} />
					<Content
						style={{
							padding: "0px 50px",
							marginTop: 60,
							textAlign: "center"
						}}
					>
                        <h1>Order History</h1>
						<Spin size="large" spinning={this.state.loading}>
                        <Table columns={this.columns} dataSource={this.state.data} style={{padding:30}} pagination={{pageSize:5}}/>
                                <Link to="/homepage">
                                    <Button type="link" size="large">
                                        Go Home
                                    </Button>
                                </Link>
                        </Spin>
					</Content>
				</Layout>
            </div>
        );
    }
}

export default Cart;