import { ExclamationCircleTwoTone } from "@ant-design/icons"
import { Popover, Statistic } from "antd"
import { Col, Row } from "jsxstyle"
import React, { FunctionComponent } from "react"
import { CardListReportModel } from "../types"
import { CardContainer } from "./CardContainer"

export interface CardListReportProps {
    title: string
    cardListReportModel: CardListReportModel
    tooltip?: string
    style?: {}
  }

export const CardListReport: FunctionComponent<CardListReportProps> = (props) => { 
  let {title, cardListReportModel, tooltip, style} = props;
  // This tooltip logic is the same as in NumberReport; won't combine for now
  let tooltipLineElements: JSX.Element[] = []
  if (tooltip){
    tooltipLineElements.push(
      <Row
      key={-1}
        fontSize={16}
        fontWeight={700}
        alignItems='center'
      >
        {tooltip}
      </Row>
    )
  }
  cardListReportModel.messages.forEach((s, i) => {
    tooltipLineElements.push(
      <Row
        fontSize={14}
        alignItems='center'
        key={i}
      >
        <ExclamationCircleTwoTone twoToneColor='#f07030' style={{marginRight: 4}}/>
        {s}
      </Row>
    )
  })
  let tooltipElement = (
    <Col
      fontSize={14}
    >
      {tooltipLineElements}
    </Col>
  )

  return (
    <Col style={{...style}}>
      <Popover
        content={tooltipElement}
      >
        <Row
          fontSize={16}
          color='#303030'
          fontWeight={500}
        >
          {title}
          {cardListReportModel.messages?.length
            ? <ExclamationCircleTwoTone twoToneColor='#f07030' style={{fontSize: 20}}/>
            : null
          }
        </Row>
      </Popover>
      <CardContainer
        cardNameList={cardListReportModel.value}
        cardHeight={100}
        style={{
          'marginTop': 10 
        }}
      />
    </Col>

  )

}

