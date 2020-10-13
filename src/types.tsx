export interface DeckInfoSubjectiveField {
  value: number
  messages: string[]
}

export interface DeckInfo {
  playerName: string //?
  playerInitial: string //?
  cardNameList: string[]
  numCards: number

  totalMoney: DeckInfoSubjectiveField
  totalStops: DeckInfoSubjectiveField
  totalDraw: DeckInfoSubjectiveField
  totalExtraDraw: DeckInfoSubjectiveField
  totalActions: DeckInfoSubjectiveField
  totalTerminals: DeckInfoSubjectiveField
  totalExtraActions: DeckInfoSubjectiveField
  totalBuys: DeckInfoSubjectiveField
}