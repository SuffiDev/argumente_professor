import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {
        View,
        Text, 
        StyleSheet,
        Image,
        TouchableOpacity
    } from 'react-native'
    const initialState = {nome: '', tipo: '', texto: '',email: '', abriu: false}
export default class Register extends Component {    
    state = {
        ...initialState
    }
    //Função chamada após o getRedacao, ele seta as variaveis padrões do sistema
    loadItems = async (data) => {
        console.log(data.data['desc'])
        let tipo = ''
        if (this.state.tipo == 'professor')
            tipo = 'Professor'
        else   
            tipo = 'Aluno'
        this.setState({
            nome:data.data['desc'][0]['nome'],
            email:data.data['desc'][0]['email'],
            tipo: tipo,
            abriu: true,
            texto: data.data['desc'][0]['texto'],
            
        })
    }
    //função chamada ao carregar a view, usada para trazer os dados da redacao
    getDados = async () => {
        try {
            let id = this.props.navigation.getParam('id','0')   
            await axios.post('http://178.128.148.63:3000/detalheFaleConosco',{                   
                    id: id
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    this.loadItems(data)
                    
                })
                
        } catch (error) {
            console.log(error)
        // Error saving data
        }
        
    }

    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {            
            if(this.state.abriu == false)
                this.getDados()
          })
    }
    render() {
        return(
            <View style={styles.content} >  
                <View style={styles.header}>
                    <View style={styles.iconHeader}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('ListaFaleConosco')}>
                            <Icon name="arrow-left" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >FALE CONOSCO</Text>
                    </View>

                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Enviado por: {this.state.tipo} </Text>  
                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Nome: {this.state.nome} </Text>  
                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>E-Mail: {this.state.email} </Text>  
                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Detalhes: {this.state.texto} </Text>  
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
    content_buttons_first:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 20,      
        flexDirection:"row",
        marginLeft: 20,
        marginRight: 20,
    },
    iconHeader:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:15        
    },
    
})