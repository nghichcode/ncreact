const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <p>The water would {parseFloat(celsius)>=100?'not ':''}boil.</p>

      </div>
    );
  }
}

class ListNum extends React.Component {
	render() {
		return (
			<ul style={{'background-color':'#fcf'}}>
				{this.props.nums.map( (n)=>(<li key={n} >{n}</li>) )}
			</ul>
		);
	}
}

class AForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {isGoing:true, numberOfGuests: 2};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(e){
		console.log(this.state);
		const target=e.target;
		const value =target.type==='checkbox'?target.checked:target.value;
		const name = target.name;

		this.setState({[name]:value});
	}

	render() {
		return (
		<form>
      <label>Is going:
        <input
          name="isGoing"
          type="checkbox"
          checked={this.state.isGoing}
          onChange={this.handleInputChange} />
      </label>
      <br />
      <label>Number of guests:
        <input
          name="numberOfGuests"
          type="number"
          value={this.state.numberOfGuests}
          onChange={this.handleInputChange} />
      </label>
    </form>
		);
	}
}

class Welcome extends React.Component {
	constructor(props){
		super(props);
		this.state = {date : new Date(), isToggleOn: true};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){
		this.timerID = setInterval(()=>{this.tick();},1000)
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	tick(){ this.setState({date:new Date()}); }
	handleClk(e) {
		e.preventDefault();
		console.log('handleClk');
	}

	handleClick(){
		this.setState( state=>({isToggleOn:!state.isToggleOn})  )
	}

	render() {
		return (
			<div>
		    <h1>Hello, {this.props.name}!</h1>
		    <h2>It is {this.state.date.toLocaleString()}.</h2>
		    <div><a href="cc" onClick={this.handleClk}>Click</a></div>
		    <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
		    <ListNum nums={[1,2,3,9]} />
		    <div><AForm/></div>
		    <div><Calculator/></div>
			</div>
		);
	}	
}

ReactDOM.render(<Welcome name="Sara" />, document.getElementById('root'));

