'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}
function tryConvert(temperature, convert) {
  var input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  var output = convert(input);
  var rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

var TemperatureInput = function (_React$Component) {
  _inherits(TemperatureInput, _React$Component);

  function TemperatureInput(props) {
    _classCallCheck(this, TemperatureInput);

    var _this = _possibleConstructorReturn(this, (TemperatureInput.__proto__ || Object.getPrototypeOf(TemperatureInput)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(TemperatureInput, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.props.onTemperatureChange(e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var temperature = this.props.temperature;
      var scale = this.props.scale;
      return React.createElement(
        'fieldset',
        null,
        React.createElement(
          'legend',
          null,
          'Enter temperature in ',
          scaleNames[scale],
          ':'
        ),
        React.createElement('input', { value: temperature, onChange: this.handleChange })
      );
    }
  }]);

  return TemperatureInput;
}(React.Component);

var Calculator = function (_React$Component2) {
  _inherits(Calculator, _React$Component2);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this2 = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

    _this2.handleCelsiusChange = _this2.handleCelsiusChange.bind(_this2);
    _this2.handleFahrenheitChange = _this2.handleFahrenheitChange.bind(_this2);
    _this2.state = { temperature: '', scale: 'c' };
    return _this2;
  }

  _createClass(Calculator, [{
    key: 'handleCelsiusChange',
    value: function handleCelsiusChange(temperature) {
      this.setState({ scale: 'c', temperature: temperature });
    }
  }, {
    key: 'handleFahrenheitChange',
    value: function handleFahrenheitChange(temperature) {
      this.setState({ scale: 'f', temperature: temperature });
    }
  }, {
    key: 'render',
    value: function render() {
      var scale = this.state.scale;
      var temperature = this.state.temperature;
      var celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
      var fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

      return React.createElement(
        'div',
        null,
        React.createElement(TemperatureInput, {
          scale: 'c',
          temperature: celsius,
          onTemperatureChange: this.handleCelsiusChange }),
        React.createElement(TemperatureInput, {
          scale: 'f',
          temperature: fahrenheit,
          onTemperatureChange: this.handleFahrenheitChange }),
        parseFloat(celsius) >= 100 ? React.createElement(
          'p',
          null,
          'The water would boil.'
        ) : React.createElement(
          'p',
          null,
          'The water would not boil.'
        )
      );
    }
  }]);

  return Calculator;
}(React.Component);

var ListNum = function (_React$Component3) {
  _inherits(ListNum, _React$Component3);

  function ListNum() {
    _classCallCheck(this, ListNum);

    return _possibleConstructorReturn(this, (ListNum.__proto__ || Object.getPrototypeOf(ListNum)).apply(this, arguments));
  }

  _createClass(ListNum, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'ul',
        { style: { 'background-color': '#fcf' } },
        this.props.nums.map(function (n) {
          return React.createElement(
            'li',
            { key: n },
            n
          );
        })
      );
    }
  }]);

  return ListNum;
}(React.Component);

var AForm = function (_React$Component4) {
  _inherits(AForm, _React$Component4);

  function AForm(props) {
    _classCallCheck(this, AForm);

    var _this4 = _possibleConstructorReturn(this, (AForm.__proto__ || Object.getPrototypeOf(AForm)).call(this, props));

    _this4.state = { isGoing: true, numberOfGuests: 2 };

    _this4.handleInputChange = _this4.handleInputChange.bind(_this4);
    return _this4;
  }

  _createClass(AForm, [{
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      console.log(this.state);
      var target = e.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;

      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        null,
        React.createElement(
          'label',
          null,
          'Is going:',
          React.createElement('input', {
            name: 'isGoing',
            type: 'checkbox',
            checked: this.state.isGoing,
            onChange: this.handleInputChange })
        ),
        React.createElement('br', null),
        React.createElement(
          'label',
          null,
          'Number of guests:',
          React.createElement('input', {
            name: 'numberOfGuests',
            type: 'number',
            value: this.state.numberOfGuests,
            onChange: this.handleInputChange })
        )
      );
    }
  }]);

  return AForm;
}(React.Component);

var Welcome = function (_React$Component5) {
  _inherits(Welcome, _React$Component5);

  function Welcome(props) {
    _classCallCheck(this, Welcome);

    var _this5 = _possibleConstructorReturn(this, (Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call(this, props));

    _this5.state = { date: new Date(), isToggleOn: true };

    _this5.handleClick = _this5.handleClick.bind(_this5);
    return _this5;
  }

  _createClass(Welcome, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this6 = this;

      this.timerID = setInterval(function () {
        _this6.tick();
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.setState({ date: new Date() });
    }
  }, {
    key: 'handleClk',
    value: function handleClk(e) {
      e.preventDefault();
      console.log('handleClk');
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.setState(function (state) {
        return { isToggleOn: !state.isToggleOn };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Hello, ',
          this.props.name,
          '!'
        ),
        React.createElement(
          'h2',
          null,
          'It is ',
          this.state.date.toLocaleString(),
          '.'
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'a',
            { href: 'cc', onClick: this.handleClk },
            'Click'
          )
        ),
        React.createElement(
          'button',
          { onClick: this.handleClick },
          this.state.isToggleOn ? 'ON' : 'OFF'
        ),
        React.createElement(ListNum, { nums: [1, 2, 3, 9] }),
        React.createElement(
          'div',
          null,
          React.createElement(AForm, null)
        ),
        React.createElement(
          'div',
          null,
          React.createElement(Calculator, null)
        )
      );
    }
  }]);

  return Welcome;
}(React.Component);

ReactDOM.render(React.createElement(Welcome, { name: 'Sara' }), document.getElementById('root'));