import React from 'react'
import { createAppContainer, createSwitchNavigator, Icon, Text, View  } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import IndexProfessor from './views/IndexProfessor'
import Login from './views/Login'
import NovasRedacoes from './views/NovasRedacoes'
import FormNovaRedacao from './views/FormNovaRedacao'
import PerfilProfessor from './views/PerfilProfessor'
import RedacoesCorrigidas from './views/RedacoesCorrigidas'
import DetalheRedacoesCorrigidas from './views/DetalheRedacoesCorrigidas'
import IndexAdmin from './views/IndexAdmin'

import Menu from './views/Menu'

const menuConfig ={
  initialRouteName: 'IndexAdmin',
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
    IndexProfessor: {
        name: 'IndexProfessor',
        screen: props => <IndexProfessor title='Index' {...props} />,
        navigationOptions:{
            title: 'Index'
                    
        }
    },
    IndexProfessor: {
        name: 'IndexProfessor',
        screen: props => <IndexProfessor title='Index' {...props} />,
        navigationOptions:{
            title: 'Index'
                    
        }
    },
    FormNovaRedacao: {
        name: 'FormNovaRedacao',
        screen: props => <FormNovaRedacao title='FormNovaRedacao' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
                    
        }
    },
    NovasRedacoes: {
        name: 'NovasRedacoes',
        screen: props => <NovasRedacoes title='NovasRedacoes' {...props} />,
        navigationOptions:{
            title: 'Novas Redações'
        }
    },
    RedacoesCorrigidas: {
        name: 'RedacoesCorrigidas',
        screen: props => <RedacoesCorrigidas title='RedacoesCorrigidas' {...props} />,
        navigationOptions:{
            title: 'Redações Corrigidas'
        }
    },
    DetalheRedacoesCorrigidas: {
        name: 'DetalheRedacoesCorrigidas',
        screen: props => <DetalheRedacoesCorrigidas title='RedacoesCorrigidas' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    PerfilProfessor: {
        name: 'PerfilProfessor',
        screen: props => <PerfilProfessor title='Perfil' {...props} />,
        navigationOptions:{
            title: 'Perfil'
                    
        }
    },
    Logout: {
        name: 'Logout',
        screen: props => <Login title='Logout' {...props} />,
        navigationOptions:{
            title: 'Logout'
        }
    },


    IndexAdmin: {
        name: 'IndexAdmin',
        screen: props => <IndexAdmin title='RedacoesCorrigidas' {...props} />,
        navigationOptions:{
            drawerLabel: () => null,
            drawerLockMode: 'locked-closed'
        }
    },
    CadastrarProfessor: {
        name: 'IndexAdmin',
        screen: props => <IndexAdmin title='RedacoesCorrigidas' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    CadastrarParceiro: {
        name: 'IndexAdmin',
        screen: props => <IndexAdmin title='RedacoesCorrigidas' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    CadastrarCodigo: {
        name: 'IndexAdmin',
        screen: props => <IndexAdmin title='RedacoesCorrigidas' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },

}
const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)
  const mainRoutes = {
    IndexProfessor: { 
      name: 'IndexProfessor',
      screen: IndexProfessor 
    },
    NovasRedacoes: { 
      name: 'NovasRedacoes',
      screen: NovasRedacoes 
    },
    Login:{
        name:'Login',
        screen:Login
    },
    FormNovaRedacao:{
        name:'FormNovaRedacao',
        screen:FormNovaRedacao
    },
    PerfilProfessor:{
        name:'PerfilProfessor',
        screen:PerfilProfessor
    },
    RedacoesCorrigidas:{
        name:'RedacoesCorrigidas',
        screen:RedacoesCorrigidas
    }
  };

const mainNavigator = createSwitchNavigator(mainRoutes,  {
    initialRouteName: 'IndexProfessor'
})


export default createAppContainer(menuNavigator);