/* =========================================================================
   NUTRIAPP — aplicativo funcional para nutricionistas
   Vanilla JS, persistência via window.storage, PDF via jsPDF, assinatura via signature_pad
   ========================================================================= */

/* ---------------------- BANCO DE ALIMENTOS (ref. TACO, por 100g) ---------------------- */
const FOODS_BASE = [
  {id:"f01",nome:"Arroz branco cozido",grupo:"Cereais",kcal:128,prot:2.5,carb:28.1,gord:0.2},
  {id:"f02",nome:"Arroz integral cozido",grupo:"Cereais",kcal:124,prot:2.6,carb:25.8,gord:1.0},
  {id:"f03",nome:"Feijão carioca cozido",grupo:"Leguminosas",kcal:76,prot:4.8,carb:13.6,gord:0.5},
  {id:"f04",nome:"Feijão preto cozido",grupo:"Leguminosas",kcal:77,prot:4.5,carb:14.0,gord:0.5},
  {id:"f05",nome:"Lentilha cozida",grupo:"Leguminosas",kcal:93,prot:6.3,carb:16.3,gord:0.5},
  {id:"f06",nome:"Grão-de-bico cozido",grupo:"Leguminosas",kcal:121,prot:6.7,carb:19.8,gord:2.1},
  {id:"f07",nome:"Peito de frango grelhado",grupo:"Carnes",kcal:159,prot:32.0,carb:0,gord:2.5},
  {id:"f08",nome:"Frango desfiado cozido",grupo:"Carnes",kcal:163,prot:29.8,carb:0,gord:4.0},
  {id:"f09",nome:"Patinho moído cozido",grupo:"Carnes",kcal:180,prot:26.0,carb:0,gord:8.0},
  {id:"f10",nome:"Carne bovina grelhada (alcatra)",grupo:"Carnes",kcal:196,prot:31.0,carb:0,gord:7.0},
  {id:"f11",nome:"Ovo cozido",grupo:"Ovos",kcal:146,prot:13.3,carb:0.6,gord:9.5},
  {id:"f12",nome:"Clara de ovo cozida",grupo:"Ovos",kcal:52,prot:11.0,carb:0.7,gord:0.2},
  {id:"f13",nome:"Tilápia grelhada",grupo:"Peixes",kcal:128,prot:26.1,carb:0,gord:2.5},
  {id:"f14",nome:"Salmão grelhado",grupo:"Peixes",kcal:208,prot:22.1,carb:0,gord:13.0},
  {id:"f15",nome:"Atum em água (lata)",grupo:"Peixes",kcal:116,prot:25.5,carb:0,gord:1.0},
  {id:"f16",nome:"Batata-doce cozida",grupo:"Tubérculos",kcal:77,prot:0.6,carb:18.4,gord:0.1},
  {id:"f17",nome:"Batata inglesa cozida",grupo:"Tubérculos",kcal:52,prot:1.2,carb:11.9,gord:0.1},
  {id:"f18",nome:"Mandioca cozida",grupo:"Tubérculos",kcal:125,prot:0.6,carb:30.1,gord:0.3},
  {id:"f19",nome:"Aveia em flocos",grupo:"Cereais",kcal:394,prot:13.9,carb:67.0,gord:8.5},
  {id:"f20",nome:"Pão francês",grupo:"Cereais",kcal:300,prot:8.0,carb:58.6,gord:3.1},
  {id:"f21",nome:"Pão integral",grupo:"Cereais",kcal:253,prot:9.4,carb:49.9,gord:3.5},
  {id:"f22",nome:"Tapioca (goma)",grupo:"Cereais",kcal:240,prot:0.2,carb:59.0,gord:0},
  {id:"f23",nome:"Banana prata",grupo:"Frutas",kcal:98,prot:1.3,carb:26.0,gord:0.1},
  {id:"f24",nome:"Maçã com casca",grupo:"Frutas",kcal:56,prot:0.3,carb:15.2,gord:0.1},
  {id:"f25",nome:"Mamão papaia",grupo:"Frutas",kcal:40,prot:0.5,carb:10.4,gord:0.1},
  {id:"f26",nome:"Morango",grupo:"Frutas",kcal:30,prot:0.9,carb:6.8,gord:0.3},
  {id:"f27",nome:"Abacate",grupo:"Frutas",kcal:96,prot:1.2,carb:6.0,gord:8.4},
  {id:"f28",nome:"Laranja pera",grupo:"Frutas",kcal:37,prot:1.0,carb:8.9,gord:0.1},
  {id:"f29",nome:"Iogurte natural desnatado",grupo:"Laticínios",kcal:41,prot:4.0,carb:5.9,gord:0.2},
  {id:"f30",nome:"Iogurte natural integral",grupo:"Laticínios",kcal:61,prot:3.5,carb:4.7,gord:3.0},
  {id:"f31",nome:"Leite desnatado",grupo:"Laticínios",kcal:35,prot:3.4,carb:4.9,gord:0.2},
  {id:"f32",nome:"Leite integral",grupo:"Laticínios",kcal:61,prot:3.2,carb:4.5,gord:3.3},
  {id:"f33",nome:"Queijo minas frescal",grupo:"Laticínios",kcal:264,prot:17.4,carb:3.2,gord:20.2},
  {id:"f34",nome:"Requeijão light",grupo:"Laticínios",kcal:175,prot:9.9,carb:4.6,gord:13.0},
  {id:"f35",nome:"Whey protein (pó)",grupo:"Suplementos",kcal:376,prot:75.0,carb:8.0,gord:5.0},
  {id:"f36",nome:"Pasta de amendoim integral",grupo:"Gorduras",kcal:588,prot:25.0,carb:20.0,gord:50.0},
  {id:"f37",nome:"Azeite de oliva extra virgem",grupo:"Gorduras",kcal:884,prot:0,carb:0,gord:100},
  {id:"f38",nome:"Castanha-do-pará",grupo:"Oleaginosas",kcal:643,prot:14.5,carb:12.3,gord:63.5},
  {id:"f39",nome:"Amêndoas",grupo:"Oleaginosas",kcal:581,prot:21.2,carb:19.5,gord:49.4},
  {id:"f40",nome:"Brócolis cozido",grupo:"Vegetais",kcal:25,prot:2.1,carb:4.0,gord:0.3},
  {id:"f41",nome:"Alface crespa",grupo:"Vegetais",kcal:11,prot:1.3,carb:1.7,gord:0.2},
  {id:"f42",nome:"Tomate",grupo:"Vegetais",kcal:15,prot:1.1,carb:3.1,gord:0.2},
  {id:"f43",nome:"Cenoura crua",grupo:"Vegetais",kcal:34,prot:1.3,carb:7.7,gord:0.2},
  {id:"f44",nome:"Espinafre cozido",grupo:"Vegetais",kcal:16,prot:2.0,carb:2.4,gord:0.2},
  {id:"f45",nome:"Quinoa cozida",grupo:"Cereais",kcal:120,prot:4.4,carb:21.3,gord:1.9},
  {id:"f46",nome:"Macarrão cozido",grupo:"Cereais",kcal:158,prot:5.8,carb:30.9,gord:1.0},
  {id:"f47",nome:"Granola tradicional",grupo:"Cereais",kcal:471,prot:10.1,carb:64.8,gord:19.4},
  {id:"f48",nome:"Chocolate amargo 70%",grupo:"Doces",kcal:598,prot:7.8,carb:45.9,gord:42.6},
  {id:"f49",nome:"Suco de laranja natural",grupo:"Bebidas",kcal:37,prot:0.7,carb:8.7,gord:0.1},
  {id:"f50",nome:"Tofu",grupo:"Proteína vegetal",kcal:76,prot:8.1,carb:1.9,gord:4.8},
];

/* ---------------------- BANCO IBGE (POF, por 100g) ----------------------
   Valores de referência representativos da Tabela de Composição de Alimentos
   do IBGE (Pesquisa de Orçamentos Familiares). Confira sempre na publicação
   oficial antes de usar em conduta clínica. */
const FOODS_IBGE = [
  {id:"ig01",fonte:"IBGE",nome:"Farinha de mandioca crua",grupo:"Cereais",kcal:361,prot:1.2,carb:87.9,gord:0.3},
  {id:"ig02",fonte:"IBGE",nome:"Cuscuz de milho cozido",grupo:"Cereais",kcal:113,prot:2.2,carb:25.3,gord:0.6},
  {id:"ig03",fonte:"IBGE",nome:"Milho verde cozido",grupo:"Cereais",kcal:98,prot:3.2,carb:20.0,gord:1.0},
  {id:"ig04",fonte:"IBGE",nome:"Pão de forma integral",grupo:"Cereais",kcal:253,prot:9.0,carb:45.0,gord:3.5},
  {id:"ig05",fonte:"IBGE",nome:"Sardinha assada",grupo:"Peixes",kcal:164,prot:24.0,carb:0,gord:7.0},
  {id:"ig06",fonte:"IBGE",nome:"Lombo suíno assado",grupo:"Carnes",kcal:210,prot:30.0,carb:0,gord:10.0},
  {id:"ig07",fonte:"IBGE",nome:"Fígado bovino grelhado",grupo:"Carnes",kcal:225,prot:29.0,carb:3.8,gord:9.0},
  {id:"ig08",fonte:"IBGE",nome:"Manga",grupo:"Frutas",kcal:64,prot:0.4,carb:16.7,gord:0.2},
  {id:"ig09",fonte:"IBGE",nome:"Goiaba vermelha",grupo:"Frutas",kcal:54,prot:1.1,carb:13.0,gord:0.4},
  {id:"ig10",fonte:"IBGE",nome:"Melancia",grupo:"Frutas",kcal:33,prot:0.9,carb:8.1,gord:0.1},
  {id:"ig11",fonte:"IBGE",nome:"Abóbora cozida",grupo:"Vegetais",kcal:48,prot:1.4,carb:10.8,gord:0.1},
  {id:"ig12",fonte:"IBGE",nome:"Chuchu cozido",grupo:"Vegetais",kcal:17,prot:0.4,carb:4.1,gord:0.1},
  {id:"ig13",fonte:"IBGE",nome:"Couve manteiga refogada",grupo:"Vegetais",kcal:90,prot:1.7,carb:8.7,gord:5.9},
  {id:"ig14",fonte:"IBGE",nome:"Beterraba cozida",grupo:"Vegetais",kcal:32,prot:1.3,carb:7.2,gord:0.1},
  {id:"ig15",fonte:"IBGE",nome:"Leite em pó integral",grupo:"Laticínios",kcal:497,prot:25.4,carb:39.2,gord:26.9},
  {id:"ig16",fonte:"IBGE",nome:"Manteiga com sal",grupo:"Gorduras",kcal:726,prot:0.4,carb:0.1,gord:82.0},
  {id:"ig17",fonte:"IBGE",nome:"Farofa pronta",grupo:"Cereais",kcal:405,prot:2.0,carb:75.0,gord:12.0},
  {id:"ig18",fonte:"IBGE",nome:"Açúcar refinado",grupo:"Doces",kcal:387,prot:0,carb:99.5,gord:0},
];

/* ---------------------- BANCO TUCUNDUVA (por 100g) ----------------------
   Valores de referência representativos da tabela de Sônia Tucunduva Philippi.
   Muitas linhas foram convertidas de medida caseira para 100g. Confira na
   obra original antes de usar em conduta clínica. */
