import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import GuestItem from '../../components/GuestItem';
import { colors } from '../../constants/Colors';
import type { Guest } from '../../migrations/00000-createTableGuests';
import type { GuestsResponseBodyGet } from '../api/guests+api';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: '100%',
  },
  text: {
    color: colors.text,
  },
  list: {
    marginTop: 30,
  },
});

export default function App() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });
  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Guest }) => (
    <GuestItem guest={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      async function getGuests() {
        try {
          const response = await fetch('/api/guests', {
            headers: {
              Cookie: 'name=value',
            },
          });
          const body: GuestsResponseBodyGet = await response.json();

          setGuests(body.guests);
          setIsStale(false);
        } catch (error) {
          console.error(error);
        }
      }

      if (isStale) {
        getGuests().catch((error) => {
          console.error(error);
        });
      }

      getGuests().catch((error) => {
        console.error(error);
      });
    }, [isStale]),
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item: Guest) => String(item.id)}
      />
    </SafeAreaView>
  );
}
