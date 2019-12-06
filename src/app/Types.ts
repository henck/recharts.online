import { DataKey } from "recharts";

type TChartType = 'AreaChart'| 'BarChart' | 'LineChart' | 'ComposedChart' | 'PieChart' | 'RadarChart' | 'RadialBarChart' | 'ScatterChart';
type TLineType = 'basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
type TLegendType = 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye';
type TAxisScale = 'auto' | 'linear' | 'pow' | 'sqrt' | 'log' | 'identity' | 'time' | 'band' | 'point' | 'ordinal' | 'quantile' | 'quantize' | 'utcTime' | 'sequential' | 'threshold';
const DataFields = [ 'name', 'height', 'mass', 'eyecolor', 'birthyear', 'birthdate', 'gender', 'homeworld', 'species'];

interface IChartBase {
  type: TChartType;
}

interface IPresentation {
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
  strokeOpacity: number;  
  fill: string;
  fillOpacity: number;
}

const DefaultPresentation: IPresentation = {
  stroke: null,
  strokeWidth: null,
  strokeDasharray: null,
  strokeOpacity: null,
  fill: null,
  fillOpacity: null
};

interface IChart {
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  layout: 'horizontal' | 'vertical';
  // BarChart:
  barCategoryGap: number | string;
  barGap: number | string;
  barSize: number;
  // AreaChart:
  baseValue: number | string;
  // RadarChart:
  cx: number | string;
  cy: number | string;
  startAngle: number;
  endAngle: number;
  innerRadius: number | string;
  outerRadius: number | string;
}

const DefaultChart: IChart = {
  width: 700,
  height: 500,
  marginTop: null,
  marginRight: null,
  marginBottom: null,
  marginLeft: null,
  layout: null,
  barCategoryGap: null,
  barGap: null,
  barSize: null,
  baseValue: null,
  cx: null,
  cy: null,
  startAngle: null,
  endAngle: null,
  innerRadius: null,
  outerRadius: null
};

interface ILine extends IPresentation {
  dataKey: DataKey;
  type: TLineType;
  legendType: TLegendType | 'none';
  dot: boolean;
  activeDot: boolean;
  label: boolean;
  connectNulls: boolean;
  name: string;
  unit: string;
}

const DefaultLine: ILine = {
  ...DefaultPresentation,
  dataKey: 'height',
  type: 'linear',
  legendType: 'line',
  dot: true,
  activeDot: true,
  label: false,
  connectNulls: false,
  name: null,
  unit: null  
};

interface IBar extends IPresentation {
  dataKey: DataKey;
  legendType: TLegendType | 'none';
  label: boolean;
  minPointSize: number;
  background: boolean;
  name: string;
  unit: string;
}

const DefaultBar: IBar = {
  ...DefaultPresentation,
  dataKey: 'height',
  legendType: null,
  label: false,
  minPointSize: null,
  background: false,
  name: null,
  unit: null
};

interface IArea extends IPresentation {
  dataKey: DataKey;
  type: TLineType;
  legendType: TLegendType | 'none';
  dot: boolean;
  activeDot: boolean;
  label: boolean;
  connectNulls: boolean;
  name: string;
  unit: string;
}

const DefaultArea: IArea = {
  ...DefaultPresentation,
  dataKey: 'height',
  type: 'linear',
  legendType: 'line',
  dot: true,
  activeDot: true,
  label: false,
  connectNulls: false,
  name: null,
  unit: null  
};

interface ILegend {
  active: boolean;
  layout: 'horizontal' | 'vertical';
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  iconSize: number;
  iconType: TLegendType;
}

const DefaultLegend: ILegend = {
  active: true,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'bottom',
  iconSize: 14,
  iconType: 'line'  
};

interface ICartesianGrid extends IPresentation {
  active: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  horizontal: boolean;
  vertical: boolean;
}

const DefaultCartesianGrid: ICartesianGrid = {
  ...DefaultPresentation,
  active: false,
  x: null,  
  y: null,
  width: null,
  height: null,
  horizontal: true,
  vertical: true
};

interface ICartesianAxis extends IPresentation {
  active: boolean;
  x: number;
  y: number;
  width: number;
  height: number;  
  orientation: 'top' | 'bottom' | 'left' | 'right';
  axisLine: boolean;
  tickLine: boolean;
  minTickGap: number;
  tickSize: number;
  interval: 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | number;
  tick: boolean;
  label: string;
  mirror: boolean;
  tickMargin: number;
}

const DefaultCartesianAxis: ICartesianAxis = {
  ...DefaultPresentation,
  active: false,
  x: null,
  y: null,
  width: null,
  height: null,
  orientation: null,
  axisLine: true,
  tickLine: true,
  minTickGap: null,
  tickSize: null,
  interval: null,
  tick: true,
  label: null,
  mirror: false,
  tickMargin: null
};

