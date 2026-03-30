import { registerRootComponent } from 'expo';
import App from './App';
registerRootComponent(App);


export const COLORS = {
  cream: '#FDF6ED',
  white: '#FEFCF8',
  sage: '#7A9E7E',
  sageDark: '#4A7050',
  terra: '#C8714A',
  terraLight: '#F0C4AA',
  golden: '#D4A853',
  plum: '#9B6E7E',
  blue: '#5B8DB8',
  charcoal: '#2E2A26',
  mid: '#6B5744',
  light: '#A89880',
  border: 'rgba(0,0,0,0.07)',
};

export const SCHEDULE = [
  { time:'07:00', name:'Leite Materno/Fórmula', icon:'🍼', color:COLORS.sage, desc:'Amamentação ao acordar. Antes dos sólidos.', ideas:['Leite materno','Fórmula infantil'] },
  { time:'09:00', name:'Fruta da Manhã', icon:'🍌', color:COLORS.golden, desc:'1 fruta amassada com garfo. Não peneire. Introduza 1 por vez.', ideas:['Banana','Mamão','Pera cozida','Maçã cozida','Abacate'] },
  { time:'11:00', name:'Leite Materno/Fórmula', icon:'🍼', color:COLORS.sage, desc:'Entre a fruta e o almoço.', ideas:['Leite materno','Fórmula infantil'] },
  { time:'12:00', name:'Almoço (Papa Salgada)', icon:'🥦', color:COLORS.terra, desc:'Carboidrato + proteína + legume + azeite. Sem sal.', ideas:['Arroz+feijão','Frango desfiado','Batata-doce','Abóbora','Cenoura'] },
  { time:'14:00', name:'Leite Materno/Fórmula', icon:'🍼', color:COLORS.sage, desc:'Após a soneca da tarde.', ideas:['Leite materno','Fórmula infantil'] },
  { time:'15:30', name:'Lanche da Tarde', icon:'🍊', color:COLORS.plum, desc:'Segunda fruta ou iogurte natural sem açúcar.', ideas:['Manga','Melão','Beterraba cozida','Iogurte natural'] },
  { time:'18:00', name:'Jantar (Papa Salgada)', icon:'🥕', color:COLORS.blue, desc:'Mais leve que o almoço. Evite alimentos muito fibrosos.', ideas:['Batata+chuchu','Inhame+legumes','Mandioca+brócolis'] },
  { time:'20:00', name:'Leite Materno/Fórmula', icon:'🍼', color:COLORS.sage, desc:'Mamada antes de dormir.', ideas:['Leite materno','Fórmula infantil'] },
];

