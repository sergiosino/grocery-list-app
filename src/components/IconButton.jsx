import { View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { BorderlessButton } from 'react-native-gesture-handler'

export default function IconButton (props) {
  const {
    onPress,
    iconName,
    size = 20,
    style,
    rippleRadius = 20
  } = props

  return (
    <View style={style}>
      <BorderlessButton onPress={onPress} rippleRadius={rippleRadius}>
        <Ionicons name={iconName} size={size} />
      </BorderlessButton>
    </View>
  )
}
