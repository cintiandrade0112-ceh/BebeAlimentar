import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'bebe_state';

export const defaultState = {
  logs: [],
  introduced: [],
  diary: [],
  notifs: {},
  startDate: new Date().toISOString().split('T')[0],
};

export async function loadState() {
  try {
    const s = await AsyncStorage.getItem(KEY);
    return s ? { ...defaultState, ...JSON.parse(s) } : { ...defaultState };
  } catch { return { ...defaultState }; }
}

export async function saveState(state) {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}
