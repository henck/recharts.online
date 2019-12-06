import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Button } from '@independent-software/typeui/controls/Button';

interface IBottombarProps {
  className?: string;
  onRefresh: () => void;
}

class BottombarBase extends React.Component<IBottombarProps, {}> {

  render() {
    let p = this.props;

    return (
      <div className={p.className}>
        Not all properties refresh the chart automatically. <Button size="small" compact onClick={p.onRefresh}>Refresh</Button>
      </div>
    );
  }
}

const Bottombar = styled(BottombarBase)`
  position: fixed;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  color: white;
  background: steelblue;
  padding: 8px 0 0 20px;
  box-shadow: 0px -1px 3px rgba(0,0,0,1);
`

export { Bottombar };