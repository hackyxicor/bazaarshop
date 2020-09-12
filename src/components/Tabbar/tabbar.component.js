import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';

//constants

//icons
// import HomeIcon from '../../assets/svg/home-icon';
// import PlayIcon from '../../assets/svg/play-icon';
// import DrawerIcon from '../../assets/svg/drawer-icon';
// import ProfileIcon from '../../assets/svg/profile-icon';
// import VectorDownIcon from '../../assets/svg/vector-down';

// import { RelativeWidth, RelativeHeight, RelativeFontSize, Colors } from '@uiKit';

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white }} >
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
            case "Timeline":
              Icon = (props) => (
                <>
                  {/* <PlayIcon {...props} /> */}
                  {/* <VectorDownIcon style={{ marginTop: -RelativeHeight(4) }} fill={props.fill} /> */}
                </>
              );
              title = "Schedule";
              break;
            case "Drawer":
              Icon = DrawerIcon;
              title = "Drawer";
              break;
            case "Profile":
              Icon = ProfileIcon;
              title = "Profile";
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
              {Icon && <Icon fill={isFocused ? Colors.primaryColor : Colors.textGrey} width={(20)} height={(20)} />}
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
    height: (55),
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.textLightGrey
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: Colors.primaryColor,
    fontWeight: '500',
    fontSize: (9),
    lineHeight: (12),
    fontFamily: "Avenir-Medium"
  }
})