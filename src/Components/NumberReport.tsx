import { ExclamationCircleTwoTone } from '@ant-design/icons'
import { Popover, Statistic } from 'antd'
import { Col, Row } from 'jsxstyle'
import React, { FunctionComponent } from 'react'
import { NumberReportModel } from '../types'

export interface NumberReportProps {
    title: string
    numberReportModel: NumberReportModel
    tooltip?: string
    precision?: number
    valueStyle?: Record<string, unknown>
    style?: Record<string, unknown>
  }

export const NumberReport: FunctionComponent<NumberReportProps> = (props: NumberReportProps) => { 
  const tooltipLineElements: JSX.Element[] = []
  if (props.tooltip){
    tooltipLineElements.push(
      <Row
        key={-1}
        fontSize={16}
        fontWeight={700}
        alignItems='center'
      >
        {props.tooltip}
      </Row>
    )
  }
  props.numberReportModel.messages.forEach((s, i) => {
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
  const tooltipElement = (
    <Col
      fontSize={14}
    >
      {tooltipLineElements}
    </Col>
  )
  return (
    <Popover
      content={tooltipElement}
    >
      <Statistic
        title={props.title}
        value={props.numberReportModel.value}
        valueStyle={props.valueStyle}
        precision={props.precision}
        style={{
          pointerEvents: (tooltipLineElements.length ? 'auto' : 'none'), // Disable tooltip when there's no content to show
          ...props.style
        }} 
        suffix={props.numberReportModel.messages?.length ? <ExclamationCircleTwoTone twoToneColor='#f07030' style={{fontSize: 20}}/> : null}
      />
    </Popover>
  )

}

