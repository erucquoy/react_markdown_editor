// Import React
import React from 'react';
import { render } from 'react-dom';

// Import CSS styles
import './style/css/bootstrap.min.css'
import './index.css'

// Import Additional JS
import { sampleText } from './sampleText.js'
import marked from 'marked';

/**
 * App component, contents all the App
 */

class App extends React.Component {

	/**
	 * state object:
	 * 	text = markdown textarea value
	 */
	state = {
		text: sampleText,
	};

	/**
	 * Lifecycle functions
	 */
	componentWillMount() {
		const text = localStorage.getItem('text');

		if(text) {
			this.setState({ text });
		}
	}
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('text', nextState.text);
	};

	/**
	 * Additional functions
	 */
	editText = (e) => {
		const text = e.target.value;
		this.setState({ text });
	};

	renderText = (text) => {
		const renderText = marked(text, {sanitize: true});
		return { __html: renderText };
	};

	/**
	 * render function
	 */
	render() {
		return (
			<div className="container">
				<div className="row">
					
					<div className="col-sm-6">
						<textarea
							rows="35"
							onChange={(e) => this.editText(e)}
							value={this.state.text}
							className="form-control"
						>

						</textarea>
					</div>

					<div className="col-sm-6">
						<div dangerouslySetInnerHTML={this.renderText(this.state.text)} >
							
						</div>
					</div>


				</div>
				<div className="footer">
					Github  : <a href="https://github.com/erucquoy/react_markdown_editor">Simple Markdown Editor in React</a>
				</div>
			</div>
		)
	}
}

/**
 * Render the 'App' component in element with id 'root'
 * use "render" from react-dom (see react importation)
 */
render(
	<App />,
	document.getElementById('root')
);