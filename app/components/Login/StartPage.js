import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { RoundedButton } from '../Common/index';
import { onNavigateToLogin, onNavigateToDashBoard } from '../../config/navigations';

export class StartPage extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }

    handlePress = () => {

        onNavigateToDashBoard();
    }

    render() {
        return (
            <View>
                {/* <Text> Start Page </Text> */}
                <RoundedButton
                        onPress={this.handlePress}
                        title="Go to Dashboard"
                        width={200} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
