export interface NumberReport {
  value: number
  messages: string[]
}

export interface CardListReport {
  cards: string[]
  messages: string[]
}

export interface DeckReport {
  playerName: string //?
  playerInitial: string //?
  cardNameList: string[]

  numberReports: {}
  cardListReports: {}
}