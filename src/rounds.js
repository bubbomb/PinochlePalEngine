import { GetTeamIdFromPlayerId, GetTeams } from './teams.js'
import { store } from './store.js'

export const GetRounds = () => {
  return store.currentGame.rounds || []
}

export const GetCurrentRound = () => {
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
  let teams = GetTeams()
  teams.forEach((team) => {
    if (team.id === teamId) {
      currentRound.tricks[team.id] = amount
    } else {
      currentRound.tricks[team.id] = 250 - amount
    }
  })
}
