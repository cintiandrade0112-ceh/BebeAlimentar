# Bebê Alimentar — App React Native

## Instalação no PC (passo a passo)

### 1. Instalar dependências
```
Node.js: https://nodejs.org (baixe a versão LTS)
```

### 2. Instalar Expo CLI
```bash
npm install -g @expo/cli eas-cli
```

### 3. Criar conta gratuita no Expo
```
https://expo.dev — crie uma conta gratuita
```

### 4. Extrair e instalar o projeto
```bash
# Extraia o ZIP numa pasta
cd BebeAlimentar
npm install
```

### 5. Testar no celular (sem compilar)
```bash
npx expo start
# Instale o app "Expo Go" no celular
# Escaneie o QR code que aparecer
```

### 6. Gerar APK (para instalar sem Expo Go)
```bash
eas login          # faça login com sua conta Expo
eas build --platform android --profile preview
# Aguarde 5-10 minutos
# Baixe o APK gerado e instale no celular
```

## Estrutura do projeto
```
BebeAlimentar/
├── App.js                    # App principal + navegação
├── src/
│   ├── data/
│   │   ├── index.js          # Dados: cronograma, receitas, alimentos
│   │   └── storage.js        # AsyncStorage (dados locais)
│   └── screens/
│       ├── HomeScreen.js     # Tela inicial
│       ├── LogScreen.js      # Registrar refeições
│       ├── RecipesScreen.js  # Receitas
│       ├── FoodsScreen.js    # Alimentos introduzidos
│       ├── StatsScreen.js    # Gráficos + diário
│       └── ConfigScreen.js   # Notificações + config
├── app.json                  # Config Expo
├── eas.json                  # Config build APK
└── package.json
```

## Funcionalidades
- Cronograma diário com 8 refeições
- Contador de dias desde o início
- Registrar o que o bebê comeu (com aceitação e reação)
- 6 receitas completas com modo de preparo
- Lista de 40+ alimentos para marcar como introduzido
- Gráficos de aceitação, frequência e reações
- Diário de reações/alergias
- Notificações diárias nos horários das refeições
- Dados salvos localmente no celular
