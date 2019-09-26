import React from "react"
import {
    Card,
    Icon,
    Button
} from "antd";

const Cards = () => {
    const {Meta} = Card;
    return(
        <Card
            style={{ width: 300 }}
            cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
            <Button type="primary" block>
                Buy
            </Button>
            ]}
        >
            <Meta
            title="Phone cover"
            description="$ 2.1"
            />
        </Card>
    );
}

export default Cards;