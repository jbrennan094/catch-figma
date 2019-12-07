import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert, TextInput, Keyboard, Platform, StatusBar, Animated, RefreshControl } from 'react-native';

export default class App extends Component {

state = { 
  modalVisible: false,
  first: '',
  last: '',
  nameAdded: false,
  refreshing: false
};

componentWillMount() {
  this.box_position = new Animated.ValueXY({ x:0, y: -200 });
  Animated.spring(this.box_position, {
    toValue: { x:0, y: 0 }
  }).start();
  this.title_position = new Animated.ValueXY({ x:300, y: 0 });
  Animated.spring(this.title_position, {
    toValue: { x:0, y: 0 }
  }).start();
}

setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

onChangeFirst(text) {
  this.setState({first: text})
}

onChangeLast(text) {
  this.setState({last: text})
}

cancelForm() {
  this.setState({
    modalVisible: false,
    first: '',
    last: '',
  });
}

keyboardSubmit(text) {
  console.log(text)
  this.addNameSubmit()
}

addNameSubmit() {
  if(this.state.first !== '' || this.state.last !== '') {
    this.setState({
      nameAdded: true,
      modalVisible: false
    });
  } else {
    this.setState({
      modalVisible: false
    });
  }
}

_onRefresh = () => {
  this.setState({refreshing: true});
  setTimeout(() => this.setState({ refreshing: false, nameAdded: false, first: '', last: '' }), 2500);
}

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        {Platform.OS === 'android' && <StatusBar translucent={true} />}
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            presentationStyle= 'pageSheet'
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
            onDismiss= {() => {
                this.setModalVisible(false);
            }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={styles.modal_container}>
                <View style={styles.modal_title_container}>
                  <View style={styles.modal_title_left}>
                  </View>
                  <View style={styles.modal_title_center}>
                    <Text style={styles.modal_title}>Adding a name</Text>
                  </View>
                  <View style={styles.modal_title_right}>
                    <TouchableOpacity 
                      onPress={() => {
                        this.cancelForm()
                      }}  
                      style={styles.cancel_button_container}
                    >
                      <Text style={styles.cancel_button_text}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.modal_main_container}>
                  <View style={styles.input_container}>
                    <Text style={styles.input_label}>First</Text>
                    <TextInput
                      style={styles.text_input}
                      onChangeText={text => this.onChangeFirst(text)}
                      placeholder={'First Name'}
                      value={this.state.first}
                      selectionColor={'blue'}
                    />
                  </View>
                  <View style={styles.input_container}>
                    <Text style={styles.input_label}>Last</Text>
                    <TextInput
                      style={styles.text_input}
                      onChangeText={text => this.onChangeLast(text)}
                      placeholder={'Last Name'}
                      value={this.state.last}
                      selectionColor={'blue'}
                      returnKeyType={'done'}
                      returnKeyLabel= {'done'}
                      onSubmitEditing={(event) => this.keyboardSubmit( event.nativeEvent.text)}
                    />
                  </View>
                  <TouchableOpacity 
                    onPress={() => {
                      this.addNameSubmit();
                    }} 
                    style={styles.modal_button_container}
                  >
                    <Text style={styles.modal_button_text}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={styles.title_conatiner}>
          <Animated.View style={this.title_position.getLayout()}>
            <Text style={styles.title}>The Name App</Text>
          </Animated.View>
        </View>

        <View style={styles.main_container}>
        <ScrollView 
            refreshControl={
            <RefreshControl
              tintColor={'#FFE6D1'}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />}
            contentContainerStyle={styles.scroll_view_container} 
        >
          {this.state.nameAdded ?
            <Animated.View style={this.box_position.getLayout()}>
              <View style={styles.center_box_with_name}>
                <Text style={styles.box_text}>{this.state.first}  {this.state.last}</Text>
              </View>
            </Animated.View>

            :
            <Animated.View style={this.box_position.getLayout()}>
              <View  style={styles.center_box}>
                <Text style={styles.box_text}>You have no name</Text>
                <TouchableOpacity 
                  onPress={() => {
                    this.setModalVisible(true)
                  }} 
                  style={styles.button_container}
                >
                  <Text style={styles.button_text}>Add a name</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            }
          </ScrollView> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(248, 248, 248, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '17.24%',
  },
  scroll_view_container: {
    width:'100%',
    flex:1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  title_conatiner: {
    flex: 2,
    width: '100%',
    backgroundColor: 'rgba(248, 248, 248, 0.92)',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingBottom: 6,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  main_container: {
    flex: 11,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1.0)'
  },
  center_box_container: {
    flex:1
  },
  center_box: {
    height: 301,
    width: '91.4%',
    backgroundColor: '#FFE6D1',
    borderRadius: 13,
    alignSelf: 'center', 
    justifyContent: 'center',
    paddingVertical: 24,
  },
  center_box_with_name: {
    height: 301,
    width: '91.4%',
    backgroundColor: '#E6F0F0',
    borderRadius: 13,
    alignSelf: 'center', 
    justifyContent: 'center',
    paddingVertical: 24,
  },
  title: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    fontSize: 34,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.41,
  },
  box_text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 34,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.41
  },
  button_container: {
    backgroundColor: '#FFCB9E',
    borderRadius: 6,
    height: 42,
    width: 141,
    justifyContent: 'center',
    alignContent: 'center' ,
    alignSelf: 'center',
    top: '25%'
  },
  button_text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.41,
    textAlign: 'center',
  },
  modal_container:{
    flex: 1,
    backgroundColor: 'rgba(248, 248, 248, 0.92)',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modal_title_container: {
    backgroundColor: 'rgba(248, 248, 248, 0.92)',
    flex: 1,
    flexDirection: 'row',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1.0,
    shadowRadius: 3,
    elevation: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)'
  },
  modal_title_left:{
    flex: 1,
    justifyContent: 'center'
  },
  modal_title_center:{
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)'
  },
  modal_title_right:{
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)'
  },
  modal_title:{
    textAlign: 'center',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: -0.41 
  },
  cancel_button_container: {
  },
  cancel_button_text: {
    textAlign: 'right',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#007AFF',
    right: 16
  },
  modal_main_container: {
    backgroundColor: 'rgba(255,255,255,1.0)',
    flex: 12,
    width: '100%',
    alignItems: 'center',
    paddingTop: 35
  },
  input_container: {
    width: '91.4%',
  },
  input_label: {
     bottom: 6,
     fontSize: 14,
     fontWeight: '500',
     fontStyle: 'normal',
     lineHeight: 20,
     color: '#1F2533'
  },
  text_input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8E8ED',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 27
  },
  modal_button_container: {
    backgroundColor: '#00746F',
    borderRadius: 6,
    width: '91.47%',
    height: 42,
    justifyContent: 'center',
    top: 500
  },
  modal_button_text: {
    alignItems: 'center',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.41,
    textAlign: 'center',
    color: '#fff'
  }
});
