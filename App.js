import React from 'react';
import { View} from 'react-native';
import Search from "./src/Search";
import Details from "./src/Details";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 'search',
            book: null
        }
    }

    traverse(page, book) {
        console.log(page, book)
        this.setState({page, book})
    }

    render() {
        return <View style={{flex: 1, paddingTop: 0}}>
            {this.state.page === 'search' &&
            <Search open={this.traverse.bind(this, 'details')}/>
            }
            {this.state.page === 'details' &&
            <Details back={this.traverse.bind(this, 'search')} book={this.state.book}/>
            }
        </View>;
    }
}
