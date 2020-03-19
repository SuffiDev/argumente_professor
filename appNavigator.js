import React from 'react'
import { createAppContainer, createSwitchNavigator, Icon, Text, View  } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import IndexProfessor from './views/IndexProfessor'
import Login from './views/Login'
import NovasRedacoes from './views/NovasRedacoes'
import FormNovaRedacao from './views/FormNovaRedacao'

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
    },
    FormNovaRedacao: {
        name: 'FormNovaRedacao',
        screen: props => <FormNovaRedacao title='Index' {...props} />,
        navigationOptions:{
            title: 'FormNovaRedacao'
                    
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
    },
    FormNovaRedacao: { 
      name: 'FormNovaRedacao',
      screen: FormNovaRedacao 
    },
  };

const mainNavigator = createSwitchNavigator(mainRoutes,  {
    initialRouteName: 'FormNovaRedacao'
})


export default createAppContainer(mainNavigator);