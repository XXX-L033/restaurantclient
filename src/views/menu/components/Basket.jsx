import React, { Component } from 'react';
import {
  Button, Drawer, Affix, Input, Row, Empty, message, Form, Select,
} from 'antd';
import { ShoppingCartOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  inject, observer,
} from 'mobx-react';
import { toJS } from 'mobx';
import _ from 'lodash';
import { loadStripe } from '@stripe/stripe-js';

import Emitter from '../../../utils/Emitter';
import DishCard from './DishCard';

const { Option } = Select;
const { TextArea } = Input;
const stripePromise = loadStripe('pk_test_51HcqV9LAW2NTX2A0dkxc740rSyl15NmHf2Y42jrPudlSi8iR6Sr95J6gLi4E4DQxwPsKRDBUP2zPEPa3uX87a9y400GQ3mYbj6');

@inject('menuStore') @observer
class Basket extends Component {
  constructor() {
    super();
    this.state = {
      pending: false,
      visible: false,
      itemsInCart: [],
      order_note: '',
      customer_email: '',
      tableid: '',
    };
    this.setVisible = this.setVisible.bind(this);
    this.directToCheckout = this.directToCheckout.bind(this);
  }

  setVisible(state) {
    this.setState({
      visible: state,
    });
  }

  showDrawer = () => {
    this.setVisible(true);
  };

  onClose = () => {
    this.setVisible(false);
  };

  async directToCheckout() {
    if (!this.state.customer_email) {
      message.error('please specify your email and table number!');
      return;
    }
    this.setState({ pending: true });
    const stripe = await stripePromise;
    const res = await this.props.menuStore.placeOrder(_.pick(this.state, ['order_note', 'customer_email', 'tableid']));
    this.setState({ pending: false });
    await new Promise((resolve) => setTimeout(() => {
      resolve();
    }, 1000));
    const result = await stripe.redirectToCheckout(res);
    if (result.error) {
      message.error('Failed to take you to the payment page...please try again');
    }
  }

  componentWillUnmount() {
    Emitter.removeAllListeners();
  }

  componentDidMount() {
    // todo, emmm...
    Emitter.addListener('addToCart', (itemInfo) => {
      let isExisting = false;
      for (let i = 0; i < this.state.itemsInCart.length;) {
        if (this.state.itemsInCart[i].name === itemInfo.name
            && this.state.itemsInCart[i].price === itemInfo.price) {
          this.state.itemsInCart[i].number += 1;
          isExisting = true;
        }
        i += 1;
      }
      if (isExisting === false) {
        const item = {
          name: itemInfo.name,
          price: itemInfo.price,
          number: 1,
        };
        this.state.itemsInCart.push(item);
      }
    });
  }

  calcBalance() {
    const cart = toJS(this.props.menuStore.cart);
    const reducer = (current, num) => current + num;
    if (_.isEmpty(cart)) {
      return 0;
    }
    const balance = Object.values(cart).map((el) => parseFloat(el.count) * parseFloat(el.price))
      .reduce(reducer, 0);
    return balance.toFixed(2);
  }

  isEmpty() {
    const cart = toJS(this.props.menuStore.cart);
    if (_.isEmpty(cart)) {
      return (
        <Empty
          description={(
            <span>
              Cart is Empty
            </span>
          )}
        />
      );
    }
    return (
      <div className="itemList">
        {Object.values(cart).map((item) => (
          <Row key={item.item_id}>
            <DishCard data={item} />
            {/* Check the item_id please */}
          </Row>
        ))}
      </div>
    );
  }

  render() {
    const balance = this.calcBalance();
    const buttonSpan = this.state.pending ? (<LoadingOutlined />) : (<span>Pay</span>);
    const tables = toJS(this.props.menuStore.tables);
    return (
      <div>
        <Affix className="basketAffix" size="large">
          <Button className="basketButton" type="primary" shape="circle" icon={<ShoppingCartOutlined spin />} size="large" onClick={this.showDrawer} />
        </Affix>
        <Affix className="priceAffix" size="large">
          <span>
            {`£${balance}`}
          </span>
        </Affix>

        <Drawer
          title={(
            <span>
              <ShoppingCartOutlined />
              Order Basket
            </span>
          )}
          closeIcon={<CloseCircleOutlined />}
          placement="right"
          closable
          onClose={this.onClose}
          visible={this.state.visible}
          width="400px"
          headerStyle={{ height: '6%' }}
          bodyStyle={{ height: '90%' }}
          className="cart-wrapper"

        >
          {this.isEmpty()}
          <div className="textArea">
            <TextArea
              style={{ marginTop: '5%' }}
              rows={5}
              // autoSize={{ minRows: 5, maxRows: 5 }}
              onChange={(e) => { e.persist(); this.state.order_note = e.target.value; }}
              placeholder="Tell us what you need..."
            />
            <Form className="cart-form">
              <Form.Item
                label="Email Address"
                name="Email Address"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input placeholder="Tell us your email" onChange={(e) => { e.persist(); this.state.customer_email = e.target.value; }} />
              </Form.Item>

              <Form.Item
                label="Table Number"
                name="Table Number"
              >
                <Select placeholder="(Optional) Tell us your table number" onChange={(e) => { e.persist(); this.state.table_id = ''; }}>
                  {tables.map((d) => (
                    <Option key={`${d}`}>{d}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </div>
          <div className="checkout" style={{ width: '90%' }}>
            <div>
              <span>
                {`£${balance}`}
              </span>
              <span style={{ fontSize: '20px' }} />
            </div>
            <Button type="primary" onClick={this.directToCheckout}>
              {buttonSpan}
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Basket;
