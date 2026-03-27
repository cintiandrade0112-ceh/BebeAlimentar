import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert, Dimensions } from 'react-native';
import { AppContext } from '../../App';
import { COLORS } from '../data';

const W = Dimensions.get('window').width - 64;

function Bar({ label, value, max, color }) {
  const pct = max > 0 ? (value / max) : 0;
  return (
    <View style={bs.row}>
      <Text style={bs.label}>{label}</Text>
      <View style={bs.bg}>
        <View style={[bs.fill, {width: Math.max(pct * W * 0.65, value > 0 ? 24 : 0), backgroundColor: color}]}>
          {value > 0 && <Text style={bs.fillText}>{value}</Text>}
        </View>
      </View>
      <Text style={bs.val}>{value}</Text>
    </View>
  );
}
const bs = StyleSheet.create({
  row:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:8},
  label:{fontSize:11,color:COLORS.mid,width:70,flexShrink:0},
  bg:{flex:1,height:22,backgroundColor:COLORS.cream,borderRadius:11,overflow:'hidden'},
  fill:{height:22,borderRadius:11,justifyContent:'center',paddingLeft:8,minWidth:24},
  fillText:{color:'#fff',fontSize:10,fontWeight:'700'},
  val:{fontSize:12,fontWeight:'700',color:COLORS.charcoal,width:22,textAlign:'right'},
});

