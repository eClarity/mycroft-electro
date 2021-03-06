var React = require('react');

var MyCroftAdminPanel = require('./MycroftAdminPanel.js');
var PluginZone = require('./PluginZone.js');


module.exports = React.createClass({
  getInitialState: function() {
    var config = this.props.config;

    var args = global.MCArgs;
    config.args = args;

    return {
        'info': {},
        'mycroft': {},//,
        'config': config
      };
  },
  componentDidMount: function() {
  },
  onMycroftMessage: function(msg) {
    this.sendWSMessageToPlugins(msg);
  },
  sendWSMessageToPlugins: function(msg) {
    var mycroft_message = {
        'message': msg
    };

    var stateAddition = {
      mycroft: {'message': msg}
    };

    var newState = $.extend({}, this.state, stateAddition);
    this.setState(newState );
  },
  render: function() {
    return (
      <div className="container">
      <p> </p>
        <MyCroftAdminPanel config={this.state.config} onMycroftOutput={this.onMycroftMessage} />
        <PluginZone config={this.state.config} mycroft={this.state.mycroft} />
      </div>
    );
  }
});
