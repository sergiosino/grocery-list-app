import { StyleSheet, View } from 'react-native'

import { headerStyles } from '../../styles/headerStyles'
import { ROUTE_NAME_RECIPES, ROUTE_NAME_INGREDIENTS } from '../../constants/routes'
import FoodHeaderItem from './FoodHeaderItem'

const FOOD_HEADER_ITEMS = [
  {
    routeName: ROUTE_NAME_RECIPES,
    iconName: 'book-outline'
  },
  {
    routeName: ROUTE_NAME_INGREDIENTS,
    iconName: 'basket-outline'
  }
]

export default function FoodHeader () {
  return (
    <View style={[headerStyles.headerContainer, styles.localHeaderContainer]}>
      {FOOD_HEADER_ITEMS.map(item => {
        const { routeName, iconName } = item
        return (
          <View key={routeName} style={headerStyles.headerItem}>
            <FoodHeaderItem routeName={routeName} iconName={iconName} />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  localHeaderContainer: {
    backgroundColor: '#f2f2f2'
  }
})