const FOODS_TUCUNDUVA = [
  {id:"tc01",fonte:"Tucunduva",nome:"Pão integral de centeio",grupo:"Cereais",kcal:259,prot:8.5,carb:48.3,gord:3.3},
  {id:"tc02",fonte:"Tucunduva",nome:"Biscoito cream cracker",grupo:"Cereais",kcal:432,prot:10.0,carb:68.7,gord:14.4},
  {id:"tc03",fonte:"Tucunduva",nome:"Farelo de aveia",grupo:"Cereais",kcal:246,prot:17.3,carb:66.2,gord:7.0},
  {id:"tc04",fonte:"Tucunduva",nome:"Granola sem açúcar",grupo:"Cereais",kcal:430,prot:11.0,carb:60.0,gord:15.0},
  {id:"tc05",fonte:"Tucunduva",nome:"Queijo cottage",grupo:"Laticínios",kcal:98,prot:11.1,carb:3.4,gord:4.3},
  {id:"tc06",fonte:"Tucunduva",nome:"Ricota",grupo:"Laticínios",kcal:140,prot:11.3,carb:4.5,gord:8.0},
  {id:"tc07",fonte:"Tucunduva",nome:"Peito de peru defumado",grupo:"Carnes",kcal:100,prot:18.0,carb:2.0,gord:2.0},
  {id:"tc08",fonte:"Tucunduva",nome:"Presunto magro",grupo:"Carnes",kcal:120,prot:19.0,carb:1.5,gord:4.0},
  {id:"tc09",fonte:"Tucunduva",nome:"Chia (semente)",grupo:"Oleaginosas",kcal:486,prot:16.5,carb:42.1,gord:30.7},
  {id:"tc10",fonte:"Tucunduva",nome:"Linhaça (semente)",grupo:"Oleaginosas",kcal:495,prot:14.1,carb:28.9,gord:41.0},
  {id:"tc11",fonte:"Tucunduva",nome:"Uva itália",grupo:"Frutas",kcal:53,prot:0.7,carb:13.6,gord:0.2},
  {id:"tc12",fonte:"Tucunduva",nome:"Kiwi",grupo:"Frutas",kcal:51,prot:1.3,carb:11.5,gord:0.6},
  {id:"tc13",fonte:"Tucunduva",nome:"Pera",grupo:"Frutas",kcal:53,prot:0.6,carb:14.0,gord:0.1},
  {id:"tc14",fonte:"Tucunduva",nome:"Ameixa fresca",grupo:"Frutas",kcal:53,prot:0.8,carb:13.9,gord:0.1},
  {id:"tc15",fonte:"Tucunduva",nome:"Vagem cozida",grupo:"Vegetais",kcal:25,prot:1.8,carb:5.3,gord:0.2},
  {id:"tc16",fonte:"Tucunduva",nome:"Berinjela cozida",grupo:"Vegetais",kcal:19,prot:0.7,carb:4.5,gord:0.1},
  {id:"tc17",fonte:"Tucunduva",nome:"Abobrinha cozida",grupo:"Vegetais",kcal:15,prot:1.1,carb:3.0,gord:0.2},
  {id:"tc18",fonte:"Tucunduva",nome:"Pepino cru",grupo:"Vegetais",kcal:10,prot:0.9,carb:2.0,gord:0.1},
];

/* ---------------------- TEMPLATES PRONTOS ---------------------- */
function defaultTemplates(){
  return [
    {
      id:"t01", nome:"Low Carb 1800kcal", kcalAlvo:1800,
      refeicoes:[
        {nome:"Café da manhã", itens:[
          {alimentoId:"f11", qtd:100}, {alimentoId:"f27", qtd:50}, {alimentoId:"f30", qtd:120}
        ]},
        {nome:"Almoço", itens:[
          {alimentoId:"f07", qtd:150}, {alimentoId:"f40", qtd:100}, {alimentoId:"f41", qtd:50}
        ]},
        {nome:"Lanche", itens:[
          {alimentoId:"f39", qtd:30}, {alimentoId:"f24", qtd:100}
        ]},
        {nome:"Jantar", itens:[
          {alimentoId:"f13", qtd:150}, {alimentoId:"f44", qtd:100}, {alimentoId:"f42", qtd:80}
        ]},
      ],
    },
    {
      id:"t02", nome:"Hipertrofia Limpa 2500kcal", kcalAlvo:2500,
      refeicoes:[
        {nome:"Café da manhã", itens:[
          {alimentoId:"f19", qtd:80}, {alimentoId:"f32", qtd:250}, {alimentoId:"f23", qtd:100}
        ]},
        {nome:"Almoço", itens:[
          {alimentoId:"f01", qtd:200}, {alimentoId:"f10", qtd:180}, {alimentoId:"f03", qtd:100}, {alimentoId:"f40", qtd:100}
        ]},
        {nome:"Lanche", itens:[
          {alimentoId:"f35", qtd:30}, {alimentoId:"f36", qtd:20}, {alimentoId:"f20", qtd:50}
        ]},
        {nome:"Jantar", itens:[
          {alimentoId:"f16", qtd:200}, {alimentoId:"f09", qtd:180}, {alimentoId:"f43", qtd:80}
        ]},
      ],
    },
    {
      id:"t03", nome:"Cetogênica", kcalAlvo:1700,
      refeicoes:[
        {nome:"Café da manhã", itens:[
          {alimentoId:"f11", qtd:150}, {alimentoId:"f33", qtd:60}, {alimentoId:"f37", qtd:10}
        ]},
        {nome:"Almoço", itens:[
          {alimentoId:"f10", qtd:180}, {alimentoId:"f44", qtd:100}, {alimentoId:"f37", qtd:15}
        ]},
        {nome:"Lanche", itens:[
          {alimentoId:"f38", qtd:30}, {alimentoId:"f27", qtd:80}
        ]},
        {nome:"Jantar", itens:[
          {alimentoId:"f14", qtd:180}, {alimentoId:"f40", qtd:100}, {alimentoId:"f37", qtd:10}
        ]},
      ],
    },
  ];
}

/* ---------------------- DIETAS PRONTAS PARA DIABETES ----------------------
   Planos de partida com carboidratos de baixo índice glicêmico distribuídos ao
   longo do dia. São modelos — individualize conforme cada paciente. */
const DIABETES_DIETS = [
  {
    id:"dm01", nome:"Diabetes Tipo 2 · Controle Glicêmico", kcalAlvo:1500, tag:"Tipo 2",
    descricao:"Carboidratos de baixo IG distribuídos entre as refeições, ricos em fibras. Integrais, leguminosas e vegetais não amiláceos.",
    notas:[
      "Evitar açúcares livres e sucos — preferir a fruta inteira, com casca quando possível.",
      "Distribuir os carboidratos entre as refeições para reduzir picos glicêmicos.",
      "Combinar carboidrato com proteína/gordura boa diminui a resposta glicêmica.",
    ],
    refeicoes:[
      {nome:"Café da manhã", itens:[{alimentoId:"f19",qtd:50},{alimentoId:"f31",qtd:200},{alimentoId:"f26",qtd:100},{alimentoId:"tc09",qtd:15}]},
      {nome:"Almoço", itens:[{alimentoId:"f02",qtd:150},{alimentoId:"f04",qtd:100},{alimentoId:"f07",qtd:150},{alimentoId:"f40",qtd:100},{alimentoId:"f41",qtd:40},{alimentoId:"f42",qtd:60},{alimentoId:"f37",qtd:6}]},
      {nome:"Lanche da tarde", itens:[{alimentoId:"f29",qtd:170},{alimentoId:"f39",qtd:20},{alimentoId:"f24",qtd:100}]},
      {nome:"Jantar", itens:[{alimentoId:"f13",qtd:140},{alimentoId:"f16",qtd:130},{alimentoId:"f44",qtd:100},{alimentoId:"f37",qtd:6}]},
    ],
  },
  {
    id:"dm02", nome:"Diabetes Tipo 2 · 1800 kcal", kcalAlvo:1800, tag:"Tipo 2",
    descricao:"Versão com maior aporte energético e 5 refeições, mantendo baixo IG e boa saciedade.",
    notas:[
      "Fracionar em 5 refeições ajuda a estabilizar a glicemia ao longo do dia.",
      "Vegetais não amiláceos à vontade no almoço e jantar.",
      "Ajustar a porção de carboidrato conforme a glicemia capilar do paciente.",
    ],
    refeicoes:[
      {nome:"Café da manhã", itens:[{alimentoId:"f21",qtd:60},{alimentoId:"tc05",qtd:70},{alimentoId:"f24",qtd:130},{alimentoId:"f11",qtd:50}]},
      {nome:"Colação", itens:[{alimentoId:"f29",qtd:170},{alimentoId:"f23",qtd:80}]},
      {nome:"Almoço", itens:[{alimentoId:"f02",qtd:150},{alimentoId:"f05",qtd:100},{alimentoId:"f07",qtd:180},{alimentoId:"f40",qtd:100},{alimentoId:"f43",qtd:50},{alimentoId:"f37",qtd:8}]},
      {nome:"Lanche da tarde", itens:[{alimentoId:"tc12",qtd:120},{alimentoId:"f39",qtd:25}]},
      {nome:"Jantar", itens:[{alimentoId:"f13",qtd:180},{alimentoId:"f16",qtd:180},{alimentoId:"tc16",qtd:120},{alimentoId:"f37",qtd:8}]},
    ],
  },
  {
    id:"dm03", nome:"Diabetes + Emagrecimento · Baixo Carbo", kcalAlvo:1400, tag:"Emagrecimento",
    descricao:"Carboidrato reduzido, proteína e gordura boa em destaque para saciedade e controle glicêmico com déficit calórico.",
    notas:[
      "Indicada quando há sobrepeso/obesidade associados ao diabetes.",
      "Monitorar glicemia se o paciente usa insulina ou sulfonilureia (risco de hipoglicemia).",
      "Priorizar vegetais folhosos e gorduras boas (azeite, abacate, oleaginosas).",
    ],
    refeicoes:[
      {nome:"Café da manhã", itens:[{alimentoId:"f11",qtd:120},{alimentoId:"tc06",qtd:50},{alimentoId:"f27",qtd:40},{alimentoId:"f42",qtd:50}]},
      {nome:"Almoço", itens:[{alimentoId:"f07",qtd:160},{alimentoId:"f40",qtd:120},{alimentoId:"f41",qtd:40},{alimentoId:"f42",qtd:60},{alimentoId:"f27",qtd:50},{alimentoId:"f37",qtd:7}]},
      {nome:"Lanche da tarde", itens:[{alimentoId:"f29",qtd:170},{alimentoId:"tc09",qtd:15},{alimentoId:"f39",qtd:20}]},
      {nome:"Jantar", itens:[{alimentoId:"f14",qtd:150},{alimentoId:"tc17",qtd:120},{alimentoId:"f44",qtd:80},{alimentoId:"f37",qtd:7}]},
    ],
  },
  {
    id:"dm04", nome:"Pré-diabetes · Baixo Índice Glicêmico", kcalAlvo:1600, tag:"Pré-diabetes",
    descricao:"Foco em prevenção: integrais, leguminosas, sementes e frutas de baixo IG para melhorar a sensibilidade à insulina.",
    notas:[
      "Aumentar fibra solúvel (aveia, chia, linhaça, leguminosas) melhora a glicemia.",
      "Atividade física regular potencializa o efeito da dieta.",
      "Reduzir ultraprocessados e bebidas açucaradas é prioridade.",
    ],
    refeicoes:[
      {nome:"Café da manhã", itens:[{alimentoId:"f19",qtd:50},{alimentoId:"f31",qtd:200},{alimentoId:"tc10",qtd:15},{alimentoId:"f23",qtd:80}]},
      {nome:"Almoço", itens:[{alimentoId:"f45",qtd:150},{alimentoId:"f06",qtd:100},{alimentoId:"f07",qtd:150},{alimentoId:"f40",qtd:100},{alimentoId:"f42",qtd:50},{alimentoId:"f37",qtd:7}]},
      {nome:"Lanche da tarde", itens:[{alimentoId:"f24",qtd:170},{alimentoId:"tc07",qtd:40}]},
      {nome:"Jantar", itens:[{alimentoId:"f13",qtd:160},{alimentoId:"f02",qtd:100},{alimentoId:"tc15",qtd:120},{alimentoId:"f37",qtd:6}]},
    ],
  },
];

/* ---------------------- ESTADO GLOBAL ---------------------- */
let DATA = {
  perfil:{ nome:"", crn:"", clinica:"" },
  assinatura:null,
  pacientes:[],
  templates:null,
  foodsCustom:[],
};
let STATE = { view:"dashboard", patientId:null, dietDraft:null, templateDraft:null, builderMode:"diet", editingPatient:null, search:"", templateChoiceMode:false };
function activeDraft(){ return STATE.builderMode==="template" ? STATE.templateDraft : STATE.dietDraft; }
let sigPad = null;

/* Fibra alimentar (g por 100g) — camada complementar por id, para não reescrever
   cada alimento. Valores de referência; ajuste conforme a tabela oficial. */
const FIBRA_MAP = {
  f01:1.6,f02:2.7,f03:8.5,f04:8.4,f05:7.9,f06:7.6,f07:0,f08:0,f09:0,f10:0,
  f11:0,f12:0,f13:0,f14:0,f15:0,f16:2.2,f17:1.3,f18:1.6,f19:9.1,f20:2.3,
  f21:6.9,f22:0.6,f23:2.0,f24:1.3,f25:1.0,f26:1.7,f27:6.3,f28:1.8,f29:0,f30:0,
  f31:0,f32:0,f33:0,f34:0,f35:0,f36:8.0,f37:0,f38:7.9,f39:12.5,f40:3.4,
  f41:1.7,f42:1.2,f43:3.2,f44:2.5,f45:2.8,f46:1.8,f47:5.5,f48:10.9,f49:0.2,f50:1.0,
  ig01:6.4,ig02:1.9,ig03:3.9,ig04:6.5,ig05:0,ig06:0,ig07:0,ig08:1.6,ig09:6.2,ig10:0.5,
  ig11:2.5,ig12:1.0,ig13:3.1,ig14:1.9,ig15:0,ig16:0,ig17:5.0,ig18:0,
  tc01:6.5,tc02:2.5,tc03:15.4,tc04:8.0,tc05:0,tc06:0,tc07:0,tc08:0,tc09:34.4,tc10:27.3,
  tc11:0.9,tc12:3.0,tc13:3.1,tc14:1.9,tc15:3.4,tc16:2.5,tc17:1.4,tc18:0.5,
};
function normFood(f, defFonte){
  return Object.assign({ fonte:defFonte, fibra: (FIBRA_MAP[f.id]!=null?FIBRA_MAP[f.id]:0) }, f);
}
function allFoods(){
  const taco = FOODS_BASE.map(f=>normFood(f,"TACO"));
  const ibge = FOODS_IBGE.map(f=>normFood(f,"IBGE"));
  const tuc  = FOODS_TUCUNDUVA.map(f=>normFood(f,"Tucunduva"));
  const custom = DATA.foodsCustom.map(f=>normFood(f,"Personalizado"));
  return taco.concat(ibge, tuc, custom);
}
function foodById(id){ return allFoods().find(f=>f.id===id); }

