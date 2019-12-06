import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IRechartsData, TChartType, IXAxis, ILegend, ICartesianGrid, IChart, IYAxis, ICartesianAxis, IPolarGrid, IRadar, IPolarAngleAxis, IPolarRadiusAxis, ITooltip, ILine, IArea, IBar, IPie, IRadialBar } from "./Types";
import { AreaChart, BarChart, ComposedChart, PieChart, RadarChart, RadialBarChart, ScatterChart, Treemap, LineChart, XAxis, YAxis, Legend, CartesianGrid, Line, Bar, Area, Rectangle, CartesianAxis, ReferenceLine, ReferenceDot, ReferenceArea, Pie, Scatter, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadialBar, Tooltip } from "recharts";

class Builder {

  // Given an object, return a new object with all
  // null values removed.
  static removeNulls = (props: object): object => {
    let result: object = {};
    Object.keys(props)
      .filter(k => (props as any)[k] !== null)
      .forEach(k => { (result as any)[k] = (props as any)[k] } );
    return result;
  }

  // Given an object, return a copy of it with some
  // fields removed.
  static copyExcept = (props: object, fields: string[]): object => {
    let result: object = {};
    Object.keys(props)
      .filter(k => !fields.includes(k))
      .forEach(k => { (result as any)[k] = (props as any)[k] } );
    return result;
  }

  static buildXAxis = (xaxis: IXAxis): React.ReactNode => {
    let props = Builder.copyExcept(Builder.removeNulls(xaxis), ["active", "paddingLeft", "paddingRight"]);
    // Add padding:
    if(xaxis.paddingLeft || xaxis.paddingRight) {
      (props as any).padding = {};
      if(xaxis.paddingLeft) (props as any).padding.left = xaxis.paddingLeft;
      if(xaxis.paddingRight) (props as any).padding.right = xaxis.paddingRight;
    }
    // Create node:
    return xaxis.active ? <XAxis key="xaxis" {...props}/> : null;
  }

  static buildYAxis = (yaxis: IYAxis): React.ReactNode => {
    let props = Builder.copyExcept(Builder.removeNulls(yaxis), ["active", "paddingTop", "paddingBottom"]);
    // Add padding:
    if(yaxis.paddingTop || yaxis.paddingBottom) {
      (props as any).padding = {};
      if(yaxis.paddingTop) (props as any).padding.top = yaxis.paddingTop;
      if(yaxis.paddingBottom) (props as any).padding.bottom = yaxis.paddingBottom;
    }
    // Create node:
    return yaxis.active ? <YAxis key="yaxis" {...props}/> : null;
  }

  static buildLegend = (legend: ILegend): React.ReactNode => {
    // Create node:
    return legend.active ? <Legend key="legend" {...Builder.removeNulls(Builder.copyExcept(legend, ['active']))}/> : null;
  }

  static buildTooltip = (tooltip: ITooltip): React.ReactNode => {
    // Create node:
    return tooltip.active ? <Tooltip key="tooltip" {...Builder.removeNulls(Builder.copyExcept(tooltip, ['active']))}/> : null;
  }  

  static buildPolarGrid = (polarGrid: IPolarGrid, radars: IRadar[]): React.ReactNode => {
    // Create node:
    return (polarGrid.active && radars.length > 0) ? <PolarGrid key="polarGrid" {...Builder.removeNulls(Builder.copyExcept(polarGrid, ['active']))}/> : null;
  }

  static buildPolarAngleAxis = (polarAngleAxis: IPolarAngleAxis): React.ReactNode => {
    // Create node:
    return polarAngleAxis.active ? <PolarAngleAxis key="polarAngleAxis" {...Builder.removeNulls(Builder.copyExcept(polarAngleAxis, ['active'])) as IPolarAngleAxis}/> : null;
  }  

  static buildPolarRadiusAxis = (polarRadiusAxis: IPolarRadiusAxis, radars: IRadar[]): React.ReactNode => {
    // Create node:
    return (polarRadiusAxis.active && radars.length > 0) ? <PolarRadiusAxis key="polarRadiusAxis" {...Builder.removeNulls(Builder.copyExcept(polarRadiusAxis, ['active']))}/> : null;
  }    

  static buildCartesianGrid = (cartesianGrid: ICartesianGrid): React.ReactNode => {
    // Create node:
    return cartesianGrid.active ? <CartesianGrid key="cartesianGrid" {...Builder.removeNulls(Builder.copyExcept(cartesianGrid, ['active']))}/> : null
  }

  static buildCartesianAxis = (cartesianAxis: ICartesianAxis): React.ReactNode => {
    // Create node:
    return cartesianAxis.active ? <CartesianAxis key="cartesianAxis" {...Builder.removeNulls(Builder.copyExcept(cartesianAxis, ['active']))}/> : null
  }  

