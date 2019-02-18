import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { SearchBar, ListItem, Divider } from 'react-native-elements'

function EBook({title, authors, cover_id, onPress}) {
    return <View>
        <ListItem title={title}
                  onPress={onPress}
                  subtitle={authors.map(({name}) => name).join(',')}
                  rightIcon={{
                      name: 'chevron-right'
                  }}
                  leftAvatar={{source: {uri: `http://covers.openlibrary.org/b/ID/${cover_id}-S.jpg`}}}
        />
        <Divider/>
    </View>
}

function EmptyPage() {
    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text >No Elements Found</Text>
    </View>
}

export default class Search extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            searchKeyword: '',
            data:{
                ebook_count: 0,
                works: []
            }
        }
    }

    search() {
        if (!!this.state.searchKeyword.length) {
            fetch(`http://openlibrary.org/subjects/${this.state.searchKeyword}.json`).then(response => response.json())
                .then(data => this.setState({data}))
        }
    }

    render() {

        let {open} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <SearchBar placeholder={'Search Books'} onChangeText={keyword => this.setState({searchKeyword: keyword})} value={this.state.searchKeyword} onBlur={this.search.bind(this)}/>
                </View>
                {!this.state.data.works.length && <EmptyPage/>}
                <FlatList style={{flex:1}} data={this.state.data.works} renderItem={({item}) => <EBook key={item.cover_id} {...item} onPress={open.bind(this, item)}/>}>

                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchBar: {
        flex: 0.1,
        marginTop: 20,
    },
});
