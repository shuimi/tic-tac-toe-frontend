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