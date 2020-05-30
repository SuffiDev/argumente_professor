import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { RNPhotoEditor } from 'react-native-photo-editor'
import ImgToBase64 from 'react-native-image-base64'
import RNFS from 'react-native-fs'
import {AudioRecorder, AudioUtils} from 'react-native-audio'
import Loader from './../LoadSpinner'
import {
    View,
    Text, 
    StyleSheet,
    TextInput,
    Image,
    ToastAndroid,
    Alert,
    TouchableOpacity
} from 'react-native'
const initialState = {loading: false, caminhoAudio: '',audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac', hasPermission: undefined, abriu: false, aluno: '',timerCont: 0,timer:'',contador:'00:00', idRedacao: '' ,caminhoImg: '', observacao: '', idProfessor: '', previewImg: require('../../assets/imgs/icon_no_photo.png'), nomeArquivo: ''}
export default class Register extends Component {
    state = {
        ...initialState
    }
    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: "Low",
          AudioEncoding: "aac",
          AudioEncodingBitRate: 32000
        });
      }
    componentDidMount() {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
            if(!this.state.abriu)
                this.getRedacao()
        });
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
          this.setState({ hasPermission: isAuthorised });  
          if (!isAuthorised) return;  
          this.prepareRecordingPath(this.state.audioPath); 
          AudioRecorder.onProgress = (data) => {
            this.setState({contador: fmtMSS(Math.floor(data.currentTime))});
          };
  
          AudioRecorder.onFinished = (data) => {
              this.setState({caminhoAudio: data.audioFileURL})
           };
        });
      }
    alteraImagem =() => {
        RNPhotoEditor.Edit({
            path: this.state.caminhoImg,
            onDone: (data) => {
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
            this.setState({
                idRedacao:data.data['desc'][0]['id'],
                tema: data.data['desc'][0]['tema'],
                aluno: data.data['desc'][0]['nome'],
                caminhoImg: imagePath,
                nomeArquivo: data.data['desc'][0]['nomeArquivo'],
                previewImg: {uri: 'file://' + imagePath },
                idProfessor: idProfessorInt                   
            })         
            this.setState({loading: false})  
        })
    }
    //função chamada ao carregar a view, usada para trazer os dados da redacao
    getRedacao = async () => {
        try { 
            this.setState({loading: true})
            let idRedacao = this.props.navigation.getParam('id','0')   
            ToastAndroid.show('Por favor, aguarde...', ToastAndroid.LONG)
            await axios.post('http://178.128.148.63:3000/getRedacaoProfessor',{                   
                    id: idRedacao
                }).then(data => {
                    this.setState({abriu:true})
                    this.loadItems(data)                    
                })
                
        } catch (error) {
            console.log(error)
        // Error saving data
        }
        
    }
    //Função que complementa o sendRedacao
    enviaDados = async (base64String) => {
        ToastAndroid.show('Por favor, aguarde...', ToastAndroid.LONG)
        //Vou montar todo o FormData com o audio e a iamgem para enviar para a API
        try{
            console.log('começando')
            const idProfessor = await AsyncStorage.getItem('@idAdmin')
            let idProfessorInt = parseInt( idProfessor.replace(/^"|"$/g, ""))        
            let formData = new FormData();
            const audio = {
                uri: 'file://' + this.state.caminhoAudio,
                type: 'audio/aac',
                name: this.state.caminhoAudio
              }
            formData.append('file', audio)
            formData.append('dadosImagem', base64String)
            formData.append('idRedacao', this.state.idRedacao)
            formData.append('observacoes', this.state.observacao)
            formData.append('nota', this.state.nota)
            formData.append('idProfessor', idProfessorInt)
            formData.append('usuarioEnvio', 'professor')
            await axios({
                url: 'http://178.128.148.63:3000/sendCorrecao',
                method: 'POST',
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                data:formData
            }).then(data => {
                this.setState({loading: false})  
                let retorno = data.data
                switch(retorno['status']) {
                    case 'ok':                    
                        ToastAndroid.show('Redação Corrigida com sucesso!', ToastAndroid.LONG)
                        this.props.navigation.navigate('NovasRedacoes') 
                        break;
                    case 'erro':
                        Alert.alert( 'Erro','Erro Enviar Redação!. Tente novamente mais tarde!',[{text: 'Voltar', onPress: () => {}}])
                        break;
                }
            })
        }catch(err){
            console.log(err)
        }
        
    }
    //Função que pega os dados e envia para a api
    sendRedacao = () => {
        try{
            this.setState({loading: true})  
            console.log(this.state.caminhoImg)
            ImgToBase64.getBase64String('file://'+this.state.caminhoImg)
            .then(base64String => {
                this.enviaDados(base64String)
            })            
        }catch(err){
            console.log(err)
        }
    }
    iniciaContador = async () =>{
        console.log('iniciando o press')
        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }
        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }
    finalizaContador = async () =>{
        try {
            const filePath = await AudioRecorder.stopRecording();
            return filePath;
        } catch (error) {
            console.error(error);
        }
        this.setState({timerCont:0})
    }
    aplicaContador = () => {
        console.log('entrou no aplicaContador' + this.state.contador)
        this.setState({timerCont: this.state.timerCont + 1,contador:'' +new Date(this.state.timerCont * 1000).toISOString().substr(11, 8)})
    }
    render() {
        return(
            <View style={styles.content} >  
                <Loader
                    loading={this.state.loading} />
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
                    <Text style={styles.labelButton} >Nota: </Text>
                    <TextInput style={styles.textTema} placeholder="Digite uma nota" value={this.state.nota} onChangeText={(nota) => this.setState({ nota })}></TextInput>
                </View>
                <View style={styles.content_buttons_first}> 
                <Text style={styles.labelButton} >Audio dica: {this.state.contador} </Text>
                <TouchableOpacity  onPressIn={() => this.iniciaContador()} onPressOut={() => this.finalizaContador()}>
                            <Icon name="play" size={30} color='#000'  /> 
                </TouchableOpacity>  
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
        fontSize: 15
    },
    content_buttons:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 20,        
    },
    content_buttons_first:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 10,      
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',  
        marginLeft: 20,
        marginRight: 20,
    },
    buttonSend:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
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

function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}