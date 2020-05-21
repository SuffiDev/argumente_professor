import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ModalDropdown from 'react-native-modal-dropdown'
import {
        View,
        Text, 
        StyleSheet,
        BackHandler,
        TextInput,
        TouchableOpacity,
        Dimensions,
        Alert,
        ToastAndroid
    } from 'react-native'
    const initialState = {tema:'', semana: '', descricao: '', mes:'', ano: '', apoioPdf: '', apoioWeb:'', apoioVideo: '', abriu: true}
export default class Register extends Component {
    listSemana = ['Semana 1','Semana 2','Semana 3','Semana 4','Semana 5','Semana 6','Semana 7','Semana 8','Semana 9','Semana 10','Semana 11','Semana 12','Semana 13','Semana 14','Semana 15','Semana 16','Semana 17','Semana 18','Semana 19','Semana 20','Semana 21','Semana 22','Semana 23','Semana 24','Semana 25','Semana 26','Semana 27','Semana 28','Semana 29','Semana 30','Semana 31','Semana 32','Semana 33','Semana 34','Semana 35','Semana 36','Semana 37','Semana 38','Semana 39','Semana 40','Semana 41','Semana 42','Semana 43','Semana 44','Semana 45','Semana 46','Semana 47','Semana 48','Semana 49','Semana 50','Semana 51','Semana 52','Semana 53']
    listMes = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
    listAno = ["2020","2021","2022","2023","2024","2025","2026","2027","2028","2029"]
    state = {
        ...initialState
    }
    //Função que salva o tema
    saveTema = async () => {
        try{
            if(this.verificaCampos()){
                ToastAndroid.show('Por favor, aguarde...', ToastAndroid.SHORT)
                let semanaAtual = this.state.semana.replace('Semana ','')
                let linkYoutube = ''
                let linkWeb = ''
                let linkPdf = ''
                if (this.state.apoioPdf[0] == 'w')
                    linkPdf = 'http://'+this.state.apoioPdf
                else
                    linkPdf = this.state.apoioPdf

                if (this.state.apoioWeb[0] == 'w')
                    linkWeb = 'http://'+this.state.apoioWeb
                else
                    linkWeb = this.state.apoioWeb

                if (this.state.apoioVideo[0] == 'w')
                    linkYoutube = 'http://'+this.state.apoioVideo
                else
                    linkYoutube = this.state.apoioVideo

                await axios.post('http://178.128.148.63:3000/salvaTema',{           
                    tema: this.state.tema,
                    semana: semanaAtual,
                    ano: this.state.ano,
                    apoioPdf: linkPdf,
                    apoioWeb: linkWeb,
                    apoioVideo: linkYoutube,
                    descricao: this.state.descricao,
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
            if( this.state.tema == null || this.state.semana == null || 
            this.state.ano == null || this.state.descricao == undefined || this.state.apoioPdf == undefined || this.state.apoioWeb == null || this.state.apoioVideo == undefined){
                return false
            }else{
                return true
            }

        }catch(err){
            Alert.alert( 'Tema',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
        }
    }
    //updateMes(estado) {
    //    this.setState({
    //        mes: this.listMes[estado]
    //    })
    //}
    updateSemana(semana) {
        this.setState({
            semana: this.listSemana[semana]
        })
    }
    updateAno(estado) {
        this.setState({
            ano: this.listAno[estado]
        })
    }
    render() {
        return(
            <View style={styles.content} >  
                <View style={styles.header}>
                    <View style={styles.iconStart}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('ListaTema')}>
                            <Icon name="arrow-left" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >NOVO TEMA</Text>
                    </View>

                </View>
                <View  style={styles.paddingTop}>
                
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Tema: </Text>
                    <TextInput controlled={true} style={styles.textContent} value={this.state.tema} placeholder="Tema" onChangeText={(tema) => this.setState({ tema })}/>  
                </View>
                <View style={{width: '100%'}}>
                    <View style={styles.contentButtons}>
                    <Text style={styles.labelButton} >Corpo: </Text>
                        <TextInput
                                style={{borderColor: '#0066CC', borderWidth: 1, borderRadius:10, flex: 1 ,marginRight: 20}}
                                onChangeText={(descricao) => this.setState({ descricao })}
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical = "top"
                                placeholder="Descrição: "
                                /> 
                    </View>
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Semana do Ano: </Text>
                    <ModalDropdown 
                        style={styles.textDropDown} ref="dropDias"
                        textStyle={styles.textDropDownText} 
                        dropdownStyle={styles.textDropDownRow} 
                        value={this.state.semana} defaultValue={"Selecione"} options={this.listSemana} onSelect={(semana) => this.updateSemana(semana)}/> 
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Ano: </Text>
                    <ModalDropdown 
                        style={styles.textDropDown} ref="dropAno"
                        textStyle={styles.textDropDownText} 
                        dropdownStyle={styles.textDropDownRow} 
                        value={this.state.ano} defaultValue={"Selecione"} options={this.listAno} onSelect={(ano) => this.updateAno(ano)}/> 
                     
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
        borderColor: 'gray',
        width:'100%',
        marginTop: 10,
    },
    textContent:{
        color: 'black',
        flex: 1,
        height: 40,
        paddingLeft:10,
        borderRadius:10,
        borderWidth: 0.1,
        marginRight: 20,
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
        fontSize: 15,
        width: 180
    }, 
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        flex: 1,
        paddingLeft:25,
        borderBottomWidth: 1,
        fontSize: 15
    },
    labelButton:{ // Label dos textos
        color: 'black',
        marginLeft:15,
        fontSize: 15
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