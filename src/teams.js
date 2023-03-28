import { GetPlayerById } from './players'
import { store } from './store.js'

export const GetTeams = () => {
  const teams = store.currentGame.teams.map((team) => {
    const updatedMembers = team.members.map((id) => GetPlayerById(id))
    return { ...team, members: updatedMembers }
  })
  return teams
}
