import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { Dropdown } from '@independent-software/typeui/controls/Dropdown';
import { ILegend } from '../Types';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { forceRegexes } from '../Util';

interface ILegendEditorProps {
  className?: string;
  legend: ILegend;
  onUpdate: (legend: ILegend) => void;
}

class LegendEditor extends React.Component<ILegendEditorProps, ILegend> {

  constructor(props: ILegendEditorProps) {
    super(props);
    this.state = {...props.legend};
  }

  onChange = (data: ILegend, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["iconSize"]); 
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
            name="active"
            control={<Checkbox checked={this.state.active} label="Include legend"/>}
            value={this.state.active}
          />

          <div style={{display: this.state.active ? 'block' : 'none'}}>
          <Form.Field
            label="Layout"
            name="layout"
            control={<Dropdown 
              data={[ 'horizontal', 'vertical' ]} 
              label={(item:any) => item} 
              placeholder="Layout" fluid clearable>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.layout}
            hint="Layout of legend items"
          />          

          <Form.Field
            label="Horizontal alignment"
            name="align"
            control={<Dropdown 
              data={[ 'left', 'center', 'right' ]} 
              label={(item:any) => item} 
              placeholder="Align" fluid clearable>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.align}
            hint="Alignment of items in horizonal direction"
          />          

          <Form.Field
            label="Vertical alignment"
            name="verticalAlign"
            control={<Dropdown 
              data={[ 'top', 'middle', 'bottom' ]} 
              label={(item:any) => item} 
              placeholder="VerticalAlign" fluid clearable>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.verticalAlign}
            hint="Alignment of items in vertical direction"
          />          

          <Form.Field
            label="Icon size"
            name="iconSize"
            control={<Input placeholder="IconSize" type="text" fluid clearable/>}
            value={this.state.iconSize}
            hint="Size of icons"
          />

          <Form.Field
            label="Icon type"
            name="iconType"
            control={<Dropdown 
              data={[ 'line', 'square', 'rect', 'circle', 'cross', 'diamond', 'star', 'triangle', 'wye' ]} 
              label={(item:any) => item} 
              placeholder="Icon Type" fluid>
                <Dropdown.Column>{(item) => item}</Dropdown.Column>
              </Dropdown>}
            value={this.state.iconType}
            hint={<span>Legend icon type</span>}
          />
          </div>

        </Form>        
      </div>
    );
  }
}

export { LegendEditor };