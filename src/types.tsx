export interface DeckInfoSubjectiveField {
  value: number
  messages: string[]
}

export interface DeckInfo {
  playerName: string //?
  playerInitial: string //?
  cardNameList: string[]

  numCards: DeckInfoSubjectiveField
  totalMoney: DeckInfoSubjectiveField
  totalStops: DeckInfoSubjectiveField
  totalDraws: DeckInfoSubjectiveField
  totalExtraDraws: DeckInfoSubjectiveField
  totalActions: DeckInfoSubjectiveField
  totalTerminals: DeckInfoSubjectiveField
  totalExtraActions: DeckInfoSubjectiveField
  totalBuys: DeckInfoSubjectiveField
}