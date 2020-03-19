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
        Linking,
        Button,
        TouchableHighlight,
        ToastAndroid,
        Alert,
        TouchableOpacity
    } from 'react-native'
    const initialState = {abriu: true, aluno: '', idRedacao: 1 ,caminhoImg: '', observacao: '', previewImg: require('../assets/imgs/icon_no_photo.png'), nomeArquivo: ''}
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
            }
        });
    }
    //Função chamada após o getRedacao, ele seta as variaveis padrões do sistema
    loadItems = (data) => {
        const imagePath = `${RNFS.TemporaryDirectoryPath}/${data.data['desc'][0]['nomeArquivo']}`;
        RNFS.writeFile(imagePath, data.data['desc'][0]['caminhoImg'], 'base64').then(() => {
            
            this.setState({
                idRedacao:data.data['desc'][0]['id'],
                tema: data.data['desc'][0]['tema'],
                aluno: data.data['desc'][0]['nome'],
                caminhoImg: imagePath,
                nomeArquivo: data.data['desc'][0]['nomeArquivo'],
                previewImg: {uri: 'file://' + imagePath }
            })

            
        })
    }
    //função chamada ao carregar a view, usada para trazer os dados da redacao
    getRedacao = async () => {
        try {
            await axios.post('http://192.168.0.29:3000/getRedacaoId',{                   
                    id: this.state.idRedacao,
                    observacao: this.state.observacao,
                    dadosImg:'teste'
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    this.setState({abriu:false})
                    console.log('entrou')
                    this.loadItems(data)
                    
                })
                
        } catch (error) {
            console.log(error)
        // Error saving data
        }
        
    }
    //Função que complementa o sendRedacao
    enviaDados = async (base64String) => {
        await axios.post('http://192.168.0.29:3000/sendCorrecao', {
            idRedacao:this.state.idRedacao,
            dadosImagem: base64String,
            observacoes:this.state.observacao,
            usuarioEnvio:'professor'
        }).then(data => {
            let retorno = data.data
            switch(retorno['status']) {
                case 'ok':                    
                    ToastAndroid.show('Redação Corrigida com sucesso!', ToastAndroid.LONG)   
                    break;
                case 'erro':
                    Alert.alert( 'Erro ao logar','Erro ao logar. Tente novamente mais tarde!',[{text: 'Voltar', onPress: () => {}}])
                    break;
            }
        })
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

                    <View style={styles.iconStart}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="bars" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >Detalhes da Redação</Text>
                    </View>

                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Tema: {this.state.tema} </Text>  
                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Aluno: {this.state.aluno} </Text>  
                </View>

                
                <View style={styles.showImagem}> 
                    <TouchableOpacity style={{height:150}}   onPress={this.alteraImagem}>
                        <Image style={{width:150, height:150}}source={this.state.previewImg} />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentSend}> 
                <TextInput style={styles.textObs} multiline = {true} placeholder="Observações" value={this.state.observacao} onChangeText={(observacao) => this.setState({ observacao })}></TextInput> 
                </View>



                <View style={styles.buttonSend}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={this.sendRedacao}>
                        <View style={styles.headerSend}>
                            <Icon style={styles.iconStart} name="send" size={30} color='black' />
                            <Text style={styles.textSend} >Enviar Correção</Text>
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
        fontSize: 20
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
        fontSize: 20
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
    }
    
})