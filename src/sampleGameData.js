export const Player1 = { id: '1playerid', name: 'Carol' }
export const Player2 = { id: '2playerid', name: 'Derek' }
export const Player3 = { id: '3playerid', name: 'Spencer' }
export const Player4 = { id: '4playerid', name: 'Kristi' }

export const AllPlayers = [
  { ...Player1 },
  { ...Player2 },
  { ...Player3 },
  { ...Player4 }
]

export const Team1 = {
  id: '1teamid',
  name: 'team1',
  members: [Player1.id, Player2.id]
}

export const Team2 = {
  id: '2teamid',
  name: 'team2',
  members: [Player3.id, Player4.id]
}

export const FourPlayerTeams = [Team1, Team2]
export const fourPlayerSettings = { playerCount: 4 }

const fourPlayerRound1 = {
  bid: {
    amount: 300,
    player: Player1.id,
    team: Team1.id
  },
  melds: {
    [Team1.id]: 200,
    [Team2.id]: 60
  },
  tricks: {
    [Team1.id]: 210,
    [Team2.id]: 40
  },
  calculatedTotal: {
    [Team1.id]: 410,
    [Team2.id]: 100
  }
}

const fourPlayerRound2 = {
  bid: {
    amount: 310,
    player: Player3.id,
    team: Team2.id
  },
  melds: {
    [Team1.id]: 100,
    [Team2.id]: 120
  },
  tricks: {
    [Team1.id]: 80,
    [Team2.id]: 170
  },
  calculatedTotal: {
    [Team1.id]: 180,
    [Team2.id]: -310
  }
}

export const FourPlayerRounds = [
  { ...fourPlayerRound1 },
  { ...fourPlayerRound2 }
]

export const FourPlayerStartedGame = {
  players: [...AllPlayers],
  currentGame: {
    teams: [...FourPlayerTeams],
    rounds: [...FourPlayerRounds],
    settings: { ...fourPlayerSettings }
  }
}
