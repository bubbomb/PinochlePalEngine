import {
  AddPlayer,
  GetPlayerById,
  GetPlayers,
  RemovePlayerById,
  SetPlayers
} from './players.js'
import { store } from './store.js'

export const App = (players = []) => {
  store.players = players
  return {
    GetPlayers,
    SetPlayers,
    AddPlayer,
    RemovePlayerById,
    GetPlayerById
  }
}
