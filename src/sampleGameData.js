export const AllPlayers = [
  { id: '1playerid', name: 'Carol' },
  { id: '2playerid', name: 'Derek' },
  { id: '3playerid', name: 'Spencer' },
  { id: '4playerid', name: 'Kristi' }
]

export const Team1 = {
  id: '1teamid',
  name: 'team1',
  members: ['1playerid', '2playerid']
}

export const Team2 = {
  id: '2teamid',
  name: 'team2',
  members: ['3playerid', '4playerid']
}

export const FourPlayerTeams = [Team1, Team2]
export const fourPlayerSettings = { playerCount: 4 }

const fourPlayerRound1 = {
  bid: {
    amount: 300,
    player: '1playerid',
    team: '1teamid'
  },
  melds: {
    '1teamid': 200,
    '2teamid': 60
  },
  tricks: {
    '1teamid': 210,
    '2teamid': 40
  },
  calculatedTotal: {
    '1teamid': 410,
    '2teamid': 100
  }
}

const fourPlayerRound2 = {
  bid: {
    amount: 310,
    player: '3playerid',
    team: '2teamid'
  },
  melds: {
    '1teamid': 100,
    '2teamid': 120
  },
  tricks: {
    '1teamid': 80,
    '2teamid': 170
  },
  calculatedTotal: {
    '1teamid': 180,
    '2teamid': -310
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
