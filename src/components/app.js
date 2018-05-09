import React, { Component } from 'react';

class App extends Component {
  	constructor (props) {
		super(props); 

		this.state = {
			keyword: '', 
			sourceWord: '', 
			cipher : '', 
			pos : 0
		}; 

		this.handlekeyword = this.handlekeyword.bind(this); 
		this.sourceTextClick = this.sourceTextClick.bind(this); 
		this.sourceTextClear = this.sourceTextClear.bind(this); 
	}

	handlekeyword(keyword) {
		if (	keyword.toUpperCase() !== keyword 
			|| 	keyword.length < 3 
			|| 	keyword.length > 8) {
			alert('Invalid Input: must be UPPERCASE between THREE to EIGHT long');
			return; 
		}
		this.setState({keyword: keyword, 
					   sourceWord: '', 
					   cipher: '', 
					   pos : 0})
	}
	handleCipher(pressed) {
		const pre = this.state.cipher;
		const shift = this.state.keyword.charCodeAt(this.state.pos) - 'A'.charCodeAt(0); 
		const cipher = `${pre + String.fromCharCode((pressed.charCodeAt(0) - 65 + shift)%26 + 65)}`;
		this.setState({cipher: cipher}); 
	}
	sourceTextClick(e) {
		const pre = this.state.sourceWord; 
		//console.log(pre);
		const sourceWord = `${pre + e.target.value}`;
		this.setState({sourceWord : sourceWord,
					   pos : (this.state.pos + 1) % this.state.keyword.length
					}); 
		this.handleCipher(e.target.value); 
	}

	sourceTextClear(e) {
		this.setState(
			{	sourceWord: '', 
				cipher: '', 
				pos : 0
			}
		)
	}
	render() {
		return (
			<div>
			  	<h1>Configuration</h1>
			  	<h2>Keyword</h2>

			  	<Keyword 			handlekeyword = {this.handlekeyword}/>
			  	<KeywordTable 		keyword = {this.state.keyword}/>
			  	
			  	<h1>Encoding</h1>
			  	<h2>Source Text</h2>
			  	
			  	<SourceTextInput 	keyword = {this.state.keyword} 
			  						sourceWord = {this.state.sourceWord} 
			  						sourceTextClick = {this.sourceTextClick}
			  						pos = {this.state.pos}
			  	/>
			  	
			  	<SourceTextDisplay 	sourceWord = {this.state.sourceWord}
			  						sourceTextClear = {this.sourceTextClear}/>
			  	<h2>Cipher Text</h2>
			  	<CipherTextDisplay 	cipher = {this.state.cipher}/>

			</div>
		);
	}
}


class Keyword extends Component {
	constructor (props) {
		super(props); 

		this.state = {
			keyword: ''
		};

		this.onInputChange = this.onInputChange.bind(this); 
		this.onFormEvent = this.onFormEvent.bind(this); 
	}
	onInputChange(e) {
		this.setState({keyword: e.target.value});
		   
	};

	onFormEvent(e) {
		e.preventDefault(); 
		this.props.handlekeyword(this.state.keyword);
		//this.setState({ keyword: '' }); 
	};

	render() {
		return (
			<div>
				<div>
					<form onSubmit={this.onFormEvent} >
						<input 
							value= {this.state.keyword} 
							onChange = {this.onInputChange} 
						/>
						<span> 
							<button type='submit'>Update</button>
						</span> 
					</form>
				</div>				
			</div>
		); 
	};	
}

class KeywordTable extends Component {
	renderKeywordTable (keyword){
		const rowFirst = [];  
		const rowSecond = [];
		const aCode = "A".charCodeAt(0); 
		for (var i = 0; i < keyword.length; i++) {
			rowFirst.push(<TableElement key = {i} value = {keyword.charAt(i)}/>); 
			rowSecond.push(<TableElement key = {i} value = {keyword.charCodeAt(i) - aCode}/>)
		}
		//console.log(keyword.charAt(0) - 'a');
		return(
			<div>
				<table> 
					<tbody>
						<tr>{rowFirst}</tr>
						<tr>{rowSecond}</tr>
					</tbody>
				</table>
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.renderKeywordTable(this.props.keyword)}	
			</div>
		); 
	};	
}

const TableElement = ({value}) => {
	return (
		<td>{value}</td>
	); 
}
class SourceTextInput extends Component {
	constructor (props) {
		super(props); 
		//const letters = 
		//console.log(letters.length); 
		this.state = {
			rowFirst : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
						 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
						 'U', 'V', 'W', 'X', 'Y', 'Z'], 
			rowSecond : [], 
		};
	}
	renderSourceTextFirstLine(letters) {
		if (this.props.keyword === '') {
			return;
		}
		const row = []; 
		for (var i = 0; i < letters.length; i++) {
			row.push(<td key = {i}>
							<button onClick = {this.props.sourceTextClick} 
									value = {letters[i]} 
									type="button">{letters[i]}
							</button>
					</td>); 
		}
		return (
			<tr>{row}</tr>
		); 
	}
	renderSourceTextSecondLine(pos) {
		const shift = this.props.keyword.charCodeAt(this.props.pos) - 'A'.charCodeAt(0); 
		const row = []; 
		console.log('aaaaaaaaa');
		for (var i = 0; i < this.state.rowFirst.length; i++) {
			row.push(<td key = {i}>{String.fromCharCode((this.state.rowFirst[i].charCodeAt(0) - 65 + shift)%26 + 65)}</td>)
		};
		return (
			<tr>{row}</tr>
		);
	}
	render() {
 
		return (
			<div>
				<table> 
					<tbody>
						{this.renderSourceTextFirstLine(this.state.rowFirst)}
						{this.renderSourceTextSecondLine(this.state.pos)}
					</tbody>
				</table>
					
			</div>
		); 
	};	
}

class SourceTextDisplay extends Component {

	render() {
		return (
			<div>
				<input 
					value = {this.props.sourceWord} 
					disabled
				/>
				<span> 
					<button onClick = {this.props.sourceTextClear} 
							type='submit'>Clear</button>
				</span> 
			</div>
		); 
	};	
}
class CipherTextDisplay extends Component {

	render() {
		return (
			<div>
				<input 
					value = {this.props.cipher} 
					disabled
				/>
			</div>
		); 
	};	
}
export default App;
