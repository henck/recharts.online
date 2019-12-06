import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { IArea, DefaultArea } from '../Types';
import { CollectionItem } from './CollectionItem';
import { AreaEditor } from '../editors/AreaEditor';

interface IAreaCollectionProps {
  className?: string;
  areas: IArea[];
  onUpdate: (data: IArea[]) => void;
}

class AreaCollection extends React.Component<IAreaCollectionProps, {}> {

  handleUpdate = (index: number, area: IArea) => {
    this.props.areas[index] = area;
    this.props.onUpdate(this.props.areas);
  }

  handleAdd = () => {
    this.props.areas.push(DefaultArea);
    this.props.onUpdate(this.props.areas);
  }

  handleDelete = (index: number) => {
    this.props.areas.splice(index, 1);
    this.props.onUpdate(this.props.areas);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.areas.map((area, index) => 
          <CollectionItem key={index} title={"Area #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <AreaEditor area={area} onUpdate={(data: IArea) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.areas.length == 0 && 
        <Message type="info">
          There aren't any areas yet. Use <b>Add area</b> to create an area.
        </Message>}          
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add area
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { AreaCollection };
