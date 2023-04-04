import { GetTeamIdFromPlayerId, GetTeams } from './teams.js'
import { store } from './store.js'

export const GetRounds = () => {
  return store.currentGame.rounds || []
}

export const GetCurrentRound = () => {
  if (!('rounds' in store.currentGame)) {
    store.currentGame.rounds = []
  }
  return store.currentGame.rounds[store.currentGame.rounds.length - 1]
}

export const StartNewRound = () => {
  if (!('rounds' in store.currentGame)) {
    store.currentGame.rounds = []
  }
  const newRoundTemplate = {
    bid: {},
    melds: {},
    tricks: {},
    calculatedTotal: {}
  }
  store.currentGame.rounds.push(newRoundTemplate)
}

export const AddBidToCurrentRound = (playerId, amount) => {
  if (!('rounds' in store.currentGame)) {
    store.currentGame.rounds = [{}]
  }
  let currentRound = GetCurrentRound()

  currentRound.bid = {
    player: playerId,
    team: GetTeamIdFromPlayerId(playerId),
    amount
  }
}

export const AddMeldToCurrentRound = (teamId, amount) => {
  if (!('rounds' in store.currentGame)) {
    store.currentGame.rounds = [{}]
  }
  let currentRound = GetCurrentRound()

  currentRound.melds = {
    ...currentRound.melds,
    [teamId]: amount
  }
}

export const AddTrickToCurrentRound = (teamId, amount) => {
  if (!('rounds' in store.currentGame)) {
    store.currentGame.rounds = [{ tricks: {} }]
  }
  let currentRound = GetCurrentRound()
  const teams = GetTeams()
  const totalTricks = getTotalTricks()
  teams.forEach((team) => {
    if (team.id === teamId) {
      currentRound.tricks[team.id] = amount
    } else {
      currentRound.tricks[team.id] = totalTricks - amount
    }
  })
}

const getTotalTricks = () => {
  if (!('settings' in store.currentGame)) {
    store.currentGame.settings = {}
  }
  return store.currentGame.settings.players === 6 ? 500 : 250
}

export const CalculateCurrentRoundTotal = () => {
  let currentRound = GetCurrentRound()
  if (!('calculatedTotal' in currentRound)) {
    currentRound.calculatedTotal = {}
  }

  const teams = GetTeams()
  const bidTeam = currentRound.bid.team
  const bidAmount = currentRound.bid.amount

  teams.forEach((team) => {
    let melds = currentRound.melds[team.id]
    let tricks = currentRound.tricks[team.id]

    let total = melds + tricks

    if (bidTeam === team.id && total < bidAmount) {
      currentRound.calculatedTotal[team.id] = bidAmount * -1
    } else if (tricks === 0) {
      currentRound.calculatedTotal[team.id] = 0
    } else {
      currentRound.calculatedTotal[team.id] = total
    }
  })
}
