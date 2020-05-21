import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './views/Login'
//Telas do Professor
import IndexProfessor from './views/professor/IndexProfessor'
import NovasRedacoes from './views/professor/NovasRedacoes'
import FormNovaRedacao from './views/professor/FormNovaRedacao'
import PerfilProfessor from './views/professor/PerfilProfessor'
import RedacoesCorrigidas from './views/professor/RedacoesCorrigidas'
import DetalheRedacoesCorrigidas from './views/professor/DetalheRedacoesCorrigidas'
import DetalheCorrecao from './views/professor/DetalheCorrecao'
import FaleConosco from './views/professor/FaleConosco'
//Telas do Admin
import IndexAdmin from './views/admin/IndexAdmin'
import EditaTema from './views/admin/EditaTema'
import ListaCodigos from './views/admin/ListaCodigos'
import AlterarProfessor from './views/admin/EditarProfessor'
import AlterarCodigo from './views/admin/AlterarCodigo'
import CadastrarCodigo from './views/admin/CadastrarCodigo'
import PerfilAdmin from './views/admin/PerfilAdmin'
import CadastrarProfessor from './views/admin/CadastrarProfessor'
import ListaProfessor from './views/admin/ListaProfessores'
import CadastrarTema from './views/admin/CadastrarTema'
import ListaTema from './views/admin/ListaTemas'
import ListaFaleConosco from './views/admin/ListaFaleConosco'
import DetalheFaleConosco from './views/admin/DetalheFaleConosco'
//Primeiro eu crio o StackNavigator e depois o Drawer e jogo o drawer para o createAppContainer. Assim eu consigo usar o drawer com a navegação correta
const AppNavigator = createStackNavigator({
    Login: {screen: Login,  navigationOptions: { header: null }},
    //Professor
    IndexProfessor: {screen: IndexProfessor, navigationOptions: { header: null }},
    NovasRedacoes: {screen: NovasRedacoes, navigationOptions: { header: null }},
    FormNovaRedacao: {screen: FormNovaRedacao, navigationOptions: { header: null }},
    PerfilProfessor: {screen: PerfilProfessor, navigationOptions: { header: null }},
    RedacoesCorrigidas: {screen: RedacoesCorrigidas, navigationOptions: { header: null }},
    DetalheRedacoesCorrigidas: {screen: DetalheRedacoesCorrigidas, navigationOptions: { header: null }},
    DetalheCorrecao: {screen: DetalheCorrecao, navigationOptions: { header: null }},
    FaleConosco: {screen: FaleConosco, navigationOptions: { header: null }},
    //Admin
    IndexAdmin: {screen: IndexAdmin, navigationOptions: { header: null }},
    EditaTema: {screen: EditaTema, navigationOptions: { header: null }},
    PerfilAdmin: {screen: PerfilAdmin, navigationOptions: { header: null }},
    ListaCodigos: {screen: ListaCodigos, navigationOptions: { header: null }},
    AlterarProfessor: {screen: AlterarProfessor, navigationOptions: { header: null }},
    AlterarCodigo: {screen: AlterarCodigo, navigationOptions: { header: null }},
    CadastrarCodigo: {screen: CadastrarCodigo, navigationOptions: { header: null }},
    CadastrarProfessor: {screen: CadastrarProfessor, navigationOptions: { header: null }},
    ListaProfessor: {screen: ListaProfessor, navigationOptions: { header: null }},
    CadastrarTema: {screen: CadastrarTema, navigationOptions: { header: null }},
    ListaTema: {screen: ListaTema, navigationOptions: { header: null }},
    ListaFaleConosco: {screen: ListaFaleConosco, navigationOptions: { header: null }},
    DetalheFaleConosco: {screen: DetalheFaleConosco, navigationOptions: { header: null }},
});
import Menu from './views/Menu'
const Nav = createDrawerNavigator({
    //Stack e Logout
    Stack: {screen:AppNavigator,navigationOptions:{drawerLabel: () => null}},
    Logout: {screen:Login,navigationOptions:{drawerLabel: () => null}},
    //Professor
    IndexProfessor: {screen:IndexProfessor,navigationOptions:{title: 'Index'}},
    PerfilProfessor: {screen:PerfilProfessor,navigationOptions:{title: 'Perfil'}},
    NovasRedacoes: {screen:NovasRedacoes,navigationOptions:{title: 'Novas Redações'}},
    FormNovaRedacao: {screen:FormNovaRedacao,navigationOptions:{drawerLabel: () => null}},
    RedacoesCorrigidas: {screen:RedacoesCorrigidas,navigationOptions:{title: 'Redações Corrigidas'}},
    DetalheRedacoesCorrigidas: {screen:DetalheRedacoesCorrigidas,navigationOptions:{drawerLabel: () => null}},
    DetalheCorrecao: {screen:DetalheCorrecao,navigationOptions:{drawerLabel: () => null}},
    FaleConosco: {screen:FaleConosco,navigationOptions:{title: 'Fale Conosco'}},
    //Admin
    IndexAdmin: {screen:IndexAdmin,navigationOptions:{drawerLabel: () => null}},
    EditaTema: {screen:EditaTema,navigationOptions:{drawerLabel: () => null}},
    PerfilAdmin: {screen:PerfilAdmin,navigationOptions:{drawerLabel: () => null}},
    ListaCodigos: {screen:ListaCodigos,navigationOptions:{drawerLabel: () => null}},
    AlterarProfessor: {screen:AlterarProfessor,navigationOptions:{drawerLabel: () => null}},
    AlterarCodigo: {screen:AlterarCodigo,navigationOptions:{drawerLabel: () => null}},
    CadastrarCodigo: {screen:CadastrarCodigo,navigationOptions:{drawerLabel: () => null}},
    CadastrarProfessor: {screen:CadastrarProfessor,navigationOptions:{drawerLabel: () => null}},
    ListaProfessor: {screen:ListaProfessor,navigationOptions:{drawerLabel: () => null}},
    CadastrarTema: {screen:CadastrarTema,navigationOptions:{drawerLabel: () => null}},
    ListaTema: {screen:ListaTema,navigationOptions:{drawerLabel: () => null}},
    ListaFaleConosco: {screen:ListaFaleConosco,navigationOptions:{drawerLabel: () => null}},
    DetalheFaleConosco: {screen:DetalheFaleConosco,navigationOptions:{drawerLabel: () => null}},
    
},{
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily:'Lato',
            fontWeight: 'normal',
            fontSize: 15
        },
        activeLabelStyle:{
            color: '#0066CC',
            fontWeight: 'bold',
        }
    }
}); 
export default createAppContainer(Nav);