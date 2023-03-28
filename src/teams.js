import { GetPlayerById } from './players'
import { store } from './store.js'

export const GetTeams = () => {
  const teams = store.currentGame.teams.map((team) => {
    const updatedMembers = team.members.map((id) => GetPlayerById(id))
    return { ...team, members: updatedMembers }
  })
  return teams
}

export const GetTeamIdFromPlayerId = (playerId) => {
  let teamId
  store.currentGame.teams.forEach((team) => {
    if (team.members.find((id) => id === playerId)) {
      teamId = team.id
    }
  })
  return teamId
}
