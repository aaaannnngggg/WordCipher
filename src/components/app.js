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
		this.setColor = this.setColor.bind(this); 
		this.clearTableBGColor = this.clearTableBGColor.bind(this); 
	}
	reset(keyword) {
		this.setState({keyword: keyword, 
					   sourceWord: '', 
					   cipher: '', 
					   pos : 0}, 
					   ()=> {this.setColor('0')});
		
	}
	handlekeyword(keyword) {
		// if (	keyword.toUpperCase() !== keyword 
		// 	|| 	keyword.length < 3 
		// 	|| 	keyword.length > 8) {
		// 	alert('Invalid Input: must be UPPERCASE between THREE to EIGHT long');
		// 	return; 
		// }
		// if (!this.validKeyword(keyword)) {
		// 	alert('Invalid Input: must be UPPERCASE between THREE to EIGHT long');
		// }; 
		if (!this.validKeyword(keyword)) {
			alert('invalid input');
			this.reset(this.state.keyword);
			return 
		}; 
		this.reset(keyword); 
	}

	validKeyword (keyword){
		for (var i = 0; i < keyword.length; i++){
			var curr = keyword[i]; 
			if (curr.toUpperCase() === curr && curr.toLowerCase() == curr) {
				return false; 
			}
		}
		if (	keyword.toUpperCase() !== keyword 
			|| 	keyword.length < 3 
			|| 	keyword.length > 8) {
			return false ; 
		}
		return true;
	}
	handleCipher(pressed) {
		const pre = this.state.cipher;
		const shift = this.state.keyword.charCodeAt(this.state.pos) - 'A'.charCodeAt(0); 
		const cipher = `${pre + String.fromCharCode((pressed.charCodeAt(0) - 65 + shift)%26 + 65)}`;
		
		this.setState({cipher: cipher}); 
	}
	sourceTextClick(e) {
		const pre = this.state.sourceWord; 
		const sourceWord = `${pre + e.target.value}`;
		const newPos = (this.state.pos + 1) % this.state.keyword.length; 
		
		this.setState({sourceWord 	: sourceWord,
					   pos 			: newPos});
		this.setColor(String(newPos));
		this.handleCipher(e.target.value);		
	}

	setColor(pos) {
		this.clearTableBGColor();
		
		var elem = document.getElementsByClassName(pos);
		if (elem.length === 0) {
			return; 
		}
		elem[0].style.backgroundColor = "lightblue";
		elem[1].style.backgroundColor = "lightblue";
	}

	clearTableBGColor (){
		var elem = document.getElementsByTagName('td'); 
		// for (var i = 0; i < elem.length; i++) {
		// 	elem[i].style.backgroundColor = 'transparent';
		// }
		var elemArray = [...elem]; 
		elemArray.forEach(function(e){e.style.backgroundColor = 'transparent';});
	}

	sourceTextClear(e) {
		this.reset(this.state.keyword); 
	}
	render() {
		return (
			<div>
			  	<h1 id='config' >Configuration</h1>
			  	<h2 id='keyword'>Keyword </h2>
			  	<h4>(Capital Letters with length between 3 to 8)</h4>
			  	<div>
			  		<Keyword handlekeyword = {this.handlekeyword}/>
			  		<KeywordTable keyword = {this.state.keyword}/>
			  	</div>
			  	<h1>Encoding</h1>
			  	<h2>Source Text</h2>
			  	<div>
			  		<SourceTextInput 	keyword = {this.state.keyword} 
			  							sourceWord = {this.state.sourceWord} 
			  							sourceTextClick = {this.sourceTextClick}
			  							pos = {this.state.pos}/>
			  		<SourceTextDisplay 	sourceWord = {this.state.sourceWord}
			  							sourceTextClear = {this.sourceTextClear}/>
			  	</div>
			  	
			  	<h2>Cipher Text</h2>
			  	<div>
			  		<CipherTextDisplay 	cipher = {this.state.cipher}/>		
			  	</div>

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
			rowFirst.push(<TableElement key = {i} value = {keyword.charAt(i)} classN = {i}/> ); 
			rowSecond.push(<TableElement key = {i} value = {keyword.charCodeAt(i) - aCode} classN = {i}/>)
		}
		return(
			<div>
				<table className = 'table table-bordered'> 
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

const TableElement = ({value, classN}) => {
	return (
		<td className={classN}>{value}</td>
	); 
}
class SourceTextInput extends Component {
	constructor (props) {
		super(props); 
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
									type="button"
									className="btn btn-outline-success btn-sm">
									{letters[i]}
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
		for (var i = 0; i < this.state.rowFirst.length; i++) {
			const value = String.fromCharCode((this.state.rowFirst[i].charCodeAt(0) - 65 + shift)%26 + 65); 
			row.push(<td className ="font-weight-bold" key = {i}>
						{value}
					</td>)
		};
		return (
			<tr>{row}</tr>
		);
	}
	render() {
		return (
			<div>
				<table > 
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
