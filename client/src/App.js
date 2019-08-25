import React from "react";
import { Typography } from "antd";
import "./App.css";

const { Title } = Typography;

// Fetch the data on first mount

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "Nothing recieved"
		};
	}
	componentDidMount() {
		this.getData();
		console.log("component did mount");
	}

	getData = () => {
		fetch("/getData")
			.then(res => res.json())
			.then(newData => {
				this.setState({ data: newData });
				console.log("The new data is: "+newData);
				
			})
			.catch(e => {
				console.log(e);
			});
	};

	render() {
		let { data } = this.state;

		return (
			<div className="App">
				<Title level={2}>{data}</Title>
			</div>
		);
	}
}

export default App;
