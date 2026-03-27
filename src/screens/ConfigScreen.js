import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { AppContext } from '../../App';
import { COLORS, NOTIF_SCHEDULE } from '../data';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert:true, shouldPlaySound:true, shouldSetBadge:false }),
});

export default function ConfigScreen() {
  const { state, setState } = useContext(AppContext);
  const [notifEnabled, setNotifEnabled] = useState({});
  const [startDate, setStartDate] = useState(state.startDate);

  useEffect(() => { setNotifEnabled(state.notifs||{}); }, [state.notifs]);

  async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if(status !== 'granted') {
      Alert.alert('Permissão negada','Ative as notificações nas configurações do seu celular.');
      return false;
    }
    return true;
  }

  async function scheduleNotif(n) {
    await Notifications.cancelScheduledNotificationAsync(n.id).catch(()=>{});
    await Notifications.scheduleNotificationAsync({
      identifier: n.id,
      content: { title: n.label, body: n.body, sound:true },
      trigger: { hour: n.time.hour, minute: n.time.minute, repeats: true },
    });
  }

  async function toggleNotif(n) {
    const granted = await requestPermissions();
    if(!granted) return;
    const isOn = !!notifEnabled[n.id];
    if(isOn) {
      await Notifications.cancelScheduledNotificationAsync(n.id).catch(()=>{});
      const updated = {...notifEnabled, [n.id]:false};
      setNotifEnabled(updated);
      setState(prev=>({...prev, notifs:updated}));
    } else {
      await scheduleNotif(n);
      const updated = {...notifEnabled, [n.id]:true};
      setNotifEnabled(updated);
      setState(prev=>({...prev, notifs:updated}));
      Alert.alert('🔔 Ativado!',`Lembrete das ${n.time.hour}h${n.time.minute>0?n.time.minute:''} ativado diariamente.`);
    }
  }

  async function activateAll() {
    const granted = await requestPermissions();
    if(!granted) return;
    const updated = {};
    for(const n of NOTIF_SCHEDULE) {
      await scheduleNotif(n);
      updated[n.id] = true;
    }
    setNotifEnabled(updated);
    setState(prev=>({...prev, notifs:updated}));
    Alert.alert('✅ Todos ativados!','Você receberá lembretes nos horários das refeições.');
  }

  function saveDate() {
    setState(prev=>({...prev, startDate}));
    Alert.alert('✅ Salvo!','Data de início atualizada.');
  }

  function clearAll() {
    Alert.alert('Apagar tudo?','Esta ação não pode ser desfeita.',[
      {text:'Cancelar',style:'cancel'},
      {text:'Apagar',style:'destructive',onPress:()=>{
        setState({logs:[],introduced:[],diary:[],notifs:{},startDate:new Date().toISOString().split('T')[0]});
        Alert.alert('Dados apagados');
      }}
    ]);
  }

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <Text style={s.sectionTitle}>⚙️ Configurações</Text>

      <Text style={s.groupLabel}>DATA DE INÍCIO</Text>
      <View style={s.card}>
        <Text style={s.label}>Data de início da introdução alimentar</Text>
        <TextInput style={s.input} value={startDate} onChangeText={setStartDate} placeholder="AAAA-MM-DD" placeholderTextColor={COLORS.light} />
        <TouchableOpacity style={[s.btnPrimary,{marginTop:10}]} onPress={saveDate}>
          <Text style={s.btnText}>Salvar Data</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.groupLabel}>🔔 LEMBRETES DAS REFEIÇÕES</Text>
      <TouchableOpacity style={[s.btnPrimary,{marginBottom:10}]} onPress={activateAll}>
        <Text style={s.btnText}>🔔 Ativar Todos os Lembretes</Text>
      </TouchableOpacity>
      {NOTIF_SCHEDULE.map(n=>(
        <TouchableOpacity key={n.id} style={s.notifRow} onPress={()=>toggleNotif(n)} activeOpacity={0.8}>
          <View style={s.notifInfo}>
            <Text style={s.notifLabel}>{n.label}</Text>
            <Text style={s.notifTime}>{String(n.time.hour).padStart(2,'0')}:{String(n.time.minute).padStart(2,'0')}</Text>
          </View>
          <View style={[s.toggle, !!notifEnabled[n.id] && s.toggleOn]}>
            <View style={[s.toggleThumb, !!notifEnabled[n.id] && s.toggleThumbOn]} />
          </View>
        </TouchableOpacity>
      ))}

      <Text style={s.groupLabel}>⚠️ PROIBIDOS ATÉ 1 ANO</Text>
      <View style={s.card}>
        {['🍯 Mel — risco de botulismo','🧂 Sal adicionado — sobrecarrega rins','🍬 Açúcar — inclui mel e melado','🥛 Leite de vaca como bebida principal','🌭 Embutidos (presunto, salsicha)','🥤 Refrigerante e sucos industriais','🍟 Ultraprocessados em geral','☕ Cafeína (café, chá preto, chocolate)'].map((item,i)=>(
          <Text key={i} style={s.proibidoItem}>{item}</Text>
        ))}
      </View>

      <TouchableOpacity style={s.btnDanger} onPress={clearAll}>
        <Text style={s.btnText}>🗑️ Apagar Todos os Dados</Text>
      </TouchableOpacity>
      <View style={{height:20}} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:{flex:1,backgroundColor:COLORS.cream,padding:16},
  sectionTitle:{fontSize:18,fontWeight:'700',color:COLORS.charcoal,marginBottom:16},
  groupLabel:{fontSize:12,fontWeight:'700',color:COLORS.light,letterSpacing:1,marginBottom:8,marginTop:16},
  card:{backgroundColor:COLORS.white,borderRadius:18,padding:16,marginBottom:8,borderWidth:1,borderColor:COLORS.border},
  label:{fontSize:13,color:COLORS.mid,marginBottom:6},
  input:{backgroundColor:COLORS.cream,borderWidth:1.5,borderColor:COLORS.border,borderRadius:12,padding:12,fontSize:14,color:COLORS.charcoal},
  btnPrimary:{backgroundColor:COLORS.sage,borderRadius:14,padding:14,alignItems:'center'},
  btnDanger:{backgroundColor:'#c0392b',borderRadius:14,padding:14,alignItems:'center',marginTop:8},
  btnText:{color:'#fff',fontSize:15,fontWeight:'700'},
  notifRow:{backgroundColor:COLORS.white,borderRadius:14,padding:14,marginBottom:8,borderWidth:1,borderColor:COLORS.border,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  notifInfo:{},
  notifLabel:{fontSize:14,fontWeight:'600',color:COLORS.charcoal},
  notifTime:{fontSize:12,color:COLORS.light,marginTop:2},
  toggle:{width:46,height:26,backgroundColor:COLORS.border,borderRadius:13,justifyContent:'center',paddingHorizontal:3},
  toggleOn:{backgroundColor:COLORS.sage},
  toggleThumb:{width:20,height:20,borderRadius:10,backgroundColor:'#fff',shadowColor:'#000',shadowOpacity:0.2,shadowRadius:2,shadowOffset:{width:0,height:1}},
  toggleThumbOn:{alignSelf:'flex-end'},
  proibidoItem:{fontSize:13,color:COLORS.mid,lineHeight:26},
});
