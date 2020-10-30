export interface NumberReportModel {
  value: number
  messages: string[]
}

export interface CardListReportModel {
  value: string[]
  messages: string[]
}

export interface DeckReportModel {
  playerName: string //?
  playerInitial: string //?
  cardNameList: string[]

  cardListReports: Map<string, CardListReportModel>
  numberReports: Map<string, NumberReportModel>
}