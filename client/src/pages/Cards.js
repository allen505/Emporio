/* eslint-disable */
import React from "react";
import {
  Card,
  Button,
  Result,
  Modal,
  message,
  Steps,
  Radio,
  Form,
  InputNumber,
  Input,
  Icon
} from "antd";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import Cookies from "universal-cookie";
import { finished } from "stream";

const {Step} = Steps;
const {TextArea} = Input;
const cookies = new Cookies();

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userid: cookies.get("userid"),
      visible: false,
      product: null,
      current: 0,
      value: 1,
      Sid: null,
      Pid: null,
      Pname: null,
      price: 0
    };
    try {
      this.state.userid = props.id;
    } catch (e) {
      console.log(e);
    }
  }

  success = Pname => {
    if(this.state.userid!=undefined){
    this.setState({
      visible: true,
      product: Pname
    });
  }
  else {
    message.error("Login required")
  }
  };

  buyproduct = (Sid, e, Pname, Price) => {
    if (this.state.userid != undefined) {
      let order = {
        pid: e,
        bid: this.state.userid,
        sid: Sid,
        price: Price
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

  onChangeRadio = e => {
    this.setState({
      value: e.target.value
    });
  };

  displayCard = () =>{
    const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};
    if(this.state.value==2){
      return(
        <Form {...formItemLayout}onSubmit = {this.handleSubmit}>
          <Form.Item label={"Card number"}>
            <InputNumber style={{width:"100%"}}/>
          </Form.Item>
          <Form.Item label={"CVV"}>
            <Input.Password/>
          </Form.Item>
          <Form.Item label = {"Expiry Date"}>
            <InputNumber block/>
          </Form.Item>
        </Form>
      );
    }else {
      return(
        <div/>
      );
    }
  }

  nextStep = () =>{
    this.setState({
      current:this.state.current + 1
    })
  }

  finalstep = step => {
    if(step.step==0){
      return(
        <div>
        <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
        <Radio 
        style = {{
          display: 'block',
          height: '30px',
          lineHeight: '30px'
        }} 
        value={1}>
          Cash on delivery
        </Radio>
        <Radio 
        style = {{
          display: 'block',
          height: '30px',
          lineHeight: '30px'
        }}
        value={2}>
          Card
        </Radio>
        </Radio.Group>
        <this.displayCard/>
        <Button type="primary" onClick = {this.nextStep}>
          Next
          <Icon type="right" />
        </Button>
        </div>
      );
    }else if(step.step == 1){
      return(
        <div>
        <TextArea placeholder="Enter the delivery address"/>
        <Button type="primary" onClick = {this.buyproduct(this.state.Sid,this.state.Pid,this.state.Pname,this.state.price),this.nextStep}>
        Next
        <Icon type="right" />
        </Button>
        </div>
      );
    }else {
      return(
        <Result
              status="success"
              title={"Successfully Purchased  " + this.state.product}
            />
      );
    }
  }

  onChange = current => {
    this.setState({ current:current });
  };


  purchase = () => {
    return(
      <div>
      <Steps 
        // type="navigation"
        progressDot 
        current={this.state.current}
        onChange={this.onChange}
      >
        <Step 
          title="Payment type" />
        <Step 
          title="Address" />
        <Step 
          title = "Purchased"/>
      </Steps>
      <this.finalstep step = {this.state.current}/>
      </div>
    );
  }

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
      return (
        <div
          style={{
            float: "left",
            width: "25%"
          }}
        >
          <Card
            loading={this.state.loading}
            style={{ width: "90%" }}
            style={{ margin: 7, marginBottom: 15, padding: 0 }}
            // border-radius: 7
            // cover={<img alt="example" src="" />}
            hoverable={true}
            actions={[
              <Button
                type="primary"
                block
                onClick={e => {
                  this.success();
                  this.setState({
                    Sid: prod.Sid,
                    Pid: e.target.value,
                    Pname: prod.Pname,
                    price: prod.Price
                  })
                  // this.buyproduct(prod.Sid, e, prod.Pname, prod.Price);
                }}
                value={prod.Pid}
                style={{ margin: 2, width: 320 }}
              >
                Buy
              </Button>
            ]}
          >
            <Meta title={prod.Pname} description={prod.Descripton} />
            <br />
            <Meta title={"₹ " + prod.Price} />
          </Card>
          <Modal
            title="Buy"
            // width = "100"
            visible={this.state.visible}
            onOk={this.handleOk}
            footer={[
              <Button key="buy" onClick={this.handleCancel}>
                Cancel
              </Button>
            ]}
            onCancel={this.handleCancel}
          >
            {/* <Result
              status="success"
              title={"Successfully Purchased  " + this.state.product}
            /> */}
            <this.purchase/>
          </Modal>
        </div>
      );
  });
  return cardList;
}
}

export default Cards;
