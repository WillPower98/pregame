import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Picker,
  TextInput,
  Keyboard
  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './animbutton'
import Datalist from './dataList'
import Menu from './Menu'
const { width, height } = Dimensions.get('window')
let arrnew = []
const jsonData = {"quiz" :{
    "quiz1": {
        question1: {
            optionAmounts:{
                "whiskey": 1,
                "wine": 2,
                "beer": 3,
                "Tequila": 4
            },
            options: {
                "whiskey": "whiskey",
                "wine": "wine",
                "beer": "beer",
                "Tequila": "Tequila"
            },
            "question": "Please enter the price of the total bottle"
        },
        question2: {
            optionAmounts:{
                1: 1,
                1: 2,
                2: 3,
                3: 4
            },
            options: {
                1: "1",
                2: "2",
                3: "3",
                4: "4"
            },
            "question": "How many people was drink split between?"
        },
        question3:{
            "optionaAmounts":{
                "12 fl oz can": 1,
                "8-9 fl oz drink": 2,
                "5 fl oz cop": 3,
                "1.5 fl oz shot": 4
            },
            options: {
                "12 fl oz can": "12 fl oz can",
                "8-9 fl oz drink": "8-9 fl oz drink",
                "5 fl oz cop": "5 fl oz cop",
                "1.5 fl oz shot": "1.5 fl oz shot"
            },
            "question": "What drink amount did you pour?"
        }
    }
    }
}


export default class Quiz extends Component{
    constructor(props){
        super(props)
        this.amount = 0.00,
        this.qno = 0

        const jdata = jsonData.quiz.quiz1
        arrnew = Object.keys(jdata).map( function(k) { return jdata[k] });
        this.state = {
          question : arrnew[this.qno].question,
          options : arrnew[this.qno].options,
          optionAmounts : arrnew[this.qno].optionAmounts,
          countCheck: 0,
          thisView: true
        }
    }

    

    prev(){
        if(this.qno > 0){
          this.qno--
          this.setState({ question: arrnew[this.qno].question, options: arrnew[this.qno].options, optionAmounts : arrnew[this.qno].optionAmounts})
        }
      }
      next(){
        if(this.qno < arrnew.length-1){
          this.qno++
     
          this.setState({ countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, optionAmounts : arrnew[this.qno].optionAmounts})
        }else{
          
          this.props.quizFinish(this.amount)
         }
      } 

      _answer(options,ans){
        const count = this.state.countCheck + 1
        this.setState({ countCheck: count })
        if(this.qno==1){
            this.amount+=(100/(options[ans-1]))
        }
      }

      handleChange(event, maskedvalue, floatvalue){
        this.setState({amount: maskedvalue});
    }

    onEnterPress(input){
        this.amount+=input
    }

    displayMenu(){
        this.setState({
            thisView: false
          })
    }

      _displayQuestion(){
        if(this.qno==0){
            return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',justifyContent: 'space-around'}}>
            <TextInput
                style={styles.input}
                multiline={true}
                autoCapitalize="sentences"
                autoCorrect={true}
                keyboardType="default"
                returnKeyType="done"
                placeholder="Enter amount here..."
                placeholderTextColor='white'
                value={(input)=>this.onEnterPress(input)}/>
                <TouchableOpacity style={styles.enterButton} onPress={this.onEnterPress}>
                    <Text style={{color:'white',fontSize: 15}}>Enter</Text>
                </TouchableOpacity>
                <Button title = "Or Search for an Amount" color = "white" onPress = {() => this.displayMenu()}></Button>
            </View>
            );
        }
        if(this.qno==1| this.qno==2){
            let _this = this
            const currentOptions = this.state.options
            const selectedOptions = this.state.optionAmounts
            const options = Object.keys(currentOptions, selectedOptions).map( function(k){
            return(
                <View key={k} style={{margin:10}}>
                    <Animbutton countCheck={_this.state.countCheck} 
                        onColor={"blue"} effect={"tada"} 
                        _onPress={() => _this._answer(selectedOptions,k)} 
                        text={currentOptions[k]} />
                </View>)
            });
            return options
        }
      }

    render(){
        if(!this.state.thisView)
            return (<Menu/>)
        return(
        <ScrollView style={{paddingTop: 10}}>
            <View style={styles.container}>
            <View style={{ flex: 1,flexDirection: 'column', justifyContent: "space-between", alignItems: 'center',}}>
            <View style={styles.oval} >
                <Text style={styles.welcome}>
                {this.state.question}
                </Text>
            </View>
            <View>
            { this._displayQuestion() }
            </View>
            <View style={{flexDirection:"row"}}>
                <Button
                onPress={() => this.prev()}
                title="Prev"
                color="#841584"
                />
            <View style={{margin:15}} />
            <TouchableOpacity onPress={() => this.next()} >
            <View style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"blue"}}>
                <Icon name="md-arrow-round-forward" size={30} color="white" />
            </View>
            </TouchableOpacity >
            </View>
            </View>
        </View>
    </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
  oval: {
    width: width * 90/100,
    borderRadius: 20,
    backgroundColor: 'blue'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    margin: 15,
    color: "white"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input:{
      backgroundColor:'blue',
      color:'white',
      height: 50,
      width: 200,
      fontSize:20,
      textAlign: 'center'
  },
  enterButton:{
      padding: 10,
      backgroundColor: 'blue',
      alignItems: 'center',
      height: 40,
      width: 60,
  },
})