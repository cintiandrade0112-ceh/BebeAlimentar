import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, RECIPES } from '../data';

export default function RecipesScreen() {
  const [open, setOpen] = useState(null);
  return (
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
      <Text style={s.sectionTitle}>👨‍🍳 Receitas e Sugestões</Text>
      <Text style={s.subtitle}>Toque numa receita para ver o modo de preparo.</Text>
      {RECIPES.map((r,i) => (
        <TouchableOpacity key={i} style={s.card} onPress={()=>setOpen(open===i?null:i)} activeOpacity={0.8}>
          <View style={s.header}>
            <Text style={s.emoji}>{r.emoji}</Text>
            <Text style={s.title}>{r.title}</Text>
            <View style={s.timeBadge}><Text style={s.timeBadgeText}>⏱ {r.time}</Text></View>
            <Text style={s.chevron}>{open===i?'▲':'▼'}</Text>
          </View>
          {open===i && (
            <View style={s.body}>
              <Text style={s.secLabel}>PARA QUANDO</Text>
              <Text style={s.bodyText}>{r.meal}</Text>
              <Text style={s.secLabel}>INGREDIENTES</Text>
              {r.ingredients.map((ing,j)=>(
                <Text key={j} style={s.ingredient}>• {ing}</Text>
              ))}
              <Text style={s.secLabel}>MODO DE PREPARO</Text>
              {r.steps.map((step,j)=>(
                <View key={j} style={s.stepRow}>
                  <View style={s.stepNum}><Text style={s.stepNumText}>{j+1}</Text></View>
                  <Text style={s.stepText}>{step}</Text>
                </View>
              ))}
              <View style={s.tip}>
                <Text style={s.tipText}>💡 {r.tip}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
      <View style={{height:20}} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:{flex:1,backgroundColor:COLORS.cream,padding:16},
  sectionTitle:{fontSize:18,fontWeight:'700',color:COLORS.charcoal,marginBottom:6},
  subtitle:{fontSize:13,color:COLORS.mid,marginBottom:16,lineHeight:18},
  card:{backgroundColor:COLORS.white,borderRadius:16,marginBottom:10,borderWidth:1,borderColor:COLORS.border,overflow:'hidden'},
  header:{flexDirection:'row',alignItems:'center',padding:16,gap:10},
  emoji:{fontSize:28},
  title:{flex:1,fontSize:14,fontWeight:'700',color:COLORS.charcoal},
  timeBadge:{backgroundColor:'rgba(212,168,83,0.18)',paddingHorizontal:8,paddingVertical:3,borderRadius:20},
  timeBadgeText:{fontSize:10,color:'#7a5a10',fontWeight:'700'},
  chevron:{fontSize:12,color:COLORS.light},
  body:{padding:16,paddingTop:0,borderTopWidth:1,borderTopColor:COLORS.border},
  secLabel:{fontSize:10,fontWeight:'700',color:COLORS.light,letterSpacing:1,marginTop:12,marginBottom:6},
  bodyText:{fontSize:13,color:COLORS.mid},
  ingredient:{fontSize:13,color:COLORS.mid,lineHeight:22},
  stepRow:{flexDirection:'row',gap:10,marginBottom:8,alignItems:'flex-start'},
  stepNum:{width:22,height:22,borderRadius:11,backgroundColor:COLORS.sage,alignItems:'center',justifyContent:'center',marginTop:1,flexShrink:0},
  stepNumText:{color:'#fff',fontSize:11,fontWeight:'700'},
  stepText:{flex:1,fontSize:13,color:COLORS.mid,lineHeight:18},
  tip:{backgroundColor:'rgba(212,168,83,0.12)',borderLeftWidth:3,borderLeftColor:COLORS.golden,padding:10,borderRadius:6,marginTop:10},
  tipText:{fontSize:12,color:COLORS.mid,lineHeight:17},
});
