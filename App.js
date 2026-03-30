import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { loadState, saveState } from './src/data/storage';
import HomeScreen from './src/screens/HomeScreen';
import LogScreen from './src/screens/LogScreen';
import RecipesScreen from './src/screens/RecipesScreen';
import FoodsScreen from './src/screens/FoodsScreen';
import StatsScreen from './src/screens/StatsScreen';
import ConfigScreen from './src/screens/ConfigScreen';

export const AppContext = createContext({});
const Tab = createBottomTabNavigator();

const icons = { Início:'🏠', Registrar:'➕', Receitas:'👨‍🍳', Alimentos:'✅', Stats:'📊', Config:'⚙️' };

export default function App() {
  const [state, setStateRaw] = useState(null);

  useEffect(() => {
    loadState().then(s => setStateRaw(s));
  }, []);

  function setState(updater) {
    setStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  }

  if(!state) return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#FDF6ED'}}>
      <Text style={{fontSize:40}}>👶</Text>
      <Text style={{fontSize:16,color:'#7A9E7E',marginTop:10,fontWeight:'600'}}>Bebê Alimentar</Text>
    </View>
  );

  return (
    <SafeAreaProvider><AppContext.Provider value={{ state, setState }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: () => <Text style={{fontSize:22}}>{icons[route.name]}</Text>,
            tabBarLabel: route.name,
            tabBarActiveTintColor: '#4A7050',
            tabBarInactiveTintColor: '#A89880',
            tabBarStyle: { backgroundColor:'#FEFCF8', borderTopColor:'rgba(0,0,0,0.07)', height:88, paddingBottom:100},
            tabBarLabelStyle: { fontSize:10, fontWeight:'600' },
            headerStyle: { backgroundColor:'#FEFCF8', borderBottomColor:'rgba(0,0,0,0.07)', borderBottomWidth:1 },
            headerTintColor: '#2E2A26',
            headerTitleStyle: { fontWeight:'700', fontSize:18 },
          })}
        >
          <Tab.Screen name="Início" component={HomeScreen} options={{headerTitle:'Bebê Alimentar'}} />
          <Tab.Screen name="Registrar" component={LogScreen} />
          <Tab.Screen name="Receitas" component={RecipesScreen} />
          <Tab.Screen name="Alimentos" component={FoodsScreen} />
          <Tab.Screen name="Stats" component={StatsScreen} />
          <Tab.Screen name="Config" component={ConfigScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider></SafeAreaProvider>
  );
}

import { registerRootComponent } from 'expo';
registerRootComponent(App);