interface IXAxis extends IPresentation {
  active: boolean;
  dataKey: DataKey;
  orientation: 'bottom' | 'top';
  type: 'number' | 'category';
  allowDecimals: boolean;
  allowDataOverflow: boolean;
  allowDuplicatedCategory: boolean;
  tickCount: number;
  domainLow: number | 'dataMin'| 'auto';
  domainHigh: number | 'dataMax'| 'auto';
  interval: 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | number;
  paddingLeft: number;
  paddingRight: number;
  minTickGap: number;
  axisLine: boolean;
  tickLine: boolean;
  tickSize: number;
  tick: boolean;
  mirror: boolean;
  reversed: boolean;
  label: string;
  scale: TAxisScale
  unit: string;
  name: string;
}

const DefaultXAxis: IXAxis = {
  ...DefaultPresentation,
  active: true,
  dataKey: 'name',
  orientation: null,
  type: null,
  allowDecimals: true,
  allowDataOverflow: false,
  allowDuplicatedCategory: true,
  tickCount: null,
  domainLow: null,
  domainHigh: null,
  interval: null,
  paddingLeft: null,
  paddingRight: null,
  minTickGap: null,
  axisLine: true,
  tickLine: true,
  tickSize: null,
  tick: true,
  mirror: false,
  reversed: false,
  label: null,
  scale: null,
  unit: null,
  name: null
};

interface IYAxis extends IPresentation {
  active: boolean;
  dataKey: DataKey;
  orientation: 'left' | 'right';
  type: 'number' | 'category';
  allowDecimals: boolean;
  allowDataOverflow: boolean;
  allowDuplicatedCategory: boolean;
  tickCount: number;
  domainLow: number | 'dataMin'| 'auto';
  domainHigh: number | 'dataMax'| 'auto';
  interval: 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | number;
  paddingTop: number;
  paddingBottom: number;
  minTickGap: number;
  axisLine: boolean;
  tickLine: boolean;
  tickSize: number;
  tick: boolean;
  mirror: boolean;
  reversed: boolean;
  label: string;
  scale: TAxisScale
  unit: string;
  name: string;
}

const DefaultYAxis: IYAxis = {
  ...DefaultPresentation,
  dataKey: null,
  active: true,
  orientation: null,
  type: null,
  allowDecimals: true,
  allowDataOverflow: false,
  allowDuplicatedCategory: true,
  tickCount: null,
  domainLow: null,
  domainHigh: null,
  interval: null,
  paddingTop: null,
  paddingBottom: null,
  minTickGap: null,
  axisLine: true,
  tickLine: true,
  tickSize: null,
  tick: true,
  mirror: false,
  reversed: false,
  label: null,
  scale: null,
  unit: null,
  name: null
};

interface IReferenceLine extends IPresentation {
  x: number | string;
  y: number | string;
  alwaysShow: boolean;
  label: string;
  isFront: boolean;
}

const DefaultReferenceLine: IReferenceLine = {
  ...DefaultPresentation,
  x: null,
  y: null,
  alwaysShow: false,
  label: null,
  isFront: false
};

interface IReferenceDot extends IPresentation {
  x: number | string;
  y: number | string;
  alwaysShow: boolean;
  label: string;
  isFront: boolean;
  r: number;
}

const DefaultReferenceDot: IReferenceDot = {
  ...DefaultPresentation,
  x: null,
  y: null,
  alwaysShow: false,
  label: null,
  isFront: false,
  r: null
}

interface IReferenceArea extends IPresentation {
  x1: number | string;
  y1: number | string;
  x2: number | string;
  y2: number | string;
  alwaysShow: boolean;
  label: string;
  isFront: boolean;
}

const DefaultReferenceArea: IReferenceArea = {
  ...DefaultPresentation,
  x1: null,
  x2: null,
  y1: null,
  y2: null,
  alwaysShow: false,
  label: null,
  isFront: false
}

interface IPie extends IPresentation {
  dataKey: DataKey;
  nameKey: string;
  cx: number | string;
  cy: number | string;
  innerRadius: number | string;
  outerRadius: number | string;
  startAngle: number;
  endAngle: number;
  minAngle: number;
  paddingAngle: number;
  legendType: TLegendType;
  label: boolean;
  labelLine: boolean;
}

const DefaultPie: IPie = {
  ...DefaultPresentation,
  dataKey: 'height',
  nameKey: null,
  cx: null,
  cy: null,
  innerRadius: null,
  outerRadius: null,
  startAngle: null,
  endAngle: null,
  minAngle: null,
  paddingAngle: null,
  legendType: null,
  label: false,
  labelLine: false
}

interface IScatter extends IPresentation {
  legendType: TLegendType;
  line: boolean;
  shape: 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';
  lineType: 'joint' | 'fitting';
}

