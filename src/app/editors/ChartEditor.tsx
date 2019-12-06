import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { IChart, TChartType } from '../Types';
import { forceRegex, forceRegexes } from '../Util';

interface IChartEditorProps {
  className?: string;
  chartType: TChartType;
  chart: IChart;
  onUpdate: (chart: IChart) => void;
}

class ChartEditor extends React.Component<IChartEditorProps, IChart> {
  constructor(props: IChartEditorProps) {
    super(props);
    this.state = {...props.chart};
  }

  onChange = (data: IChart, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["width", "height", "marginRight", "marginTop", "marginBottom", "marginLeft", 'startAngle', 'endAngle', 'barSize']); 
    forceRegex(data, /^\d+|dataMin|dataMax|auto$/, 'baseValue');
    forceRegexes(data, /^\d+%?$/, ['barCategoryGap', 'barGap', 'cx', 'cy', 'innerRadius', 'outerRadius']);
    this.props.onUpdate(data);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        <Form
          data={this.state}
          onChange={this.onChange}
          onValidate={function(){}}
        >
          <Flex>
            <Flex.Row>
              <Flex.Column>
                <Form.Field
                  label="Width"
                  name="width"
                  control={<Input placeholder="Width" type="text" fluid/>}
                  value={this.state.width}
                  hint="Chart width in pixels"
                />
              </Flex.Column>
              <Flex.Column>
                <Form.Field
                  label="Height"
                  name="height"
                  control={<Input placeholder="Height" type="text" fluid/>}
                  value={this.state.height}
                  hint="Chart height in pixels"
                />  
              </Flex.Column>
            </Flex.Row>
          </Flex>
          <Flex>
            <Flex.Row>
              <Flex.Column width={1}>
                <Form.Field
                  label="Top Mrgn"
                  name="marginTop"
                  control={<Input type="text" fluid clearable/>}
                  value={this.state.marginTop}
                />                     
              </Flex.Column>
              <Flex.Column width={1}>
                <Form.Field
                  label="Right"
                  name="marginRight"
                  control={<Input type="text" fluid clearable/>}
                  value={this.state.marginRight}
                />                         
              </Flex.Column>
              <Flex.Column width={1}>
                <Form.Field
                  label="Bottom"
                  name="marginBottom"
                  control={<Input type="text" fluid clearable/>}
                  value={this.state.marginBottom}
                />  
              </Flex.Column>
              <Flex.Column width={1}>
                <Form.Field
                  label="Left"
                  name="marginLeft"
                  control={<Input type="text" fluid clearable/>}
                  value={this.state.marginLeft}
                />
              </Flex.Column>
            </Flex.Row>
          </Flex>

          <div style={{display: (p.chartType == 'AreaChart' || p.chartType == 'BarChart' || p.chartType == 'LineChart' || p.chartType == 'ComposedChart') ? 'block' : 'none'}}>
            <Form.Field
              label="Layout"
              name="layout"
              control={<Dropdown 
                data={[ 'horizontal', 'vertical']} 
                label={(item:any) => item} 
                placeholder="Layout" fluid>
                  <Dropdown.Column>{(item) => item}</Dropdown.Column>
                </Dropdown>}
              value={this.state.layout}
              hint="Layout of items in chart"
            />
          </div>

          <div style={{display: (p.chartType == 'BarChart' || p.chartType == 'RadialBarChart') ? 'block' : 'none'}}>
            <Form.Field
              label="Bar category gap"
              name="barCategoryGap"
              control={<Input placeholder="Bar category gap" type="text" fluid clearable/>}
              value={this.state.barCategoryGap}
              hint={<span>Gap between bar categories (number or <code>10%</code>)</span>}
            />          
            <Form.Field
              label="Bar gap"
              name="barGap"
              control={<Input placeholder="Bar gap" type="text" fluid clearable/>}
              value={this.state.barGap}
              hint={<span>Gap between bars (number or <code>10%</code>)</span>}
            />                    
            <Form.Field
              label="Bar size"
              name="barSize"
              control={<Input placeholder="Bar size" type="text" fluid clearable/>}
              value={this.state.barSize}
              hint={<span>Width/height of each bar.</span>}
            />                  
          </div>

          <div style={{display: p.chartType == 'AreaChart' ? 'block' : 'none'}}>
            <Form.Field
              label="Base value"
              name="baseValue"
              control={<Input placeholder="Base value" type="text" fluid clearable/>}
              value={this.state.baseValue}
              hint={<span>Base value (number, <code>dataMin</code>, <code>dataMax</code>, <code>auto</code>)</span>}
            />                    
          </div>

          <div style={{display: (p.chartType == 'RadarChart' || p.chartType == 'RadialBarChart') ? 'block' : 'none'}}>
            <Flex>
              <Flex.Row>
                <Flex.Column>
                  <Form.Field
                    label="Center X-coordinate"
                    name="cx"
                    control={<Input placeholder="Center X" type="text" fluid clearable/>}
                    value={this.state.cx}
                    hint={<span>Center x-coordinate (number or <code>10%</code>)</span>}
                  />                    
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Center Y-coordinate"
                    name="cy"
                    control={<Input placeholder="Center Y" type="text" fluid clearable/>}
                    value={this.state.cy}
                    hint={<span>Center y-coordinate (number or <code>10%</code>)</span>}
                  />            
                </Flex.Column>
              </Flex.Row>
            </Flex>
            <Form.Field
              label="Start angle"
              name="startAngle"
              control={<Input placeholder="Start angle" type="text" fluid clearable/>}
              value={this.state.startAngle}
              hint="Angle of first radial direction line"
            />            
            <Form.Field
              label="End angle"
              name="endAngle"
              control={<Input placeholder="End angle" type="text" fluid clearable/>}
              value={this.state.endAngle}
              hint="Angle of last point in circle"
            />               
            <Form.Field
              label="Inner radius"
              name="innerRadius"
              control={<Input placeholder="Inner radius" type="text" fluid clearable/>}
              value={this.state.innerRadius}
              hint={<span>Inner radius of first circle grid (number or <code>10%</code>)</span>}
            />                
            <Form.Field
              label="Outer radius"
              name="outerRadius"
              control={<Input placeholder="Outer radius" type="text" fluid clearable/>}
              value={this.state.outerRadius}
              hint={<span>Outer radius of last circle grid (number or <code>10%</code>)</span>}
            />                            
          </div>          
        </Form>        
      </div>
    );
  }
}

export { ChartEditor };