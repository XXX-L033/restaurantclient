import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import emitter from '../../../utils/Emitter';
import DishCard from './DishCard';

const { Content } = Layout;

class DishContent extends Component {
    scrollToAnchor = (anchorName) => {
      if (anchorName) {
        const anchorElement = document.getElementById(anchorName);
        if (anchorElement) { anchorElement.scrollIntoView(); }
      }
    }

    componentDidMount() {
      emitter.addListener('itemClick', (key) => {
        this.scrollToAnchor(`dish${key}`);
      });
    }

    render() {
      return (
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <div>
            <span> These are to be rendered Cards </span>
            <div>
              <Row span={10}>
                <Col id="dish1" span={10}><DishCard number={1} /></Col>
                <Col id="dish2" span={10}><DishCard number={2} /></Col>
                <Col id="dish3" span={10}><DishCard number={3} /></Col>
              </Row>

              <Row span={10}>
                <Col id="dish4" span={10}><DishCard number={4} /></Col>
                <Col id="dish5" span={10}><DishCard number={5} /></Col>
                <Col id="dish6" span={10}><DishCard number={6} /></Col>
              </Row>

              {/* // <Table columns={columns}></Table>

              // dishes.map((el) => (
              //   <DishCard number={el}>

              //   </DishCard>
              //   // <Card
              //   //   hoverable
              //   //   style={{ width: 300 }}
              //   //   cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              //   // />
              // )) */}
            </div>
          </div>
        </Content>
      );
    }
}

export default DishContent;
