var React = require('react');
var ReactDOM = require('react-dom');
const fs = require('fs');

global.jQuery = require('jquery');
$=global.jQuery

require('bootstrap');

var App = require('./components/App.js');
var config = {};
//let webpack handle static files
require('file?name=[name].[ext]!./index.html');
require('./styles.css');
require('./stylesDesktop.css');

function loadConfigs() {
  var baseConfig = {};
  var sysConfig = {};
  var userConfig = {};

  try {
    baseConfig = require('./config.json');
  } catch (e) {
    console.log('Could not load base config');
    console.log(e);
  }

  try {
    sysConfig =  JSON.parse(fs.readFileSync(getAppFolder() + '/mycroft-electro/config.json', 'utf8'));
  } catch (e) {
   console.log('Could not load/find system config');
  }

  try {
    userConfig =  JSON.parse(fs.readFileSync(getUserHome() + '/.mycroft-electro/config.json', 'utf8'));
  } catch (e) {
   console.log('Could not load/find user config');
   console.log(e);
  }
  config = $.extend(true,{}, baseConfig, sysConfig, userConfig);
};

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
function getAppFolder() {
  if ((process.platform == 'win32')) {
    return process.env.APPDATA;
  } else {
    return '/etc';
  }
}

loadConfigs();

ReactDOM.render(
  <App process={process} config={config}/>,
  document.getElementById('app')
);
