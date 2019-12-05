import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

import {
  Typography,
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Layout,
  message,
  Spin,
  Button,
  Modal,
  Select,
  Upload,
  Icon,
  Tabs
} from "antd";
import Cookies from "universal-cookie";

import Nav from "./Navigator";

const { Title } = Typography;
const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { TabPane } = Tabs;
const cookies = new Cookies();

// const data = [];

const EditableContext = React.createContext();

const TIME_OUT = 2000;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    } else if (this.props.dataIndex === "price") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editingKey: "",
      userid: null,
      auth: false,
      loading: true,
      visible: false,
      categories: [],
      categoryid: {},
      summary: []
    };
    try {
      this.state.auth = cookies.get("auth");
      this.state.userid = cookies.get("userid");
    } catch (e) {
      this.state.auth = false;
    }

    if (this.state.auth != "true") {
      this.props.history.push("/accessdenied");
    }

    this.state.productsList = [];
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        width: "20%",
        editable: true
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "30%",
        editable: true
      },
      {
        title: "Category",
        dataIndex: "category",
        width: "13%",
        editable: false
      },
      {
        title: "Price",
        dataIndex: "price",
        width: "13%",
        editable: true,
        sorter: (a, b) => a.price - b.price
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        width: "13%",
        editable: true,
        sorter: (a, b) => a.price - b.price
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <div>
              <a
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.key)}
                style={{ padding: 5, paddingRight: 15 }}
              >
                Edit
              </a>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.delete(record.key)}
              >
                <a disabled={editingKey !== ""} style={{ padding: 5 }}>
                  Delete
                </a>
              </Popconfirm>
            </div>
          );
        }
      }
    ];
    this.sumcolumn = [
      {
        title: "Buyer",
        dataIndex: "bname",
        width: "25%"
      },
      {
        title: "Product name",
        dataIndex: "pname",
        width: "25%"
      },
      {
        title: "Date",
        dataIndex: "date",
        width: "25%"
      },
      {
        title: "Address",
        dataIndex: "location",
        width: "25%"
      }
    ];
    this.updateData();
  }

  componentDidMount = () => {
    fetch("/api/card/category")
      .then(res => {
        return res.json();
      })
      .then(data => {
        let cate = [];
        let cid = {};
        data.map(cat => {
          cate.push(cat.Category);
          cid[cat.Category] = cat.Cid;
        });
        this.setState({
          categories: cate,
          categoryid: cid
        });
      });

      fetch("api/orders/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({Sid:this.state.userid})
      })
      .then(res => res.json())
      .then(resp => {
        let tempdata = [];
        for(let i = 0;i<resp.length;i++){
          tempdata.push({
            bname: resp[i].name,
            pname: resp[i].pname,
            date: resp[i].date,
            location: resp[i].location
          });
        }
        this.setState(() => ({
          summary : tempdata
        }))
      });
  };

  updateData = () => {
    this.setState(() => ({
      loading: true
    }));

    fetch("/api/seller/prods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ userid: this.state.userid })
    })
      .then(res => res.json())
      .then(resp => {
        let tempdata = [];
        for (let i = 0; i < resp.length; i++) {
          tempdata.push({
            key: resp[i].pid,
            name: resp[i].pname,
            category: resp[i].category,
            price: resp[i].price,
            quantity: resp[i].quantity,
            description: resp[i].descripton
          });
        }
        this.setState(() => ({
          data: tempdata
        }));
        this.setState(() => ({
          loading: false
        }));
      });
  };

  isEditing = record => record.key === this.state.editingKey;

  delete = key => {
    this.setState(() => ({
      loading: true
    }));
    fetch("/api/seller/del", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ pid: key })
    })
      .then(res => res.json())
      .then(resp => {
        console.log(resp);
      })
      .finally(() => {
        this.updateData();
      });
  };

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    this.setState(() => ({
      loading: true
    }));
    form.validateFields((error, row) => {
      if (error) {
        console.log("Error = " + JSON.stringify(error));
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      let updateObj = {};
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...row
        });
        newData[index].category = item.category;
        newData[index].key = item.key;
        updateObj = newData[index];
        fetch("/api/seller/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify(updateObj)
        })
          .then(res => res.json())
          .catch(err => {
            console.log(err);
          })
          .then(resp => {
            console.log("Update response = " + JSON.stringify(resp));
            this.setState(() => ({
              loading: false
            }));
            // setTimeout(() => {
            //   this.setState(() => ({
            //     loading: false
            //   }));
            // }, TIME_OUT);
          });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  show = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  file = e => {
    console.log(e.file.name);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let valsend = {
          sid: this.state.userid,
          cid: this.state.categoryid[values.category],
          pname: values.name,
          description: values.description,
          price: values.price,
          quan: values.quantity
        };
        let input = () => {
          fetch("/api/seller/prods/input", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(valsend)
          })
            .then(res => res.json())
            .then(resp => {
              // console.log(resp.status);
              if (resp) {
                message.success("Product added successfully");
              } else {
                message.error("Error occured ");
              }
            });
        };
        input();
        this.updateData();
      }
    });
    this.setState({
      visible: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const components = {
      body: {
        cell: EditableCell
      }
    };
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType:
            col.dataIndex === ("quantity" || "price") ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Layout className="layout" style={{ minHeight: "100vh" }}>
          <Nav loggedin={true} />
          <Content
            style={{
              padding: "0px 50px",
              marginTop: 64,
              textAlign: "center"
            }}
          >
            <h1>Seller Dashboard</h1>
            <Tabs defaultActivekey="1">
              <TabPane
                tab={
                  <span>
                    <Icon type="unordered-list" />
                    Product list
                  </span>
                }
                key="1"
              >
                <Spin size="large" spinning={this.state.loading}>
                  <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                      onChange: this.cancel,
                      pageSize: 5
                    }}
                    style={{
                      background: "#FFFFFF",
                      padding: 12,
                      borderRadius: 7,
                      marginBottom: 20
                    }}
                  />
                  <Button type="primary" onClick={this.show}>
                    Add product
                  </Button>
                  <Modal
                    title="Product Input"
                    visible={this.state.visible}
                    // onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    // okButtonProps={{visible:false}}
                    footer={null}
                  >
                    <Form
                      {...formItemLayout}
                      onSubmit={this.handleSubmit}
                      layout="horizontal"
                    >
                      <Form.Item label="Name">
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter Product Name"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Category" hasFeedback>
                        {getFieldDecorator("category", {
                          rules: [
                            {
                              required: false,
                              message: "Please select Category"
                            }
                          ]
                        })(
                          <Select placeholder="Please select category">
                            {this.state.categories.map(category => (
                              <Option value={category}>{category}</Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item label="Description">
                        {getFieldDecorator("description", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter Description"
                            }
                          ]
                        })(<TextArea />)}
                      </Form.Item>
                      <Form.Item label="Quantity">
                        {getFieldDecorator("quantity", {
                          rules: [
                            {
                              required: true,
                              message: "Enter Quantity"
                            }
                          ]
                        })(<InputNumber min={1} />)}
                      </Form.Item>
                      <Form.Item label="Price">
                        {getFieldDecorator("price", {
                          rules: [
                            {
                              required: true,
                              message: "Enter Price"
                            }
                          ]
                        })(<InputNumber min={1} />)}
                      </Form.Item>
                      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                </Spin>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="history" />
                    Purchase summary
                  </span>
                }
                key="2"
              >
                <Spin size="large" spinning={this.state.loading}>
                  <Table
                    bordered
                    columns={this.sumcolumn}
                    dataSource={this.state.summary}
                    pagination={{ pageSize: 5 }}
                    style={{
                      background: "#FFFFFF",
                      padding: 12,
                      borderRadius: 7
                    }}
                  />
                </Spin>
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </EditableContext.Provider>
    );
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Seller = Form.create()(EditableTable);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// class Seller extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { userid: null };
// 		try {
// 			this.state.userid = props.location.state.id;
// 		} catch (e) {
// 			// this.props.history.push("/accessdenied");
// 		}
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<p>This is the Sellers' page</p>
// 			</div>
// 		);
// 	}
// }

export default Seller;
