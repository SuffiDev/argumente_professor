import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ModalDropdown from 'react-native-modal-dropdown'
import { NavigationActions } from 'react-navigation';
import {
        View,
        Text, 
        StyleSheet,
        TouchableOpacity,
        Alert,
        ScrollView,
        ToastAndroid,
        FlatList
    } from 'react-native'
const initialState = {registros: [],abriu: true}
function Item({ title, id, navigate }) {
    return (
        <View >
            <TouchableOpacity style={{        
            borderColor:'#0066CC',
            borderWidth:1,
            width:'100%',
            marginTop: 10,
            flexDirection:"row",
            alignItems: 'center',
            justifyContent: 'center',
            height: 40
        }} onPress={() => Alert.alert( 'Dados de Professores','O que deseja fazer?',[
            {text: 'Editar', onPress: () => navigate.editarProfessor(id)},
            {text: 'Excluir', onPress:() => navigate.excluirProfessor(id)}])}>
                <Text style={{
                    color: 'black',
                    fontSize: 20
                }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
    }
export default class Register extends Component {
    state = {
        ...initialState
    }
    atualizaStatus = () => {
        this.setState({abriu:false})
    }
    excluirProfessor = async (id) => {
        try {
            await axios.post('http://178.128.148.63:3000/deletaProfessor',{  
                    id:id 
                }, (err, data) => {
                }).then(data => {
                    console.log(data.data['desc'])
                    if(data.data['status'] == 'ok'){
                        Alert.alert( 'Excluir professor','Excluido com sucesso!',[{text: 'OK', onPress: () => {}}])
                        this.getRedacoes()
                    }
                    
                })
        } catch (error) {
            console.log(error)
        // Error saving data
        }
    }
    editarProfessor = async (id) =>{
        this.setState({...initialState})
        this.props.navigation.navigate('AlterarProfessor',{'id':id})
    }
    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
          this.getRedacoes();
        });
    }
    getRedacoes = async () => {
        try {
            this.atualizaStatus()
            await axios.post('http://178.128.148.63:3000/getProfessores',{   
                }, (err, data) => {
                }).then(data => {
                    console.log(data.data['desc'])
                    let listItems = []
                    let currentItem
                    for(let i =0; i< data.data['desc'].length; i++){
                        currentItem = data.data['desc'][i]
                        console.log(currentItem)
                        listItems.push({id: currentItem['id'], title: currentItem['nome'] + ' ' + currentItem['sobrenome']})
                    }
                    this.setState({registros:listItems})
                    
                })
        } catch (error) {
            console.log(error)
        // Error saving data
        }
    }
    
    render() {
        if(this.state.abriu){
            this.getRedacoes()
        }
        return(
            <View style={styles.content} >  
                <ScrollView>
                        <View style={styles.header}>
                            <View style={styles.iconStart}>
                                <TouchableOpacity  onPress={() => this.props.navigation.navigate('IndexAdmin')}>
                                    <Icon name="arrow-left" size={30} color='#FFF'  /> 
                                </TouchableOpacity>
                            </View>
                            <View >
                                <Text style={styles.contentTextHeader} >PROFESSORES CADASTRADOS</Text>
                            </View>

                        </View>

                        <View  style={styles.paddingTop}></View>
                        <View style={{
                            marginLeft: 20,
                            marginRight: 20
                        }}>
                            <FlatList
                                data={this.state.registros}
                                renderItem={({ item }) => <Item style={{borderWidth: 1}}title={item.title} id={item.id} navigate={this}/>}
                                keyExtractor={item => item.id}
                            />
                        </View>

                        <View style={styles.content_buttons}> 
                            <TouchableOpacity style={styles.content_buttons} onPress={() => 
                                {
                                    this.setState({...initialState})
                                    this.props.navigation.navigate('CadastrarProfessor')
                                }
                            }>
                                <View style={styles.headerButton}>
                                    <Icon style={styles.iconStart} name="plus" size={30} color='black' />
                                    <Text style={styles.textButton} >Adicionar Professor</Text>
                                </View>
                            </TouchableOpacity>      
                        </View>
                </ScrollView> 
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    
    content:{ //Style do content da pagina
        flex:1,
        width:'100%',
        height:'100%',
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
    content_buttons:{ // Style dos botões (TouchableHightlight)
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
    },
    headerButton:{ //Header de cada um dos botões que vão ficar no corpo da tela
        borderColor:'#0066CC',
        borderWidth:1,
        borderRadius:10,
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',        
        fontSize: 20
    },

})