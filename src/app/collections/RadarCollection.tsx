import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { IRadar, DefaultRadar } from '../Types';
import { CollectionItem } from './CollectionItem';
import { RadarEditor } from '../editors';

interface IRadarCollectionProps {
  className?: string;
  radars: IRadar[];
  onUpdate: (data: IRadar[]) => void;
}

class RadarCollection extends React.Component<IRadarCollectionProps, {}> {

  handleUpdate = (index: number, radar: IRadar) => {
    this.props.radars[index] = radar;
    this.props.onUpdate(this.props.radars);
  }

  handleAdd = () => {
    this.props.radars.push(DefaultRadar);
    this.props.onUpdate(this.props.radars);
  }

  handleDelete = (index: number) => {
    this.props.radars.splice(index, 1);
    this.props.onUpdate(this.props.radars);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.radars.map((radar, index) => 
          <CollectionItem key={index} title={"Radar #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <RadarEditor radar={radar} onUpdate={(data: IRadar) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.radars.length == 0 && 
        <Message type="info">
          There aren't any radars yet. Use <b>Add radar</b> to create a radar.
        </Message>}          
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add radar
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { RadarCollection };
