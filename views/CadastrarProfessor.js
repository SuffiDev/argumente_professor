import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ModalDropdown from 'react-native-modal-dropdown'
import {
        View,
        Text, 
        StyleSheet,
        TextInput,
        TouchableOpacity,
        Alert,
        ToastAndroid
    } from 'react-native'
    
    const initialState = {nome:'', sobreNome: '', escola:'', cidade: '', estado: '', usuario: '', senha: '',abriu: true}
export default class Register extends Component {
    state = {
        ...initialState
    }
    //Função que salva o perfil
    saveProfessor = async () => {
        try{
            if(this.verificaCampos()){
                ToastAndroid.show('Por favor, aguarde...', ToastAndroid.SHORT)
                await axios.post('http://178.128.148.63:3000/cadastrarProfessor',{
                    nome: this.state.nome,
                    sobreNome: this.state.sobreNome,
                    escola: this.state.escola,
                    cidade: this.state.cidade,
                    estado: this.state.estado,
                    usuario: this.state.usuario,
                    senha: this.state.senha,
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    if(data.data['status'] == 'ok'){
                        Alert.alert( 'Cadastro de Professores',"Dados Salvos com sucesso!",[{text: 'OK', onPress: () => {this.props.navigation.navigate('ListaProfessor')}}])                        
                    }else{
                        Alert.alert( 'Cadastro de Professores',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
                    }
                })
            }else{
                Alert.alert( 'Cadastro de Professores',"Preencha todos os campos!",[{text: 'OK', onPress: () => {}}])
            }
        }catch(err){
            Alert.alert( 'Cadastro de Professores',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
        }
        
    }
    //Função que verifica se tem algum campo vazio
    verificaCampos = () => {
        try{
            console.log(this.state)
            if( this.state.nome == null || this.state.sobreNome == null || this.state.escola == null|| this.state.cidade == null|| this.state.estado == null|| this.state.usuario == null|| this.state.senha == null){
                return false
            }else{
                return true
            }

        }catch(err){
            Alert.alert( 'Cadastro de Professores',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
        }
    }
    updateEstado(estado) {
        this.setState({
            estado: this.listEstados[estado]
        })
    }

    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
          this.setState({...initialState})
        });
    }
    listEstados = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]
    render() {
        return(
            <View style={styles.content} >  
                <View style={styles.header}>
                    <View style={styles.iconStart}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('ListaProfessor')}>
                            <Icon name="arrow-left" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >CADASTRO DE PROFESSORES</Text>
                    </View>

                </View>
                <View  style={styles.paddingTop}>
                
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Nome: </Text>
                    <TextInput controlled={true} style={styles.textContent} value={this.state.nome} placeholder="Nome" onChangeText={(nome) => this.setState({ nome })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Sobrenome: </Text>
                    <TextInput style={styles.textContent} value={this.state.sobreNome} placeholder="Sobrenome" onChangeText={(sobreNome) => this.setState({ sobreNome })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Escola: </Text>
                    <TextInput style={styles.textContent} value={this.state.escola} placeholder="Escola" onChangeText={(escola) => this.setState({ escola })}/>  
                </View>   
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Cidade: </Text>
                    <TextInput style={styles.textContent} value={this.state.cidade} placeholder="Cidade" onChangeText={(cidade) => this.setState({ cidade })}/>  
                </View>  
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Estado: </Text>
                    <ModalDropdown 
                        style={styles.textDropDown} ref="dropEstado"
                        textStyle={styles.textDropDownText} 
                        dropdownStyle={styles.textDropDownRow} 
                        value={this.state.estado} defaultValue={"Selecione"} options={this.listEstados} onSelect={(estado) => this.updateEstado(estado)}/> 
                     
                </View>  
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Usuario: </Text>
                    <TextInput style={styles.textContent} value={this.state.usuario} placeholder="Usuario" onChangeText={(usuario) => this.setState({ usuario })}/>  
                </View>    
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Senha: </Text>
                    <TextInput style={styles.textContent} value={this.state.senha} placeholder="Senha" onChangeText={(senha) => this.setState({ senha })}/>  
                </View>     
                <View style={styles.contentSend}> 
                    <TouchableOpacity style={styles.sendButton} onPress={this.saveProfessor}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="save" size={30} color='black' />
                            <Text style={styles.textButton} >Salvar Dados</Text>
                        </View>
                    </TouchableOpacity>    
                </View>
            </View>        
        )
    }
}

const styles = StyleSheet.create({
    content:{ //Style do content da pagina
        flex:1,
        width: '100%',
        height: '100%'
    },
    header:{ // Style do Header geral
        backgroundColor:'#0066CC',
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60
    },
    iconStart:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:10
        
    },
    contentTextHeader:{ // Style do Texto que fica no centro do header
        justifyContent: 'center',
        color:'white',
        textAlign:'center',
        alignSelf:'center',
        fontSize:20,
        fontFamily: "Arial",
    },
    headerButton:{ //Header de cada um dos botões que vão ficar no corpo da tela
        borderColor:'grey',
        borderWidth:1,
        borderRadius:10,
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },

    content_buttons_add:{ // Style dos botões (TouchableHightlight)
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
    },
    contentButtons:{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    textContent:{
        color: 'black',
        flex: 1,
        height: 40,
        paddingLeft:10,
        borderRadius:10,
        borderWidth: 0.1,
        fontSize: 18
    },
    textDropDown:{
        color: 'black',
        paddingLeft:10,
        width:'100%',
        fontSize: 10
    }, 
    textDropDownText:{
        color: 'black',
        fontSize: 18,
    }, 
    textDropDownRow:{
        color: 'black',
        fontSize: 20,
        width: 180
    }, 
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        flex: 1,
        paddingLeft:25,
        borderBottomWidth: 1,
        fontSize: 20
    },
    labelButton:{ // Label dos textos
        color: 'black',
        marginLeft:25,
        fontSize: 20
    },
    contentSend:{ // Label dos textos
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
    },
    sendButton:{
        borderColor:'#0066CC',
        borderWidth:1,
        borderRadius:10,
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    paddingTop:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 0
    },
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',        
        fontSize: 20
    },
    
})