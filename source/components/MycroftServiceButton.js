var React = require('react');

var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var MycroftSkillsParser = require('./MycroftSkillsParser.js');

var config = require('../config.json');

var mycroftCoreDir = config.paths.mycroftCoreDir//'/home/josh/mycroft-core';
var installDir = config.paths.installDir //'/home/josh/mycroft-magic-mirror';



module.exports = React.createClass({

  componentDidMount: function() {
  },
  getInitialState: function() {
    return {
      buttonType: 'Start',
      PID: 0,
      service: {
        name: this.props.ServiceName,
        stdout: '',
        stderr: '',
        stdin: ''
      }
    };
  },
  handleClick: function() {
    if (this.state.buttonType === 'Start') {
      console.log('starting service');
      this.startService();
    } else {
      console.log('stopping service');
      this.stopService();
    }
  },

  startService: function() {

    var child = spawn(
        '',
        [mycroftCoreDir + '/start.sh', this.props.ServiceName],
        {
          'cwd': mycroftCoreDir,
          'env': process.env,
          'shell': true
        }
    );

    console.log('Created process with PID:' + child.pid);

    child.stdout.on('data', function(data){
        var newState = $.extend({}, this.state, {service: { 'name': this.props.ServiceName, 'stdout': data.toString().replace(/(\r\n|\n|\r)/gm,""), 'stderr': '' , 'stdin': ''  }});
        this.setState(newState );
    }.bind(this));;

    child.stderr.on('data', function(data){
      var newState = $.extend( {}, this.state, {service: { 'name': this.props.ServiceName, 'stdout': '', 'stderr': data.toString().replace(/(\r\n|\n|\r)/gm,""), 'stdin': ''  }});
      this.setState(newState );

      if (new String("Terminated").valueOf() == new String(data.toString().replace(/(\r\n|\n|\r)/gm,"")).valueOf()) {
        var newState = $.extend( {}, this.state, {buttonType: 'Start', PID: 0});
        this.setState(newState );
      }
    }.bind(this));

    child.stdin.on('data', function(data){
      var newState = $.extend( {}, this.state, {service: { 'name': this.props.ServiceName, 'stdout': '', 'stderr': '' ,'stdin': data.toString().replace(/(\r\n|\n|\r)/gm,"") }});
      this.setState(newState );
    }.bind(this));

    var newState = $.extend( {}, this.state, {buttonType: 'Stop', PID: child.pid});
    this.setState(newState );
  },

  stopService: function() {

    var options = {};
    options.cwd = __dirname + "/scripts"


    exec('chmod 700 '+installDir + '/build/kill_descendant_processes.sh ', {} , function(error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
    });


    exec( installDir + '/build/kill_descendant_processes.sh ' + this.state.PID, {} , function(error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
    });

    var pid_num = this.state.PID;
  },

  render: function() {
    return (
      <div>
        <button type="button" onClick={this.handleClick} className="btn btn-default col-xs-12 col-md-4">---{this.state.buttonType} {this.props.ServiceName} service [{this.state.PID}]---</button>
        <MycroftSkillsParser serviceOutput={this.state.service}/>
      </div>
    );
  }
});
