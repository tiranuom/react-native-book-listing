import React from 'react'
import {View, Text,  ScrollView} from 'react-native'
import {Button, Card, Tile, Divider} from 'react-native-elements'

export default function ({back, book}) {
    console.log("=====> ", `http://covers.openlibrary.org/b/ID/${book.cover_id}-M.jpg`)
    return <View style={{flex: 1, paddingTop: 20}}>
        <Button
            type={'clear'}
            buttonStyle={{minHeight: 60}}
            icon={{
                name: "arrow-back",
                size: 15,
                color: "blue"
            }} onPress={() => back()}/>
        <View style={{flex: 1}}>
            <Tile imageSrc={{
                uri: `http://covers.openlibrary.org/b/ID/${book.cover_id}-M.jpg`
            }}
                  containerStyle={{
                  }}
                  imageContainerStyle={{
                      minHeight: 400
                  }}
                  title={book.title}
            >
                <ScrollView>
                    <Text>By {book.authors.map(({name}) => name).join()}</Text>
                    <Divider/>
                    <Text>Related To:  {book.subject.join()}</Text>
                    <Divider/>
                </ScrollView>
            </Tile>
        </View>
    </View>
}