/* ---------------------- PERSISTÊNCIA ----------------------
   Usa window.storage (ambiente de artifact) quando existir; caso contrário,
   cai para localStorage — que funciona no GitHub Pages e no WebView do APK. */
const STORAGE_KEY = "nutriapp:data";
const store = {
  async get(key){
    if(typeof window!=="undefined" && window.storage && window.storage.get){
      try{ return await window.storage.get(key, false); }catch(e){}
    }
    try{ const v = localStorage.getItem(key); return v!=null ? {value:v} : null; }catch(e){ return null; }
  },
  async set(key, value){
    let ok=false;
    if(typeof window!=="undefined" && window.storage && window.storage.set){
      try{ await window.storage.set(key, value, false); ok=true; }catch(e){}
    }
    try{ localStorage.setItem(key, value); ok=true; }catch(e){ if(!ok) console.error("Falha ao salvar", e); }
    return ok;
  }
};
async function loadData(){
  try{
    const res = await store.get(STORAGE_KEY);
    if(res && res.value){
      const parsed = JSON.parse(res.value);
      DATA = Object.assign(DATA, parsed);
    }
  }catch(e){ /* chave ainda não existe — primeira execução */ }
  if(!DATA.templates){ DATA.templates = defaultTemplates(); }
  if(!DATA.pacientes){ DATA.pacientes = []; }
  if(!DATA.foodsCustom){ DATA.foodsCustom = []; }
}
async function saveData(){
  try{
    await store.set(STORAGE_KEY, JSON.stringify(DATA));
  }catch(e){ console.error("Falha ao salvar", e); }
}

/* ---------------------- CÁLCULOS ---------------------- */
function calcIMC(peso, alturaCm){
  const a = alturaCm/100;
  if(!peso || !a) return null;
  return peso/(a*a);
}
function classifyIMC(imc){
  if(imc==null) return "";
  if(imc<18.5) return "Abaixo do peso";
  if(imc<25) return "Peso adequado";
  if(imc<30) return "Sobrepeso";
  if(imc<35) return "Obesidade grau I";
  if(imc<40) return "Obesidade grau II";
  return "Obesidade grau III";
}
function calcTMB(sexo, peso, alturaCm, idade){
  if(!peso||!alturaCm||!idade) return null;
  const base = 10*peso + 6.25*alturaCm - 5*idade;
  return sexo==="F" ? base-161 : base+5;
}
const FATORES_ATIVIDADE = {
  sedentario:{label:"Sedentário", fator:1.2},
  leve:{label:"Leve (1-3x/sem)", fator:1.375},
  moderado:{label:"Moderado (3-5x/sem)", fator:1.55},
  intenso:{label:"Intenso (6-7x/sem)", fator:1.725},
  atleta:{label:"Atleta", fator:1.9},
};
function calcGET(tmb, nivel){
  if(tmb==null) return null;
  const f = FATORES_ATIVIDADE[nivel]||FATORES_ATIVIDADE.sedentario;
  return tmb*f.fator;
}

function macroTotals(refeicoes){
  let kcal=0, prot=0, carb=0, gord=0, fibra=0;
  refeicoes.forEach(r=>{
    r.itens.forEach(it=>{
      kcal+=it.kcal; prot+=it.prot; carb+=it.carb; gord+=it.gord; fibra+=(it.fibra||0);
    });
  });
  return {kcal,prot,carb,gord,fibra};
}
function computeItem(alimentoId, qtd){
  const f = foodById(alimentoId);
  if(!f) return null;
  const factor = qtd/100;
  return {
    alimentoId, nome:f.nome, qtd,
    kcal: Math.round(f.kcal*factor*10)/10,
    prot: Math.round(f.prot*factor*10)/10,
    carb: Math.round(f.carb*factor*10)/10,
    gord: Math.round(f.gord*factor*10)/10,
    fibra: Math.round((f.fibra||0)*factor*10)/10,
  };
}

/* ---------------------- UTIL ---------------------- */
function uid(){ return 'id-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8); }
function esc(s){ return (s||"").toString().replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fmt1(n){ return (Math.round(n*10)/10).toFixed(1).replace(/\.0$/,''); }
function initials(name){
  const parts=(name||"?").trim().split(/\s+/);
  return ((parts[0]?.[0]||"")+(parts[1]?.[0]||"")).toUpperCase();
}
function toast(msg){
  const el = document.createElement('div');
  el.className='toast'; el.textContent=msg;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 2600);
}
function closeModal(){
  const m = document.querySelector('.modal-overlay');
  if(m) m.remove();
}

/* ---------------------- RENDER ROOT ---------------------- */
function render(){
  const app = document.getElementById('app');
  app.innerHTML = renderView();
  attachGlobalHandlers();
}
function attachGlobalHandlers(){
  // nada global obrigatório: usamos onclick inline com window.fn
}

function renderView(){
  let topbar = renderTopbar();
  let body = "";
  switch(STATE.view){
    case "dashboard": body = viewDashboard(); break;
    case "patientForm": body = viewPatientForm(); break;
    case "patientDetail": body = viewPatientDetail(); break;
    case "dietChoice": body = viewDietChoice(); break;
    case "dietBuilder": body = viewDietBuilder(); break;
    case "foodDb": body = viewFoodDb(); break;
    case "diabetes": body = viewDiabetes(); break;
    case "templates": body = viewTemplates(); break;
    case "profile": body = viewProfile(); break;
    default: body = viewDashboard();
  }
  return topbar + `<div class="content">${body}</div>` + renderBottomNav();
}

function renderTopbar(){
  const titles = {
    dashboard:{t:"NutriApp", s:"Seus pacientes em um só lugar"},
    patientForm:{t: STATE.editingPatient? "Editar paciente":"Novo paciente", s:"Ficha de anamnese"},
    patientDetail:{t:"Ficha do paciente", s:"Dados, IMC/TMB e dietas"},
    dietChoice:{t:"Nova dieta", s:"Escolha um template ou comece do zero"},
    dietBuilder:{t: STATE.builderMode==="template"?"Montar template":"Montar dieta", s: STATE.builderMode==="template"?"Crie uma dieta pronta reutilizável":"Adicione alimentos por refeição"},
    foodDb:{t:"Banco de alimentos", s:"Por 100g — TACO · IBGE · Tucunduva"},
    diabetes:{t:"Dietas para diabetes", s:"Planos de baixo índice glicêmico"},
    templates:{t:"Templates de dieta", s:"Sua biblioteca de dietas prontas"},
    profile:{t:"Meu perfil", s:"Dados profissionais e assinatura"},
  };
  const info = titles[STATE.view]||titles.dashboard;
  const showBack = ["patientForm","patientDetail","dietChoice","dietBuilder"].includes(STATE.view);
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div>
        <div class="brand">${showBack?`<button class="back-btn" onclick="goBack()">‹</button>`:`<span class="dot"></span>`}&nbsp;${esc(info.t)}</div>
        <div class="subtitle">${esc(info.s)}</div>
      </div>
    </div>
  </div>`;
}

function goBack(){
  if(STATE.view==="patientForm"){
    if(STATE.editingPatient){ STATE.view="patientDetail"; STATE.patientId = STATE.editingPatient.id; }
    else { STATE.view="dashboard"; STATE.patientId=null; }
  }
  else if(STATE.view==="patientDetail"){ STATE.view="dashboard"; STATE.patientId=null; }
  else if(STATE.view==="dietChoice"){ STATE.view="patientDetail"; }
  else if(STATE.view==="dietBuilder"){
    if(STATE.builderMode==="template"){ STATE.view="templates"; }
    else { STATE.view = STATE.dietDraft && STATE.dietDraft.pacienteId ? "patientDetail" : "dashboard"; }
  }
  else { STATE.view="dashboard"; }
  render();
}

function renderBottomNav(){
  const items = [
    {id:"dashboard", label:"Pacientes", icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`},
    {id:"foodDb", label:"Alimentos", icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`},
    {id:"diabetes", label:"Diabetes", icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9 14.5c.6 1 1.7 1.5 3 1.5"/></svg>`},
    {id:"templates", label:"Templates", icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`},
    {id:"profile", label:"Perfil", icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`},
  ];
  return `<div class="bottomnav">${items.map(it=>`
    <button class="navbtn ${STATE.view===it.id?'active':''}" onclick="navTo('${it.id}')">
      ${it.icon}<span>${it.label}</span>
    </button>`).join('')}</div>`;
}
function navTo(view){ STATE.view=view; STATE.patientId=null; render(); }

/* ============================================================
   DASHBOARD
   ============================================================ */
function viewDashboard(){
  const q = (STATE.search||"").toLowerCase();
  const pacientes = DATA.pacientes.filter(p=>p.nome.toLowerCase().includes(q));
  return `
    <div class="search-bar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C7A73" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input placeholder="Buscar paciente..." value="${esc(STATE.search)}" oninput="STATE.search=this.value; renderListOnly()">
    </div>
    <div id="patientList">${renderPatientList(pacientes)}</div>
    <button class="fab" onclick="openNewPatient()">+</button>
  `;
}
function renderPatientList(pacientes){
  if(pacientes.length===0){
    return `<div class="empty-state"><div class="icon">🥗</div><div style="font-weight:700;color:var(--forest);margin-bottom:4px;">Nenhum paciente ainda</div><div style="font-size:13px;">Toque no botão + para cadastrar o primeiro atendimento.</div></div>`;
  }
  return pacientes.map(p=>{
    const imc = calcIMC(p.peso,p.altura);
    return `
    <div class="patient-card" onclick="openPatient('${p.id}')">
      <div class="avatar">${initials(p.nome)}</div>
      <div class="info">
        <div class="name">${esc(p.nome)}</div>
        <div class="meta">${p.idade||'—'} anos · IMC ${imc? fmt1(imc):'—'} · ${p.dietas.length} dieta(s)</div>
      </div>
      <div class="goal-tag">${esc(goalLabel(p.objetivo))}</div>
    </div>`;
  }).join('');
}
function renderListOnly(){
  const q=(STATE.search||"").toLowerCase();
  const pacientes = DATA.pacientes.filter(p=>p.nome.toLowerCase().includes(q));
  document.getElementById('patientList').innerHTML = renderPatientList(pacientes);
}
function goalLabel(g){
  return {emagrecimento:"Emagrecimento", hipertrofia:"Hipertrofia", performance:"Performance"}[g]||"Geral";
}
function openNewPatient(){ STATE.editingPatient=null; STATE.view="patientForm"; render(); }
function openPatient(id){ STATE.patientId=id; STATE.view="patientDetail"; render(); }

/* ============================================================
   FORM DE PACIENTE (ANAMNESE)
   ============================================================ */
