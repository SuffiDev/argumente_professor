import React, {Component} from 'react'
import axios from 'axios'
import ModalDropdown from 'react-native-modal-dropdown'
import {
        View,
        Text, 
        ImageBackground, 
        StyleSheet,
        TextInput,
        Image,
        Alert,
        ToastAndroid,
        TouchableOpacity        
    } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { StackActions, NavigationActions } from 'react-navigation'
const initialState = {usuario: '', senha: '',tipoUsuario: ''}
export default class Login extends Component {

    listOpcoes = ['Professor', 'Administrador']
    state = {
        ...initialState
    }

    updateOpcoes(opcao) {
        this.setState({
            tipoUsuario: this.listOpcoes[opcao]
        })
    }
    //Salva a sessão e redireciona para o Index 
    newSessionProfessor = async (dados_retorno) => {
        ToastAndroid.show('Login efetuado com sucesso!', ToastAndroid.LONG);
        await AsyncStorage.setItem('@dadosLogin', JSON.stringify(dados_retorno));
        this.props.navigation.navigate('Index')
    }

    //Função do login
    login = async () => {
        console.log(this.props.navigation)
        let jsonEnvio = this.state
        if(this.state.usuario == "" || this.state.senha == "" || this.state.tipoUsuario == ""){
            Alert.alert( 'Erro ao logar','Preencha o usuario e senha corretamente!',[{text: 'Voltar', onPress: () => {}}])
        }else{
            try{
                ToastAndroid.show('Por favor, aguarde...', ToastAndroid.SHORT);
                await axios.post('http://178.128.148.63:3000/loginAdmin',{                   
                    usuario: jsonEnvio.usuario,
                    senha: jsonEnvio.senha,
                    tipoUsuario: jsonEnvio.tipoUsuario,
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {                    
                    let retorno = data.data
                    console.log(retorno)
                    switch(retorno['status']) {
                        case 'ok':
                            console.log(this.state.tipoUsuario)
                            if(jsonEnvio.tipoUsuario == 'Professor')
                                setaSessao(retorno['desc'][0]).then((data) =>{
                                    if(data == 'ok'){
                                        //Eu reseto todas as navigations para não conflitar com professor e admin
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                          });
                                        this.props.navigation.dispatch(resetAction);
                                        this.props.navigation.navigate('IndexProfessor')
                                    }else{
                                        Alert.alert( 'Erro ao logar','Erro ao logar. Tente novamente mais tarde! ' + data ,[{text: 'Voltar', onPress: () => {}}])
                                    }
                                })                                        
                            else
                                setaSessao(retorno['desc'][0]).then((data) =>{
                                    if(data == 'ok'){
                                        //Eu reseto todas as navigations para não conflitar com professor e admin
                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                          });
                                        this.props.navigation.dispatch(resetAction);
                                        this.props.navigation.navigate('IndexAdmin')
                                    }else{
                                        Alert.alert( 'Erro ao logar','Erro ao logar. Tente novamente mais tarde!' + data,[{text: 'Voltar', onPress: () => {}}])
                                    }
                                })                        
                            break;
                        case 'erro':
                            Alert.alert( 'Erro ao logar','Erro ao logar. Tente novamente mais tarde!' + retorno['desc'],[{text: 'Voltar', onPress: () => {}}])
                            break;
                        case 'erro_senha':
                            Alert.alert( 'Erro ao logar','Usuario ou senha inválidos!',[{text: 'Voltar', onPress: () => {}}])
                            break;
                    }
                })
            }catch(err){
                console.log(err)
                Alert.alert( 'Erro ao logar','Erro ao logar. Tente novamente mais tarde!' + err,[{text: 'Voltar', onPress: () => {}}])
            }
        }
    }
    render() {
        this.props.navigation.dispatch(StackActions.popToTop())
        
        return(
            <ImageBackground source={require('../assets/imgs/img_login_admin.jpg')} style={styles.imageLogin}>
                <Image source={require('../assets/imgs/logo_argumente.png')} style={styles.logo}/> 
                <View style={styles.content} > 
                    <Text style={{color:'#FFF'}}>ARGUMENTE - ADMIN</Text>                      
                    <TextInput placeholder="Usuario" style={styles.textFields}  onChangeText={usuario => this.setState({usuario})}/>          
                    <TextInput placeholder="Senha" secureTextEntry={true} style={styles.textFields}  onChangeText={senha => this.setState({senha})}/>
                    <ModalDropdown 
                        style={styles.textFields} ref="dropEscolaridade"
                        textStyle={styles.textDropDownText} 
                        dropdownTextStyle={styles.textDropDownText} 
                        defaultValue={"Tipo de Login"} options={this.listOpcoes} onSelect={(listOpcoes) => this.updateOpcoes(listOpcoes)}/>
                    <TouchableOpacity style={styles.buttons} onPress={this.login}>
                        <Text style={{fontSize: 20, color: '#FFF'}}> Login </Text>
                    </TouchableOpacity>
                </View>        
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    imageLogin:{
        height:'100%',
        width: '100%',
        alignItems: 'center'
    },content:{
        alignItems: 'center',         
        padding: 20,
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        marginTop: '10%'
    },
    textFields:{
        backgroundColor: '#FFF',
        fontFamily: 'Lato',
        width:'90%',
        height:35,
        marginTop: 20,
    },
    textDropDownText:{
        color: '#A9A9A9',
        fontSize: 13,
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 35,
        marginLeft: 5
    },  
    logo:{
        width:200,
        height:160,
        marginTop: '15%'
    },
    link:{
        color:'#FFF',
        width:'90%',
        textAlign: 'right',
        marginTop: 10,
        fontSize: 15
    },
    buttons:{
        width:'90%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#0066CC',
        marginTop: 20
    }
})

async function setaSessao(dados){
    try{
        //await AsyncStorage.clear()
        await AsyncStorage.setItem('@idAdmin', '"' + dados['id']+ '"')
        await AsyncStorage.setItem('@nomeAdmin', dados['nome'])
        return 'ok'
    }catch(err){
        console.log(err)
        return err
    }

}