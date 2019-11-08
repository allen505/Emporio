import React from "react";
import { Card, Icon, Button, Table } from "antd";

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bid: null,
            loggedin:false,
            data: []
        }
        try {
			this.state.bid = props.location.state.id;
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
                body: JSON.stringify({Bid:1234})
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
                this.setState({
                    data: temp
                })
            })
            // this.datafetch();
    }

    // datafetch = () => {
        
    // }

    render(){
        console.log(this.state.data)
        return(
            <div >
                <center>
                    <br/>
                <h1>Order History</h1>
            <Table columns={this.columns} dataSource={this.state.data} style={{padding:30}}/>
            </center>
            </div>
        );
    }
}

export default Cart;