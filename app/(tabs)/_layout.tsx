import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/TabBarIcons';
import { colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.text,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Guest List',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({ name: focused ? 'list' : 'list-outline', color }),
        }}
      />
      <Tabs.Screen
        name="newGuest"
        options={{
          title: 'Add Guest',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({ name: focused ? 'add' : 'add-outline', color }),
        }}
      />
    </Tabs>
  );
}
