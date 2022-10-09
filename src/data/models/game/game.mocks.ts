import { GameHistory, GameStatus, Player } from "./game.contracts";
import {
  Alien,
  Analyze,
  Assembly,
  Atom,
  AugmentedReality, Baguette, BallBaseball,
  BallBasketball,
  BallBowling,
  BallFootball, BallVolleyball, Barrel, BrandAmongus, BrandTelegram
} from "tabler-icons-react";


export const DailyMock = [
  {
    id: 0,
    title: 'Боевая машина',
    description: 'Победить или взять ничью 4 раза, игаря второй ход',
    done: 2,
    total: 4,
    finished: false,
    reward: 8,
  },
  {
    id: 1,
    title: 'Дипломат',
    description: '10 раз завершить игру ничьей',
    done: 7,
    total: 10,
    finished: false,
    reward: 5,
  },
  {
    id: 2,
    title: 'Грандмастер',
    description: '10 раз завершить игру победой',
    done: 10,
    total: 10,
    finished: true,
    reward: 10,
  },
]

export const AchievementsMock = [
  {
    id: 0,
    title: 'Big daddy',
    description: 'Сыграть игру на поле 12x12'
  },
  {
    id: 1,
    title: 'Маэстро-сто',
    description: 'Ни разу не проиграть, сыграв 100 игр подряд'
  },
]

export const GamesMock: GameHistory[] = [
  {
    id: '1',
    rank: 3,
    winCondition: 3,
    firstTurn: Player.BOT,
    history: [2, 3, 5, 7],
    lastPosition: [0, 0, 1, 2, 0, 1, 0, 2, 0],
    timestamp: new Date(Date.now()).toDateString(),
    status: GameStatus.FINISHED_DRAW,
  },
  {
    id: '2',
    rank: 3,
    winCondition: 3,
    firstTurn: Player.PLAYER,
    history: [2, 3, 5, 7],
    lastPosition: [0, 0, 1, 2, 0, 1, 0, 2, 0],
    timestamp: new Date(Date.now()).toDateString(),
    status: GameStatus.UNFINISHED,
  },
  {
    id: '3',
    rank: 5,
    winCondition: 3,
    firstTurn: Player.PLAYER,
    history: [2, 3, 5, 7],
    lastPosition: [
      0, 0, 1, 2, 0,
      1, 0, 2, 0, 0,
      1, 0, 2, 2, 2,
      1, 0, 1, 1, 0,
      1, 0, 2, 0, 0,
    ],
    timestamp: new Date(Date.now()).toDateString(),
    status: GameStatus.FINISHED_WIN,
  },
  {
    id: '4',
    rank: 15,
    winCondition: 5,
    firstTurn: Player.PLAYER,
    history: [2, 3, 5, 7],
    lastPosition: [
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
      0, 0, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0, 0,
    ],
    timestamp: new Date(Date.now()).toDateString(),
    status: GameStatus.FINISHED_LOSE,
  },
  {
    id: '5',
    rank: 3,
    winCondition: 3,
    firstTurn: -1,
    history: [2, 3, 5, 7],
    lastPosition: [0, 0, 1, 2, 0, 1, 0, 2, 0],
    timestamp: new Date(Date.now()).toDateString(),
    status: -1,
  },
];

