import React from "react";
import { Card, Icon, Button } from "antd";

class Cards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading : true,
			userid : null,
		}
		try{
			this.state.userid = props.id;
			let sid = props.product.Sid;
			console.log(sid)
		} catch (e) {
			console.log(e);
		}
	}
	buyproduct = (Sid,e) =>{
		let order=
			{
				pid : e.target.value,
				bid : this.state.userid,
				sid : Sid,
				price : 1000
			}
		let register = () => {
			fetch("/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(order)
			})
				// .then(res => res.json())
				.then(resp => {
					console.log(resp);
					if (resp) {
						this.success();
					} else {
						this.error();
					}
				});
		};
		register();
	}
	render() {
		setTimeout(() => { 
			this.setState(() => 
			({
				loading: false
			}))
		  }, 1000);
		const { Meta } = Card;
		var cardList = this.props.product.map(prod => {
			return (
				<div style=
				{{
					float:'left', 
					width:'25%'
				}}>
				<Card loading={this.state.loading}
					style={{ width: '90%' }}
					cover={<img alt="example" src="" />}
					actions={[
						<Button type="primary" block onClick={(e)=>{this.buyproduct(prod.Sid,e)}} value = {prod.Pid}>
							Buy
						</Button>
					]}
				>
					<Meta title={prod.Pname} description={prod.Category} />
				</Card>
				</div>
			);
		});

		return cardList;
	}
}

export default Cards;
