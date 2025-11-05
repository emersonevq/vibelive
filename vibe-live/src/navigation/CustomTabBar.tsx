import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const getIconName = (routeName: string, focused: boolean) => {
    switch (routeName) {
      case 'Recados':
        return focused ? 'home' : 'home-outline';
      case 'Story':
        return focused ? 'image' : 'image-outline';
      case 'Mensagens':
        return focused ? 'message-text' : 'message-text-outline';
      case 'Perfil':
        return focused ? 'account' : 'account-outline';
      default:
        return 'circle';
    }
  };

  const getLabel = (routeName: string) => {
    switch (routeName) {
      case 'Recados':
        return 'Recados';
      case 'Story':
        return 'Stories';
      case 'Mensagens':
        return 'Mensagens';
      case 'Perfil':
        return 'Perfil';
      default:
        return routeName;
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}> 
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const options = descriptors[route.key].options;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name as any);
          }
        };

        const color = focused ? '#16a34a' : '#9ca3af';
        const iconName = getIconName(route.name, focused);
        const label = getLabel(route.name);

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name={iconName as any} size={24} color={color} />
            <Text style={[styles.label, { color }]} numberOfLines={1}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
    paddingHorizontal: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});
