var React = require('react');
const {ipcRenderer} = require('electron');

module.exports = React.createClass({
  componentDidMount: function() {
    //The below line send a message to the main process
    //ipcRenderer.send('show-prefs');
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
