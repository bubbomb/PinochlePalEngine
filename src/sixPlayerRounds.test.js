import {
  AllPlayers,
  Player1,
  SixPlayerTeam1,
  SixPlayerTeam2,
  SixPlayerTeams
} from './sampleGameData'
import { App } from './index.js'

describe('6 player round tests', () => {
  test('calculate totals', () => {
    const round = {
      bid: {
        amount: 800,
        player: Player1.id,
        team: SixPlayerTeam1.id
      },
      melds: {
        [SixPlayerTeam1.id]: 600,
        [SixPlayerTeam2.id]: 150
      },
      tricks: {
        [SixPlayerTeam1.id]: 300,
        [SixPlayerTeam2.id]: 200
      }
    }
    const pinochlePal = App([...AllPlayers], {
      teams: [...SixPlayerTeams],
      rounds: [{ ...round }],
      settings: {
        players: 6
      }
    })
    pinochlePal.CalculateCurrentRoundTotal()
    const expectedTotal = {
      [SixPlayerTeam1.id]: 900,
      [SixPlayerTeam2.id]: 350
    }
    expect(pinochlePal.GetCurrentRound().calculatedTotal).toEqual(expectedTotal)
  })

  test('add tricks to current round', () => {
    const pinochlePal = App([...AllPlayers], {
      teams: [...SixPlayerTeams],
      settings: {
        players: 6
      }
    })
    pinochlePal.AddTrickToCurrentRound(SixPlayerTeam1.id, 200)

    const expectedTricks = {
      [SixPlayerTeam1.id]: 200,
      [SixPlayerTeam2.id]: 300
    }
    expect(pinochlePal.GetCurrentRound().tricks).toEqual(expectedTricks)
  })
})
