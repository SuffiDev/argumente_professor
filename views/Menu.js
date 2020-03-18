import React from 'react'

import { ScrollView, View, Text, StyleSheet, Image } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'

export default props => {
    return (
        <ScrollView>
            <View style={styles.viewLogo}>
                <Image source={require('../assets/imgs/logo_menu.png')} style={styles.logo}/> 
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    logo:{
        marginBottom: '15%',
        marginTop: '5%'
    },
    viewLogo:{ 
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center'
    }
});