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
        BackHandler,
        ScrollView,
        ToastAndroid,
        FlatList
    } from 'react-native'
const initialState = {registros: [],abriu: false}
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
        }} onPress={() => navigate.editarFaleConosco(id)}>
                <Text style={{
                    color: 'black',
                    fontSize: 15
                }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
    }
export default class Register extends Component {
    state = {
        ...initialState
    }
    //excluirFaleConosco = async (id) => {
    //    try {
    //        await axios.post('http://178.128.148.63:3000/deletaFaleConosco',{  
    //                id:id 
    //            }, (err, data) => {
    //            }).then(data => {
    //                console.log(data.data['desc'])
    //                if(data.data['status'] == 'ok'){
    //                    Alert.alert( 'Fale Conosco','Excluido com sucesso!',[{text: 'OK', onPress: () => {}}])
    //                    this.getRedacoes()
    //                }
    //                
    //            })
    //    } catch (error) {
    //        console.log(error)
    //    // Error saving data
    //    }
    //}
    editarFaleConosco = async (id) =>{
        this.setState({abriu:false})
        this.props.navigation.navigate('DetalheFaleConosco',{'id':id})
    }
    getDados = async () => {
        try {
            console.log('entrou')
            await axios.post('http://178.128.148.63:3000/getFaleConosco',{   
                }, (err, data) => {
                }).then(data => {
                    console.log(data.data['desc'])
                    let listItems = []
                    this.setState({abriu:true})
                    let currentItem
                    for(let i =0; i< data.data['desc'].length; i++){
                        currentItem = data.data['desc'][i]
                        console.log(currentItem)
                        let tipo = ''
                        if(currentItem['tipo'] == 'aluno')
                            tipo = 'Enviado pelo aluno: '
                        else
                            tipo = 'Enviado pelo professor: '
                        listItems.push({id: currentItem['id'], title: tipo + currentItem['nome']})
                    }
                    this.setState({registros:listItems})
                    
                })
        } catch (error) {
            console.log(error)
        // Error saving data
        }
    }
    
    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
            this.getDados()
        });
    }
    render() {
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
                                <Text style={styles.contentTextHeader} >FALE CONOSCO</Text>
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
        marginLeft:15
        
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