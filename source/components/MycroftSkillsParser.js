var React = require('react');

module.exports = React.createClass({
  componentDidMount: function() {

  },
  componentWillReceiveProps: function (nextProps) {
    console.log(this.props.serviceOutput);
    var newState = $.extend({}, this.state, this.props.serviceOutput);
    this.setState(newState);
  },
  render: function() {
    return (
      null
    );
  }
});
