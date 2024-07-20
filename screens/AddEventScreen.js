import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Platform, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const AddEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const saveEvent = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Title and description are required.');
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      date: new Date().toLocaleDateString(),
      photo,
    };

    const storedEvents = await AsyncStorage.getItem('events');
    const events = storedEvents ? JSON.parse(storedEvents) : [];
    events.push(newEvent);

    await AsyncStorage.setItem('events', JSON.stringify(events));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar Incidencia</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Seleccionar Imagen" onPress={pickImage} color="#37474f" />
        <Button title="Tomar Foto" onPress={takePhoto} color="#37474f" />
      </View>
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <Button title="Guardar Incidencia" onPress={saveEvent} color="#00796b" />
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
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#37474f',
    borderWidth: 1,
    backgroundColor: '#37474f',
    color: '#fff',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
});

export default AddEventScreen;
