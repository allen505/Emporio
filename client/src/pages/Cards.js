import React from "react"
import {
    Card,
    Icon,
    Button
} from "antd";

class Cards extends React.Component {
    constructor(props) {
      super(props);
    }
    render () {
      let { id, Pname, company, description, Category } = this.props.product;
      const {Meta} = Card
      return (
        <div>
          <Card
            style={{ width: 300 }}
            cover={
            <img
                alt="example"
                src=""
            />
            }
            actions={[
            <Button type="primary" block>
                Buy
            </Button>
            ]}
        >
            <Meta
            title= {Pname}
            description={Category}
            />
        </Card>
        </div>
      )
    }
  }
  
  export default Cards;