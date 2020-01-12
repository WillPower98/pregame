import React, {Component} from 'react';
import Quiz from './quiz';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Image
} from 'react-native';
export default class quizScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            quizFinish: false,
            amount: 0
        }
    }

    _onPressBack(){
        const{goBack} = this.props.navigation
        goBack()
    }

    _quizFinish(amount){
        this.setState({quizFinish: true, amount: amount})
    }

    _scoreMessage(amount){
        return(<View style={styles.innerContainer}>
                    <Text styles={styles.amount}> You owe ${amount} </Text>
                </View>)
    }

    render(){
        return(
            <View style={{flexDirection: 'column'}}>
                <ImageBackground source={require('./purple_sky.jpg')} style={{width:'100%', height: '100%'}}>
                <StatusBar barStyle='light-content'/>
                <View style={styles.toolbar}>
                    <TouchableOpacity onPress={() => this._onPressBack() }><Text style={styles.toolbarButton}>Back</Text></TouchableOpacity>
                    <Text style={styles.toolbarTitle}></Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>
                { this.state.quizFinish ? <View>
                    <View style={styles.circle}>
                        { this._scoreMessage(this.state.amount) }
                    </View>
                </View> :  <Quiz quizFinish={(amount) => this._quizFinish(amount)} /> }
                </ImageBackground>
            </View>
        );
    }
}

const scoreCircleSize = 300
const styles = StyleSheet.create({
  amount: {
    color: "white",
    fontSize: 20,
    fontStyle: 'italic'
  },
  circle: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: scoreCircleSize,
    height: scoreCircleSize,
    borderRadius: scoreCircleSize/2,
    backgroundColor: "blue"
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  toolbar:{
        backgroundColor:'#0093AF',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
    },
    toolbarButton:{
        width: 55,
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1
    }
});