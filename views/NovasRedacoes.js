import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ModalDropdown from 'react-native-modal-dropdown'

import {
        View,
        BackHandler,
        Text, 
        StyleSheet,
        TouchableOpacity,
        Alert,
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
        }} onPress={() => navigate.props.navigation.navigate('FormNovaRedacao',{'id':id})}>
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
    atualizaStatus = () => {
        this.setState({abriu:false})
    }
    
    getRedacoes = async () => {
        try {
            this.atualizaStatus()
            await axios.post('http://178.128.148.63:3000/getNovasRedacoes',{       
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    let listItems = []
                    let currentItem
                    console.log(data.data['desc'])
                    for(let i =0; i< data.data['desc'].length; i++){
                        currentItem = data.data['desc'][i]
                        listItems.push({id: currentItem['id'], title: 'Aluno: ' + currentItem['nome'] + ' - ' + currentItem['tema']})
                    }
                    console.log(JSON.stringify(listItems))
                    this.setState({registros:listItems})
                    
                })
        } catch (error) {
            console.log(error)
        // Error saving data
        }
    }
    handleBackButtonClick() {
        console.log('caiu no evento')
        alert('teste')
        this.props.navigation.navigate('IndexProfessor')
        return true;
    }

    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
          this.setState({...initialState});
        });
    }
    
    render() {
        if(this.state.abriu){
            this.getRedacoes()
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
                        <Text style={styles.contentTextHeader} >NOVAS REDAÇÕES</Text>
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
    iconHeader:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:15
        
    },

})