function viewPatientForm(){
  const p = STATE.editingPatient || { nome:"",idade:"",sexo:"F",peso:"",altura:"",objetivo:"emagrecimento",nivelAtividade:"sedentario",restricoes:[],alergias:[],historico:"", dietas:[] };
  window.__formTemp = JSON.parse(JSON.stringify(p));
  return `
    <div class="card">
      <div class="section-title">Dados cadastrais</div>
      <div class="field"><label>Nome completo</label><input id="pf-nome" value="${esc(p.nome)}" placeholder="Nome do paciente"></div>
      <div class="field-row">
        <div class="field"><label>Idade</label><input id="pf-idade" type="number" value="${p.idade||''}" placeholder="anos"></div>
        <div class="field"><label>Sexo</label>
          <select id="pf-sexo">
            <option value="F" ${p.sexo==='F'?'selected':''}>Feminino</option>
            <option value="M" ${p.sexo==='M'?'selected':''}>Masculino</option>
          </select>
        </div>
      </div>
      <div class="field-row">
        <div class="field"><label>Peso (kg)</label><input id="pf-peso" type="number" step="0.1" value="${p.peso||''}" oninput="updateLivePreview()" placeholder="ex: 68.5"></div>
        <div class="field"><label>Altura (cm)</label><input id="pf-altura" type="number" value="${p.altura||''}" oninput="updateLivePreview()" placeholder="ex: 165"></div>
      </div>
      <div class="field"><label>Objetivo principal</label>
        <select id="pf-objetivo">
          <option value="emagrecimento" ${p.objetivo==='emagrecimento'?'selected':''}>Emagrecimento</option>
          <option value="hipertrofia" ${p.objetivo==='hipertrofia'?'selected':''}>Hipertrofia</option>
          <option value="performance" ${p.objetivo==='performance'?'selected':''}>Performance</option>
        </select>
      </div>
      <div class="field"><label>Nível de atividade física</label>
        <select id="pf-atividade" oninput="updateLivePreview()" onchange="updateLivePreview()">
          ${Object.entries(FATORES_ATIVIDADE).map(([k,v])=>`<option value="${k}" ${p.nivelAtividade===k?'selected':''}>${v.label}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="card" id="livePreviewCard">${renderLivePreview(p)}</div>

    <div class="card">
      <div class="section-title">Histórico e restrições</div>
      <div class="field"><label>Histórico médico</label><textarea id="pf-historico" rows="3" placeholder="Condições relevantes, medicamentos, etc.">${esc(p.historico)}</textarea></div>
      <div class="field"><label>Restrições alimentares (Enter para adicionar)</label>
        <input id="pf-restricao-input" placeholder="ex: Vegetariano" onkeydown="if(event.key==='Enter'){event.preventDefault(); addTag('restricoes','pf-restricao-input');}">
        <div id="pf-restricoes-chips">${renderChips('restricoes')}</div>
      </div>
      <div class="field"><label>Alergias (Enter para adicionar)</label>
        <input id="pf-alergia-input" placeholder="ex: Lactose" onkeydown="if(event.key==='Enter'){event.preventDefault(); addTag('alergias','pf-alergia-input');}">
        <div id="pf-alergias-chips">${renderChips('alergias')}</div>
      </div>
    </div>

    <button class="btn btn-primary" onclick="savePatient()">Salvar ficha do paciente</button>
    ${STATE.editingPatient? `<div style="height:10px;"></div><button class="btn btn-danger" onclick="deletePatient()">Excluir paciente</button>`:''}
  `;
}
function renderChips(field){
  const arr = window.__formTemp[field]||[];
  return arr.map((v,i)=>`<span class="chip">${esc(v)}<button onclick="removeTag('${field}',${i})">×</button></span>`).join('');
}
function addTag(field, inputId){
  const input = document.getElementById(inputId);
  const v = input.value.trim();
  if(!v) return;
  window.__formTemp[field] = window.__formTemp[field]||[];
  window.__formTemp[field].push(v);
  input.value='';
  document.getElementById(field==='restricoes'?'pf-restricoes-chips':'pf-alergias-chips').innerHTML = renderChips(field);
}
function removeTag(field, idx){
  window.__formTemp[field].splice(idx,1);
  document.getElementById(field==='restricoes'?'pf-restricoes-chips':'pf-alergias-chips').innerHTML = renderChips(field);
}
function renderLivePreview(p){
  const peso = parseFloat(document.getElementById('pf-peso')?.value ?? p.peso);
  const altura = parseFloat(document.getElementById('pf-altura')?.value ?? p.altura);
  const idade = parseFloat(document.getElementById('pf-idade')?.value ?? p.idade);
  const sexo = document.getElementById('pf-sexo')?.value ?? p.sexo;
  const nivel = document.getElementById('pf-atividade')?.value ?? p.nivelAtividade;
  const imc = calcIMC(peso,altura);
  const tmb = calcTMB(sexo,peso,altura,idade);
  const get = calcGET(tmb,nivel);
  return `
    <div class="eyebrow">Cálculo automático</div>
    <div class="hero-stat">
      <div class="box"><div class="num">${imc?fmt1(imc):'—'}</div><div class="lbl">IMC · ${imc?classifyIMC(imc):'—'}</div></div>
      <div class="box"><div class="num">${tmb?Math.round(tmb):'—'}</div><div class="lbl">TMB (kcal)</div></div>
      <div class="box"><div class="num">${get?Math.round(get):'—'}</div><div class="lbl">GET (kcal)</div></div>
    </div>
  `;
}
function updateLivePreview(){
  const p = window.__formTemp;
  document.getElementById('livePreviewCard').innerHTML = renderLivePreview(p);
}
async function savePatient(){
  const nome = document.getElementById('pf-nome').value.trim();
  if(!nome){ toast("Informe o nome do paciente"); return; }
  const p = window.__formTemp;
  p.nome = nome;
  p.idade = parseInt(document.getElementById('pf-idade').value)||null;
  p.sexo = document.getElementById('pf-sexo').value;
  p.peso = parseFloat(document.getElementById('pf-peso').value)||null;
  p.altura = parseFloat(document.getElementById('pf-altura').value)||null;
  p.objetivo = document.getElementById('pf-objetivo').value;
  p.nivelAtividade = document.getElementById('pf-atividade').value;
  p.historico = document.getElementById('pf-historico').value;
  p.dietas = p.dietas||[];

  if(STATE.editingPatient){
    const idx = DATA.pacientes.findIndex(x=>x.id===p.id);
    DATA.pacientes[idx] = p;
  } else {
    p.id = uid();
    DATA.pacientes.push(p);
  }
  await saveData();
  toast("Ficha salva com sucesso");
  STATE.patientId = p.id;
  STATE.view = "patientDetail";
  render();
}
async function deletePatient(){
  if(!confirm("Excluir este paciente e todas as suas dietas?")) return;
  DATA.pacientes = DATA.pacientes.filter(x=>x.id!==STATE.editingPatient.id);
  await saveData();
  STATE.view="dashboard";
  render();
  toast("Paciente excluído");
}

/* ============================================================
   DETALHE DO PACIENTE
   ============================================================ */
function currentPatient(){ return DATA.pacientes.find(p=>p.id===STATE.patientId); }
function viewPatientDetail(){
  const p = currentPatient();
  if(!p){ STATE.view="dashboard"; return viewDashboard(); }
  const imc = calcIMC(p.peso,p.altura);
  const tmb = calcTMB(p.sexo,p.peso,p.altura,p.idade);
  const get = calcGET(tmb,p.nivelAtividade);
  return `
    <div class="card">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
        <div class="avatar" style="width:52px;height:52px;font-size:19px;">${initials(p.nome)}</div>
        <div style="flex:1;">
          <div style="font-family:'Fraunces'; font-weight:700; font-size:18px; color:var(--forest);">${esc(p.nome)}</div>
          <div style="font-size:12.5px; color:var(--muted);">${p.idade||'—'} anos · ${p.sexo==='F'?'Feminino':'Masculino'} · ${goalLabel(p.objetivo)}</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="editPatient()">Editar</button>
      </div>
      <div class="hero-stat">
        <div class="box"><div class="num">${imc?fmt1(imc):'—'}</div><div class="lbl">IMC · ${imc?classifyIMC(imc):'—'}</div></div>
        <div class="box"><div class="num">${tmb?Math.round(tmb):'—'}</div><div class="lbl">TMB (kcal)</div></div>
        <div class="box"><div class="num">${get?Math.round(get):'—'}</div><div class="lbl">GET (kcal)</div></div>
      </div>
      ${(p.restricoes&&p.restricoes.length)||(p.alergias&&p.alergias.length)?`
      <div class="divider"></div>
      ${p.restricoes&&p.restricoes.length?`<div style="font-size:12px;color:var(--muted);margin-bottom:4px;">Restrições: ${p.restricoes.map(esc).join(', ')}</div>`:''}
      ${p.alergias&&p.alergias.length?`<div style="font-size:12px;color:var(--muted);">Alergias: ${p.alergias.map(esc).join(', ')}</div>`:''}
      `:''}
    </div>

    <button class="btn btn-primary" onclick="shareModalPaciente()" style="margin-bottom:16px;">📄 Compartilhar (PDF)</button>

    <button class="btn btn-gold" onclick="startNewDiet()" style="margin-bottom:16px;">+ Nova dieta para ${esc(p.nome.split(' ')[0])}</button>

    <div class="section-title">Dietas anteriores</div>
    ${p.dietas.length===0? `<div class="empty-state" style="padding:30px 10px;"><div class="icon">🍽️</div>Nenhuma dieta criada ainda.</div>` :
      p.dietas.slice().reverse().map(d=>{
        const tot = macroTotals(d.refeicoes);
        return `
        <div class="template-card" onclick="viewExistingDiet('${d.id}')">
          <div class="tname">${esc(d.nome)}</div>
          <div class="tkcal">${Math.round(tot.kcal)} kcal</div>
          <div class="tmeals">${new Date(d.data).toLocaleDateString('pt-BR')} · P ${fmt1(tot.prot)}g · C ${fmt1(tot.carb)}g · G ${fmt1(tot.gord)}g</div>
        </div>`;
      }).join('')
    }
  `;
}
function editPatient(){
  STATE.editingPatient = JSON.parse(JSON.stringify(currentPatient()));
  STATE.view="patientForm";
  render();
}
function startNewDiet(){
  STATE.view="dietChoice";
  render();
}
function viewExistingDiet(dietId){
  const p = currentPatient();
  const d = p.dietas.find(x=>x.id===dietId);
  STATE.builderMode = "diet";
  STATE.dietDraft = JSON.parse(JSON.stringify(d));
  STATE.dietDraft.pacienteId = p.id;
  STATE.view = "dietBuilder";
  render();
}

/* ============================================================
   ESCOLHA DE TEMPLATE / DIETA EM BRANCO
   ============================================================ */
function viewDietChoice(){
  const p = currentPatient();
  return `
    <div class="card">
      <div class="section-title">Para ${esc(p.nome.split(' ')[0])}</div>
      <button class="btn btn-primary" onclick="beginDiet(null)">Começar do zero</button>
    </div>
    <div class="section-title">ou use um template</div>
    ${DATA.templates.map(t=>{
      const tot = macroTotals(t.refeicoes.map(r=>({itens:r.itens.map(it=>computeItem(it.alimentoId,it.qtd))})));
      return `
      <div class="template-card" onclick="beginDiet('${t.id}')">
        <div class="tname">${esc(t.nome)}</div>
        <div class="tkcal">${Math.round(tot.kcal)} kcal (meta: ${t.kcalAlvo})</div>
        <div class="tmeals">${t.refeicoes.length} refeições · P ${fmt1(tot.prot)}g · C ${fmt1(tot.carb)}g · G ${fmt1(tot.gord)}g</div>
      </div>`;
    }).join('')}
  `;
}
function beginDiet(templateId){
  const p = currentPatient();
  let refeicoes;
  let nome = "Nova dieta";
  let kcalMeta = calcGET(calcTMB(p.sexo,p.peso,p.altura,p.idade), p.nivelAtividade) || 2000;
  if(templateId){
    const t = DATA.templates.find(x=>x.id===templateId);
    nome = t.nome;
    kcalMeta = t.kcalAlvo;
    refeicoes = t.refeicoes.map(r=>({ nome:r.nome, itens: r.itens.map(it=>computeItem(it.alimentoId,it.qtd)) }));
  } else {
    refeicoes = [ {nome:"Café da manhã",itens:[]}, {nome:"Almoço",itens:[]}, {nome:"Lanche",itens:[]}, {nome:"Jantar",itens:[]} ];
  }
  STATE.builderMode = "diet";
  STATE.dietDraft = { id:uid(), pacienteId:p.id, nome, data:new Date().toISOString(), kcalMeta, refeicoes, _foodSearch:"" };
  STATE.view="dietBuilder";
  render();
}

/* -------- criação/edição de templates (dietas prontas), sem paciente -------- */
function startNewTemplate(){
  STATE.builderMode = "template";
  STATE.templateDraft = {
    id:uid(), nome:"Novo template", kcalMeta:2000,
    refeicoes:[ {nome:"Café da manhã",itens:[]}, {nome:"Almoço",itens:[]}, {nome:"Lanche",itens:[]}, {nome:"Jantar",itens:[]} ],
  };
  STATE.view="dietBuilder";
  render();
}
function openEditTemplate(id){
  const t = DATA.templates.find(x=>x.id===id);
  STATE.builderMode = "template";
  STATE.templateDraft = {
    id:t.id, nome:t.nome, kcalMeta:t.kcalAlvo,
    refeicoes: t.refeicoes.map(r=>({ nome:r.nome, itens: r.itens.map(it=>computeItem(it.alimentoId, it.qtd)) })),
  };
  STATE.view="dietBuilder";
  render();
}
async function saveTemplate(){
  const d = STATE.templateDraft;
  const clean = {
    id:d.id, nome:d.nome, kcalAlvo: d.kcalMeta,
    refeicoes: d.refeicoes.map(r=>({ nome:r.nome, itens: r.itens.map(it=>({alimentoId:it.alimentoId, qtd:it.qtd})) })),
  };
  const idx = DATA.templates.findIndex(x=>x.id===d.id);
  if(idx>=0) DATA.templates[idx]=clean; else DATA.templates.push(clean);
  await saveData();
  toast("Template salvo na biblioteca");
  STATE.view="templates";
  render();
}
function saveDraft(){
  if(STATE.builderMode==="template") saveTemplate();
  else saveDiet();
}

/* ============================================================
   MONTADOR DE DIETA (com contador em tempo real)
   ============================================================ */
function macroRingSVG(pct, kcal){
  const r=34, c=2*Math.PI*r;
  const dash = Math.min(pct,1)*c;
  const color = pct<0.85? "#1E9C82" : pct<=1.05? "#E3A012" : "#C2483B";
  return `
    <div class="macro-ring">
      <svg width="84" height="84" viewBox="0 0 84 84">
        <circle cx="42" cy="42" r="${r}" fill="none" stroke="#EEEFE7" stroke-width="8"/>
        <circle cx="42" cy="42" r="${r}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"
          stroke-dasharray="${dash} ${c}"/>
      </svg>
      <div class="ring-center"><div class="ring-kcal">${Math.round(kcal)}</div><div class="ring-label">kcal</div></div>
    </div>
  `;
}
function viewDietBuilder(){
  const mode = STATE.builderMode;
  const d = activeDraft();
  const tot = macroTotals(d.refeicoes);
  const pct = d.kcalMeta? tot.kcal/d.kcalMeta : 0;
  return `
    <div class="card">
      <div class="field"><label>${mode==="template"?"Nome do template":"Nome da dieta"}</label><input value="${esc(d.nome)}" oninput="d_updateNome(this.value)"></div>
      <div class="field"><label>Meta calórica (kcal)</label><input type="number" value="${Math.round(d.kcalMeta)}" oninput="d_updateMeta(this.value)"></div>
    </div>

    <div class="sticky-counter" id="stickyCounter">${renderCounter(tot,d.kcalMeta,pct)}</div>

    ${d.refeicoes.map((r,ri)=>`
      <div class="meal-block">
        <div class="meal-header">
          <div class="title">${esc(r.nome)}</div>
          <div style="display:flex; align-items:center; gap:8px;">
            <div class="subtotal">${Math.round(r.itens.reduce((s,i)=>s+i.kcal,0))} kcal · C ${fmt1(r.itens.reduce((s,i)=>s+(i.carb||0),0))}g</div>
            ${d.refeicoes.length>1? `<button class="fi-remove" title="Remover refeição" onclick="d_removeMeal(${ri})">✕</button>`:''}
          </div>
        </div>
        ${r.itens.map((it,ii)=>`
          <div class="food-item">
            <div style="flex:1;">
              <div class="fi-name">${esc(it.nome)}</div>
              <div class="fi-qty">${it.qtd}g · P${fmt1(it.prot)} C${fmt1(it.carb)} G${fmt1(it.gord)}</div>
            </div>
            <div class="fi-kcal">${Math.round(it.kcal)} kcal</div>
            <button class="fi-remove" onclick="d_removeItem(${ri},${ii})">✕</button>
          </div>
        `).join('')}
        <button class="btn btn-ghost btn-sm" style="width:100%; margin-top:4px;" onclick="openAddFood(${ri})">+ Adicionar alimento</button>
      </div>
    `).join('')}

    <button class="btn btn-outline" onclick="openAddMeal()" style="margin-bottom:14px;">+ Adicionar refeição</button>

    <button class="btn btn-primary" onclick="saveDraft()">${mode==="template"?"Salvar template":"Salvar dieta"}</button>
    ${mode==="diet"? `<div style="height:10px;"></div><button class="btn btn-outline" onclick="shareModalDieta()">📄 Gerar e Compartilhar PDF</button>` : ''}
  `;
}
function openAddMeal(){
  const overlay = document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Nova refeição</div>
      <div class="field"><label>Nome da refeição</label><input id="am-nome" placeholder="ex: Ceia, Pré-treino, Pós-treino" autofocus></div>
      <button class="btn btn-primary" onclick="confirmAddMeal()">Adicionar</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
}
function confirmAddMeal(){
  const nome = document.getElementById('am-nome').value.trim();
  if(!nome){ toast("Dê um nome para a refeição"); return; }
  activeDraft().refeicoes.push({ nome, itens:[] });
  closeModal();
  render();
}
function d_removeMeal(ri){
  if(!confirm("Remover esta refeição e todos os alimentos dela?")) return;
  activeDraft().refeicoes.splice(ri,1);
  render();
}
function renderCounter(tot,meta,pct){
  return `
    <div class="macro-ring-wrap">
      ${macroRingSVG(pct, tot.kcal)}
      <div class="macro-legend">
        <div class="row"><span><span class="dot" style="background:#1E9C82"></span>Proteína</span><span class="val">${fmt1(tot.prot)}g</span></div>
        <div class="row"><span><span class="dot" style="background:#E3A012"></span>Carboidrato</span><span class="val">${fmt1(tot.carb)}g</span></div>
        <div class="row"><span><span class="dot" style="background:#C2483B"></span>Gordura</span><span class="val">${fmt1(tot.gord)}g</span></div>
        <div class="row"><span><span class="dot" style="background:#6C7A73"></span>Fibra</span><span class="val">${fmt1(tot.fibra||0)}g</span></div>
        <div class="row" style="border-top:1px solid var(--line); padding-top:5px; margin-top:2px;"><span style="font-weight:700;">Meta</span><span class="val" style="font-weight:700;">${Math.round(meta)} kcal</span></div>
      </div>
    </div>
  `;
}
function refreshCounter(){
  const d = activeDraft();
  const tot = macroTotals(d.refeicoes);
  const pct = d.kcalMeta? tot.kcal/d.kcalMeta:0;
  document.getElementById('stickyCounter').innerHTML = renderCounter(tot,d.kcalMeta,pct);
}
function d_updateNome(v){ activeDraft().nome=v; }
function d_updateMeta(v){ activeDraft().kcalMeta=parseFloat(v)||0; refreshCounter(); }
function d_removeItem(ri,ii){
  activeDraft().refeicoes[ri].itens.splice(ii,1);
  render();
}
async function saveDiet(){
  const d = STATE.dietDraft;
  const p = DATA.pacientes.find(x=>x.id===d.pacienteId);
  const idx = p.dietas.findIndex(x=>x.id===d.id);
  const clean = { id:d.id, nome:d.nome, data:d.data, kcalMeta:d.kcalMeta, refeicoes:d.refeicoes };
  if(idx>=0) p.dietas[idx]=clean; else p.dietas.push(clean);
  await saveData();
  toast("Dieta salva");
  STATE.patientId = p.id;
  STATE.view="patientDetail";
  render();
}

/* -------- adicionar alimento (modal) -------- */
function openAddFood(mealIndex){
  const overlay = document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Adicionar alimento</div>
      <div class="search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C7A73" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="af-search" placeholder="Buscar alimento..." oninput="af_search(${mealIndex})" autofocus>
      </div>
      <div id="af-results"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
  af_search(mealIndex);
}
function af_search(mealIndex){
  const q = (document.getElementById('af-search').value||"").toLowerCase();
  const results = allFoods().filter(f=>f.nome.toLowerCase().includes(q)).slice(0,25);
  document.getElementById('af-results').innerHTML = results.map(f=>`
    <div class="food-search-result" onclick="af_pick('${f.id}',${mealIndex})">
      <div>
        <div class="fname">${esc(f.nome)}</div>
        <div class="fmacro">${f.kcal}kcal · P${f.prot} C${f.carb} G${f.gord} /100g</div>
      </div>
      <button class="fadd">+</button>
    </div>
  `).join('') || `<div class="empty-state" style="padding:20px;">Nenhum alimento encontrado.</div>`;
}
function af_pick(foodId, mealIndex){
  const f = foodById(foodId);
  closeModal();
  const overlay = document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">${esc(f.nome)}</div>
      <div class="field"><label>Quantidade (g)</label><input id="af-qtd" type="number" value="100" oninput="af_preview('${foodId}')"></div>
      <div class="card" id="af-preview">${af_previewHtml(f,100)}</div>
      <button class="btn btn-primary" onclick="af_confirm('${foodId}',${mealIndex})">Adicionar à refeição</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
}
function af_previewHtml(f,qtd){
  const it = computeItem(f.id, qtd);
  return `<div class="hero-stat">
    <div class="box"><div class="num">${Math.round(it.kcal)}</div><div class="lbl">kcal</div></div>
    <div class="box"><div class="num">${fmt1(it.prot)}</div><div class="lbl">Proteína</div></div>
    <div class="box"><div class="num">${fmt1(it.carb)}</div><div class="lbl">Carbo</div></div>
    <div class="box"><div class="num">${fmt1(it.gord)}</div><div class="lbl">Gordura</div></div>
    <div class="box"><div class="num">${fmt1(it.fibra||0)}</div><div class="lbl">Fibra</div></div>
  </div>`;
}
function af_preview(foodId){
  const qtd = parseFloat(document.getElementById('af-qtd').value)||0;
  const f = foodById(foodId);
  document.getElementById('af-preview').innerHTML = af_previewHtml(f,qtd);
}
function af_confirm(foodId, mealIndex){
  const qtd = parseFloat(document.getElementById('af-qtd').value)||0;
  const item = computeItem(foodId, qtd);
  activeDraft().refeicoes[mealIndex].itens.push(item);
  closeModal();
  render();
}

/* ============================================================
   BANCO DE ALIMENTOS (navegação livre)
   ============================================================ */
const FOOD_GROUP_ICONS = {
  "Cereais":"🌾","Leguminosas":"🫘","Carnes":"🥩","Ovos":"🥚","Peixes":"🐟","Tubérculos":"🥔",
  "Frutas":"🍎","Laticínios":"🥛","Suplementos":"🥤","Gorduras":"🫒","Oleaginosas":"🌰","Vegetais":"🥦",
  "Doces":"🍫","Bebidas":"🧃","Proteína vegetal":"🌱","Personalizado":"⭐",
};
let FDB_ACTIVE_GROUP = "Todos";
let FDB_ACTIVE_FONTE = "Todas";
const FONTE_BADGE = {
  "TACO":{bg:"#DCF3EA",fg:"#0d6a56"},
  "IBGE":{bg:"#FCEDCB",fg:"#8a5a00"},
  "Tucunduva":{bg:"#E7E4F5",fg:"#4a3d8a"},
  "Personalizado":{bg:"#F1E4EC",fg:"#8a3d68"},
};
function fonteBadge(fonte){
  const c = FONTE_BADGE[fonte] || {bg:"#EEEFE7",fg:"#6C7A73"};
  return `<span style="display:inline-block;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;background:${c.bg};color:${c.fg};letter-spacing:.02em;">${esc(fonte)}</span>`;
}
function viewFoodDb(){
  const groups = ["Todos", ...Array.from(new Set(allFoods().map(f=>f.grupo)))];
  const fontes = ["Todas", ...Array.from(new Set(allFoods().map(f=>f.fonte)))];
  return `
    <div class="search-bar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C7A73" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input id="fdb-search" placeholder="Buscar alimento..." oninput="fdb_search()">
    </div>
    <div style="font-size:10.5px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin:0 2px 6px;">Tabela de composição</div>
    <div class="filter-scroll">
      ${fontes.map(fo=>`<div class="filter-chip ${FDB_ACTIVE_FONTE===fo?'active':''}" onclick="fdb_setFonte('${esc(fo)}')">${fo==="Todas"?"📚 Todas":esc(fo)}</div>`).join('')}
    </div>
    <div style="font-size:10.5px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin:2px 2px 6px;">Grupo</div>
    <div class="filter-scroll">
      ${groups.map(g=>`<div class="filter-chip ${FDB_ACTIVE_GROUP===g?'active':''}" onclick="fdb_setGroup('${esc(g)}')">${g==="Todos"?"🍽️ Todos":`${FOOD_GROUP_ICONS[g]||"🍽️"} ${esc(g)}`}</div>`).join('')}
    </div>
    <div id="fdb-results">${fdb_resultsHtml("")}</div>
    <div style="height:6px;"></div>
    <div class="btn-row">
      <button class="btn btn-outline btn-sm" onclick="openCustomFood()">+ Alimento</button>
      <button class="btn btn-outline btn-sm" onclick="openImportCsv()">⬆ Importar CSV</button>
    </div>
    ${DATA.foodsCustom.some(f=>f.imported)? `<div style="text-align:center;margin-top:10px;font-size:11.5px;color:var(--muted);">${DATA.foodsCustom.filter(f=>f.imported).length} alimento(s) importado(s) · <span onclick="clearImportedFoods()" style="color:#C2483B;cursor:pointer;font-weight:700;">remover importados</span></div>`:''}
  `;
}
function fdb_setGroup(g){ FDB_ACTIVE_GROUP = g; render(); }
function fdb_setFonte(fo){ FDB_ACTIVE_FONTE = fo; render(); }
function fdb_resultsHtml(q){
  let list = allFoods().filter(f=>f.nome.toLowerCase().includes(q.toLowerCase()));
  if(FDB_ACTIVE_GROUP!=="Todos") list = list.filter(f=>f.grupo===FDB_ACTIVE_GROUP);
  if(FDB_ACTIVE_FONTE!=="Todas") list = list.filter(f=>f.fonte===FDB_ACTIVE_FONTE);
  list = list.slice().sort((a,b)=>b.kcal-a.kcal);
  const countLine = `<div style="font-size:11.5px;color:var(--muted);margin:0 2px 10px;font-family:'IBM Plex Mono';">${list.length} alimento(s)</div>`;
  if(list.length===0){
    return `<div class="empty-state" style="padding:30px 10px;"><div class="icon">🔍</div>Nenhum alimento encontrado.</div>`;
  }
  const maxKcal = Math.max(...list.map(f=>f.kcal), 100);
  const customIds = new Set(DATA.foodsCustom.map(f=>f.id));
  return countLine + list.map(f=>{
    const pct = Math.min(100, Math.round((f.kcal/maxKcal)*100));
    const barColor = f.kcal>400? "#C2483B" : f.kcal>150? "#E3A012" : "#1E9C82";
    const delLink = customIds.has(f.id)? ` · <span onclick="removeCustomFood('${f.id}')" style="color:#C2483B;cursor:pointer;font-weight:700;">remover</span>` : '';
    return `
    <div class="food-row">
      <div class="fr-icon">${FOOD_GROUP_ICONS[f.grupo]||"🍽️"}</div>
      <div class="fr-body">
        <div class="fr-name">${esc(f.nome)} ${fonteBadge(f.fonte)}</div>
        <div class="fr-group">${esc(f.grupo)} · por 100g</div>
        <div class="fr-bar-track"><div class="fr-bar-fill" style="width:${pct}%; background:${barColor};"></div></div>
        <div class="fr-macros">P ${f.prot}g · C ${f.carb}g · G ${f.gord}g · Fib ${f.fibra}g${delLink}</div>
      </div>
      <div class="fr-kcal">${f.kcal}<span class="u">kcal</span></div>
    </div>`;
  }).join('');
}
function fdb_search(){
  document.getElementById('fdb-results').innerHTML = fdb_resultsHtml(document.getElementById('fdb-search').value);
}
function openCustomFood(){
  const overlay = document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Novo alimento</div>
      <div class="field"><label>Nome</label><input id="cf-nome"></div>
      <div class="field-row">
        <div class="field"><label>Kcal /100g</label><input id="cf-kcal" type="number"></div>
        <div class="field"><label>Proteína (g)</label><input id="cf-prot" type="number"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Carboidrato (g)</label><input id="cf-carb" type="number"></div>
        <div class="field"><label>Gordura (g)</label><input id="cf-gord" type="number"></div>
      </div>
      <div class="field"><label>Fibra (g)</label><input id="cf-fibra" type="number"></div>
      <button class="btn btn-primary" onclick="saveCustomFood()">Salvar alimento</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
}
async function saveCustomFood(){
  const nome = document.getElementById('cf-nome').value.trim();
  if(!nome){ toast("Informe o nome do alimento"); return; }
  DATA.foodsCustom.push({
    id:uid(), nome, grupo:"Personalizado",
    kcal:parseFloat(document.getElementById('cf-kcal').value)||0,
    prot:parseFloat(document.getElementById('cf-prot').value)||0,
    carb:parseFloat(document.getElementById('cf-carb').value)||0,
    gord:parseFloat(document.getElementById('cf-gord').value)||0,
    fibra:parseFloat(document.getElementById('cf-fibra').value)||0,
  });
  await saveData();
  closeModal();
  render();
  toast("Alimento cadastrado");
}

/* ---------------------- IMPORTAÇÃO DE CSV ---------------------- */
let CSV_PARSED = [];
function csv_detectDelim(text){
  const line = (text.split(/\r?\n/).find(l=>l.trim().length) || "");
  const semi=(line.match(/;/g)||[]).length, comma=(line.match(/,/g)||[]).length, tab=(line.match(/\t/g)||[]).length;
  if(tab>0 && tab>=semi && tab>=comma) return "\t";
  return semi>=comma ? ";" : ",";
}
function csv_splitLine(line, delim){
  const out=[]; let cur="", q=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"'){ if(q && line[i+1]==='"'){ cur+='"'; i++; } else q=!q; }
    else if(c===delim && !q){ out.push(cur); cur=""; }
    else cur+=c;
  }
  out.push(cur);
  return out.map(s=>s.trim());
}
function csv_normHeader(h){ return (h||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,""); }
function csv_num(s, delim){
  s=String(s==null?"":s).trim(); if(!s) return 0;
  if(delim===";" || delim==="\t") s=s.replace(/\./g,"").replace(",",".");
  else s=s.replace(/,/g,"");
  const n=parseFloat(s); return isNaN(n)?0:n;
}
function parseFoodsCsv(text, defaultFonte){
  text=(text||"").replace(/^\uFEFF/,"");
  const delim=csv_detectDelim(text);
  const lines=text.split(/\r?\n/).filter(l=>l.trim().length);
  if(!lines.length) return {foods:[], ignored:0, delim};
  const map={ nome:["nome","alimento","descricao","item"], grupo:["grupo","categoria"], kcal:["kcal","energia","caloria","calorias","energiakcal"], prot:["prot","proteina","proteinas"], carb:["carb","carboidrato","carboidratos","cho"], gord:["gord","gordura","gorduras","lipidios","lip"], fibra:["fibra","fibras"], fonte:["fonte","tabela"] };
  const first=csv_splitLine(lines[0],delim).map(csv_normHeader);
  const known=Object.values(map).flat();
  const hasHeader=first.some(h=>known.includes(h));
  const idx={};
  if(hasHeader){ first.forEach((h,i)=>{ for(const k in map){ if(map[k].includes(h)) idx[k]=i; } }); }
  else { idx.nome=0; idx.grupo=1; idx.kcal=2; idx.prot=3; idx.carb=4; idx.gord=5; idx.fibra=6; idx.fonte=7; }
  const rows=hasHeader? lines.slice(1) : lines;
  const foods=[]; let ignored=0;
  rows.forEach((line,ri)=>{
    const c=csv_splitLine(line,delim);
    const nome=(idx.nome!=null? (c[idx.nome]||"") : "").trim();
    if(!nome){ ignored++; return; }
    foods.push({
      id:"imp-"+Date.now().toString(36)+"-"+ri+"-"+Math.random().toString(36).slice(2,5),
      nome,
      grupo:(idx.grupo!=null && c[idx.grupo])? c[idx.grupo].trim() : "Importado",
      kcal:csv_num(c[idx.kcal],delim), prot:csv_num(c[idx.prot],delim),
      carb:csv_num(c[idx.carb],delim), gord:csv_num(c[idx.gord],delim),
      fibra:idx.fibra!=null? csv_num(c[idx.fibra],delim) : 0,
      fonte:(idx.fonte!=null && c[idx.fonte])? c[idx.fonte].trim() : (defaultFonte||"Personalizado"),
      imported:true,
    });
  });
  return {foods, ignored, delim, hasHeader};
}
function openImportCsv(){
  CSV_PARSED=[];
  const overlay=document.createElement('div'); overlay.className='modal-overlay';
  overlay.innerHTML=`
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Importar alimentos (CSV)</div>
      <div style="font-size:12.5px;color:var(--muted);margin-bottom:12px;line-height:1.5;">
        Colunas por 100g: <b>nome · grupo · kcal · prot · carb · gord · fibra · fonte</b>.
        Aceita separador <b>;</b> ou <b>,</b> e decimal com vírgula. A 1ª linha pode ser o cabeçalho.
      </div>
      <div class="field">
        <label>Fonte padrão (se o CSV não informar)</label>
        <select id="csv-fonte" onchange="csvPreview()" style="width:100%;padding:11px;border:1px solid var(--line);border-radius:11px;background:#fff;font-size:14px;">
          <option>Personalizado</option><option>TACO</option><option>IBGE</option><option>Tucunduva</option>
        </select>
      </div>
      <div class="field">
        <label>Selecionar arquivo .csv</label>
        <input type="file" id="csv-file" accept=".csv,text/csv,text/plain" onchange="csvFilePicked(event)">
      </div>
      <div class="field">
        <label>...ou cole o conteúdo do CSV</label>
        <textarea id="csv-text" rows="6" oninput="csvPreview()" placeholder="nome;grupo;kcal;prot;carb;gord;fibra;fonte&#10;Arroz integral cozido;Cereais;124;2,6;25,8;1,0;2,7;TACO" style="width:100%;padding:10px;border:1px solid var(--line);border-radius:11px;font-family:'IBM Plex Mono';font-size:12px;box-sizing:border-box;"></textarea>
      </div>
      <div id="csv-preview" style="font-size:12px;color:var(--muted);margin:2px 0 12px;min-height:16px;"></div>
      <div class="btn-row">
        <button class="btn btn-ghost btn-sm" onclick="downloadCsvTemplate()">Baixar modelo</button>
        <button class="btn btn-primary btn-sm" id="csv-import-btn" onclick="commitCsvImport()" disabled>Importar</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
}
function csvFilePicked(ev){
  const file=ev.target.files && ev.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{ const ta=document.getElementById('csv-text'); if(ta){ ta.value=reader.result; csvPreview(); } };
  reader.readAsText(file);
}
function csvPreview(){
  const ta=document.getElementById('csv-text'); const text=ta? ta.value : "";
  const sel=document.getElementById('csv-fonte'); const fonte=sel? sel.value : "Personalizado";
  const box=document.getElementById('csv-preview'); const btn=document.getElementById('csv-import-btn');
  const res=parseFoodsCsv(text, fonte); CSV_PARSED=res.foods;
  if(!text.trim()){ if(box) box.innerHTML=""; if(btn) btn.disabled=true; return; }
  if(!res.foods.length){ if(box) box.innerHTML=`<span style="color:#C2483B;">Nenhum alimento válido encontrado. Confira as colunas.</span>`; if(btn) btn.disabled=true; return; }
  const sample=res.foods.slice(0,3).map(f=>`${esc(f.nome)} (${fmt1(f.kcal)}kcal)`).join(", ");
  if(box) box.innerHTML=`<b style="color:var(--forest);">${res.foods.length}</b> alimento(s) prontos${res.ignored?`, ${res.ignored} ignorado(s)`:""}. Ex.: ${sample}${res.foods.length>3?"…":""}`;
  if(btn) btn.disabled=false;
}
async function commitCsvImport(){
  if(!CSV_PARSED.length){ toast("Nada para importar"); return; }
  DATA.foodsCustom.push(...CSV_PARSED);
  const n=CSV_PARSED.length; CSV_PARSED=[];
  await saveData(); closeModal(); render();
  toast(`${n} alimento(s) importado(s)`);
}
function downloadCsvTemplate(){
  const csv="nome;grupo;kcal;prot;carb;gord;fibra;fonte\nArroz integral cozido;Cereais;124;2,6;25,8;1,0;2,7;TACO\nBanana prata;Frutas;98;1,3;26,0;0,1;2,0;TACO\nPeito de frango grelhado;Carnes;159;32,0;0,0;2,5;0,0;IBGE\n";
  try{
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download="modelo-alimentos.csv";
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }catch(e){ toast("Não foi possível baixar o modelo"); }
}
async function removeCustomFood(id){
  DATA.foodsCustom = DATA.foodsCustom.filter(f=>f.id!==id);
  await saveData(); render(); toast("Alimento removido");
}
async function clearImportedFoods(){
  const n=DATA.foodsCustom.filter(f=>f.imported).length;
  if(typeof confirm==="function" && !confirm(`Remover ${n} alimento(s) importado(s)? Os cadastrados manualmente serão mantidos.`)) return;
  DATA.foodsCustom = DATA.foodsCustom.filter(f=>!f.imported);
  await saveData(); render(); toast(`${n} importado(s) removido(s)`);
}

