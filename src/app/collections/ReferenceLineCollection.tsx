import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { IReferenceLine, DefaultReferenceLine } from '../Types';
import { CollectionItem } from './CollectionItem';
import { ReferenceLineEditor } from '../editors/ReferenceLineEditor';

interface IReferenceLineCollectionProps {
  className?: string;
  referenceLines: IReferenceLine[];
  onUpdate: (data: IReferenceLine[]) => void;
}

class ReferenceLineCollection extends React.Component<IReferenceLineCollectionProps, {}> {

  handleUpdate = (index: number, referenceLine: IReferenceLine) => {
    this.props.referenceLines[index] = referenceLine;
    this.props.onUpdate(this.props.referenceLines);
  }

  handleAdd = () => {
    this.props.referenceLines.push(DefaultReferenceLine);
    this.props.onUpdate(this.props.referenceLines);
  }

  handleDelete = (index: number) => {
    this.props.referenceLines.splice(index, 1);
    this.props.onUpdate(this.props.referenceLines);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.referenceLines.map((referenceLine, index) => 
          <CollectionItem key={index} title={"Reference line #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <ReferenceLineEditor referenceLine={referenceLine} onUpdate={(data: IReferenceLine) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.referenceLines.length == 0 && 
        <Message type="info">
          There aren't any reference lines yet. Use <b>Add reference line</b> to create a reference line.
        </Message>}          
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add reference line
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { ReferenceLineCollection };
