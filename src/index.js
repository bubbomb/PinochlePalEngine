import {
  AddBidToCurrentRound,
  AddMeldToCurrentRound,
  AddTrickToCurrentRound,
  GetCurrentRound,
  GetRounds,
  StartNewRound
} from './rounds.js'
import {
  AddPlayer,
  CreateNewPlayer,
  GetPlayerById,
  GetPlayers,
  RemovePlayerById,
  SetPlayers,
  UpdatePlayer
} from './players.js'
import { GetTeamIdFromPlayerId, GetTeams } from './teams.js'
import { store } from './store.js'

export const App = (
  players = [],
  currentGame = {
    teams: [],
    rounds: [],
    settings: {}
  }
) => {
  store.players = players
  store.currentGame = currentGame
  return {
    GetPlayers,
    SetPlayers,
    AddPlayer,
    RemovePlayerById,
    GetPlayerById,
    UpdatePlayer,
    CreateNewPlayer,
    GetTeams,
    GetTeamIdFromPlayerId,
    AddBidToCurrentRound,
    GetRounds,
    StartNewRound,
    GetCurrentRound,
    AddMeldToCurrentRound,
    AddTrickToCurrentRound
  }
}