export const RECIPES = [
  {
    emoji:'🥕', title:'Papa de Batata-Doce com Frango', meal:'Almoço / Jantar', time:'15 min',
    ingredients:['1 batata-doce pequena','2 col. de frango cozido desfiado','1 fio de azeite','Água para cozinhar'],
    steps:['Cozinhe a batata-doce sem sal até ficar bem mole (~12 min).','Desfie o frango cozido bem fino, sem tempero.','Amasse a batata com garfo — textura granulosa.','Misture o frango à batata amassada.','Finalize com um fio de azeite extravirgem.'],
    tip:'Batata-doce é rica em betacaroteno. O frango fornece proteína de alta qualidade.'
  },
  {
    emoji:'🍌', title:'Banana com Abacate', meal:'Fruta da manhã / Lanche', time:'5 min',
    ingredients:['½ banana madura','¼ de abacate maduro'],
    steps:['Amasse a banana com garfo.','Amasse o abacate separadamente.','Misture as duas frutas.','Sirva imediatamente — o abacate oxida rápido.'],
    tip:'Rica em gorduras boas e potássio. Ótima para os primeiros dias.'
  },
  {
    emoji:'🎃', title:'Papa de Abóbora com Arroz e Feijão', meal:'Almoço', time:'20 min',
    ingredients:['2 col. de arroz cozido','1 col. de feijão cozido','3 col. de abóbora cozida','1 fio de azeite'],
    steps:['Cozinhe a abóbora sem sal até ficar mole.','Amasse a abóbora com garfo.','Amasse o feijão separadamente.','Misture arroz, feijão e abóbora.','Adicione azeite e misture.'],
    tip:'O trio arroz+feijão forma proteína completa. A abóbora tem sabor doce natural.'
  },
  {
    emoji:'🥚', title:'Ovo Mexido Mole', meal:'Almoço / Jantar', time:'5 min',
    ingredients:['1 ovo inteiro (gema e clara)','1 col. chá de azeite'],
    steps:['Aqueça frigideira em fogo baixo com azeite.','Quebre o ovo e mexa com garfo.','Cozinhe até a clara estar completamente firme.','Deixe esfriar e amasse ou sirva em pedaços macios.'],
    tip:'Introduza o ovo inteiro de uma vez. Aguarde 3 dias observando reações alérgicas.'
  },
  {
    emoji:'🐟', title:'Papa de Peixe com Batata', meal:'Almoço', time:'20 min',
    ingredients:['2 col. de filé de tilápia','1 batata média','1 cenoura pequena','1 fio de azeite'],
    steps:['Cozinhe o peixe em água sem sal 10 min. Verifique espinhas.','Cozinhe batata e cenoura até ficarem macias.','Desfie o peixe retirando espinhas.','Amasse batata e cenoura com garfo.','Misture tudo e finalize com azeite.'],
    tip:'Peixes de água doce (tilápia, pescada) são menos alergênicos que frutos do mar.'
  },
  {
    emoji:'🫘', title:'Purê de Lentilha com Cenoura', meal:'Almoço / Jantar', time:'25 min',
    ingredients:['3 col. de lentilha vermelha','1 cenoura pequena','1 fio de azeite','Água suficiente'],
    steps:['Lave as lentilhas e cozinhe com cenoura sem sal por 20 min.','Escorra o excesso de água.','Amasse tudo com garfo até textura homogênea.','Finalize com azeite.'],
    tip:'Lentilha vermelha é a mais fácil de digerir. Rica em ferro — essencial nessa fase.'
  },
];

export const FOODS_DB = [
  { cat:'🍌 Frutas', items:[{e:'🍌',n:'Banana'},{e:'🥭',n:'Mamão'},{e:'🍐',n:'Pera cozida'},{e:'🍎',n:'Maçã cozida'},{e:'🥑',n:'Abacate'},{e:'🍊',n:'Manga'},{e:'🍈',n:'Melão'},{e:'🍇',n:'Uva s/ semente'}]},
  { cat:'🥦 Legumes', items:[{e:'🥕',n:'Cenoura'},{e:'🎃',n:'Abóbora'},{e:'🥔',n:'Batata'},{e:'🍠',n:'Batata-doce'},{e:'🫑',n:'Abobrinha'},{e:'🥦',n:'Brócolis'},{e:'🫚',n:'Chuchu'},{e:'🟣',n:'Beterraba'}]},
  { cat:'🍗 Proteínas', items:[{e:'🐔',n:'Frango'},{e:'🐄',n:'Carne bovina'},{e:'🐟',n:'Peixe'},{e:'🥚',n:'Ovo (gema)'},{e:'🥚',n:'Ovo (clara)'},{e:'🫘',n:'Feijão'},{e:'🟤',n:'Lentilha'},{e:'🟢',n:'Ervilha'}]},
  { cat:'🍚 Cereais', items:[{e:'🍚',n:'Arroz'},{e:'🌽',n:'Milho cozido'},{e:'🍞',n:'Macarrão'},{e:'🫓',n:'Aveia'}]},
  { cat:'🥛 Laticínios', items:[{e:'🥛',n:'Iogurte natural'},{e:'🧀',n:'Ricota'}]},
];

export const NOTIF_SCHEDULE = [
  { id:'n07', time:{hour:7,minute:0}, label:'🍼 Leite - Acordar', body:'Hora do leite materno ou fórmula!' },
  { id:'n09', time:{hour:9,minute:0}, label:'🍌 Fruta da Manhã', body:'Hora da fruta amassada!' },
  { id:'n12', time:{hour:12,minute:0}, label:'🥦 Almoço', body:'Hora da papa salgada do almoço!' },
  { id:'n15', time:{hour:15,minute:30}, label:'🍊 Lanche da Tarde', body:'Hora do lanche!' },
  { id:'n18', time:{hour:18,minute:0}, label:'🥕 Jantar', body:'Hora da papa salgada do jantar!' },
  { id:'n20', time:{hour:20,minute:0}, label:'🍼 Leite - Dormir', body:'Hora da mamada antes de dormir!' },
];
