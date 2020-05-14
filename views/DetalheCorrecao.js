import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'
import { RNPhotoEditor } from 'react-native-photo-editor'
import ImgToBase64 from 'react-native-image-base64'
import RNFS from 'react-native-fs'
import {
        View,
        Text, 
        ImageBackground, 
        StyleSheet,
        TextInput,
        Image,
        BackHandler,
        Linking,
        Button,
        TouchableHighlight,
        ToastAndroid,
        Alert,
        TouchableOpacity
    } from 'react-native'
    const initialState = {abriu: true, aluno: '', idRedacao: '', nota: '',caminhoImg: '', observacao: '', idProfessor: '', previewImg: require('../assets/imgs/icon_no_photo.png'), nomeArquivo: ''}
export default class Register extends Component {
    
    state = {
        ...initialState
    }
    alteraImagem =() => {
        RNPhotoEditor.Edit({
            path: this.state.caminhoImg,
            onDone: (data) => {
                console.log('done' + data)
                this.setState({previewImg:{uri: 'file://' + data}, caminhoImg: data })
            },
            hiddenControls: ['crop']
        });
    }
    //Função chamada após o getRedacao, ele seta as variaveis padrões do sistema
    loadItems = async (data) => {
        const imagePath = `${RNFS.TemporaryDirectoryPath}/${data.data['desc'][0]['nomeArquivo']}`
        const idProfessor = await AsyncStorage.getItem('@idAdmin')
        let idProfessorInt = parseInt( idProfessor.replace(/^"|"$/g, ""))
        RNFS.writeFile(imagePath, data.data['desc'][0]['caminhoImg'], 'base64').then(() => {
            console.log('id: ' + this.props.navigation.getParam('id', 0))
            this.setState({
                idRedacao:data.data['desc'][0]['id'],
                tema: data.data['desc'][0]['tema'],
                aluno: data.data['desc'][0]['nome'],
                caminhoImg: imagePath,
                nomeArquivo: data.data['desc'][0]['nomeArquivo'],
                nota: data.data['desc'][0]['nota'],
                previewImg: {uri: 'file://' + imagePath },
                idProfessor: idProfessorInt   
                
            })

            
        })
    }
    //função chamada ao carregar a view, usada para trazer os dados da redacao
    getRedacao = async () => {
        try {
            let idRedacao = this.props.navigation.getParam('id','0')   
            console.log('id da redacao: ' + idRedacao)
            await axios.post('http://178.128.148.63:3000/getRedacaoId',{                   
                    id: idRedacao
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    console.log(data)
                    this.setState({abriu:false})
                    console.log('entrou')
                    this.loadItems(data)
                    
                })
                
        } catch (error) {
            console.log(error)
        // Error saving data
        }
        
    }

    componentDidMount () {
        this.getRedacao();
    }
    //Função que pega os dados e envia para a api
    sendRedacao = () => {
        try{
            console.log(this.state.caminhoImg)
            ImgToBase64.getBase64String('file://'+this.state.caminhoImg)
            .then(base64String => {
                this.enviaDados(base64String)
            })
            
        }catch(err){
            console.log(err)
        }
    }
    render() {
        if(this.state.abriu){
            this.getRedacao()
        }
        return(
            <View style={styles.content} >  
                <View style={styles.header}>

                    <View style={styles.iconHeader}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="bars" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >DETALHES DA REDAÇÃO</Text>
                    </View>

                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Tema: {this.state.tema} </Text>  
                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Aluno: {this.state.aluno} </Text>  
                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Nota: {this.state.nota} </Text>  
                </View>

                
                <View style={styles.showImagem}> 
                    <TouchableOpacity style={{height:150}}   onPress={this.alteraImagem}>
                        <Image style={{width:150, height:150}}source={this.state.previewImg} />
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
        marginLeft:5
    },
    contentTextHeader:{ // Style do Texto que fica no centro do header
        justifyContent: 'center',
        color:'white',
        textAlign:'center',
        alignSelf:'center',
        fontSize:20,
        fontFamily: "Arial",
    },
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        marginLeft:80,
        fontSize: 20
    },
    textTema:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        fontSize: 15
    },
    content_buttons:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 20,        
    },
    content_buttons_first:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 0,      
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',  
        marginLeft: 20,
        height:60,
        marginRight: 20,
    },
    buttonSend:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
    },
    contentSend:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:150,
        borderRadius:10,
    },
    headerSend:{
        borderColor:'#0066CC',
        borderWidth:1,
        borderRadius:10,
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    textSend:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        fontSize: 15
    },
    textObs:{
        color: 'black',
        borderWidth:1,  
        flex:1,
        height:150,
        marginRight:70,
        marginLeft:70,
        borderRadius: 10
    },
    contentImages:{
        marginTop: 30,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    showImagem:{
        marginTop: 10,
        marginBottom: 10,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'

    },
    imgIcon:{
        justifyContent: 'flex-end',
        left:0,
        position: 'absolute',
        marginLeft:20,
        width: '100%',
        height: 30,
        resizeMode: 'contain'
    },
    imgIconLeft:{
        justifyContent: 'flex-start',
        left:0,
        position: 'absolute',
        height: 80,
        resizeMode: 'contain'
    },
    imgIconRight:{
        justifyContent: 'flex-end',
        right:0,
        height: 80,
        marginLeft:120,
        resizeMode: 'contain'
    },
    iconHeader:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:15
        
    },
    
})