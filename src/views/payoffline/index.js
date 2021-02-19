import React, { Component } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { inject, observer } from 'mobx-react';

const stripePromise = loadStripe('pk_test_51HcqV9LAW2NTX2A0dkxc740rSyl15NmHf2Y42jrPudlSi8iR6Sr95J6gLi4E4DQxwPsKRDBUP2zPEPa3uX87a9y400GQ3mYbj6');

class PayOffline extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOrderId = this.handleOrderId.bind(this);
    this.directToCheckout = this.directToCheckout.bind(this);
    
    const { search } = props.location;
    console.log(search)
    this.state = {
      venueid: this.props.menuStore.getVenueId(search),
      receipt_id: 0,
    };
  }

  async directToCheckout(data) {
    const stripe = await stripePromise;
    console.log(data);
    const res = JSON.parse(data);
    const result = await stripe.redirectToCheckout(res);
    if (result.error) {
      message.error('Failed to take you to the payment page...please try again');
    }
  }

  handleOrderId(event) {
    var v = event.target.value;
    this.setState ({
      receipt_id: v
    });
    // console.log(this.state.receipt_id);
  }

  handleClick() {
    // request api
    const url = 'https://cors-anywhere.herokuapp.com/restaurantapi-env-1.eba-mr6k5igv.eu-west-2.elasticbeanstalk.com/api/order/pay';
    console.log(JSON.stringify(this.state));
    fetch(url,
      {
        method: 'post',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      }).then((response) => {
      const responseCode = response.status;
      switch (responseCode) {
        case 200:
          message.success('Jump into Stripe page', 1);
          return Promise.resolve(response);
        default:
          message.error('Payment Failure', 1);
          break;
      }
    }).then((response) => {
      response.text().then((data) => {
        this.directToCheckout(data);
      });
    }).catch(() => message.error('Error Happened', 1));
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };

    const rules = {
      order_id: [
        {
          required: true,
          message: 'Please input your Order ID!',
        },
      ],

    };
    return (
      <Form
        {...formItemLayout}
      >

        <Input defaultValue={this.state.venueid} type="hidden" />

        <Form.Item
          label="Order ID"
          name="order_id"
          rules={rules.order_id}
        >
          <Input onChange = {this.handleOrderId} placeholder="Please input the order id" />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            htmlType="submit"
            type="primary"
            onClick={this.handleClick}
          >
            Pay
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default inject('menuStore')(observer(PayOffline));
