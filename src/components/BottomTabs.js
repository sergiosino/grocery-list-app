import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import WeekMenuView from '../views/WeekMenuView'
import GroceryListView from '../views/GroceryListView'
import FoodView from '../views/foodView/FoodView'
import { ROUTE_NAME_FOODS, ROUTE_NAME_WEEK_MENU, ROUTE_NAME_GROCERY_LIST } from '../constants/routes'

const Tab = createBottomTabNavigator()
const tabOptions = [
  {
    name: ROUTE_NAME_FOODS,
    component: FoodView,
    iconName: 'pizza-outline',
    focusedIconName: 'pizza'
  },
  {
    name: ROUTE_NAME_WEEK_MENU,
    component: WeekMenuView,
    iconName: 'restaurant-outline',
    focusedIconName: 'restaurant'
  },
  {
    name: ROUTE_NAME_GROCERY_LIST,
    component: GroceryListView,
    iconName: 'cart-outline',
    focusedIconName: 'cart'
  }
]

export default function BottomTabs () {
  const getTabIcon = ({ focused, color, size, route }) => {
    const { iconName, focusedIconName } = tabOptions.find(tabOption => tabOption.name === route.name)
    const icon = focused ? focusedIconName : iconName
    return <Ionicons name={icon} size={size} color={color} />
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => getTabIcon({ ...props, route }),
        headerShown: false
      })}
    >
      {tabOptions.map(tabOption => (
        <Tab.Screen key={tabOption.name} name={tabOption.name} component={tabOption.component} />
      ))}
    </Tab.Navigator>
  )
}
