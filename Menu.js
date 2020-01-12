import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native'

export default class Menu extends Component{
    getData(){
      const csvFilePath='backend/menu.csv';
      const csv=require('csvtojson')
      csv().fromFile(csvFilePath).then('json',(jsonObj)=>{
         console.log(jsonObj)
      })
    }
    
    render(){
      return(
        <View>
          <Text> {this.getData()} </Text>
        </View>
      );
    }
  };