/* ============================================================
   DIETAS PARA DIABETES
   ============================================================ */
function diabetesTotals(dd){
  return macroTotals(dd.refeicoes.map(r=>({itens:r.itens.map(it=>computeItem(it.alimentoId,it.qtd))})));
}
const DM_TAG_COLOR = {
  "Tipo 2":{bg:"#DCF3EA",fg:"#0d6a56"},
  "Emagrecimento":{bg:"#FCEDCB",fg:"#8a5a00"},
  "Pré-diabetes":{bg:"#E7E4F5",fg:"#4a3d8a"},
};
function viewDiabetes(){
  return `
    <div class="card" style="background:var(--emerald-light);border:none;">
      <div class="eyebrow">Cuidado nutricional</div>
      <div class="section-title" style="margin-top:0;">Planos para controle glicêmico</div>
      <div style="font-size:13px;color:var(--forest);opacity:.9;">Dietas prontas com carboidratos de baixo índice glicêmico, ricas em fibras e distribuídas ao longo do dia. Toque em uma para ver as refeições, aplicar a um paciente ou salvar como template.</div>
    </div>
    ${DIABETES_DIETS.map(dd=>{
      const tot = diabetesTotals(dd);
      const carbPct = tot.kcal>0 ? Math.round((tot.carb*4/tot.kcal)*100) : 0;
      const tc = DM_TAG_COLOR[dd.tag] || {bg:"#EEEFE7",fg:"#6C7A73"};
      return `
      <div class="card" style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="font-family:'Fraunces';font-weight:600;font-size:15.5px;color:var(--forest);">${esc(dd.nome)}</span>
              <span style="font-size:9.5px;font-weight:700;padding:3px 9px;border-radius:20px;background:${tc.bg};color:${tc.fg};">${esc(dd.tag)}</span>
            </div>
            <div style="font-size:12px;color:var(--muted);margin-top:6px;line-height:1.45;">${esc(dd.descricao)}</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <div style="flex:1;text-align:center;background:var(--paper);border-radius:11px;padding:9px 4px;">
            <div style="font-family:'Fraunces';font-weight:700;font-size:16px;color:var(--forest);">${Math.round(tot.kcal)}</div>
            <div style="font-size:9px;color:var(--muted);font-weight:600;">kcal</div>
          </div>
          <div style="flex:1;text-align:center;background:var(--paper);border-radius:11px;padding:9px 4px;">
            <div style="font-family:'Fraunces';font-weight:700;font-size:16px;color:var(--forest);">${carbPct}%</div>
            <div style="font-size:9px;color:var(--muted);font-weight:600;">do VET em carbo</div>
          </div>
          <div style="flex:1;text-align:center;background:var(--paper);border-radius:11px;padding:9px 4px;">
            <div style="font-family:'Fraunces';font-weight:700;font-size:16px;color:var(--forest);">${dd.refeicoes.length}</div>
            <div style="font-size:9px;color:var(--muted);font-weight:600;">refeições</div>
          </div>
        </div>
        <div style="font-size:11px;color:var(--muted);margin-top:8px;font-family:'IBM Plex Mono';text-align:center;">P ${fmt1(tot.prot)}g · C ${fmt1(tot.carb)}g · G ${fmt1(tot.gord)}g</div>
        <div class="btn-row" style="margin-top:12px;">
          <button class="btn btn-ghost btn-sm" onclick="openDiabetesDetail('${dd.id}')">Ver refeições</button>
          <button class="btn btn-primary btn-sm" onclick="applyDiabetesDiet('${dd.id}')">Aplicar</button>
        </div>
        <div style="height:8px;"></div>
        <button class="btn btn-outline btn-sm" style="width:100%;" onclick="saveDiabetesAsTemplate('${dd.id}')">Salvar como template</button>
      </div>`;
    }).join('')}
    <div class="empty-state" style="padding:14px 16px;font-size:12px;">São modelos de partida. Individualize a quantidade de carboidrato conforme a glicemia, a medicação e as metas de cada paciente.</div>
  `;
}
function openDiabetesDetail(id){
  const dd = DIABETES_DIETS.find(x=>x.id===id);
  if(!dd) return;
  const tot = diabetesTotals(dd);
  const carbPct = tot.kcal>0 ? Math.round((tot.carb*4/tot.kcal)*100) : 0;
  const mealsHtml = dd.refeicoes.map(r=>{
    const itens = r.itens.map(it=>computeItem(it.alimentoId,it.qtd)).filter(Boolean);
    const carbMeal = itens.reduce((s,it)=>s+it.carb,0);
    const kcalMeal = itens.reduce((s,it)=>s+it.kcal,0);
    return `
    <div class="meal-block">
      <div class="meal-header">
        <div class="title">${esc(r.nome)}</div>
        <div class="subtotal">${Math.round(kcalMeal)} kcal · C ${fmt1(carbMeal)}g</div>
      </div>
      ${itens.map(it=>`
        <div class="food-item">
          <div class="fi-name">${esc(it.nome)} <span class="fi-qty">${it.qtd}g</span></div>
          <div class="fi-kcal">C ${fmt1(it.carb)}g · ${Math.round(it.kcal)}kcal</div>
        </div>`).join('')}
    </div>`;
  }).join('');
  const overlay = document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">${esc(dd.nome)}</div>
      <div class="hero-stat" style="margin-bottom:16px;">
        <div class="box"><div class="num">${Math.round(tot.kcal)}</div><div class="lbl">kcal totais</div></div>
        <div class="box"><div class="num">${fmt1(tot.carb)}g</div><div class="lbl">carboidrato</div></div>
        <div class="box"><div class="num">${carbPct}%</div><div class="lbl">VET em carbo</div></div>
      </div>
      ${mealsHtml}
      <div class="card" style="background:var(--gold-light);border:none;">
        <div style="font-weight:700;font-size:12.5px;color:#7a4e00;margin-bottom:8px;">Orientações clínicas</div>
        ${dd.notas.map(n=>`<div style="font-size:12px;color:#5a3a00;margin-bottom:6px;line-height:1.45;">• ${esc(n)}</div>`).join('')}
      </div>
      <div class="btn-row" style="margin-top:6px;">
        <button class="btn btn-outline" onclick="closeModal()">Fechar</button>
        <button class="btn btn-primary" onclick="applyDiabetesDiet('${dd.id}')">Aplicar a paciente</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
}
function applyDiabetesDiet(id){
  const dd = DIABETES_DIETS.find(x=>x.id===id);
  if(!dd) return;
  closeModal();
  if(DATA.pacientes.length===0){
    const overlay = document.createElement('div');
    overlay.className='modal-overlay';
    overlay.innerHTML = `
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-title">Nenhum paciente cadastrado</div>
        <div style="font-size:13px;color:var(--muted);margin-bottom:16px;">Cadastre um paciente na aba <b>Pacientes</b> para aplicar esta dieta e gerar o PDF personalizado.</div>
        <button class="btn btn-primary" onclick="closeModal(); navTo('dashboard')">Ir para Pacientes</button>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
    return;
  }
  const overlay = document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Aplicar em qual paciente?</div>
      <div style="font-size:12.5px;color:var(--muted);margin-bottom:12px;">"${esc(dd.nome)}" será aberta no montador de dieta já preenchida, pronta para ajustar.</div>
      ${DATA.pacientes.map(p=>`
        <div class="patient-card" onclick="beginDiabetesDiet('${dd.id}','${p.id}')">
          <div class="avatar">${initials(p.nome)}</div>
          <div class="info">
            <div class="name">${esc(p.nome)}</div>
            <div class="meta">${p.idade||'—'} anos · ${p.dietas.length} dieta(s)</div>
          </div>
          <div style="font-size:20px;color:var(--emerald);">›</div>
        </div>`).join('')}
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
}
function beginDiabetesDiet(dietId, pacienteId){
  const dd = DIABETES_DIETS.find(x=>x.id===dietId);
  const p = DATA.pacientes.find(x=>x.id===pacienteId);
  if(!dd||!p) return;
  closeModal();
  STATE.builderMode = "diet";
  STATE.patientId = p.id;
  STATE.dietDraft = {
    id:uid(), pacienteId:p.id, nome:dd.nome, data:new Date().toISOString(),
    kcalMeta:dd.kcalAlvo,
    refeicoes: dd.refeicoes.map(r=>({ nome:r.nome, itens: r.itens.map(it=>computeItem(it.alimentoId,it.qtd)) })),
    _foodSearch:"",
  };
  STATE.view="dietBuilder";
  render();
}
async function saveDiabetesAsTemplate(id){
  const dd = DIABETES_DIETS.find(x=>x.id===id);
  if(!dd) return;
  if(DATA.templates.some(t=>t.nome===dd.nome)){ toast("Este template já está na biblioteca"); return; }
  DATA.templates.push({
    id:uid(), nome:dd.nome, kcalAlvo:dd.kcalAlvo,
    refeicoes: dd.refeicoes.map(r=>({ nome:r.nome, itens: r.itens.map(it=>({alimentoId:it.alimentoId, qtd:it.qtd})) })),
  });
  await saveData();
  toast("Salvo em Templates");
}

/* ============================================================
   TEMPLATES (biblioteca)
   ============================================================ */
function viewTemplates(){
  return `
    <button class="btn btn-gold" style="margin-bottom:16px;" onclick="startNewTemplate()">+ Criar novo template de dieta</button>
    ${DATA.templates.length===0? `<div class="empty-state"><div class="icon">📋</div>Nenhum template ainda.</div>` :
    DATA.templates.map(t=>{
      const tot = macroTotals(t.refeicoes.map(r=>({itens:r.itens.map(it=>computeItem(it.alimentoId,it.qtd))})));
      return `
      <div class="template-card" onclick="openEditTemplate('${t.id}')">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div style="flex:1;">
            <div class="tname">${esc(t.nome)}</div>
            <div class="tkcal">${Math.round(tot.kcal)} kcal · meta ${t.kcalAlvo}</div>
            <div class="tmeals">${t.refeicoes.length} refeições · P ${fmt1(tot.prot)}g · C ${fmt1(tot.carb)}g · G ${fmt1(tot.gord)}g</div>
          </div>
          <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); deleteTemplate('${t.id}')">Excluir</button>
        </div>
      </div>`;
    }).join('')}
    <div style="height:6px;"></div>
    <div class="empty-state" style="padding:16px; font-size:12.5px;">Toque em um template para editar. Eles ficam disponíveis automaticamente ao criar uma nova dieta para qualquer paciente.</div>
  `;
}
async function deleteTemplate(id){
  if(!confirm("Excluir este template?")) return;
  DATA.templates = DATA.templates.filter(t=>t.id!==id);
  await saveData();
  render();
}

/* ============================================================
   PERFIL DA NUTRICIONISTA + ASSINATURA
   ============================================================ */
function viewProfile(){
  const perfil = DATA.perfil;
  setTimeout(initSignaturePad, 0);
  return `
    <div class="card">
      <div class="section-title">Dados profissionais</div>
      <div class="field"><label>Nome</label><input id="pr-nome" value="${esc(perfil.nome)}"></div>
      <div class="field-row">
        <div class="field"><label>CRN</label><input id="pr-crn" value="${esc(perfil.crn)}"></div>
        <div class="field"><label>Clínica</label><input id="pr-clinica" value="${esc(perfil.clinica)}"></div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="saveProfile()">Salvar dados</button>
    </div>

    <div class="card">
      <div class="section-title">Assinatura digital</div>
      <div style="font-size:12.5px; color:var(--muted); margin-bottom:10px;">Assine uma vez — ela será aplicada automaticamente em todos os PDFs gerados.</div>
      <canvas id="sigCanvasProfile"></canvas>
      <div class="btn-row" style="margin-top:10px;">
        <button class="btn btn-outline btn-sm" onclick="clearSignature()">Limpar</button>
        <button class="btn btn-gold btn-sm" onclick="saveSignature()">Salvar assinatura</button>
      </div>
      ${DATA.assinatura? `<div style="margin-top:12px; font-size:12px; color:var(--emerald); font-weight:700;">✓ Assinatura salva</div>`:''}
    </div>

    <div style="text-align:center; padding:10px 0 2px; color:var(--muted); font-size:11.5px;">
      NutriApp · desenvolvido por
      <span class="mono" style="color:var(--forest); font-weight:600; letter-spacing:.02em;">N!coll@$</span>
    </div>
  `;
}
async function saveProfile(){
  DATA.perfil = {
    nome: document.getElementById('pr-nome').value,
    crn: document.getElementById('pr-crn').value,
    clinica: document.getElementById('pr-clinica').value,
  };
  await saveData();
  toast("Perfil salvo");
}
function initSignaturePad(){
  const canvas = document.getElementById('sigCanvasProfile');
  if(!canvas) return;
  const ratio = Math.max(window.devicePixelRatio||1,1);
  canvas.width = canvas.offsetWidth*ratio;
  canvas.height = canvas.offsetHeight*ratio;
  canvas.getContext('2d').scale(ratio,ratio);
  sigPad = new SignaturePad(canvas, { penColor:'#123832', backgroundColor:'rgba(255,255,255,1)' });
  if(DATA.assinatura){
    sigPad.fromDataURL(DATA.assinatura, {width:canvas.offsetWidth, height:canvas.offsetHeight});
  }
}
function clearSignature(){ if(sigPad) sigPad.clear(); }
async function saveSignature(){
  if(!sigPad || sigPad.isEmpty()){ toast("Desenhe sua assinatura primeiro"); return; }
  DATA.assinatura = sigPad.toDataURL('image/png');
  await saveData();
  toast("Assinatura salva");
  render();
}

/* ============================================================
   GERAÇÃO DE PDF
   ============================================================ */
function hexToRgb(hex){
  const n = parseInt(hex.replace('#',''),16);
  return [(n>>16)&255,(n>>8)&255,n&255];
}
function drawPdfHeader(doc, pageWidth, title){
  const [r,g,b] = hexToRgb('#123832');
  doc.setFillColor(r,g,b);
  doc.rect(0,0,pageWidth,70,'F');
  doc.setTextColor(255,255,255);
  doc.setFont('helvetica','bold');
  doc.setFontSize(18);
  doc.text(DATA.perfil.clinica || "NutriApp", 40, 32);
  doc.setFont('helvetica','normal');
  doc.setFontSize(10);
  doc.text(`${DATA.perfil.nome||"Nutricionista"}${DATA.perfil.crn? ' · CRN '+DATA.perfil.crn:''}`, 40, 48);
  doc.setFontSize(14);
  doc.setFont('helvetica','bold');
  doc.text(title, pageWidth-40, 40, {align:'right'});
  doc.setTextColor(20,30,26);
}
function drawPatientBlock(doc, p, y, pageWidth){
  const imc = calcIMC(p.peso,p.altura);
  const tmb = calcTMB(p.sexo,p.peso,p.altura,p.idade);
  const get = calcGET(tmb,p.nivelAtividade);
  const [er,eg,eb] = hexToRgb('#DCF3EA');
  doc.setFillColor(er,eg,eb);
  doc.roundedRect(40,y,pageWidth-80,86,6,6,'F');
  doc.setTextColor(18,56,50);
  doc.setFont('helvetica','bold'); doc.setFontSize(13);
  doc.text(p.nome, 54, y+22);
  doc.setFont('helvetica','normal'); doc.setFontSize(9.5);
  doc.text(`${p.idade||'—'} anos · ${p.sexo==='F'?'Feminino':'Masculino'} · Objetivo: ${goalLabel(p.objetivo)}`, 54, y+37);
  doc.text(`Peso: ${p.peso||'—'} kg   Altura: ${p.altura||'—'} cm`, 54, y+51);
  doc.setFont('helvetica','bold');
  doc.text(`IMC ${imc?fmt1(imc):'—'} (${imc?classifyIMC(imc):'—'})    TMB ${tmb?Math.round(tmb):'—'} kcal    GET ${get?Math.round(get):'—'} kcal`, 54, y+68);
  return y+86+16;
}
function drawMacroBar(doc, tot, y, pageWidth){
  const x0=40, w=pageWidth-80, h=16;
  const total = tot.prot*4 + tot.carb*4 + tot.gord*9 || 1;
  const segs = [
    {v:tot.prot*4, color:[30,156,130]},
    {v:tot.carb*4, color:[227,160,18]},
    {v:tot.gord*9, color:[194,72,59]},
  ];
  doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(18,56,50);
  doc.text(`Resumo: ${Math.round(tot.kcal)} kcal`, x0, y);
  let cx = x0;
  segs.forEach(s=>{
    const sw = (s.v/total)*w;
    doc.setFillColor(...s.color);
    doc.rect(cx, y+8, sw, h, 'F');
    cx += sw;
  });
  doc.setFontSize(9); doc.setFont('helvetica','normal'); doc.setTextColor(80,90,85);
  doc.text(`Proteína ${fmt1(tot.prot)}g   Carboidrato ${fmt1(tot.carb)}g   Gordura ${fmt1(tot.gord)}g   Fibra ${fmt1(tot.fibra||0)}g`, x0, y+8+h+13);
  return y+8+h+28;
}
function drawSignature(doc, pageWidth, pageHeight){
  const y = pageHeight-100;
  doc.setDrawColor(220,220,210);
  doc.line(40,y,pageWidth-40,y);
  if(DATA.assinatura){
    try{ doc.addImage(DATA.assinatura,'PNG', pageWidth/2-60, y+8, 120, 45); }catch(e){}
  }
  doc.setFontSize(9); doc.setTextColor(90,100,95); doc.setFont('helvetica','normal');
  doc.text(`${DATA.perfil.nome||"Nutricionista"}${DATA.perfil.crn? ' — CRN '+DATA.perfil.crn:''}`, pageWidth/2, y+62, {align:'center'});
}

function generateFichaPDF(p){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:'pt', format:'a4'});
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  drawPdfHeader(doc, pw, "Ficha do Paciente");
  let y = 96;
  y = drawPatientBlock(doc, p, y, pw);
  doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(18,56,50);
  doc.text("Histórico médico", 40, y); y+=16;
  doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(60,70,65);
  const histLines = doc.splitTextToSize(p.historico || "Não informado.", pw-80);
  doc.text(histLines, 40, y); y += histLines.length*12 + 16;
  if(p.restricoes && p.restricoes.length){
    doc.setFont('helvetica','bold'); doc.setTextColor(18,56,50); doc.text("Restrições alimentares", 40, y); y+=14;
    doc.setFont('helvetica','normal'); doc.setTextColor(60,70,65);
    doc.text(p.restricoes.join(', '), 40, y); y+=20;
  }
  if(p.alergias && p.alergias.length){
    doc.setFont('helvetica','bold'); doc.setTextColor(18,56,50); doc.text("Alergias", 40, y); y+=14;
    doc.setFont('helvetica','normal'); doc.setTextColor(60,70,65);
    doc.text(p.alergias.join(', '), 40, y); y+=20;
  }
  drawSignature(doc, pw, ph);
  return doc;
}

function generateDietaPDF(p, d){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:'pt', format:'a4'});
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  drawPdfHeader(doc, pw, d.nome);
  let y = 96;
  y = drawPatientBlock(doc, p, y, pw);
  const tot = macroTotals(d.refeicoes);
  y = drawMacroBar(doc, tot, y, pw);
  y += 8;
  d.refeicoes.forEach(r=>{
    if(y > ph-140){ doc.addPage(); y=50; }
    const mCarb = r.itens.reduce((s,it)=>s+(it.carb||0),0);
    const mKcal = r.itens.reduce((s,it)=>s+(it.kcal||0),0);
    doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(18,56,50);
    doc.text(r.nome.toUpperCase(), 40, y);
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(90,100,95);
    doc.text(`Carbo ${fmt1(mCarb)}g  ·  ${Math.round(mKcal)} kcal`, pw-40, y, {align:'right'});
    y+=6;
    doc.setDrawColor(230,230,220); doc.line(40,y,pw-40,y); y+=14;
    doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(50,60,55);
    if(r.itens.length===0){
      doc.setTextColor(150,155,150);
      doc.text("Nenhum alimento adicionado.", 46, y); y+=16;
    }
    r.itens.forEach(it=>{
      if(y > ph-140){ doc.addPage(); y=50; }
      doc.setTextColor(50,60,55);
      doc.text(`•  ${it.nome} — ${it.qtd}g`, 46, y);
      doc.text(`C ${fmt1(it.carb)}g  ·  ${Math.round(it.kcal)} kcal`, pw-46, y, {align:'right'});
      y+=15;
    });
    y+=10;
  });
  drawSignature(doc, pw, ph);
  return doc;
}

/* ---------------------- COMPARTILHAMENTO ---------------------- */
async function shareOrDownloadPDF(doc, filename){
  const blob = doc.output('blob');
  const file = new File([blob], filename, {type:'application/pdf'});
  if(navigator.canShare && navigator.canShare({files:[file]})){
    try{
      await navigator.share({ files:[file], title:filename, text:"Relatório gerado pelo NutriApp" });
      return;
    }catch(e){ /* usuário cancelou ou falhou — cai no fallback */ }
  }
  doc.save(filename);
  toast("PDF baixado. Use o menu de compartilhar do seu dispositivo para enviar por WhatsApp ou e-mail.");
}
function generateCompletoPDF(p){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:'pt', format:'a4'});
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  drawPdfHeader(doc, pw, "Relatório Completo");
  let y = 96;
  y = drawPatientBlock(doc, p, y, pw);

  doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(18,56,50);
  doc.text("Histórico médico", 40, y); y+=16;
  doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(60,70,65);
  const histLines = doc.splitTextToSize(p.historico || "Não informado.", pw-80);
  doc.text(histLines, 40, y); y += histLines.length*12 + 12;
  if(p.restricoes && p.restricoes.length){
    doc.setFont('helvetica','bold'); doc.setTextColor(18,56,50); doc.text("Restrições alimentares: ", 40, y);
    doc.setFont('helvetica','normal'); doc.setTextColor(60,70,65);
    doc.text(p.restricoes.join(', '), 158, y); y+=16;
  }
  if(p.alergias && p.alergias.length){
    doc.setFont('helvetica','bold'); doc.setTextColor(18,56,50); doc.text("Alergias: ", 40, y);
    doc.setFont('helvetica','normal'); doc.setTextColor(60,70,65);
    doc.text(p.alergias.join(', '), 90, y); y+=16;
  }
  y += 10;

  if(p.dietas.length===0){
    doc.setFont('helvetica','italic'); doc.setFontSize(10); doc.setTextColor(140,145,140);
    doc.text("Nenhuma dieta cadastrada para este paciente.", 40, y); y+=20;
  } else {
    p.dietas.forEach((d, di)=>{
      if(y > ph-160){ doc.addPage(); y=50; }
      doc.setFillColor(18,56,50);
      doc.roundedRect(40, y, pw-80, 22, 5, 5, 'F');
      doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(11);
      doc.text(`${di+1}. ${d.nome}`, 50, y+15);
      doc.setFontSize(9);
      doc.text(new Date(d.data).toLocaleDateString('pt-BR'), pw-50, y+15, {align:'right'});
      y += 22 + 12;

      const tot = macroTotals(d.refeicoes);
      y = drawMacroBar(doc, tot, y, pw);

      d.refeicoes.forEach(r=>{
        if(y > ph-140){ doc.addPage(); y=50; }
        const mCarb = r.itens.reduce((s,it)=>s+(it.carb||0),0);
        const mKcal = r.itens.reduce((s,it)=>s+(it.kcal||0),0);
        doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(18,56,50);
        doc.text(r.nome.toUpperCase(), 46, y);
        doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(90,100,95);
        doc.text(`Carbo ${fmt1(mCarb)}g  ·  ${Math.round(mKcal)} kcal`, pw-46, y, {align:'right'});
        y+=14;
        doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(60,70,65);
        if(r.itens.length===0){
          doc.setTextColor(150,155,150);
          doc.text("Nenhum alimento adicionado.", 52, y); y+=14;
        }
        r.itens.forEach(it=>{
          if(y > ph-140){ doc.addPage(); y=50; }
          doc.setTextColor(60,70,65);
          doc.text(`•  ${it.nome} — ${it.qtd}g`, 52, y);
          doc.text(`C ${fmt1(it.carb)}g  ·  ${Math.round(it.kcal)} kcal`, pw-46, y, {align:'right'});
          y+=13;
        });
        y+=6;
      });
      y += 10;
    });
  }
  drawSignature(doc, pw, ph);
  return doc;
}

function shareModalPaciente(){
  const p = currentPatient();
  const overlay = document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Compartilhar</div>
      <div style="font-size:13px;color:var(--muted); margin-bottom:16px;">Escolha o que deseja gerar em PDF para ${esc(p.nome)}.</div>
      <button class="btn btn-primary" style="margin-bottom:10px;" onclick="doShareCompleto()">📦 Tudo (ficha + todas as dietas)</button>
      <button class="btn btn-ghost" style="margin-bottom:10px;" onclick="doShareFicha()">📋 Somente a ficha</button>
      ${p.dietas.length? `<button class="btn btn-outline" onclick="doShareUltimaDieta()">🍽️ Somente a última dieta</button>`:''}
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
}
async function doShareCompleto(){
  const p = currentPatient();
  const doc = generateCompletoPDF(p);
  closeModal();
  await shareOrDownloadPDF(doc, `Relatorio_Completo_${p.nome.replace(/\s+/g,'_')}.pdf`);
}
async function doShareUltimaDieta(){
  const p = currentPatient();
  const d = p.dietas[p.dietas.length-1];
  const doc = generateDietaPDF(p, d);
  closeModal();
  await shareOrDownloadPDF(doc, `Dieta_${d.nome.replace(/\s+/g,'_')}_${p.nome.split(' ')[0]}.pdf`);
}
async function doShareFicha(){
  const p = currentPatient();
  const doc = generateFichaPDF(p);
  closeModal();
  await shareOrDownloadPDF(doc, `Ficha_${p.nome.replace(/\s+/g,'_')}.pdf`);
}
function shareModalDieta(){
  const overlay = document.createElement('div');
  overlay.className='modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Compartilhar Dieta</div>
      <div style="font-size:13px;color:var(--muted); margin-bottom:16px;">Gera um PDF completo com ficha, refeições, resumo de macros e assinatura digital.</div>
      <button class="btn btn-primary" onclick="doShareDieta()">Gerar e Compartilhar PDF</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
}
async function doShareDieta(){
  const d = STATE.dietDraft;
  const p = DATA.pacientes.find(x=>x.id===d.pacienteId);
  const doc = generateDietaPDF(p, d);
  closeModal();
  await shareOrDownloadPDF(doc, `Dieta_${d.nome.replace(/\s+/g,'_')}_${p.nome.split(' ')[0]}.pdf`);
}

/* ---------------------- BOOT ---------------------- */
(async function init(){
  await loadData();
  render();
})();
