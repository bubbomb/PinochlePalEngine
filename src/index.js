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

  return {
    GetPlayers,
    SetPlayers,
    AddPlayer
  }
}
