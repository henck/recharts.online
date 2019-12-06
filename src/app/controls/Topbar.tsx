import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';

interface ITopbarProps {
  className?: string;
}

class TopbarBase extends React.Component<ITopbarProps, {}> {

  render() {
    let p = this.props;

    return (
      <div className={p.className}>
        <Title1>&lt; recharts /&gt;</Title1> <Title2>online</Title2>
      </div>
    );
  }
}

const Title1 = styled('span')`
  color: #f0f0f0;
`

const Title2 = styled('span')`
  color: #fff;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #fff,
    0 0 40px #0ff,
    0 0 80px #0ff,
    0 0 90px #0ff,
    0 0 100px #0ff,
    0 0 150px #0ff;  
`

const Topbar = styled(TopbarBase)`
  position: fixed;
  box-sizing: border-box;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background: steelblue;
  font-size: 25px;
  padding: 13px 0 0 20px;
  box-shadow: 0px 1px 3px rgba(0,0,0,1);
`

export { Topbar };