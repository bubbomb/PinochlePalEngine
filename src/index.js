export const App = (players = []) => {
  const GetPlayers = () => {
    return players
  }
  const SetPlayers = (newPlayers) => {
    players = newPlayers
  }
  const AddPlayer = (newPlayer) => {
    if (newPlayer.id === undefined) { throw new Error('id is missing') }
    if (newPlayer.name === undefined) { throw new Error('name is missing') }
    if (players.find(player => player.id === newPlayer.id)) {
      throw new Error('a player with this id already exists')
    }
    if (players.find(player => player.name === newPlayer.name)) {
      throw new Error('a player with this name already exists')
    }
    players.push(newPlayer)
  }
  const RemovePlayerById = (id) => {
    players = players.filter(player => player.id !== id)
  }
  const GetPlayerById = (id) => {
    return players.find(player => player.id === id)
  }

  return {
    GetPlayers,
    SetPlayers,
    AddPlayer,
    RemovePlayerById,
    GetPlayerById
  }
}
