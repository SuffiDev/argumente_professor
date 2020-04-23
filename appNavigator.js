import React from 'react'
import { createAppContainer, createSwitchNavigator, Icon, Text, View,   } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import IndexProfessor from './views/IndexProfessor'
import Login from './views/Login'
import NovasRedacoes from './views/NovasRedacoes'
import FormNovaRedacao from './views/FormNovaRedacao'
import PerfilProfessor from './views/PerfilProfessor'
import RedacoesCorrigidas from './views/RedacoesCorrigidas'
import DetalheRedacoesCorrigidas from './views/DetalheRedacoesCorrigidas'
import IndexAdmin from './views/IndexAdmin'
import ListaCodigos from './views/ListaCodigos'
import AlterarCodigo from './views/AlterarCodigo'
import CadastrarCodigo from './views/CadastrarCodigo'
import PerfilAdmin from './views/PerfilAdmin'
import CadastrarProfessor from './views/CadastrarProfessor'
import ListaProfessor from './views/ListaProfessores'
import CadastrarTema from './views/CadastrarTema'
import AlterarProfessor from './views/EditarProfessor'
import ListaTema from './views/ListaTemas'
import EditaTema from './views/EditaTema'

import Menu from './views/Menu'

const menuConfig ={
  initialRouteName: 'Logout',
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
    ListaTema: {
        name: 'ListaTema',
        screen: props => <ListaTema title='ListaTema' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    CadastrarTema: {
        name: 'CadastrarTema',
        screen: props => <CadastrarTema title='CadastrarTema' {...props} />,
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
        name: 'CadastrarCodigo',
        screen: props => <CadastrarCodigo title='CadastrarCodigo' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    ListaCodigos: {
        name: 'ListaCodigos',
        screen: props => <ListaCodigos title='ListaCodigos' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    AlterarCodigo: {
        name: 'AlterarCodigo',
        screen: props => <AlterarCodigo title='AlterarCodigo' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    PerfilAdmin: {
        name: 'PerfilAdmin',
        screen: props => <PerfilAdmin title='PerfilAdmin' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    CadastrarProfessor: {
        name: 'CadastrarProfessor',
        screen: props => <CadastrarProfessor title='CadastrarProfessor' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    ListaProfessor: {
        name: 'ListaProfessor',
        screen: props => <ListaProfessor title='ListaProfessor' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    AlterarProfessor: {
        name: 'AlterarProfessor',
        screen: props => <AlterarProfessor title='AlterarProfessor' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    EditaTema: {
        name: 'EditaTema',
        screen: props => <EditaTema title='EditaTema' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    },
    EditaCodigo: {
        name: 'AlterarCodigo',
        screen: props => <AlterarCodigo title='AlterarCodigo' {...props} />,
        navigationOptions:{
            drawerLabel: () => null
        }
    }

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
    initialRouteName: 'Login'
})


export default createAppContainer(menuNavigator);