import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { IReferenceArea, DefaultReferenceArea } from '../Types';
import { CollectionItem } from './CollectionItem';
import { ReferenceAreaEditor } from '../editors/ReferenceAreaEditor';

interface IReferenceAreaCollectionProps {
  className?: string;
  referenceAreas: IReferenceArea[];
  onUpdate: (data: IReferenceArea[]) => void;
}

class ReferenceAreaCollection extends React.Component<IReferenceAreaCollectionProps, {}> {

  handleUpdate = (index: number, referenceArea: IReferenceArea) => {
    this.props.referenceAreas[index] = referenceArea;
    this.props.onUpdate(this.props.referenceAreas);
  }

  handleAdd = () => {
    this.props.referenceAreas.push(DefaultReferenceArea);
    this.props.onUpdate(this.props.referenceAreas);
  }

  handleDelete = (index: number) => {
    this.props.referenceAreas.splice(index, 1);
    this.props.onUpdate(this.props.referenceAreas);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.referenceAreas.map((referenceArea, index) => 
          <CollectionItem key={index} title={"Reference area #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <ReferenceAreaEditor referenceArea={referenceArea} onUpdate={(data: IReferenceArea) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.referenceAreas.length == 0 && 
        <Message type="info">
          There aren't any reference areas yet. Use <b>Add reference area</b> to create a reference area.
        </Message>}          
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add reference area
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { ReferenceAreaCollection };
