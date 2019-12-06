import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { StyleReset, StyleBase, Theme } from '@independent-software/typeui/styles';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';

import { Chart } from './Chart';
import { DefaultChart, DefaultLegend, DefaultCartesianGrid, IRechartsData, DefaultXAxis, DefaultYAxis, DefaultCartesianAxis, DefaultPolarGrid, DefaultPolarAngleAxis, DefaultPolarRadiusAxis, DefaultTooltip, DefaultLine, DefaultBar } from './Types';
import { Sidebar } from './controls/Sidebar';
import { Topbar } from './controls/Topbar';
import { Bottombar } from './controls/Botombar';

interface IAppProps {
  className?: string;
}

class AppBase extends React.Component<IAppProps, IRechartsData> {
  constructor(props: any) {
    super(props);
    this.state = {
      timer: 0,
      base: { type: 'ComposedChart' },
      chart: DefaultChart,
      areas: [],
      bars: [ { ...DefaultBar, dataKey: 'mass', fill: 'steelblue' } ],
      lines: [ { ...DefaultLine, stroke: 'orange' } ],
      pies: [],
      radars: [],
      radialBars: [],
      scatters: [],
      legend: DefaultLegend,
      tooltip: DefaultTooltip,
      xaxis: DefaultXAxis,
      yaxis: DefaultYAxis,
      polarGrid: DefaultPolarGrid,
      polarAngleAxis: DefaultPolarAngleAxis,
      polarRadiusAxis: DefaultPolarRadiusAxis,
      cartesianGrid: DefaultCartesianGrid,
      cartesianAxis: DefaultCartesianAxis,
      referenceLines: [],
      referenceDots: [],
      referenceAreas: []
    }
  }

  // On every update, we set a random time value.
  // It is used as the chart's key property, to make
  // sure that it redraws itself on every change.
  onUpdate = (name: any, data: any) => {
    this.setState({
      timer: Date.now(), 
      [name]: data
    } as IRechartsData);
  }

  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        <Topbar/>
        <Sidebar rechart={this.state} onUpdate={this.onUpdate}/>
        <Chart rechart={this.state}/>
      </div>
    );
  }
}

const App = styled(AppBase)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

/* Make sure vertical scrollbar always appears: */
const Scrollable = createGlobalStyle`
  body {
    overflow-y: scroll;
  }
`;

ReactDOM.render(
  (<React.Fragment>
    <StyleReset/>
    <StyleBase/>
    <Scrollable/>
    <ThemeProvider theme={Theme}>
      <App/>
    </ThemeProvider>
  </React.Fragment>),
  document.getElementById('root'));

// Whenever webpack rebuilds the project, refresh the browser.
declare let module: any;
if (module.hot) {
  module.hot.accept(); 
}
