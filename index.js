/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Login from './views/Login'
import IndexProfessor from './views/IndexProfessor'
import Routes from './appNavigator'

AppRegistry.registerComponent(appName, () => Routes);
