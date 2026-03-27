import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../../App';
import { COLORS, SCHEDULE } from '../data';

export default function HomeScreen() {
  const { state } = useContext(AppContext);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Bom dia! 👶' : hour < 18 ? 'Boa tarde! 👶' : 'Boa noite! 👶';
  const start = new Date(state.startDate + 'T12:00:00');
  const days = Math.max(0, Math.floor((now - start) / 86400000));
  const week = Math.max(1, Math.ceil((days + 1) / 7));

  const curMins = now.getHours() * 60 + now.getMinutes();
  const next = SCHEDULE.find(s => {
    const [h, m] = s.time.split(':').map(Number);
    return h * 60 + m > curMins;
  }) || SCHEDULE[0];

  const weekDays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const weekData = Array.from({length:7},(_,i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    const ds = d.toISOString().split('T')[0];
    return { label: weekDays[i], day: d.getDate(), ds, hasLog: state.logs.some(l=>l.date===ds), isToday: ds===now.toISOString().split('T')[0] };
  });

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      {/* HEADER STRIP */}
      <View style={s.strip}>
        <View>
          <Text style={s.stripGreeting}>{greeting}</Text>
          <Text style={s.stripWeek}>Semana {week} da introdução alimentar</Text>
        </View>
        <View style={s.stripRight}>
          <Text style={s.stripBig}>{state.introduced.length}</Text>
          <Text style={s.stripLbl}>alimentos{'\n'}introduzidos</Text>
        </View>
      </View>

      {/* STATS */}
      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statNum}>{days + 1}</Text>
          <Text style={s.statLbl}>dias de{'\n'}introdução</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statNum}>{state.logs.length}</Text>
          <Text style={s.statLbl}>refeições{'\n'}registradas</Text>
        </View>
      </View>

      {/* NEXT MEAL */}
      <View style={s.nextCard}>
        <Text style={s.nextIcon}>{next.icon}</Text>
        <View style={s.nextInfo}>
          <Text style={s.nextTitle}>{next.name}</Text>
          <Text style={s.nextDesc}>{next.desc.substring(0,50)}...</Text>
        </View>
        <Text style={s.nextTime}>{next.time}</Text>
      </View>

      {/* WEEK */}
      <View style={s.weekCard}>
        <Text style={s.weekTitle}>📅 Esta semana</Text>
        <View style={s.weekRow}>
          {weekData.map((d,i) => (
            <View key={i} style={s.weekDay}>
              <View style={[s.dayCircle, d.isToday && s.dayToday, d.hasLog && !d.isToday && s.dayHasLog]}>
                <Text style={[s.dayNum, (d.isToday||d.hasLog) && {color:'#fff'}]}>{d.day}</Text>
              </View>
              <Text style={s.dayLabel}>{d.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* SCHEDULE */}
      <Text style={s.sectionTitle}>📋 Cronograma de Hoje</Text>
      {SCHEDULE.map((item, i) => {
        const [h,m] = item.time.split(':').map(Number);
        const isPast = h*60+m < curMins;
        return (
          <View key={i} style={[s.mealCard, {opacity: isPast ? 0.6 : 1}]}>
            <View style={[s.mealAccent, {backgroundColor: item.color}]} />
            <View style={s.mealContent}>
              <View style={s.mealRow}>
                <Text style={s.mealTime}>{item.time}</Text>
                <Text style={s.mealName}>{item.icon} {item.name}</Text>
                {isPast && <Text style={s.mealCheck}>✓</Text>}
              </View>
              <Text style={s.mealDesc}>{item.desc}</Text>
              <View style={s.tagsRow}>
                {item.ideas.map((t,j) => (
                  <View key={j} style={s.tag}><Text style={s.tagText}>{t}</Text></View>
                ))}
              </View>
            </View>
          </View>
        );
      })}
      <View style={{height:20}} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { flex:1, backgroundColor:COLORS.cream, padding:16 },
  strip: { backgroundColor:COLORS.sageDark, borderRadius:18, padding:18, marginBottom:12, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  stripGreeting: { color:'#fff', fontSize:20, fontWeight:'700' },
  stripWeek: { color:'rgba(255,255,255,0.85)', fontSize:12, marginTop:3 },
  stripRight: { alignItems:'center' },
  stripBig: { color:'#fff', fontSize:36, fontWeight:'300' },
  stripLbl: { color:'rgba(255,255,255,0.75)', fontSize:10, textAlign:'center' },
  statsRow: { flexDirection:'row', gap:10, marginBottom:12 },
  statCard: { flex:1, backgroundColor:COLORS.white, borderRadius:14, padding:14, alignItems:'center', borderWidth:1, borderColor:COLORS.border },
  statNum: { fontSize:28, fontWeight:'300', color:COLORS.charcoal },
  statLbl: { fontSize:11, color:COLORS.light, marginTop:3, textAlign:'center' },
  nextCard: { backgroundColor:COLORS.white, borderRadius:18, padding:16, marginBottom:12, borderWidth:2, borderColor:COLORS.terraLight, flexDirection:'row', alignItems:'center', gap:14 },
  nextIcon: { fontSize:34 },
  nextInfo: { flex:1 },
  nextTitle: { fontSize:15, fontWeight:'700', color:COLORS.charcoal },
  nextDesc: { fontSize:12, color:COLORS.mid, marginTop:2 },
  nextTime: { fontSize:22, fontWeight:'700', color:COLORS.terra },
  weekCard: { backgroundColor:COLORS.white, borderRadius:18, padding:16, marginBottom:12, borderWidth:1, borderColor:COLORS.border },
  weekTitle: { fontSize:13, fontWeight:'700', color:COLORS.mid, marginBottom:10 },
  weekRow: { flexDirection:'row', justifyContent:'space-between' },
  weekDay: { alignItems:'center', gap:4 },
  dayCircle: { width:34, height:34, borderRadius:17, backgroundColor:COLORS.cream, borderWidth:2, borderColor:COLORS.border, alignItems:'center', justifyContent:'center' },
  dayToday: { borderColor:COLORS.sage, backgroundColor:'rgba(122,158,126,0.1)' },
  dayHasLog: { backgroundColor:COLORS.sage, borderColor:COLORS.sageDark },
  dayNum: { fontSize:13, fontWeight:'700', color:COLORS.light },
  dayLabel: { fontSize:9, color:COLORS.light, fontWeight:'600' },
  sectionTitle: { fontSize:18, fontWeight:'700', color:COLORS.charcoal, marginVertical:12 },
  mealCard: { backgroundColor:COLORS.white, borderRadius:18, marginBottom:10, borderWidth:1, borderColor:COLORS.border, flexDirection:'row', overflow:'hidden' },
  mealAccent: { width:5 },
  mealContent: { flex:1, padding:14 },
  mealRow: { flexDirection:'row', alignItems:'center', gap:8, marginBottom:6 },
  mealTime: { fontSize:17, fontWeight:'700', color:COLORS.charcoal, minWidth:52 },
  mealName: { fontSize:14, fontWeight:'700', flex:1, color:COLORS.charcoal },
  mealCheck: { fontSize:12, color:COLORS.light },
  mealDesc: { fontSize:13, color:COLORS.mid, lineHeight:18, marginBottom:8 },
  tagsRow: { flexDirection:'row', flexWrap:'wrap', gap:6 },
  tag: { backgroundColor:'rgba(122,158,126,0.15)', paddingHorizontal:10, paddingVertical:4, borderRadius:20 },
  tagText: { fontSize:11, color:COLORS.sageDark, fontWeight:'600' },
});
