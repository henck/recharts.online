import * as React from 'react';
import { css } from 'styled-components';
import styled from '@independent-software/typeui/styles/Theme';
import { Image } from '@independent-software/typeui/controls/Image';
import { IRechartsData } from './Types';
import { Builder } from './Builder';
import { ResponsiveContainer } from 'recharts';


interface IChartProps {
  className?: string;
  rechart: IRechartsData;
}

const data = [
	{ name: 'Luke', height: 172, mass: 77, eyecolor: 'blue', birthyear: 19, birthdate: '19-01-00', gender: 'male', homeworld: 'Tatooine', species: 'Human' },
	{ name: 'C-3PO', height: 167, mass: 75, eyecolor: 'yellow', birthyear: 112, birthdate: '21-04-00', gender: null, homeworld: 'Tatooine', species: 'Droid' },
	{ name: 'R2-D2', height: 96, mass: 32, eyecolor: 'red', birthyear: 33, birthdate: '02-02-00', gender: null, homeworld: 'Naboo', species: 'Droid' },
	{ name: 'Darth', height: 202, mass: 136, eyecolor: 'yellow', birthyear: 42, birthdate: '11-02-00', gender: 'male', homeworld: 'Tatooine', species: 'Human' },
	{ name: 'Leia', height: 150, mass: 49, eyecolor: 'brown', birthyear: 19, birthdate: '19-01-00', gender: 'female', homeworld: 'Alderaan', species: 'Human' },
	{ name: 'Obi-Wan', height: 182, mass: 77, eyecolor: 'blue', birthyear: 57, birthdate: '26-02-00', gender: 'male', homeworld: 'Stewjon', species: 'Human' },
	{ name: 'Chewbacca', height: 228, mass: 112, eyecolor: 'blue', birthyear: 200, birthdate: '18-07-00', gender: 'male', homeworld: 'Kashyyyk', species: 'Wookiee' },
	{ name: 'Han', height: 180, mass: 80, eyecolor: 'brown', birthyear: 29, birthdate: '29-01-00', gender: 'male', homeworld: 'Corellia', species: 'Human' },
	{ name: 'Yoda', height: 66, mass: 17, eyecolor: 'brown', birthyear: 896, birthdate: '14-06-02', gender: 'male', homeworld: null, species: 'Yoda' },
	{ name: 'Palpatine', height: 170, mass: 75, eyecolor: 'yellow', birthyear: 82, birthdate: '22-03-00', gender: 'male', homeworld: 'Naboo', species: 'Human' },
	{ name: 'Boba', height: 183, mass: 78, eyecolor: 'brown', birthyear: 32, birthdate: '01-02-00', gender: 'male', homeworld: 'Kamino', species: 'Human' },
	{ name: 'Lando', height: 177, mass: 79, eyecolor: 'brown', birthyear: 31, birthdate: '31-01-00', gender: 'male', homeworld: 'Socorro', species: 'Human' }
];

class ChartBase extends React.Component<IChartProps, {}> {

  render() {
    let p = this.props;

    return (
      <div className={p.className}>
        <ImageHolder>
          <a href="http://www.independent-software.com">
            <Image src="logo.png"/>
          </a>
        </ImageHolder>
        <ChartArea>
          {Builder.build(p.rechart, data)}
        </ChartArea>
      </div>
    );
  }
}

const ChartArea = styled('div')`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  box-shadow: 3px 3px 6px rgba(0,0,0,0.3);
`

const ImageHolder = styled('div')`
  position: absolute;
  left: 15px;
  bottom: 15px;
`

const Chart = styled(ChartBase)`
  position: fixed;
  left: 0;
  right: 400px;
  top: 50px;
  bottom: 0; 
  background: #ddd;
`

export { Chart };