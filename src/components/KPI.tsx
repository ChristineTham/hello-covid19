import React from 'react'

interface IKPI {
  color: string;
  background: string;
  title: string;
  kpi: number;
  change: number;
}

export const KPI: React.FC<IKPI> = (props: IKPI) => (
  <div className={'card ' + props.background}>
    <div className="card-content">
      <span className="card-title">{props.title}</span>
      <div style={{ color: props.color, textAlign: 'center', fontSize: 64, fontWeight: 'bold' }}>
        {props.kpi.toLocaleString()}
      </div>
      <p>
        Growth from previous day:&nbsp;
        <span style={{ color: props.color }}>
          {props.change.toLocaleString()}
          ({(props.change * 100 / (props.kpi - props.change)).toFixed(1) + '%'})
        </span>
      </p>
    </div>
  </div>
)
