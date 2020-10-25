export interface NumberReportModel {
  value: number
  messages: string[]
}

export interface CardListReportModel {
  cards: string[]
  messages: string[]
}

export interface DeckReportModel {
  playerName: string //?
  playerInitial: string //?
  cardNameList: string[]

  doesGain: CardListReportModel
  doesTrash: CardListReportModel
  isAttack: CardListReportModel
  
  card: NumberReportModel
  money: NumberReportModel
  stop: NumberReportModel
  draws: NumberReportModel
  extraDraws: NumberReportModel
  actions: NumberReportModel
  terminal: NumberReportModel
  extraActions: NumberReportModel
  buys: NumberReportModel
}