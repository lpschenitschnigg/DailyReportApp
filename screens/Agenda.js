//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

LocaleConfig.locales['de'] = {
    monthNames: ['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    monthNamesShort: ['Jan.','Feb.','März','April','Mai','Juni','Juli','Aug.','Sept.','Okt.','Nov.','Dez.'],
    dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
    dayNamesShort: ['Son.','Mon.','Die.','Mit.','Don.','Frei.','Sam.']
  };
  
LocaleConfig.defaultLocale = 'de';


// create a component
class AgendaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: {},
          l: {},
          currentDate: '',
          aufgaben: [],
          refreshing: false,
        };
      }
    _currDate() {
        const date = new Date().getDate();
        const month = new Date().getMonth()+1;
        const year = new Date().getFullYear();

        const ddate = year+"-"+month+"-"+date;
        console.log(this.ddate);
        this.setState({currDate: ddate});
    }
    componentWillMount() {
      fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "fixedHash":"9FFKqvr-iOfrwRkr48TCm-xqf6zjWUQqu063E9X3fRek9peiqq-edilVWGhRVMlweHR4",
          "from": '2018-10-01T00:00:00+01:00',
          "to":"2018-12-31T23:59:59+01:00",
        }),
      })
      .then(response => (response.json()))
      .then(aufgaben => {
          //this._color(aufgaben);
          //this.setState({listViewData: this._color(aufgaben)})
          //aufgaben.reverse();
          this.setState({aufgaben: aufgaben});
          //console.log(this.aufgaben)
      })
    }
    _onRefresh=()=> {
      this.setState({refreshing: true});
      fetch('https://asc.siemens.at/datagate/external/Calendar/search', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "fixedHash":"9FFKqvr-iOfrwRkr48TCm-xqf6zjWUQqu063E9X3fRek9peiqq-edilVWGhRVMlweHR4",
          "from": '2018-10-01T00:00:00+01:00',
          "to":"2018-12-31T23:59:59+01:00",
        }),
      })
      .then(response => (response.json()))
      .then(aufgaben => {
          //this._color(aufgaben);
          //this.setState({listViewData: this._color(aufgaben)})
          //aufgaben.reverse();
          this.setState({aufgaben: aufgaben});
          console.log(this.aufgaben)
      })
      this.setState({refreshing: false});
    }
    render() {
        return (
            <View style={{height: '100%'}}>
                    <Agenda
                        items={this.state.items}
                        loadItemsForMonth={this.loadItems.bind(this)}
                        //selected={'2017-05-16'}
                        //minDate={this._currDate}
                        //pastScrollRange={1}
                        //onDayPress={(day) => this.props.navigation.navigate("Detail", {title: day.title, content : day.content, type: day.type, from: day.from, to: day.to})}
                        renderItem={this.renderItem.bind(this)}
                        //renderEmptyDate={() => {return (<View />);}}
                        renderEmptyDate={this.renderEmptyDate.bind(this)}
                        renderEmptyData={this.renderEmptyDate.bind(this)}
                        //renderKnob={() => {return (<View />);}}
                        //renderEmptyData = {() => {return (<View />);}}
                        rowHasChanged={this.rowHasChanged.bind(this)}
                        firstDay={1}
                        onRefresh={() => this._onRefresh() && this.loadItems.bind(this)}
                        refreshControl={null}
                        //dayLoading={false}
                        // markingType={'period'}
                        // markedDates={{
                        //    '2017-05-08': {textColor: '#666'},
                        //    '2017-05-09': {textColor: '#666'},
                        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                        //    '2017-05-21': {startingDay: true, color: 'blue'},
                        //    '2017-05-22': {endingDay: true, color: 'gray'},
                        //    '2017-05-24': {startingDay: true, color: 'gray'},
                        //    '2017-05-25': {color: 'gray'},
                        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                        // monthFormat={'yyyy'}
                        theme={{agendaKnobColor: '#009999', agendaDayNumColor: '#009999', agendaDayTextColor: '#009999', agendaTodayColor: '#009999', dotColor: '#009999', selectedDotColor: '#fff', selectedDayBackgroundColor: '#009999', todayTextColor: '#009999'}}
                        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                    />
                </View>
        );
    }
    loadItems(day) {
        setTimeout(() => {
          // for (let i = 0; i < 20; i++) {
          //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          //   const strTime = this.timeToString(time);
          //   if (!this.state.items[strTime]) {
          //     this.state.items[strTime] = [];
          //     const numItems = Math.floor(Math.random() * 5);
          //     for (let j = 0; j < numItems; j++) {
          //       this.state.items[strTime].push({
          //         name: 'Item for ' + strTime,
          //         height: Math.max(50, Math.floor(Math.random() * 150))
          //       });
          //     }
          //   }
          // }
          //var o = 0;
          var dayT;
          var dayB;
          //var counter;
          for (let i = 0; i < this.state.aufgaben.length; i++) {
            var o = i;
            var counter = 0;
            const date = this.state.aufgaben[i].from.substring(0,10);
            const time = this.state.aufgaben[i].from.substring(11,16);
            console.log(day.dateString);
            //console.log(element);
            //const daydate = day.timestamp + i * 24*60*60*1000;
            const strTime = this.timeToString(date);
            const element = date + " " + time;
            //console.log(strTime);
            //console.log(element);
            if (!this.state.items[strTime]) {
              this.state.items[strTime] =[];
              dayT = this.state.aufgaben[i].from.substring(0,10);
              //console.log(this.state.aufgaben[o].from.substring(0, 10));
              if (this.state.aufgaben[o] != undefined) {
                console.log(dayT, this.state.aufgaben[o].from.substring(0,10));
                while (dayT === this.state.aufgaben[o].from.substring(0,10)) {
                  //console.log(dayT, this.state.aufgaben[o].from.substring(0, 10));
                  //console.log(o, this.state.aufgaben.length);
                  if (o+1 === this.state.aufgaben.length) {
                    // o++;
                    counter++;
                    break;
                  } else {
                    o++;
                    counter++;
                  }
                  //console.log(counter);
                }
                for (let index = 0; index < counter; index++) {
                  //console.log(index);
                  //console.log(i);
                  this.state.items[strTime].push({
                    title: this.state.aufgaben[i+index].title,
                    content: this.state.aufgaben[i+index].content,
                    from: this.state.aufgaben[i+index].from,
                    to: this.state.aufgaben[i+index].to,
                    type: this.state.aufgaben[i+index].type,
                  })
                  //console.log(this.state.items[strTime]);
                  //i++;
                }
              }
              i = i+counter-1;
              //console.log(this.state.items[strTime]);
            }
            //o++;
            //i = i+counter;
            //dayT = this.state.aufgaben[i+counter].from.substring(0, 10);
          }
          //console.log(this.state.items);
          const newItems = {};
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          this.setState({
            items: newItems
          });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
      }
    _timeDiff(from, to) { //https://stackoverflow.com/questions/34247283/how-to-subtract-2-times-with-moment-js-then-subtract-some-minutes/34255728#34255728
      var from = moment.utc(from, 'HH:mm');
      var to = moment.utc(to, 'HH:mm');
      var diff = moment.duration(to.diff(from));
      // var time = moment.utc(diff).format('HH:mm');
      var time = to.diff(from, 'minutes');
      var interval = moment().hour(0).minute(time);
      return interval.format('HH:mm');
    }
      renderItem(item) {
        return (
          <View style={styles.item}>
            <Text style={{fontSize: 16, fontFamily: 'siemens_global_bold', lineHeight: 24}}>{item.title}</Text>
            <Text style={{fontSize: 14, lineHeight: 20, color: '#505050'}}>{item.content}</Text>
            <Text style={{ fontSize: 14,lineHeight: 20, color: '#505050'}}>{item.from.substring(11, 16)} - {item.to.substring(11, 16)}</Text>
            <View style={{position: 'absolute', right: 20, justifyContent: 'center', alignItems: 'center', top: 20}}>
              <Text style={{fontFamily: 'siemens_global_roman', fontSize: 13, lineHeight: 24, color: '#505050'}}> {this._timeDiff(item.from.substring(11, 16), item.to.substring(11, 16))} h</Text>
            </View>
          </View>
        );
      }
    
      renderEmptyDate() {
        return (
          <View style={styles.emptyDate}>
            <Text style={{fontSize: 16, fontFamily: 'siemens_global_bold', lineHeight: 24}}>Kein Eintrag vorhanden!</Text>
          </View>
        );
      }
    
      rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
      }
    
      timeToString(time) {
        const date = new Date(time);
        //return date.toISOString();
        return date.toISOString().split('T')[0];
      }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
      emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
});

//make this component available to the app
export default AgendaComponent;
