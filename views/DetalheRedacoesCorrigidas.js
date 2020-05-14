import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ModalDropdown from 'react-native-modal-dropdown'
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
        }} onPress={() => navigate.props.navigation.navigate('DetalheCorrecao',{'id':id})}>
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
    getRedacoes = async () => {
        try {
            this.atualizaStatus()
            let idRedacao = this.props.navigation.getParam('id', 0) 
            await axios.post('http://178.128.148.63:3000/getCorrecoesRedacao',{      
                id: idRedacao 
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    let listItems = []
                    let currentItem
                    console.log(data.data['desc'])
                    for(let i =0; i< data.data['desc'].length; i++){
                        currentItem = data.data['desc'][i]
                        if(currentItem['usuario_envio'] == 'professor'){
                            listItems.push({id: currentItem['id_redacao'], title: 'Corrigido pelo Professor'})
                        } else{
                            listItems.push({id: currentItem['id_redacao'], title: 'Revisado pelo Aluno'})
                        }
                    }
                    console.log(JSON.stringify(listItems))
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
            <ScrollView>
                <View style={styles.content} >  
                    <View style={styles.header}>
                        <View style={styles.iconHeader}>
                            <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name="bars" size={30} color='#FFF'  /> 
                            </TouchableOpacity>
                        </View>
                        <View >
                            <Text style={styles.contentTextHeader} >DETALHES</Text>
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
                    
                </View>       
            </ScrollView> 
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
    iconStart:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:5
        
    },
    iconHeader:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:15
        
    },

})