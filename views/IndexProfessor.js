import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import {
        View,
        Text, 
        StyleSheet,
        TouchableOpacity,
        Alert
    } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class Index extends Component {
    onLoad = async () => {
        try {
            const idAluno = await AsyncStorage.getItem('@idAluno')
            let idAlunoInt = parseInt( idAluno.replace(/^"|"$/g, ""))
            await axios.post('http://192.168.0.29:3000/pos_login',{
                id: idAlunoInt
            }, (err, data) => {
                console.log(err)
                console.log(data)
            }).then(data => {
                let retorno = data.data
                if(data.data['status'] == 'erro_campos'){
                    Alert.alert( 'Dados de Perfil',"Complete seus dados na tela de Perfil",[{text: 'Ir para Perfil', onPress: () => this.props.navigation.navigate('Perfil')}])
                }

            })
            
          } catch (error) {
            // Error saving data
          }
        
    }
    render() {

        {this.onLoad()}
        return(
            <View style={styles.content} >  
                <View style={styles.header} onLoad>
                    <View style={styles.iconStart}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="bars" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >BEM VINDO, PROFESSOR!</Text>
                    </View> 

                </View>
                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={() => this.props.navigation.navigate('NovasRedacoes')}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="user" size={30} color='black' />
                            <Text style={styles.textButton} >Redações a Corrigir</Text>
                        </View>
                    </TouchableOpacity>      
                </View>

                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="book" size={30} color='black' />
                            <Text style={styles.textButton} >Redações Corrigidas</Text>
                        </View>
                    </TouchableOpacity>  
                </View>

                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="clipboard" size={30} color='black' />
                            <Text style={styles.textButton} >Perfil</Text>
                        </View>
                    </TouchableOpacity>     
                </View>
                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="clipboard" size={30} color='black' />
                            <Text style={styles.textButton} >Logout</Text>
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
    content_buttons:{ // Style dos botões (TouchableHightlight)
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
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
    }
    
})