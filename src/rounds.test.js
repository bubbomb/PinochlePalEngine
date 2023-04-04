import {
  AllPlayers,
  FourPlayerRounds,
  FourPlayerStartedGame,
  FourPlayerTeam1,
  FourPlayerTeam2,
  FourPlayerTeams,
  Player1,
  Player3
} from './sampleGameData'
import { App } from './index.js'

describe('round function tests', () => {
  test('get rounds empty', () => {
    const pinochlePal = App([...AllPlayers], { teams: FourPlayerTeams })
    expect(pinochlePal.GetRounds()).toEqual([])
  })

  test('get rounds', () => {
    const pinochlePal = App([...AllPlayers], {
      teams: FourPlayerTeams,
      rounds: FourPlayerRounds
    })
    expect(pinochlePal.GetRounds()).toEqual(FourPlayerRounds)
  })

  test('start new round', () => {
    const pinochlePal = App([...AllPlayers], { teams: FourPlayerTeams })
    pinochlePal.StartNewRound()
    const expectedRound = {
      bid: {},
      melds: {},
      tricks: {},
      calculatedTotal: {}
    }
    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('start new round with rounds that already exist', () => {
    const pinochlePal = App([...AllPlayers], {
      teams: { ...FourPlayerTeams },
      rounds: [...FourPlayerRounds]
    })
    pinochlePal.StartNewRound()

    expect(pinochlePal.GetRounds()).toHaveLength(3)
  })

  test('get current round', () => {
    const pinochlePal = App([...AllPlayers], {
      teams: FourPlayerTeams,
      rounds: FourPlayerRounds
    })
    expect(pinochlePal.GetCurrentRound()).toEqual(
      FourPlayerRounds[FourPlayerRounds.length - 1]
    )
  })

  test('add bid to round', () => {
    const pinochlePal = App([...AllPlayers], { teams: FourPlayerTeams })
    const player = AllPlayers[0]
    pinochlePal.AddBidToCurrentRound(player.id, 200)
    const expectedRound = {
      bid: {
        amount: 200,
        player: player.id,
        team: FourPlayerTeam1.id
      }
    }
    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('add meld to round', () => {
    const pinochlePal = App([...AllPlayers], { teams: FourPlayerTeams })
    pinochlePal.AddMeldToCurrentRound(FourPlayerTeam1.id, 250)
    const expectedRound = {
      melds: {
        [FourPlayerTeam1.id]: 250
      }
    }

    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('add melds to round', () => {
    const pinochlePal = App([...AllPlayers], { teams: FourPlayerTeams })
    pinochlePal.AddMeldToCurrentRound(FourPlayerTeam1.id, 250)
    pinochlePal.AddMeldToCurrentRound(FourPlayerTeam2.id, 350)
    const expectedRound = {
      melds: {
        [FourPlayerTeam1.id]: 250,
        [FourPlayerTeam2.id]: 350
      }
    }

    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('add trick to round', () => {
    const pinochlePal = App([...AllPlayers], { teams: FourPlayerTeams })
    pinochlePal.AddTrickToCurrentRound(FourPlayerTeam1.id, 50)
    const expectedRound = {
      tricks: {
        [FourPlayerTeam1.id]: 50,
        [FourPlayerTeam2.id]: 200
      }
    }

    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  test('add conflicting tricks to round', () => {
    const pinochlePal = App([...AllPlayers], { teams: FourPlayerTeams })
    pinochlePal.AddTrickToCurrentRound(FourPlayerTeam1.id, 50)
    pinochlePal.AddTrickToCurrentRound(FourPlayerTeam2.id, 180)
    const expectedRound = {
      tricks: {
        [FourPlayerTeam1.id]: 70,
        [FourPlayerTeam2.id]: 180
      }
    }

    expect(pinochlePal.GetRounds()).toEqual([expectedRound])
  })

  describe('calculate total', () => {
    const round = {
      bid: {
        amount: 250,
        player: Player1.id,
        team: FourPlayerTeam1.id
      },
      melds: {
        [FourPlayerTeam1.id]: 200,
        [FourPlayerTeam2.id]: 100
      },
      tricks: {
        [FourPlayerTeam1.id]: 170,
        [FourPlayerTeam2.id]: 80
      },
      calculatedTotal: {}
    }

    test('round exceeded bid', () => {
      const pinochlePal = App([...AllPlayers], {
        teams: FourPlayerTeams,
        rounds: [{ ...round }]
      })
      pinochlePal.CalculateCurrentRoundTotal()

      const expectedTotal = {
        [FourPlayerTeam1.id]: 370,
        [FourPlayerTeam2.id]: 180
      }
      expect(pinochlePal.GetCurrentRound().calculatedTotal).toEqual(
        expectedTotal
      )
    })

    test('round missed bid', () => {
      const pinochlePal = App([...AllPlayers], {
        teams: FourPlayerTeams,
        rounds: [
          {
            ...round,
            bid: {
              amount: 250,
              player: Player3.id,
              team: FourPlayerTeam2.id
            }
          }
        ]
      })
      pinochlePal.CalculateCurrentRoundTotal()
      const expectedTotal = {
        [FourPlayerTeam1.id]: 370,
        [FourPlayerTeam2.id]: -250
      }
      expect(pinochlePal.GetCurrentRound().calculatedTotal).toEqual(
        expectedTotal
      )
    })
    test('round no tricks', () => {
      const pinochlePal = App([...AllPlayers], {
        teams: FourPlayerTeams,
        rounds: [
          {
            ...round,
            tricks: {
              [FourPlayerTeam1.id]: 170,
              [FourPlayerTeam2.id]: 0
            }
          }
        ]
      })
      pinochlePal.CalculateCurrentRoundTotal()
      const expectedTotal = {
        [FourPlayerTeam1.id]: 370,
        [FourPlayerTeam2.id]: 0
      }
      expect(pinochlePal.GetCurrentRound().calculatedTotal).toEqual(
        expectedTotal
      )
    })
  })
})

describe('test multi-function round flow', () => {
  test('add new round to started game and add BMT to it', () => {
    const pinochlePal = App([...AllPlayers], {
      ...FourPlayerStartedGame.currentGame
    })

    pinochlePal.StartNewRound()
    const expectedNewRound = {
      bid: {},
      melds: {},
      tricks: {},
      calculatedTotal: {}
    }
    expect(pinochlePal.GetCurrentRound()).toEqual(expectedNewRound)
    expect(pinochlePal.GetRounds()).toHaveLength(3)

    pinochlePal.AddBidToCurrentRound(Player1.id, 250)
    pinochlePal.AddMeldToCurrentRound(FourPlayerTeam1.id, 200)
    pinochlePal.AddMeldToCurrentRound(FourPlayerTeam2.id, 100)
    pinochlePal.AddTrickToCurrentRound(FourPlayerTeam1.id, 170)

    const expectedFinishedRound = {
      bid: {
        amount: 250,
        player: Player1.id,
        team: FourPlayerTeam1.id
      },
      melds: {
        [FourPlayerTeam1.id]: 200,
        [FourPlayerTeam2.id]: 100
      },
      tricks: {
        [FourPlayerTeam1.id]: 170,
        [FourPlayerTeam2.id]: 80
      },
      calculatedTotal: {}
    }
    expect(pinochlePal.GetCurrentRound()).toEqual(expectedFinishedRound)
    expect(pinochlePal.GetRounds()[0]).toEqual(FourPlayerRounds[0])
    expect(pinochlePal.GetRounds()[1]).toEqual(FourPlayerRounds[1])
  })
})
