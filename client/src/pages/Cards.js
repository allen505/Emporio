import React from "react";
import { Card, Icon, Button } from "antd";

class Cards extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let { id, Pname, company, description, Category } = this.props.product;
		const { Meta } = Card;

		var cardList = this.props.product.map(prod => {
			return (
				<Card
					style={{ width: 300 }}
					cover={<img alt="example" src="" />}
					actions={[
						<Button type="primary" block>
							Buy
						</Button>
					]}
				>
					<Meta title={prod.Pname} description={prod.Category} />
				</Card>
			);
		});

		return cardList;
	}
}

export default Cards;
