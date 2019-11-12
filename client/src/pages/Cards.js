import React from "react";
import {
  Card,
  Icon,
  Button,
  Result,
  Popover,
  Modal,
  Alert,
  Row,
  Col,
  message
} from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userid: cookies.get("userid"),
      visible: false,
      product: null
    };
    console.log("User id = " + this.state.userid);
    try {
      this.state.userid = props.id;
    } catch (e) {
      console.log(e);
    }
  }

  success = Pname => {
    this.setState({
      visible: true,
      product: Pname
    });
  };

  buyproduct = (Sid, e, Pname) => {
    if (this.state.userid != undefined) {
      let order = {
        pid: e.target.value,
        bid: this.state.userid,
        sid: Sid,
        price: 1000
      };
      let register = () => {
        fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(order)
        })
          .then(res => res.json())
          .then(resp => {
            if (resp) {
              this.success(Pname);
            } else {
              this.error();
            }
          });
      };
      register();
	 }
	 else{
		message.error("Log in required");
	 }
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    setTimeout(() => {
      this.setState(() => ({
        loading: false
      }));
    }, 1000);
    const { Meta } = Card;
    let index = 0;
    let rowGroup = [];
    var cardList = this.props.product.map(prod => {
      index++;

      rowGroup.push(
        <Col span={8}>
          <Card
            loading={this.state.loading}
            style={{ width: "90%" }}
            style={{ marginBottom: 20, padding: 5 }}
            // cover={<img alt="example" src="" />}
            actions={[
              <Button
                type="primary"
                block
                onClick={e => {
                  this.buyproduct(prod.Sid, e, prod.Pname);
                }}
                value={prod.Pid}
              >
                Buy
              </Button>
            ]}
          >
            <Meta title={prod.Pname} description={prod.Category} />
          </Card>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            footer={[
              <Button key="buy" onClick={this.handleCancel}>
                Back to shopping
              </Button>
            ]}
            onCancel={this.handleCancel}
          >
            <Result
              status="success"
              title={"Successfully Purchased  " + this.state.product}
            />
          </Modal>
        </Col>
      );
      if (index % 3 == 0) {
        return <Row gutter={20}>{rowGroup}</Row>;
      }
    });

    return cardList;
  }
}

export default Cards;
