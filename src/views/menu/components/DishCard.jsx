import React, { Component } from 'react';
import {
  Card, Row, Col, Image, Button, message, Rate, Popover,
} from 'antd';
import {
  inject, observer,
} from 'mobx-react';
import { toJS } from 'mobx';
import {
  MinusOutlined, PlusOutlined,
} from '@ant-design/icons';

const descStyle = {
  fontSize: '10px',
  color: 'gray',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
  height: '20%',
};

const rateStyle = {
  position: 'relative',
  bottom: '2px',
};

const countStyle = {
  position: 'absolute',
  bottom: '4px',
  right: '25px',
  fontSize: '15px',
  width: '28px',
  textAlign: 'center',
};

@inject('menuStore')
@observer
class DishCard extends Component {
  constructor(props) {
    super(props);
    this.changeCount = this.changeCount.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.menuStore = this.props.menuStore;
    Object.keys(this.menuStore).forEach((el) => {
      this.menuStore[el] = toJS(this.menuStore[el]);
    });
  }

  changeCount(val, mes) {
    const count = val || 0; // empty string sanity
    const payload = {
      ...this.props.data,
      count,
    };
    this.props.menuStore.addCart(payload);
    const info = mes === 'add' ? 'added to' : 'removed from';
    message.success(`Successfully ${info} Cart`, 0.5);
  }

  addToCart() {
    const payload = {
      ...this.props.data,
      count: 1,
    };
    this.props.menuStore.addCart(payload);
    message.success('Successfully added to Cart', 0.5);
  }

  buttonOrInput() {
    const { data } = this.props;
    const { cart } = this.menuStore;
    if (cart[data.item_id]?.count > 0) {
      const { count } = cart[data.item_id];
      return (
        <div className="dishcard-countBlock">
          <Button className="dishcard-countBlock-minus" type="primary" shape="circle" icon={<MinusOutlined />} size="small" onClick={() => this.changeCount(count - 1, 'remove')} />
          <span style={countStyle}>
            <b>{count}</b>
          </span>
          <Button className="dishcard-countBlock-plus" type="primary" shape="circle" icon={<PlusOutlined />} size="small" onClick={() => this.changeCount(count + 1, 'add')} />
        </div>
      );
    }
    return (
      <Button className="dishcard-addToCartBtn" onClick={this.addToCart}>
        <span style={{ fontSize: '15px' }}>+</span>
        Add to cart
      </Button>
    );
  }

  render() {
    const loading = this.menuStore.status === 'pending';
    const { data } = this.props;
    return (
      <Card
        className="dishcard-item"
        loading={loading}
        style={{ borderRadius: '10px' }}
      >
        <Row justify="space-between" style={{ height: '100%' }}>
          <Col span={7}>
            <Image
              className="dishcard-img"
              alt="Dish Img"
              src={`data:image/png;base64,${data.img}` || 'http://www.pngall.com/wp-content/uploads/2016/04/Juice-Download-PNG.png'}
              height="100px"
            />
          </Col>
          <Col span={16}>
            <div className="dishcard-info">
              <h3><b>{data.name}</b></h3>
              <Popover content={data.desc}>
                <p style={descStyle}>{data.desc}</p>
              </Popover>
              <Rate style={rateStyle} allowHalf disabled defaultValue={2.5} />
            </div>
            <div className="dishcard-price">
              <span style={{ fontSize: '20px', color: '#DC4B4B' }}>£</span>
              <span style={{ fontSize: '25px', color: '#DC4B4B' }}>{data.price.toFixed(2)}</span>
              {this.buttonOrInput()}
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default DishCard;
