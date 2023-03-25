import { App } from './index.js'

describe('player tests', () => {
  test('get players empty', () => {
    expect(App().GetPlayers()).toStrictEqual([])
  })

  test('get player', () => {
    const players = ['Carol']
    const pinochlePal = App(players)

    expect(pinochlePal.GetPlayers()).toEqual(players)
  })
  test('get players', () => {
    const players = ['Carol', 'Derek']
    const pinochlePal = App(players)

    expect(pinochlePal.GetPlayers()).toEqual(players)
  })

  test('set players', () => {
    const players = ['Carol', 'Derek']
    const pinochlePal = App()

    pinochlePal.SetPlayers(players)
    expect(pinochlePal.GetPlayers()).toEqual(players)
  })

  test('overwrite players', () => {
    const players = ['Carol', 'Derek']
    const pinochlePal = App(['Spencer'])

    pinochlePal.SetPlayers(players)
    expect(pinochlePal.GetPlayers()).toEqual(players)
  })

  test('add player', () => {
    const players = ['Carol', 'Derek']
    const pinochlePal = App(players)

    pinochlePal.AddPlayer('Spencer')
    let newPlayers = [...players, 'Spencer']
    const playersCheck = pinochlePal.GetPlayers()
    expect(playersCheck).toEqual(expect.arrayContaining(newPlayers))
    expect(playersCheck).toHaveLength(3)
  })
})
