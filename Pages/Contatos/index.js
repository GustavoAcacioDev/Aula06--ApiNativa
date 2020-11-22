import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, View, Text, FlatList} from 'react-native';
import * as Contacts from 'expo-contacts';

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0
    },
    item : {
        backgroundColor : 'gray',
        padding : 20,
        marginVertical : 8,
        marginHorizontal: 16
    }
})

const ItemContato = ({nome }) => {
    return(
        <View style={styles.item}>
            <Text>{nome}</Text>
        </View>
    )
}
const Contatos = () => {
    const [contatos, setContatos] = useState([]);

    //Assim que aparece a pagina, usa o useEffect   
    useEffect(() => {
        (async () => {
            
          //Requisita a permissão do usuario para obter os contatos  
          const { status } = await Contacts.requestPermissionsAsync();
          //permissão concedida
          if (status === 'granted') {
            //pega todos os contatos  
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Emails],
            });
            
            //Verifica se exite contatos cadastrados
            if (data.length > 0) {       
              setContatos(data);
            }
          }
        })();
      }, []);

      const renderItem = ({item}) => {
          return(
            <ItemContato nome={item.name} />
          )
      }

    return(
        <View style={styles.container}>
            <Text>Contatos</Text>
            <FlatList
                data={contatos}
                keyExtractor={item => item.id}
                renderItem={renderItem} 
            />
        </View>
    )
}

export default Contatos;