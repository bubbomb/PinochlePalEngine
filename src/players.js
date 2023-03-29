import { store } from './store.js'
import { v4 as uuidv4 } from 'uuid'

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

export const UpdatePlayer = (id, update) => {
  if (update.id !== undefined && update.id !== id) {
    throw new Error('Cannot change player id')
  }

  let names = new Set()

  let newPlayers = store.players.map((player) => {
    if (player.id === id) {
      return { ...player, ...update }
    }
    names.add(player.name)
    return player
  })

  if (update.name !== undefined && names.has(update.name)) {
    throw new Error('A player with this name already exists')
  }
  store.players = newPlayers
}

export const CreateNewPlayer = (name, options = {}) => {
  let newPlayer = {
    id: uuidv4(),
    name,
    ...options
  }
  AddPlayer(newPlayer)
  return newPlayer.id
}
