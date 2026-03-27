import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../../App';
import { COLORS } from '../data';

const MEALS = ['🍼 Leite materno/Fórmula','🍌 Fruta da manhã','🥦 Almoço','🍊 Lanche da tarde','🥕 Jantar'];
const ACCEPTS = ['Adorou 😍','Comeu bem 🙂','Aceitou pouco 😐','Recusou 😣'];

export default function LogScreen() {
  const { state, setState } = useContext(AppContext);
  const [meal, setMeal] = useState(MEALS[0]);
  const [food, setFood] = useState('');
  const [qty, setQty] = useState('');
  const [notes, setNotes] = useState('');
  const [accept, setAccept] = useState(ACCEPTS[0]);
  const [reaction, setReaction] = useState('ok');

  const now = new Date();
  const timeStr = now.toTimeString().slice(0,5);
  const dateStr = now.toISOString().split('T')[0];

  function save() {
    if(!food.trim()){ Alert.alert('Atenção','Informe o que o bebê comeu'); return; }
    const entry = { id:Date.now(), date:dateStr, time:timeStr, meal, food:food.trim(), qty, accept, notes, reaction };
    setState(prev => ({ ...prev, logs:[entry, ...prev.logs] }));
    setFood(''); setQty(''); setNotes('');
    Alert.alert('✅ Salvo!','Registro salvo com sucesso.');
  }

  function deleteLog(id) {
    Alert.alert('Remover','Deseja remover este registro?',[
      {text:'Cancelar',style:'cancel'},
      {text:'Remover',style:'destructive',onPress:()=>setState(prev=>({...prev,logs:prev.logs.filter(l=>l.id!==id)}))}
    ]);
  }

  const colors = {ok:COLORS.sage,alert:COLORS.golden,bad:COLORS.terra};
  const labels = {ok:'Normal',alert:'Atenção',bad:'Alergia'};

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <Text style={s.sectionTitle}>➕ Registrar Refeição</Text>
      <View style={s.form}>
        <Text style={s.label}>REFEIÇÃO</Text>
        <View style={s.pickerWrap}>
          {MEALS.map(m => (
            <TouchableOpacity key={m} style={[s.option, meal===m && s.optionActive]} onPress={()=>setMeal(m)}>
              <Text style={[s.optionText, meal===m && s.optionTextActive]}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.label}>O QUE COMEU?</Text>
        <TextInput style={s.input} value={food} onChangeText={setFood} placeholder="Ex: banana amassada, papa de batata..." placeholderTextColor={COLORS.light} />

        <View style={s.row}>
          <View style={{flex:1}}>
            <Text style={s.label}>QUANTIDADE</Text>
            <TextInput style={s.input} value={qty} onChangeText={setQty} placeholder="Ex: 3 colheres" placeholderTextColor={COLORS.light} />
          </View>
        </View>

        <Text style={s.label}>ACEITAÇÃO</Text>
        <View style={s.acceptRow}>
          {ACCEPTS.map(a => (
            <TouchableOpacity key={a} style={[s.acceptBtn, accept===a && s.acceptActive]} onPress={()=>setAccept(a)}>
              <Text style={[s.acceptText, accept===a && s.acceptTextActive]}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.label}>OBSERVAÇÕES</Text>
        <TextInput style={[s.input,{height:70,textAlignVertical:'top'}]} value={notes} onChangeText={setNotes} placeholder="Reações, choro, vômito..." placeholderTextColor={COLORS.light} multiline />

        <Text style={s.label}>REAÇÃO / ALERGIA</Text>
        <View style={s.sevRow}>
          {['ok','alert','bad'].map(sev => (
            <TouchableOpacity key={sev} style={[s.sevBtn, reaction===sev && {borderColor:colors[sev],backgroundColor:colors[sev]+'22'}]} onPress={()=>setReaction(sev)}>
              <Text style={[s.sevText, reaction===sev && {color:colors[sev]}]}>{sev==='ok'?'✅ Normal':sev==='alert'?'⚠️ Atenção':'🚨 Alergia'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={s.btnPrimary} onPress={save}>
          <Text style={s.btnText}>Salvar Registro</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.sectionTitle}>📖 Histórico</Text>
      {state.logs.length === 0 && (
        <View style={s.empty}><Text style={s.emptyIcon}>📝</Text><Text style={s.emptyText}>Nenhum registro ainda</Text></View>
      )}
      {state.logs.map(l => (
        <View key={l.id} style={s.logEntry}>
          <View style={[s.logDot, {backgroundColor:colors[l.reaction]||COLORS.sage}]} />
          <View style={{flex:1}}>
            <View style={s.logTop}>
              <Text style={s.logFood}>{l.food}</Text>
              <Text style={s.logTime}>{l.time}</Text>
            </View>
            <Text style={s.logMeal}>{l.meal} · {l.accept}</Text>
            {l.qty?<Text style={s.logMeal}>Qtd: {l.qty}</Text>:null}
            {l.notes?<Text style={s.logNote}>{l.notes}</Text>:null}
            <View style={[s.reactionBadge, {backgroundColor:colors[l.reaction]+'22'}]}>
              <Text style={[s.reactionText, {color:colors[l.reaction]}]}>{labels[l.reaction]}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={()=>deleteLog(l.id)} style={s.delBtn}>
            <Text style={s.delText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={{height:20}} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:{flex:1,backgroundColor:COLORS.cream,padding:16},
  sectionTitle:{fontSize:18,fontWeight:'700',color:COLORS.charcoal,marginVertical:12},
  form:{backgroundColor:COLORS.white,borderRadius:18,padding:18,marginBottom:12,borderWidth:1,borderColor:COLORS.border},
  label:{fontSize:11,fontWeight:'700',color:COLORS.light,letterSpacing:0.5,marginBottom:6,marginTop:10},
  input:{backgroundColor:COLORS.cream,borderWidth:1.5,borderColor:COLORS.border,borderRadius:12,padding:12,fontSize:14,color:COLORS.charcoal},
  row:{flexDirection:'row',gap:10},
  pickerWrap:{flexDirection:'row',flexWrap:'wrap',gap:6},
  option:{paddingHorizontal:10,paddingVertical:6,borderRadius:20,borderWidth:1.5,borderColor:COLORS.border,backgroundColor:COLORS.cream},
  optionActive:{borderColor:COLORS.sage,backgroundColor:'rgba(122,158,126,0.15)'},
  optionText:{fontSize:11,color:COLORS.mid,fontWeight:'600'},
  optionTextActive:{color:COLORS.sageDark},
  acceptRow:{flexDirection:'row',flexWrap:'wrap',gap:6},
  acceptBtn:{paddingHorizontal:10,paddingVertical:7,borderRadius:20,borderWidth:1.5,borderColor:COLORS.border,backgroundColor:COLORS.cream},
  acceptActive:{borderColor:COLORS.sage,backgroundColor:'rgba(122,158,126,0.15)'},
  acceptText:{fontSize:12,color:COLORS.mid,fontWeight:'600'},
  acceptTextActive:{color:COLORS.sageDark},
  sevRow:{flexDirection:'row',gap:8},
  sevBtn:{flex:1,padding:10,borderWidth:2,borderColor:COLORS.border,borderRadius:10,alignItems:'center'},
  sevText:{fontSize:11,fontWeight:'700',color:COLORS.mid},
  btnPrimary:{backgroundColor:COLORS.sage,borderRadius:14,padding:14,alignItems:'center',marginTop:14},
  btnText:{color:'#fff',fontSize:15,fontWeight:'700'},
  empty:{alignItems:'center',padding:40},
  emptyIcon:{fontSize:48,marginBottom:10},
  emptyText:{fontSize:14,color:COLORS.light},
  logEntry:{backgroundColor:COLORS.white,borderRadius:14,padding:14,marginBottom:8,borderWidth:1,borderColor:COLORS.border,flexDirection:'row',gap:12,alignItems:'flex-start'},
  logDot:{width:10,height:10,borderRadius:5,marginTop:4,flexShrink:0},
  logTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'baseline'},
  logFood:{fontSize:14,fontWeight:'700',color:COLORS.charcoal,flex:1},
  logTime:{fontSize:11,color:COLORS.light},
  logMeal:{fontSize:11,color:COLORS.mid,marginTop:1},
  logNote:{fontSize:12,color:COLORS.mid,marginTop:4,fontStyle:'italic'},
  reactionBadge:{alignSelf:'flex-start',paddingHorizontal:8,paddingVertical:2,borderRadius:20,marginTop:5},
  reactionText:{fontSize:10,fontWeight:'700'},
  delBtn:{padding:4},
  delText:{fontSize:16,color:COLORS.light},
});
