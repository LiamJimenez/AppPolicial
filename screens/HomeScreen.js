import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchEvents = async () => {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    };
    if (isFocused) {
      fetchEvents();
    }
  }, [isFocused]);

  const deleteEvent = async (id) => {
    const newEvents = events.filter((event) => event.id !== id);
    setEvents(newEvents);
    await AsyncStorage.setItem('events', JSON.stringify(newEvents));
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Eliminar Incidencia',
      '¿Estás seguro de que quieres eliminar esta incidencia?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Sí', onPress: () => deleteEvent(id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="security" size={30} color="#ffffff" style={styles.icon} />
        <Text style={styles.headerText}>Vigilancia Policial</Text>
      </View>
      <Button title="Agregar Incidencia" onPress={() => navigation.navigate('AddEvent')} color="#00796b" />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { event: item })} style={styles.eventContent}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              {item.photo && <Image source={{ uri: item.photo }} style={styles.eventPhoto} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteIcon}>
              <Icon name="delete" size={25} color="#ff5252" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#263238',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#37474f',
    borderBottomWidth: 1,
    borderBottomColor: '#455a64',
    marginBottom: 10,
    borderRadius: 5,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
  eventPhoto: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  deleteIcon: {
    padding: 10,
  },
});

export default HomeScreen;
