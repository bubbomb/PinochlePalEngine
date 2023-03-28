import {
  AddPlayer,
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
  currentGame = { teams: [], rounds: [], settings: {} }
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
    GetTeams,
    GetTeamIdFromPlayerId
  }
}
