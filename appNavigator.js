import React from 'react'
import { createAppContainer, createSwitchNavigator, Icon, Text, View  } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import IndexProfessor from './views/IndexProfessor'
import Login from './views/Login'
import NovasRedacoes from './views/NovasRedacoes'

import Menu from './views/Menu'

const menuConfig ={
  initialRouteName: 'IndexProfessor',
  contentComponent: Menu,
  contentOptions: {
      labelStyle: {
          fontFamily:'Lato',
          fontWeight: 'normal',
          fontSize: 20
      },
      activeLabelStyle:{
          color: '#0066CC',
          fontWeight: 'bold',
      }
  }
}
const menuRoutes = {  
    Login: {
        name: 'Login',
        screen: props => <Login title='Login' {...props} />,
        navigationOptions:{
            title: 'Login'
        }
    },
    NovasRedacoes: {
        name: 'NovasRedacoes',
        screen: props => <NovasRedacoes title='NovasRedacoes' {...props} />,
        navigationOptions:{
            title: 'NovasRedacoes'
        }
    },
    IndexProfessor: {
        name: 'IndexProfessor',
        screen: props => <IndexProfessor title='Index' {...props} />,
        navigationOptions:{
            title: 'IndexProfessor'
                    
        }
    }

}
const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)
  const mainRoutes = {
    Login: { 
        name: 'Login',
        screen: Login 
    } ,
    IndexProfessor: { 
      name: 'IndexProfessor',
      screen: IndexProfessor 
    },
    NovasRedacoes: { 
      name: 'NovasRedacoes',
      screen: NovasRedacoes 
    }
  };

const mainNavigator = createSwitchNavigator(mainRoutes,  {
    initialRouteName: 'NovasRedacoes'
})


export default createAppContainer(mainNavigator);