// theme.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './Colors';

const getThemeColors = async () => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    return theme === 'dark' ? Colors.dark : Colors.light;
  } catch (error) {
    console.error("Error fetching theme from AsyncStorage:", error);
    return Colors.light; // default to light theme
  }
};

export default getThemeColors;