  static buildChartProps = (timer: number, chartType: TChartType, chart: IChart): object => {
    let chartProps:any = {
      key: timer,
      width: chart.width,
      height: chart.height
    };

    // Margins
    if (chart.marginTop || chart.marginLeft || chart.marginRight || chart.marginBottom) {
      chartProps['margin'] = { left: chart.marginLeft, right: chart.marginRight, top: chart.marginTop, bottom: chart.marginBottom };
    }    

    // Layout
    if(chartType == 'LineChart' || chartType == 'AreaChart' || chartType == 'BarChart' || chartType == 'ComposedChart') {
      if(chart.layout) chartProps['layout'] = chart.layout;
    }

    // BaseValue
    if(chartType == 'AreaChart' || chartType == 'ComposedChart') {
      if(chart.baseValue) chartProps['baseValue'] = chart.baseValue;
    }

    // BarGap, BarCategoryGap, BarSize
    if(chartType == 'BarChart' || chartType == 'RadialBarChart' || chartType == 'ComposedChart') {
      if(chart.barCategoryGap) chartProps['barCategoryGap'] = chart.barCategoryGap;
      if(chart.barGap) chartProps['barGap'] = chart.barGap;
      if(chart.barSize) chartProps['barSize'] = chart.barSize;
    }

    // cx, cy, startAngle, endAngle, innerRadius, outerRadius:
    if(chartType == 'RadarChart' || chartType == 'RadialBarChart') {
      if(chart.cx) chartProps['cx'] = chart.cx;
      if(chart.cy) chartProps['cy'] = chart.cy;
      if(chart.startAngle) chartProps['startAngle'] = chart.startAngle;
      if(chart.endAngle) chartProps['endAngle'] = chart.endAngle;
      if(chart.innerRadius) chartProps['innerRadius'] = chart.innerRadius;
      if(chart.outerRadius) chartProps['outerRadius'] = chart.outerRadius;
    }

    return chartProps;
  }

  static build = (rechart: IRechartsData, data: any): React.ReactNode => {
    let legend = Builder.buildLegend(rechart.legend);
    let tooltip = Builder.buildTooltip(rechart.tooltip);
    
    let xAxis = (rechart.base.type == 'PieChart' || rechart.base.type == 'RadarChart' || rechart.base.type == 'RadialBarChart') ? null : Builder.buildXAxis(rechart.xaxis);
    let yAxis = (rechart.base.type == 'PieChart' || rechart.base.type == 'RadarChart' || rechart.base.type == 'RadialBarChart') ? null : Builder.buildYAxis(rechart.yaxis);
    let polarGrid = Builder.buildPolarGrid(rechart.polarGrid, rechart.radars);
    let polarAngleAxis = Builder.buildPolarAngleAxis(rechart.polarAngleAxis);
    let polarRadiusAxis = Builder.buildPolarRadiusAxis(rechart.polarRadiusAxis, rechart.radars);
    let cartesianGrid = Builder.buildCartesianGrid(rechart.cartesianGrid);
    let cartesianAxis = Builder.buildCartesianAxis(rechart.cartesianAxis);

    let areas = (rechart.base.type != 'AreaChart' && rechart.base.type != 'ComposedChart') ? null : rechart.areas.map((area, index) => 
      <Area key={"area" + index} {...Builder.removeNulls(area) as IArea}/>
    );        
    let bars = (rechart.base.type != 'BarChart' && rechart.base.type != 'ComposedChart') ? null : rechart.bars.map((bar, index) => 
      <Bar key={"bar" + index} {...Builder.removeNulls(bar) as IBar}/>
    );
    let lines = (rechart.base.type != 'LineChart' && rechart.base.type != 'ComposedChart') ? null : rechart.lines.map((line:ILine, index) => 
      <Line key={"line" + index} {...Builder.removeNulls(line) as ILine}/>
    );
    let pies = (rechart.base.type != 'PieChart') ? null : rechart.pies.map((pie, index) => 
      <Pie key={"pie" + index} data={data} {...Builder.removeNulls(pie) as IPie}/>
    );
    let radars = (rechart.base.type != 'RadarChart') ? null : rechart.radars.map((radar, index) => 
      <Radar key={"radar" + index} {...Builder.removeNulls(radar) as IRadar}/>
    );    
    let radialBars = (rechart.base.type != 'RadialBarChart') ? null : rechart.radialBars.map((radialBar, index) => 
      <RadialBar key={"radialBar" + index} {...Builder.removeNulls(radialBar) as IRadialBar}/>
    );        
    let scatters = (rechart.base.type != 'ScatterChart') ? null : rechart.scatters.map((scatter, index) => 
      <Scatter key={"scatter" + index} data={data} {...Builder.removeNulls(scatter)}/>
    );    

    let referenceLines = rechart.referenceLines.map((referenceLine, index) => 
      <ReferenceLine key={"referenceLine" + index} {...Builder.removeNulls(referenceLine)}/>
    );
    let referenceDots = rechart.referenceDots.map((referenceDot, index) => 
      <ReferenceDot key={"referenceDot" + index} {...Builder.removeNulls(referenceDot)}/>
    );
    let referenceAreas = rechart.referenceAreas.map((referenceArea, index) => 
      <ReferenceArea key={"referenceArea" + index} {...Builder.removeNulls(referenceArea)}/>
    );    

    // Build chart node:
    let chartProps = Builder.buildChartProps(rechart.timer, rechart.base.type, rechart.chart);
    let jsx = React.createElement(Builder.getChartType(rechart.base.type), {...chartProps, data: data }, [
      xAxis, yAxis, legend, tooltip, polarGrid, polarAngleAxis, polarRadiusAxis, cartesianGrid, cartesianAxis, 
      areas, bars, lines, pies, radars, radialBars, scatters, 
      referenceLines, referenceDots, referenceAreas
    ]);    

    return jsx;
  }

  /**
   * Convert a chart type to a chart class.
   */
  static getChartType = (chartType: TChartType): any => {
    switch(chartType) {
      case 'AreaChart': return AreaChart; break;
      case 'BarChart': return BarChart; break;
      case 'ComposedChart': return ComposedChart; break;
      case 'PieChart': return PieChart; break;
      case 'RadarChart': return RadarChart; break;
      case 'RadialBarChart': return RadialBarChart; break;
      case 'ScatterChart': return ScatterChart; break;
      default: return LineChart; break;
    }    
  }  
}    

export { Builder };