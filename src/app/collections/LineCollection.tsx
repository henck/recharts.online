import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';
import { Message } from '@independent-software/typeui/controls/Message';
import { Icon } from '@independent-software/typeui/controls/Icon';
import { ILine, DefaultLine } from '../Types';
import { LineEditor } from '../editors/LineEditor';
import { CollectionItem } from './CollectionItem';

interface ILineCollectionProps {
  className?: string;
  lines: ILine[];
  onUpdate: (data: ILine[]) => void;
}

class LineCollection extends React.Component<ILineCollectionProps, {}> {

  handleUpdate = (index: number, line: ILine) => {
    this.props.lines[index] = line;
    this.props.onUpdate(this.props.lines);
  }

  handleAdd = () => {
    this.props.lines.push(DefaultLine);
    this.props.onUpdate(this.props.lines);
  }

  handleDelete = (index: number) => {
    this.props.lines.splice(index, 1);
    this.props.onUpdate(this.props.lines);
  }
  
  render() {
    let p = this.props;
    return (
      <div className={p.className}>
        {p.lines.map((line, index) => 
          <CollectionItem key={index} title={"Line #" + (index + 1)} onDelete={() => this.handleDelete(index)}>
            <LineEditor line={line} onUpdate={(data: ILine) => this.handleUpdate(index, data)}/>
          </CollectionItem>
        )}
        {p.lines.length == 0 && 
        <Message type="info">
          There aren't any lines yet. Use <b>Add line</b> to create a line.
        </Message>}
        <AddButtonContainer>
          <Button compact size="small" onClick={this.handleAdd}>
            <Icon name="plus"/> Add line
          </Button>
        </AddButtonContainer>
      </div>
    );
  }
}

const AddButtonContainer = styled('div')`
  text-align: right;
`

export { LineCollection };