const DefaultScatter: IScatter = {
  ...DefaultPresentation,
  legendType: null,
  line: false,
  shape: null,
  lineType: null
}

interface IRadar extends IPresentation {
  dataKey: DataKey;
  legendType: TLegendType;
  dot: boolean;
  label: boolean;
}

const DefaultRadar: IRadar = {
  ...DefaultPresentation,
  dataKey: 'height',
  legendType: null,
  dot: true,
  label: true
}

interface IRadialBar extends IPresentation {
  dataKey: DataKey;
  minAngle: number;
  legendType: TLegendType;
  label: boolean;
  background: boolean;
}

const DefaultRadialBar: IRadialBar = {
  ...DefaultPresentation,
  dataKey: 'height',
  minAngle: null,
  legendType: null,
  label: false,
  background: false
}

interface IPolarGrid extends IPresentation {
  active: boolean;
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  gridType: 'polygon' | 'circle';
}

const DefaultPolarGrid: IPolarGrid = {
  ...DefaultPresentation,
  active: false,
  cx: null,
  cy: null,
  innerRadius: null,
  outerRadius: null,
  gridType: null
};

interface IPolarAngleAxis extends IPresentation {
  active: boolean;
  dataKey: DataKey;
  cx: number;
  cy: number;
  radius: number | string;
  axisLine: boolean;
  axisLineType: 'circle' | 'polygon';
  tickLine: boolean;
  tick: boolean;
  orient: 'outer' | 'inner';
  type: 'number' | 'category';
  allowDuplicatedCategory: boolean;
}

const DefaultPolarAngleAxis: IPolarAngleAxis = {
  ...DefaultPresentation,
  dataKey: null,
  active: false,
  cx: null,
  cy: null,
  radius: null,
  axisLine: true,
  axisLineType: null,
  tickLine: true,
  tick: true,
  orient: null,
  type: null,
  allowDuplicatedCategory: true
};

interface IPolarRadiusAxis extends IPresentation {
  active: boolean;
  angle: number;
  type: 'number' | 'category';
  cx: number;
  cy: number;
  domainLow: number | 'dataMin'| 'auto';
  domainHigh: number | 'dataMax'| 'auto';
  label: boolean;
  orientation: 'left' | 'middle' | 'right';
  axisLine: boolean;
  tick: boolean;
  tickCount: number;
  scale: TAxisScale;
  allowDuplicatedCategory: boolean;
}

const DefaultPolarRadiusAxis: IPolarRadiusAxis = {
  ...DefaultPresentation,
  active: false,
  angle: null,
  type: null,
  cx: null,
  cy: null,
  domainLow: null,
  domainHigh: null,
  label: true,
  orientation: null,
  axisLine: true,
  tick: true,
  tickCount: null,
  scale: null,
  allowDuplicatedCategory: true
}

interface ITooltip {
  active: boolean;
  separator: string;
  offset: number;
  filterNull: boolean;
  cursor: boolean;
}

const DefaultTooltip: ITooltip = {
  active: true,
  separator: null,
  offset: null,
  filterNull: true,
  cursor: true
}

interface IRechartsData {
  timer: number;
  base: IChartBase;
  chart: IChart;
  areas: IArea[];
  bars: IBar[];
  lines: ILine[];
  pies: IPie[];
  radars: IRadar[];
  radialBars: IRadialBar[];
  scatters: IScatter[];
  legend: ILegend;
  tooltip: ITooltip;
  xaxis: IXAxis;
  yaxis: IYAxis;
  polarGrid: IPolarGrid;
  polarAngleAxis: IPolarAngleAxis;
  polarRadiusAxis: IPolarRadiusAxis;
  cartesianGrid: ICartesianGrid;  
  cartesianAxis: ICartesianAxis;
  referenceLines: IReferenceLine[];
  referenceDots: IReferenceDot[];
  referenceAreas: IReferenceArea[];
}

export { 
  TChartType, TLineType, TLegendType, DataFields,
  IPresentation, IChartBase, IChart, DefaultChart, 
  ILine, DefaultLine, IBar, DefaultBar, IArea, DefaultArea, ILegend, DefaultLegend, 
  ICartesianGrid, DefaultCartesianGrid, ICartesianAxis, DefaultCartesianAxis, 
  IXAxis, DefaultXAxis, IYAxis, DefaultYAxis, IReferenceLine, DefaultReferenceLine, 
  IReferenceDot, DefaultReferenceDot, IReferenceArea, DefaultReferenceArea, 
  IPie, DefaultPie, IRadar, DefaultRadar, IScatter, DefaultScatter, 
  IRadialBar, DefaultRadialBar,
  IPolarGrid, DefaultPolarGrid, IPolarAngleAxis, DefaultPolarAngleAxis, 
  IPolarRadiusAxis, DefaultPolarRadiusAxis, ITooltip, DefaultTooltip, IRechartsData };