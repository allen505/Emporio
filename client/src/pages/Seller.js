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
	Spin
} from "antd";

import Nav from "./Navigator";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

// const data = [];

const EditableContext = React.createContext();

const TIME_OUT = 1000;

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
		this.state = { data: [], editingKey: "", userid: null, loading: true };
		try {
			this.state.userid = props.location.state.id;
		} catch (e) {
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
				dataIndex: "desc",
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
								style={{ padding: 5 , paddingRight: 15}}
							>
								Edit
							</a>
							<a
								disabled={editingKey !== ""}
								onClick={() => this.delete(record.key)}
								style={{ padding: 5 }}
							>
								Delete
							</a>
						</div>
					);
				}
			}
		];
		this.updateData();
	}

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
						desc: resp[i].descripton
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
				return;
			}
			const newData = [...this.state.data];
			const index = newData.findIndex(item => key === item.key);
			let updateObj = {};
			if (index > -1) {
				const item = newData[index];
				updateObj = { ...row, key: item.key };
				// updateObj.key = item.key;
				console.log("Data to send :");
				console.log(updateObj);
				console.log(item);
				console.log(row);
				newData.splice(index, 1, {
					...item,
					...row
				});
				fetch("/api/seller/update", {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8"
					},
					body: JSON.stringify(updateObj)
				})
					.then(res => res.json())
					.then(resp => {
						console.log(resp);
						this.setState(() => ({
							loading: false
						}));
					})
				this.setState({ data: newData, editingKey: "" });
			} else {
				console.log("Else called");
				newData.push(row);
				this.setState({ data: newData, editingKey: "" });
			}
		});
	}

	edit(key) {
		this.setState({ editingKey: key });
	}

	render() {
		// setTimeout(() => {
		// 	this.setState(() => ({
		// 		loading: false
		// 	}));
		// }, TIME_OUT);
		const components = {
			body: {
				cell: EditableCell
			}
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
					<Nav accType="seller" loggedin={true} />
					<Content
						style={{
							padding: "75px 50px",
							marginTop: 64,
							textAlign: "center"
						}}
					>
						<Spin size="large" spinning={this.state.loading}>
							<Table
								components={components}
								bordered
								dataSource={this.state.data}
								columns={columns}
								rowClassName="editable-row"
								pagination={{
									onChange: this.cancel
								}}
							/>
						</Spin>
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