export default function StatsScreen() {
  const { state, setState } = useContext(AppContext);
  const [diaryFood, setDiaryFood] = useState('');
  const [diaryDesc, setDiaryDesc] = useState('');
  const [diarySev, setDiarySev] = useState('ok');

  // Acceptance chart
  const meals = {};
  state.logs.forEach(l => {
    if(!meals[l.meal]) meals[l.meal] = 0;
    meals[l.meal]++;
  });
  const maxMeal = Math.max(...Object.values(meals), 1);

  // Weekly chart
  const now = new Date();
  const weekly = Array.from({length:7},(_,i)=>{
    const d = new Date(now); d.setDate(now.getDate()-6+i);
    const ds = d.toISOString().split('T')[0];
    return { label:d.toLocaleDateString('pt-BR',{weekday:'short'}), count:state.logs.filter(l=>l.date===ds).length };
  });
  const maxWeek = Math.max(...weekly.map(d=>d.count), 1);

  // Reactions
  const ok = state.logs.filter(l=>l.reaction==='ok').length;
  const alert = state.logs.filter(l=>l.reaction==='alert').length;
  const bad = state.logs.filter(l=>l.reaction==='bad').length;
  const total = ok+alert+bad||1;

  function saveDiary() {
    if(!diaryFood.trim()||!diaryDesc.trim()){ Alert.alert('Atenção','Preencha alimento e descrição'); return; }
    const entry = {id:Date.now(), date:now.toISOString().split('T')[0], food:diaryFood.trim(), desc:diaryDesc.trim(), severity:diarySev};
    setState(prev=>({...prev,diary:[entry,...prev.diary]}));
    setDiaryFood(''); setDiaryDesc('');
    Alert.alert('📔 Salvo!','Registro adicionado ao diário.');
  }

  const sevColors = {ok:COLORS.sage,alert:COLORS.golden,bad:COLORS.terra};

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <Text style={s.sectionTitle}>📊 Estatísticas</Text>

      <View style={s.chartCard}>
        <Text style={s.chartTitle}>🍽️ Refeições por tipo</Text>
        {Object.keys(meals).length === 0
          ? <Text style={s.empty}>Nenhum registro ainda</Text>
          : Object.entries(meals).map(([name,count],i)=>(
            <Bar key={i} label={name.substring(0,10)} value={count} max={maxMeal} color={COLORS.sage} />
          ))
        }
      </View>

      <View style={s.chartCard}>
        <Text style={s.chartTitle}>📅 Refeições — últimos 7 dias</Text>
        {weekly.map((d,i)=>(
          <Bar key={i} label={d.label} value={d.count} max={maxWeek} color={COLORS.blue} />
        ))}
      </View>

      <View style={s.chartCard}>
        <Text style={s.chartTitle}>⚠️ Reações registradas</Text>
        {total === 0
          ? <Text style={s.empty}>Nenhum registro ainda</Text>
          : <>
            <Bar label="✅ Normal" value={ok} max={total} color={COLORS.sage} />
            <Bar label="⚠️ Atenção" value={alert} max={total} color={COLORS.golden} />
            <Bar label="🚨 Alergia" value={bad} max={total} color={COLORS.terra} />
          </>
        }
      </View>

      <Text style={s.sectionTitle}>📔 Diário de Reações</Text>
      <View style={s.form}>
        <Text style={s.label}>ALIMENTO</Text>
        <TextInput style={s.input} value={diaryFood} onChangeText={setDiaryFood} placeholder="Ex: ovo, morango..." placeholderTextColor={COLORS.light} />
        <Text style={s.label}>O QUE ACONTECEU?</Text>
        <TextInput style={[s.input,{height:70,textAlignVertical:'top'}]} value={diaryDesc} onChangeText={setDiaryDesc} placeholder="Descreva a reação, sintomas..." placeholderTextColor={COLORS.light} multiline />
        <Text style={s.label}>GRAVIDADE</Text>
        <View style={s.sevRow}>
          {['ok','alert','bad'].map(sev=>(
            <TouchableOpacity key={sev} style={[s.sevBtn,diarySev===sev&&{borderColor:sevColors[sev],backgroundColor:sevColors[sev]+'22'}]} onPress={()=>setDiarySev(sev)}>
              <Text style={[s.sevText,diarySev===sev&&{color:sevColors[sev]}]}>{sev==='ok'?'✅ Leve':sev==='alert'?'⚠️ Moderada':'🚨 Grave'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={s.btnPrimary} onPress={saveDiary}>
          <Text style={s.btnText}>Salvar no Diário</Text>
        </TouchableOpacity>
      </View>

      {state.diary.map(d=>(
        <View key={d.id} style={s.diaryEntry}>
          <Text style={s.diaryDate}>{d.date}</Text>
          <Text style={s.diaryFood}>{d.food}</Text>
          <Text style={s.diaryDesc}>{d.desc}</Text>
          <View style={[s.sevBadge,{backgroundColor:sevColors[d.severity]+'22'}]}>
            <Text style={[s.sevBadgeText,{color:sevColors[d.severity]}]}>{d.severity==='ok'?'✅ Leve':d.severity==='alert'?'⚠️ Moderada':'🚨 Grave'}</Text>
          </View>
        </View>
      ))}
      <View style={{height:20}} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:{flex:1,backgroundColor:COLORS.cream,padding:16},
  sectionTitle:{fontSize:18,fontWeight:'700',color:COLORS.charcoal,marginVertical:12},
  chartCard:{backgroundColor:COLORS.white,borderRadius:18,padding:16,marginBottom:12,borderWidth:1,borderColor:COLORS.border},
  chartTitle:{fontSize:13,fontWeight:'700',color:COLORS.mid,marginBottom:12},
  empty:{fontSize:13,color:COLORS.light,textAlign:'center',padding:10},
  form:{backgroundColor:COLORS.white,borderRadius:18,padding:18,marginBottom:12,borderWidth:1,borderColor:COLORS.border},
  label:{fontSize:11,fontWeight:'700',color:COLORS.light,letterSpacing:0.5,marginBottom:6,marginTop:10},
  input:{backgroundColor:COLORS.cream,borderWidth:1.5,borderColor:COLORS.border,borderRadius:12,padding:12,fontSize:14,color:COLORS.charcoal},
  sevRow:{flexDirection:'row',gap:8},
  sevBtn:{flex:1,padding:9,borderWidth:2,borderColor:COLORS.border,borderRadius:10,alignItems:'center'},
  sevText:{fontSize:11,fontWeight:'700',color:COLORS.mid},
  btnPrimary:{backgroundColor:COLORS.sage,borderRadius:14,padding:14,alignItems:'center',marginTop:14},
  btnText:{color:'#fff',fontSize:15,fontWeight:'700'},
  diaryEntry:{backgroundColor:COLORS.white,borderRadius:14,padding:14,marginBottom:8,borderWidth:1,borderColor:COLORS.border},
  diaryDate:{fontSize:11,color:COLORS.light,fontWeight:'700',marginBottom:4},
  diaryFood:{fontSize:14,fontWeight:'700',color:COLORS.charcoal,marginBottom:4},
  diaryDesc:{fontSize:13,color:COLORS.mid,lineHeight:18},
  sevBadge:{alignSelf:'flex-start',paddingHorizontal:8,paddingVertical:2,borderRadius:20,marginTop:6},
  sevBadgeText:{fontSize:10,fontWeight:'700'},
});
