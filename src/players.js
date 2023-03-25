import { store } from './store.js'

export const GetPlayers = () => {
  return store.players
}

export const SetPlayers = (newPlayers) => {
  store.players = newPlayers
}

export const AddPlayer = (newPlayer) => {
  if (newPlayer.id === undefined) {
    throw new Error('id is missing')
  }
  if (newPlayer.name === undefined) {
    throw new Error('name is missing')
  }
  if (store.players.find((player) => player.id === newPlayer.id)) {
    throw new Error('a player with this id already exists')
  }
  if (store.players.find((player) => player.name === newPlayer.name)) {
    throw new Error('a player with this name already exists')
  }
  store.players.push(newPlayer)
}

export const RemovePlayerById = (id) => {
  store.players = store.players.filter((player) => player.id !== id)
}

export const GetPlayerById = (id) => {
  return store.players.find((player) => player.id === id)
}
