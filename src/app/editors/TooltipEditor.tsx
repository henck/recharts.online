import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { ITooltip } from '../Types';
import { Checkbox } from '@independent-software/typeui/controls/Checkbox';
import { forceRegexes } from '../Util';

interface ITooltipEditorProps {
  className?: string;
  tooltip: ITooltip;
  onUpdate: (tooltip: ITooltip) => void;
}

class TooltipEditor extends React.Component<ITooltipEditorProps, ITooltip> {

  constructor(props: ITooltipEditorProps) {
    super(props);
    this.state = {...props.tooltip};
  }

  onChange = (data: ITooltip, forceupdate: boolean) => {
    forceRegexes(data, /^\d+$/, ["offset"]); 
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
            control={<Checkbox checked={this.state.active} label="Include tooltip"/>}
            value={this.state.active}
          />

          <div style={{display: this.state.active ? 'block' : 'none'}}>
            <Form.Field
              label="Offset"
              name="offset"
              control={<Input placeholder="Offset" type="text" fluid clearable/>}
              value={this.state.offset}
              hint="Offset size between tooltip position and active position"
            />
            <Form.Field
              label="Separator"
              name="separator"
              control={<Input placeholder="Separator" type="text" fluid clearable/>}
              value={this.state.separator}
              hint="Separator between name and value"
            />            
            <Form.Field
              name="filterNull"
              control={<Checkbox checked={this.state.filterNull} label="Hide tooltip for null items"/>}
              value={this.state.filterNull}
            />  
            <Form.Field
              name="cursor"
              control={<Checkbox checked={this.state.cursor} label="Draw cursor when active"/>}
              value={this.state.cursor}
            />  
          </div>

        </Form>        
      </div>
    );
  }
}

export { TooltipEditor };