export const SkinsMock = [
  {
    id: 0,
    price: 29,
    title: 'Alien',
    description: 'Зелёные человечки покажут, кто здесь главный.',
    photo: Alien
  },
  {
    id: 1,
    price: 29,
    title: 'Analyze',
    description: 'Макс, анализ.',
    photo: Analyze
  },
  {
    id: 2,
    price: 29,
    title: 'Assembly',
    description: 'MASM, TASM, NASM, WASM...',
    photo: Assembly,
    bought: true,
  },
  {
    id: 3,
    price: 29,
    title: 'Atom',
    description: 'Это про Prolog или про Recoil?',
    photo: Atom
  },
  {
    id: 4,
    price: 29,
    title: 'Augmented Reality',
    description: 'Коробка в рамках.',
    photo: AugmentedReality
  },
  {
    id: 5,
    price: 29,
    title: 'Basketball',
    description: 'Высокий? Любишь отбивать? Высоко прыгаешь?',
    photo: BallBasketball
  },
  {
    id: 6,
    price: 29,
    title: 'Bowling',
    description: 'Любите катать шары? Мы идём к вам!',
    photo: BallBowling,
    bought: true,
  },
  {
    id: 7,
    price: 29,
    title: 'Football',
    description: 'Для тех, кто любит гонять мяч при помощи ног.',
    photo: BallFootball
  },
  {
    id: 8,
    price: 29,
    title: 'Baseball',
    description: 'Главное не перепутать биту и клюшку для гольфа, как Кейчи...',
    photo: BallBaseball
  },
  {
    id: 9,
    price: 29,
    title: 'Volleyball',
    description: 'Стандарт. Играл каждый.',
    photo: BallVolleyball
  },
  {
    id: 10,
    price: 29,
    title: 'Baguette',
    description: 'Сражение по-французски.',
    photo: Baguette,
    bought: true,
  },
  {
    id: 11,
    price: 29,
    title: 'Barrel',
    description: 'Следишь за стоимостью нефти?',
    photo: Barrel,
    bought: true,
  },
  {
    id: 12,
    price: 29,
    title: 'Amogus',
    description: '~-Амогус-~ Ту-ду-ду ту-ду-ду... ту-дуду...',
    photo: BrandAmongus
  },
  {
    id: 13,
    price: 29,
    title: 'Telegram',
    description: 'Любитель бумажных самолётиков?',
    photo: BrandTelegram
  }
]

export const PlayersOnlineMock = [
  {
    id: 'asdsa12312wdqesdaier2eds3jcicr3',
    login: 'bishkek22',
    mmr: 653,
    photo: 'https://www.meme-arsenal.com/memes/cb46c8964c4e300690e52d6bfde3bd2e.jpg',
    isBot: false,
  },
  {
    id: 'asdsa12312wdqesdqwewe2982838111',
    login: 'urs_tauKita27',
    mmr: 1780,
    photo: 'https://memepedia.ru/wp-content/uploads/2019/07/chilipizdrik-14.jpg',
    isBot: false,
  },
  {
    id: 'asdfsdxzxxxxxxcxcier2eds3jcicr3',
    login: 'Олег Лихогуб',
    mmr: 4621,
    photo: 'https://sun2-11.userapi.com/impg/uwhfz_44JjlOSJsy0a4a_r4Bu9TLxjUU6n6AEA/BVnW7jOO1wo.jpg?size=1080x1080&quality=95&sign=f58939dad81770f2f0bfe0a434990925&type=album',
    isBot: false,
  },
  {
    id: 'asdsa12312wdqe111111111111ic22',
    login: 'Текст текст',
    mmr: 3205,
    photo: 'https://sun9-6.userapi.com/impf/c855420/v855420444/15bd61/qx64UOB0H_Y.jpg?size=604x480&quality=96&sign=34ce82b016f9bdcb617ae972c7b1a22a&type=album',
    isBot: false,
  },
  {
    id: 'id_bot_vasiliy_1000',
    login: 'Бот Василий',
    mmr: 1000,
    photo: 'https://st3.depositphotos.com/8950810/17657/v/450/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg',
    isBot: true,
  },
  {
    id: 'id_bot_yang_3000',
    login: 'Бот Ян',
    mmr: 3000,
    photo: 'https://media.istockphoto.com/vectors/chatbot-icon-bot-sign-or-symbol-cute-robot-head-speaks-vector-id1334639872?k=20&m=1334639872&s=170667a&w=0&h=__xU5OnhZTfzuYD-NKk6JITg_-FELJFO2VEpuLDemLQ=',
    isBot: true,
  },
  {
    id: 'id_bot_magnus_5000',
    login: 'Бот Магнус',
    mmr: 5000,
    photo: 'https://previews.123rf.com/images/gmast3r/gmast3r1801/gmast3r180101022/94046703-chatter-bot-cute-robot-icon-in-speech-bubble-icon-concept-of-chatbot-or-chat-bottechnology-flat-vect.jpg',
    isBot: true,
  },
]