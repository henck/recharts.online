import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';

import { Accordion } from '@independent-software/typeui/controls/Accordion';
import { Tabs } from '@independent-software/typeui/controls/Tabs';

import { IRechartsData, TChartType } from '../Types';
import { CartesianAxisEditor, CartesianGridEditor, ChartEditor, ChartTypeEditor, 
         LegendEditor, XAxisEditor, YAxisEditor, PolarGridEditor, PolarAngleAxisEditor, PolarRadiusAxisEditor, TooltipEditor} from '../editors';
import { AreaCollection, BarCollection, LineCollection, PieCollection, 
         ReferenceAreaCollection, ReferenceDotCollection, ReferenceLineCollection, ScatterCollection, RadarCollection, RadialBarCollection } from '../collections';
import { Code } from './Code';
import { Message } from '@independent-software/typeui/controls/Message';
import { Label } from '@independent-software/typeui/controls/Label';

interface ISidebarProps {
  className?: string;
  rechart: IRechartsData;
  onUpdate: (name: string, data: any) => void;
}

class SidebarBase extends React.Component<ISidebarProps, {}> {

  isArea = (type: TChartType): boolean => {
    return (type == 'AreaChart' || type == 'ComposedChart');
  }

  isBar = (type: TChartType): boolean => {
    return (type == 'BarChart' || type == 'ComposedChart');
  }

  isLine = (type: TChartType): boolean => {
    return (type == 'LineChart' || type == 'ComposedChart');
  }

  isPie = (type: TChartType): boolean => {
    return (type == 'PieChart');
  }

  isRadar = (type: TChartType): boolean => {
    return (type == 'RadarChart');
  }

  isRadialBar = (type: TChartType): boolean => {
    return (type == 'RadialBarChart');
  }

  isScatter = (type: TChartType): boolean => {
    return (type == 'ScatterChart');
  }  

  isCartesian = (type: TChartType): boolean => {
    return (type == 'LineChart' || type == 'AreaChart' || type == 'BarChart' || type == 'ComposedChart' || type == 'ScatterChart');
  }

  isPolar = (type: TChartType): boolean => {
    return (type == 'PieChart' || type == 'RadarChart' || type == 'RadialBarChart');
  }

