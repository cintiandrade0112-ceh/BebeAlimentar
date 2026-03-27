import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../../App';
import { COLORS, FOODS_DB } from '../data';

export default function FoodsScreen() {
  const { state, setState } = useContext(AppContext);

  function toggle(name) {
    setState(prev => {
      const idx = prev.introduced.indexOf(name);
      const introduced = idx>=0 ? prev.introduced.filter(n=>n!==name) : [...prev.introduced, name];
      return {...prev, introduced};
    });
  }

  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <Text style={s.sectionTitle}>✅ Alimentos Introduzidos</Text>
      <Text style={s.subtitle}>Toque para marcar. Aguarde 3 dias entre alimentos novos.</Text>
      <View style={s.countBadge}>
        <Text style={s.countText}>{state.introduced.length} alimentos introduzidos</Text>
      </View>
      {FOODS_DB.map((cat,ci) => (
        <View key={ci}>
          <Text style={s.catTitle}>{cat.cat}</Text>
          <View style={s.grid}>
            {cat.items.map((f,fi) => {
              const done = state.introduced.includes(f.n);
              return (
                <TouchableOpacity key={fi} style={[s.foodItem, done && s.foodDone]} onPress={()=>toggle(f.n)} activeOpacity={0.7}>
                  <Text style={s.foodEmoji}>{f.e}</Text>
                  <Text style={s.foodName}>{f.n}</Text>
                  {done && <Text style={s.foodCheck}>✅</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
      <View style={{height:20}} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:{flex:1,backgroundColor:COLORS.cream,padding:16},
  sectionTitle:{fontSize:18,fontWeight:'700',color:COLORS.charcoal,marginBottom:6},
  subtitle:{fontSize:13,color:COLORS.mid,marginBottom:12,lineHeight:18},
  countBadge:{backgroundColor:COLORS.sage,alignSelf:'flex-start',paddingHorizontal:14,paddingVertical:6,borderRadius:20,marginBottom:16},
  countText:{color:'#fff',fontSize:13,fontWeight:'700'},
  catTitle:{fontSize:12,fontWeight:'700',color:COLORS.light,letterSpacing:1,marginTop:16,marginBottom:8},
  grid:{flexDirection:'row',flexWrap:'wrap',gap:10},
  foodItem:{backgroundColor:COLORS.white,borderRadius:14,padding:14,borderWidth:2,borderColor:COLORS.border,flexDirection:'row',alignItems:'center',gap:8,width:'47%'},
  foodDone:{borderColor:COLORS.sage,backgroundColor:'rgba(122,158,126,0.08)'},
  foodEmoji:{fontSize:22},
  foodName:{fontSize:12,fontWeight:'600',flex:1,color:COLORS.charcoal},
  foodCheck:{fontSize:14},
});
