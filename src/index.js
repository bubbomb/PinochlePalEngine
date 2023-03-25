export const App = (players = []) => {
  const GetPlayers = () => {
    return players
  }
  const SetPlayers = (newPlayers) => {
    players = newPlayers
  }
  const AddPlayer = (newPlayer) => {
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
