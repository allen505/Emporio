import React from "react";
import { Card, Icon, Button } from "antd";

class Cards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading : true
		}
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
						<Button type="primary" block>
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
