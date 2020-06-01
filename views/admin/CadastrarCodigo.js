import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ModalDropdown from 'react-native-modal-dropdown'
import ImagePicker from 'react-native-image-picker'
import Loader from './../LoadSpinner'
import {
        View,
        Text, 
        StyleSheet,
        TextInput,
        BackHandler,
        TouchableOpacity,
        Image,
        Alert,
        ToastAndroid
    } from 'react-native'
const initialState = {loading: false, parceiro:'', codigo: '', id:'', quantidade: '',abriu: true, previewImg: '', caminhoImg: ''}
const options = {
    quality       : 1,
    mediaType    : "photo",
    cameraType  : "back",
    allowsEditing : true,
    noData          : false,

    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};   
export default class Register extends Component {
    state = {
        ...initialState
    }
    //Função que salva o perfil
    saveCodigo = async () => {
        try{
            this.setState({loading: true})
            ToastAndroid.show('Por favor, aguarde...', ToastAndroid.SHORT)
            console.log(this.verificaCampos())
            if(this.verificaCampos()){
                ToastAndroid.show('Por favor, aguarde...', ToastAndroid.SHORT)
                await axios.post('http://178.128.148.63:3000/salvarCodigo',{
                    parceiro: this.state.parceiro,
                    codigo: this.state.codigo,
                    quantidade: this.state.quantidade,  
                    imgPhoto: this.state.caminhoImg,
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    this.setState({loading: false})
                    if(data.data['status'] == 'ok'){
                        Alert.alert( 'Códigos',"Dados Salvos com sucesso!",[{text: 'OK', onPress: () => {this.props.navigation.navigate('ListaCodigos')}}])                        
                    }else{
                        Alert.alert( 'Códigos',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
                    }
                })
            }else{
                Alert.alert( 'Códigos',"Preencha todos os campos!",[{text: 'OK', onPress: () => {}}])
            }
        }catch(err){
            Alert.alert( 'Códigos',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
        }
        
    }
    //Função que verifica se tem algum campo vazio
    verificaCampos = () => {
        try{
            console.log(this.state)
            if( this.state.codigo == null || this.state.parceiro == null || this.state.quantidade == null){
                return false
            }else{
                return true
            }

        }catch(err){
            Alert.alert( 'Código',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
        }
    }
    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
          this.setState({...initialState});
        });
    }
    openGallery = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log(response.data)
            const source = { uri: 'file://' +response.path }
            this.setState({ previewImg: {uri: 'file://' + response.path }, caminhoImg: response.data });
          });
    }
    render() {
        return(
            <View style={styles.content} >  
                <Loader
                    loading={this.state.loading} />
                <View style={styles.header}>
                    <View style={styles.iconStart}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('ListaCodigos')}>
                            <Icon name="arrow-left" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >CADASTRO DE CÓDIGO</Text>
                    </View>

                </View>
                <View  style={styles.paddingTop}>
                
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Parceiro: </Text>
                    <TextInput controlled={true} style={styles.textContent} value={this.state.parceiro} placeholder="Parceiro" onChangeText={(parceiro) => this.setState({ parceiro })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Código: </Text>
                    <TextInput style={styles.textContent} value={this.state.codigo} placeholder="Código" onChangeText={(codigo) => this.setState({ codigo })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Quantidade: </Text>
                    <TextInput style={styles.textContent} keyboardType='numeric' value={this.state.quantidade} placeholder="Quantidade" onChangeText={(quantidade) => this.setState({ quantidade })}/>  
                </View>
                <View style={styles.contentSend}> 
                    <TouchableOpacity style={styles.buttonFoto}  onPress={this.openGallery}>
                        <View style={styles.headerButton}>
                            <Text style={styles.textButton} >Adicionar Logo</Text>
                        </View>
                    </TouchableOpacity>     
                </View>
                <View style={styles.showImagem}> 
                    <TouchableOpacity style={{height:100}}   onPress={()=>{}}>
                        <Image style={{width:100, height:100}}source={this.state.previewImg} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentSend}> 
                    <TouchableOpacity style={styles.sendButton} onPress={this.saveCodigo}>
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
    showImagem:{
        marginTop: 10,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'

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
        fontSize:15,
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
        fontSize: 15
    },
    textDropDown:{
        color: 'black',
        paddingLeft:10,
        width:'100%',
        fontSize: 10
    }, 
    textDropDownText:{
        color: 'black',
        fontSize: 15
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
    buttonFoto:{
        borderColor:'#0066CC',
        borderWidth:1,
        borderRadius:10,
        width:'70%',
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