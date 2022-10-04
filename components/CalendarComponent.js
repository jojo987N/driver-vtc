import { View, Text, StyleSheet} from 'react-native'
import React, {useState,useCallback,useMemo, Fragment } from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const INITIAL_DATE = '2022-06-02';

export default function CalendarComponent() {

    const [selected, setSelected] = useState(INITIAL_DATE);

    const onDayPress = useCallback(day => {
        setSelected(day.dateString);
      }, []);

      const marked = useMemo(() => {
        return {
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
            selectedTextColor: 'red'
          },
          '2022-06-16': {selected: true, marked: true, selectedColor: 'blue'},
          '2022-06-28': {selected: true, marked: true, selectedColor: 'red'},
           
        };
      }, [selected]);

    return (
        <Fragment>
         
        <Calendar
          enableSwipeMonths
          current={INITIAL_DATE}
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={marked}
        />
      </Fragment>
    )
}

const styles = StyleSheet.create({
    calendar: {
        marginBottom: 10
    }
})