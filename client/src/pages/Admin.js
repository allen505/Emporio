import React, { Profiler } from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  Form,
  Tooltip,
  Icon,
  Menu,
  Input,
  Select,
  Row,
  Col,
  Radio,
  Button,
  Layout,
  message,
  List,
  Table,
  Popconfirm
} from "antd";
import Cookies from "universal-cookie";

import Nav from "./Navigator";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const cookies = new Cookies();

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading : true
      radioState: "buyer",
      auth: false,
      currentMenu: "users",
      summary: []
    };
    try {
      this.state.auth = cookies.get("auth");
    } catch (e) {
      this.state.auth = false;
    }

    if (this.state.auth != "true") {
      this.props.history.push("/accessdenied");
    }
  }
  state = {
    // radioState : "buyer",
    loading: true
  };

  radioChange = selected => {
    this.setState({
      radioState: selected.target.value
    });
  };

  componentDidMount() {
    fetch("/api/adminSumm")
      .then(res => {
        return res.json();
      })
      .then(data => {
        let tmpSumm = [];
        data = data[0];
        data.map(summ => {
          tmpSumm.push({
            date: summ.Date,
            maxName: summ.maxName,
            maxTrans: "₹ " + summ.maxTrans,
            minName: summ.minName,
            minTrans: "₹ " + summ.minTrans
          });
        });
        console.log(data);
        console.log(tmpSumm);
        this.setState({
          summary: tmpSumm
        });
      });
  }

  datafetch = () => {
    fetch("/api/admin")
      .then(res => {
        return res.json();
      })
      .then(data => {
        let buyerlist = [];
        let sellerlist = [];
        data.map(prod => {
          if (prod.type == "buyer") {
            buyerlist.push(prod.name);
          } else if (prod.type == "seller") {
            sellerlist.push(prod.name);
          }
        });
        this.setState({
          blist: buyerlist,
          slist: sellerlist
        });
      });
  };

  delete = (item, type) => {
    let del = {
      type: type,
      name: item
    };
    fetch("/api/admin/del", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(del)
    })
      .then(res => res.json())
      .then(resp => {
        console.log(resp);
      })
      .finally(() => {
        this.datafetch();
      });
  };

  menuClick = e => {
    this.setState({
      currentMenu: e.key
    });
  };

  adminlist = e => {
    // const {loading} = this.state
    this.datafetch();
    if (e.value == "seller") {
      return (
        <List
          bordered="true"
          loading={this.state.loading}
          itemLayout="horizontal"
          dataSource={this.state.slist}
          renderItem={item => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Are you sure you want to delete?"
                  onConfirm={() => {
                    this.delete(item, this.state.radioState);
                  }}
                >
                  <Icon type="delete" theme="twoTone"></Icon>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta title={item} />
            </List.Item>
          )}
        />
      );
    } else {
      return (
        <List
          bordered="true"
          loading={this.state.loading}
          itemLayout="horizontal"
          dataSource={this.state.blist}
          renderItem={item => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Are you sure you want to delete?"
                  onConfirm={() => {
                    this.delete(item, this.state.radioState);
                  }}
                >
                  <Icon type="delete" theme="twoTone"></Icon>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta title={item} />
            </List.Item>
          )}
        />
      );
    }
  };

  menulist = e => {
    if (this.state.currentMenu == "users") {
      return (
        <div>
          <Title style={{ fontWeight: 430 }}>User List</Title>
          <Row type="flex" align="center">
            <Col
              span={8}
              style={{
                padding: "60px",
                backgroundColor: "#ffffff",
                borderRadius: "15px"
              }}
            >
              <Radio.Group
                defaultValue="buyer"
                buttonStyle="solid"
                style={{ margin: "15px" }}
                onChange={this.radioChange}
              >
                <Radio.Button value="buyer">Buyer</Radio.Button>
                <Radio.Button value="seller">Seller</Radio.Button>
              </Radio.Group>
              <this.adminlist value={this.state.radioState} />
            </Col>
          </Row>
        </div>
      );
    } else {
      const columns = [
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          width: "20%"
        },
        {
          title: "Maximum",
          children: [
            {
              title: "Seller name",
              dataIndex: "maxName",
              key: "maxName",
              width: "10%"
            },
            {
              title: "Transaction",
              dataIndex: "maxTrans",
              key: "maxTrans",
              width: "10%"
            }
          ]
        },
        {
          title: "Minimum",
          children: [
            {
              title: "Seller name",
              dataIndex: "minName",
              key: "minName",
              width: "10%"
            },
            {
              title: "Transaction",
              dataIndex: "minTrans",
              key: "minTrans",
              width: "10%"
            }
          ]
        }
      ];

      return (
        <div>
          <Title style={{ fontWeight: 430 }}>Transactions</Title>
          <Row>
            <Col>
              <Table
                columns={columns}
                dataSource={this.state.summary}
                bordered
                size="middle"
                style={{ background: "#FFFFFF", padding: 12, borderRadius: 7 }}
              />
            </Col>
          </Row>
        </div>
      );
    }
  };

  render() {
    // setTimeout(() => {
    // 	this.setState(() => ({
    // 		loading : false
    // 	}))
    // },100);

    return (
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Nav loggedin={true} />
        <Menu
          onClick={this.menuClick}
          selectedKeys={[this.state.currentMenu]}
          mode="horizontal"
        >
          <Menu.Item key="users">
            <Icon type="user" />
            Users
          </Menu.Item>
          <Menu.Item key="transactions">
            <Icon type="transaction" />
            Transactions
          </Menu.Item>
        </Menu>
        <Content
          style={{
            padding: "75px 50px",
            marginTop: 64,
            textAlign: "center"
          }}
        >
          {/* <Title level={3}>"With great power comes great responsibilty"</Title> */}
          <this.menulist />
        </Content>
      </Layout>
    );
  }
}
export default Admin;
