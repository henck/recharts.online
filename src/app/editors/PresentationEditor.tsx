import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Form } from '@independent-software/typeui/controls/Form';
import { Input } from '@independent-software/typeui/controls/Input';
import { IPresentation } from '../Types';
import { Flex } from '@independent-software/typeui/controls/Flex';
import { Button } from '@independent-software/typeui/controls/Button';
import { Panel } from '@independent-software/typeui/controls/Panel';

interface IPresentationEditorProps {
  data: IPresentation;
}

interface IPresentationEditorState {
  data: IPresentation;
  open: boolean;
}

class PresentationEditor extends React.Component<IPresentationEditorProps, IPresentationEditorState> {

  constructor(props: IPresentationEditorProps) {
    super(props);
    this.state = {
      data: props.data,
      open: false 
    };
  }

  handleClick = () => {
    // Clicking the trigger control toggles the
    // panel's open state.
    this.setState((prevState) => { return {
      open: !prevState.open
    }});
  }
  
  handleClose = () => {
    // Close simply closes the panel. Since this will 
    // also trigger handleClick, the Panel control
    // adds a 100ms timeout so that handleClick runs first.
    this.setState({ open: false });
  }  

  render() {
    let p = this.props;
    return (
      <div style={{position: 'relative', display: 'inline-block'}}>
        <Button onClick={this.handleClick} compact>Presentation</Button>
        <Panel open={this.state.open} onClose={this.handleClose} width={350}>
          <Panel.Header>
            Presentation
          </Panel.Header>
          <Panel.Content>
            <Flex>
              <Flex.Row>
                <Flex.Column width={1}>
                  <Form.Field
                    label="Stroke"
                    name="stroke"
                    control={<Input placeholder="Stroke" type="color" fluid clearable/>}
                    value={this.state.data.stroke}
                  />
                </Flex.Column>
                <Flex.Column width={1}>
                  <Form.Field
                    label="Fill"
                    name="fill"
                    control={<Input placeholder="Fill" type="color" fluid clearable/>}
                    value={this.state.data.fill}
                  />          
                </Flex.Column>
              </Flex.Row>
            </Flex>
            <Flex>
              <Flex.Row>
                <Flex.Column>
                  <Form.Field
                    label="Stroke width"
                    name="strokeWidth"
                    control={<Input placeholder="Stroke width" type="text" fluid clearable/>}
                    value={this.state.data.strokeWidth}
                    hint="Width of stroke in pixels"
                  />  
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Stroke dash array"
                    name="strokeDasharray"
                    control={<Input placeholder="Stroke dash" type="text" fluid clearable/>}
                    value={this.state.data.strokeDasharray}
                    hint={<span>Dash array, e.g. <code>5 5</code></span>}
                  />          
                </Flex.Column>
              </Flex.Row>
            </Flex>
            <Flex>
              <Flex.Row>  
                <Flex.Column>
                  <Form.Field
                    label="Stroke opacity"
                    name="strokeOpacity"
                    control={<Input placeholder="Stroke opacity" type="text" fluid clearable/>}
                    value={this.state.data.strokeOpacity}
                    hint={<span>Stroke opacity, e.g. <code>.5</code></span>}
                  />                        
                </Flex.Column>
                <Flex.Column>
                  <Form.Field
                    label="Fill opacity"
                    name="fillOpacity"
                    control={<Input placeholder="Fill opacity" type="text" fluid clearable/>}
                    value={this.state.data.fillOpacity}
                    hint={<span>Fill opacity, e.g. <code>.5</code></span>}
                  />                        
                </Flex.Column>
              </Flex.Row>
            </Flex>
          </Panel.Content>
        </Panel>              
      </div>
    );
  }
}

export { PresentationEditor };