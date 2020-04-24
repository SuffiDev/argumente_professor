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
    const initialState = {tema:'', dias: '',id:'', mes:'', ano: '', apoioPdf: '', apoioWeb:'', apoioVideo: '', abriu: true}
export default class Register extends Component {
    listMes = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
    listAno = ["2020","2021","2022","2023","2024","2025","2026","2027","2028","2029"]
    state = {
        ...initialState
    }
    getMes = () => {
        if(this.state.mes == 1)
            return 'Janeiro'
        if(this.state.mes == 1)
            return 'Fevereiro'
        if(this.state.mes == 1)
            return 'Março'
        if(this.state.mes == 1)
            return 'Abril'
        if(this.state.mes == 1)
            return 'Maio'
        if(this.state.mes == 1)
            return 'Junho'
        if(this.state.mes == 1)
            return 'Julho'
        if(this.state.mes == 1)
            return 'Agosto'
        if(this.state.mes == 1)
            return 'Setembro'
        if(this.state.mes == 1)
            return 'Outubro'
        if(this.state.mes == 1)
            return 'Novembro'
        if(this.state.mes == 1)
            return 'Dezembro'
    }
    onLoad = async () => {
        try {
            let idProfessor = this.props.navigation.getParam('id', 0)
            let retornoReq = await axios.post('http://178.128.148.63:3000/getTema',{                   
                    id: idProfessor,
                }, (err, data) => {
                    console.log(err)

                    console.log(data)
                }).then(data => {
                    this.setState({
                        abriu:false, 
                        id:idProfessor,
                        tema: data.data['desc'][0]['tema'],
                        dias: data.data['desc'][0]['dias'],
                        mes: data.data['desc'][0]['mes'],
                        ano: data.data['desc'][0]['ano'],
                        apoioPdf: data.data['desc'][0]['apoio_pdf'],
                        apoioWeb: data.data['desc'][0]['apoio_web'],
                        apoioVideo: data.data['desc'][0]['apoio_video']
                    })
                    
                })
        } catch (error) {
            console.log(error)
        // Error saving data
        }
        
    }
    //Função que salva o tema
    saveTema = async () => {
        if(this.state.abriu){
            this.onLoad()
        }
        try{
            if(this.verificaCampos()){
                ToastAndroid.show('Por favor, aguarde...', ToastAndroid.SHORT)
                await axios.post('http://178.128.148.63:3000/editaTema',{           
                    tema: this.state.tema,
                    id:this.state.id,
                    dias: this.state.dias,
                    mes: this.state.mes,
                    ano: this.state.ano,
                    apoioPdf: this.state.apoioPdf,
                    apoioWeb: this.state.apoioWeb,
                    apoioVideo: this.state.apoioVideo,
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    if(data.data['status'] == 'ok'){
                        Alert.alert( 'Tema',"Dados Salvos com sucesso!",[{text: 'OK', onPress: () => {this.props.navigation.navigate('ListaTema')}}])
                    }else{
                        Alert.alert( 'Tema',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
                    }
                })
            }else{
                Alert.alert( 'Tema',"Preencha todos os campos!",[{text: 'OK', onPress: () => {}}])
            }
        }catch(err){
            Alert.alert( 'Tema',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
        }
        
    }

    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
          this.setState({...initialState});
        });
    }
    //Função que verifica se tem algum campo vazio
    verificaCampos = () => {
        try{
            console.log(this.state)
            if( this.state.tema == null || this.state.dias == null || this.state.mes == null ||
            this.state.ano == null || this.state.apoioPdf == undefined || this.state.apoioWeb == null || this.state.apoioVideo == undefined){
                return false
            }else{
                return true
            }

        }catch(err){
            Alert.alert( 'Tema',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
        }
    }
    updateMes(estado) {
        this.setState({
            mes: this.listMes[estado]
        })
    }
    updateAno(estado) {
        this.setState({
            ano: this.listAno[estado]
        })
    }
    render() {
        if(this.state.abriu){
            this.onLoad()
        }
        return(
            <View style={styles.content} >  
                <View style={styles.header}>
                    <View style={styles.iconStart}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('ListaTema')}>
                            <Icon name="arrow-left" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >Novo Tema</Text>
                    </View>

                </View>
                <View  style={styles.paddingTop}>
                
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Tema: </Text>
                    <TextInput controlled={true} style={styles.textContent} value={this.state.tema} placeholder="Tema" onChangeText={(tema) => this.setState({ tema })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Dias: </Text>
                    <TextInput style={styles.textContent} keyboardType='numeric' value={this.state.dias} placeholder="Dias (Use , como separador. Ex: 01,02,03,04)" onChangeText={(dias) => this.setState({ dias })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Mês: </Text>
                    <ModalDropdown 
                        style={styles.textDropDown} ref="dropMes"
                        textStyle={styles.textDropDownText} 
                        dropdownStyle={styles.textDropDownRow} 
                        value={this.state.mes} defaultValue={this.listMes[this.state.mes -1]} options={this.listMes} onSelect={(mes) => this.updateMes(mes)}/> 
                     
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Ano: </Text>
                    <ModalDropdown 
                        style={styles.textDropDown} ref="dropAno"
                        textStyle={styles.textDropDownText} 
                        dropdownStyle={styles.textDropDownRow} 
                        value={this.state.ano} defaultValue={this.state.ano} options={this.listAno} onSelect={(ano) => this.updateAno(ano)}/> 
                     
                </View>           

                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Link Web: </Text>
                    <TextInput style={styles.textContent} value={this.state.apoioWeb} placeholder="Link Web"  onChangeText={(apoioWeb) => this.setState({ apoioWeb })}/>
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Link Youtube: </Text>
                    <TextInput style={styles.textContent} value={this.state.apoioVideo} placeholder="Link Youtube" onChangeText={(apoioVideo) => this.setState({ apoioVideo })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Link PDF: </Text>
                    <TextInput style={styles.textContent} value={this.state.apoioPdf} placeholder="Link Pdf" onChangeText={(apoioPdf) => this.setState({ apoioPdf })}/>  
                </View>
                <View style={styles.contentSend}> 
                    <TouchableOpacity style={styles.sendButton} onPress={this.saveTema}>
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
        fontSize: 15,
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