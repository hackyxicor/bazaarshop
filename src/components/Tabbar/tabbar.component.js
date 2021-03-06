import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';

//constants

//icons
import HomeIcon from '../../assets/svg/home-icon';
import OrdersIcon from '../../assets/svg/orders-icon';
import BagIcon from '../../assets/svg/bag-icon';
import CategoriesIcon from '../../assets/svg/categories-icon';

// import { RelativeWidth, RelativeHeight, RelativeFontSize, Colors } from '@uiKit';

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} >
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;
          let Icon = null;
          let title = null;

          switch (route.name) {
            case "Home":
              Icon = HomeIcon;
              title = "Home";
              break;
            case "Categories":
              Icon = CategoriesIcon
              title = "Categories";
              break;
            case "Bag":
              Icon = BagIcon;
              title = "Bag";
              break;
            case "Orders":
              Icon = OrdersIcon;
              title = "Orders";
              break;
          }


          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.button}
            >
              {Icon && <Icon fill={isFocused ? "red" : "black"} width={(20)} height={(20)} />}
              {isFocused ? <Text style={styles.title} >{title}</Text> : <Text style={styles.title} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    // backgroundColor: Colors.white,
    borderTopWidth: 1,
    // borderTopColor: Colors.textLightGrey
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    // color: Colors.primaryColor,
    fontWeight: '500',
    fontSize: 9,
    lineHeight: 12,
  }
})