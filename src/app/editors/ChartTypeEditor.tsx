import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { TChartType, IChartBase } from '../Types';

interface IChartTypeEditorProps {
  className?: string;
  base: IChartBase;
  onUpdate: (chartType: TChartType) => void;
}

class ChartTypeEditor extends React.Component<IChartTypeEditorProps, IChartBase> {
  constructor(props: IChartTypeEditorProps) {
    super(props);
    this.state = {...props.base};
  }

  onChange = (data: TChartType, forceupdate: boolean) => {
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
          <Form.Field
            name="type"
            control={<Dropdown 
              data={[ 'AreaChart', 'BarChart', 'LineChart', 'ComposedChart', 'PieChart', 'RadarChart', 'RadialBarChart', 'ScatterChart' ]} 
              label={(item:any) => item} 
              placeholder="Chart type" fluid>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.type}
          />          
        </Form>        
      </div>
    );
  }
}

export { ChartTypeEditor };