  render() {
    let p = this.props;
    let type = p.rechart.base.type;

    return (
      <div className={p.className}>

        <Message raised type="info">
          <b>1.</b> Pick chart type. Sample data is provided.
        </Message>
        <ChartTypeEditor base={p.rechart.base} onUpdate={(data:any) => p.onUpdate("base", data)}/>

        <Message raised type="info">
          <b>2.</b> Set loads of options!
        </Message>
        <Tabs underlined>
          <Tabs.Pane label="Chart">
            <Accordion active={[0]} noanimate>
              <Accordion.Tab title="Chart">
                <Indent>
                  <ChartEditor chartType={type} chart={p.rechart.chart} onUpdate={(data:any) => p.onUpdate("chart", data)}/>
                </Indent>
              </Accordion.Tab>
              <Accordion.Tab title="Areas" hidden={!this.isArea(type)}>
                <Indent>
                  <AreaCollection areas={p.rechart.areas} onUpdate={(data:any) => p.onUpdate("areas", data)}/>
                </Indent>
              </Accordion.Tab>                    
              <Accordion.Tab title="Bars" hidden={!this.isBar(type)}>
                <Indent>
                  <BarCollection bars={p.rechart.bars} onUpdate={(data:any) => p.onUpdate("bars", data)}/>
                </Indent>
              </Accordion.Tab>    
              <Accordion.Tab title="Lines" hidden={!this.isLine(type)}>
                <Indent>
                  <LineCollection lines={p.rechart.lines} onUpdate={(data:any) => p.onUpdate("lines", data)}/>
                </Indent>
              </Accordion.Tab>
              <Accordion.Tab title="Pies" hidden={!this.isPie(type)}>
                <Indent>
                  <PieCollection pies={p.rechart.pies} onUpdate={(data:any) => p.onUpdate("pies", data)}/>
                </Indent>
              </Accordion.Tab>              
              <Accordion.Tab title="Radars" hidden={!this.isRadar(type)}>
                <Indent>
                  <RadarCollection radars={p.rechart.radars} onUpdate={(data:any) => p.onUpdate("radars", data)}/>
                </Indent>
              </Accordion.Tab>              
              <Accordion.Tab title="Radial bars" hidden={!this.isRadialBar(type)}>
                <Indent>
                  <RadialBarCollection radialBars={p.rechart.radialBars} onUpdate={(data:any) => p.onUpdate("radialBars", data)}/>
                </Indent>
              </Accordion.Tab>               
              <Accordion.Tab title="Scatters" hidden={!this.isScatter(type)}>
                <Indent>
                  <ScatterCollection scatters={p.rechart.scatters} onUpdate={(data:any) => p.onUpdate("scatters", data)}/>
                </Indent>
              </Accordion.Tab>              
            </Accordion>
          </Tabs.Pane>

          <Tabs.Pane label="Axes">
            <Accordion active={[0]} noanimate>
            <Accordion.Tab title="XAxis" hidden={!this.isCartesian(type)}>
                <Indent>
                  <XAxisEditor xaxis={p.rechart.xaxis} onUpdate={(data:any) => p.onUpdate("xaxis", data)}/>
                </Indent>
              </Accordion.Tab>          
              <Accordion.Tab title="YAxis" hidden={!this.isCartesian(type)}>
                <Indent>
                  <YAxisEditor yaxis={p.rechart.yaxis} onUpdate={(data:any) => p.onUpdate("yaxis", data)}/>
                </Indent>
              </Accordion.Tab>                        
              <Accordion.Tab title="Polar Grid" hidden={!this.isPolar(type)}>
                <Indent>
                  <PolarGridEditor polarGrid={p.rechart.polarGrid} onUpdate={(data:any) => p.onUpdate("polarGrid", data)}/>
                </Indent>
              </Accordion.Tab>    
              <Accordion.Tab title="Polar Angle Axis" hidden={!this.isPolar(type)}>
                <Indent>
                  <PolarAngleAxisEditor polarAngleAxis={p.rechart.polarAngleAxis} onUpdate={(data:any) => p.onUpdate("polarAngleAxis", data)}/>
                </Indent>
              </Accordion.Tab>      
              <Accordion.Tab title="Polar Radius Axis" hidden={!this.isPolar(type)}>
                <Indent>
                  <PolarRadiusAxisEditor polarRadiusAxis={p.rechart.polarRadiusAxis} onUpdate={(data:any) => p.onUpdate("polarRadiusAxis", data)}/>
                </Indent>
              </Accordion.Tab>                             
              <Accordion.Tab title="Cartesian Grid" hidden={!this.isCartesian(type)}>
                <Indent>
                  <CartesianGridEditor cartesianGrid={p.rechart.cartesianGrid} onUpdate={(data:any) => p.onUpdate("cartesianGrid", data)}/>
                </Indent>
              </Accordion.Tab>    
              <Accordion.Tab title="Cartesian Axis" hidden={!this.isCartesian(type)}>
                <Indent>
                  <CartesianAxisEditor cartesianAxis={p.rechart.cartesianAxis} onUpdate={(data:any) => p.onUpdate("cartesianAxis", data)}/>
                </Indent>
              </Accordion.Tab>                      
              <Accordion.Tab title="Reference Lines" hidden={!this.isCartesian(type)}>
                <Indent>
                  <ReferenceLineCollection referenceLines={p.rechart.referenceLines} onUpdate={(data:any) => p.onUpdate("referenceLines", data)}/>
                </Indent>
              </Accordion.Tab>
              <Accordion.Tab title="Reference Dots" hidden={!this.isCartesian(type)}>
                <Indent>
                  <ReferenceDotCollection referenceDots={p.rechart.referenceDots} onUpdate={(data:any) => p.onUpdate("referenceDots", data)}/>
                </Indent>
              </Accordion.Tab>      
              <Accordion.Tab title="Reference Areas" hidden={!this.isCartesian(type)}>
                <Indent>
                  <ReferenceAreaCollection referenceAreas={p.rechart.referenceAreas} onUpdate={(data:any) => p.onUpdate("referenceAreas", data)}/>
                </Indent>
              </Accordion.Tab>  
            </Accordion>
          </Tabs.Pane>

          <Tabs.Pane label="General">
            <Accordion active={[0]} noanimate>
              <Accordion.Tab title="Legend">
                <Indent>
                  <LegendEditor legend={p.rechart.legend} onUpdate={(data:any) => p.onUpdate("legend", data)}/>
                </Indent>
              </Accordion.Tab>
              <Accordion.Tab title="Tooltip">
                <Indent>
                  <TooltipEditor tooltip={p.rechart.tooltip} onUpdate={(data:any) => p.onUpdate("tooltip", data)}/>
                </Indent>
              </Accordion.Tab>
            </Accordion>
          </Tabs.Pane>

          <Tabs.Pane label={<Label basic pointing="bottom"><b>3. Get JSX!</b></Label>}>
            <Code rechart={p.rechart}/>
          </Tabs.Pane>

        </Tabs>
      </div>
    );
  }
}

const Indent = styled('div')`
  padding-left: 15px;
`

const Sidebar = styled(SidebarBase)`
  position: absolute;
  box-sizing: border-box;
  z-index: 999;
  right: 0;
  top: 0;
  width: 400px;
  min-height: 100%;
  padding: 10px 20px 30px 20px;
  background: #f0f0f0;
  box-shadow: -3px 0px 6px rgba(0,0,0,0.2);
`

export { Sidebar };