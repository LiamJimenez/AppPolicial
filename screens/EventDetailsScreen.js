import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

const EventDetailsScreen = ({ route }) => {
  const { event } = route.params;
  const [sound, setSound] = useState();

  useEffect(() => {
    if (event.audioUri) {
      const loadSound = async () => {
        const { sound } = await Audio.Sound.createAsync({ uri: event.audioUri });
        setSound(sound);
      };

      loadSound();

      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }
  }, [event.audioUri]);

  const playAudio = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.date}>{event.date}</Text>
      {event.photo && <Image source={{ uri: event.photo }} style={styles.photo} />}
      {event.audioUri && (
        <TouchableOpacity onPress={playAudio} style={styles.audioButton}>
          <Text style={styles.audioText}>Reproducir Audio</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#2C2C2C', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00A859', 
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#E0E0E0', 
    marginBottom: 25,
  },
  date: {
    fontSize: 14,
    color: '#B0B0B0', 
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginVertical: 20,
    borderColor: '#444', 
    borderWidth: 1,
  },
  audioButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FF5722', 
    borderRadius: 8,
    alignItems: 'center',
  },
  audioText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default EventDetailsScreen;
