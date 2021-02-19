import {
  Form, Input, Button, Checkbox, Layout,
} from 'antd';
import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import UploadMenu from '@/views/onboard/UploadMenu';
import { Route } from 'react-router-dom';
import PicturesWall from './components/UploadPhoto';

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
  email: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
    {
      required: true,
      message: 'Please input your E-mail!',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please input your password!',
    },
  ],
  secondPassword: [
    {
      required: true,
      message: 'Please confirm your password!',
    },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject('The two passwords that you entered do not match!');
      },
    }),
  ],
  location: [{
    required: true,
    message: 'Please input your restaurant\'s location!',
    whitespace: true,
  }],
  name: [[{
    required: true,
    message: 'Please input your restaurant\'s name!',
    whitespace: true,
  }]],
  phone: [{
    required: true,
    message: 'Please input your phone number!',
  }],
  avatar: [{
    required: true,
  }],
  gallery: [{
    required: true,
  }],
  open_time: [{
    required: true,
  }],
  odoo: [{ required: false }],
  pos: [{ required: false }],
  picture: [{ required: false }],

};

const Onboard = (props) => {
  const { menuStore } = props;
  let venueId = null;
  let restaurant_phone = null;
  let restaurant_email = null;
  let restaurant_password = null;
  let confirm_password = null;
  let restaurant_name = null;
  let restaurant_location = null;

  const route = {
    path: '/uploadMenu',
    component: UploadMenu,
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('avatar', values.avatar);
    formData.append('password', values.password);
    formData.append('odoo', values.odoo);
    formData.append('pos', values.pos);
    formData.append('phone', values.phone);
    formData.append('gallery', values.gallery);
    formData.append('open_time', values.open_time);
    formData.append('location', values.location);
    const url = 'http://restaurantapi-env-1.eba-mr6k5igv.eu-west-2.elasticbeanstalk.com/api/onboarding/';
    fetch(url, {
      method: 'POST',
      headers: {},
      body: formData,
    }).then((data) => data.json()).then((data) => {
      venueId = data.ID;
      console.log(`ID ${venueId}`);
      const jumpForm = document.createElement('form');
      jumpForm.id = 'form-file-download';
      jumpForm.name = 'form-file-download';
      document.body.appendChild(jumpForm);
      sessionStorage.setItem('ID', venueId);
      // jumpForm.target = '_blank'
      jumpForm.action = `/#/uploadMenu?venueid=${venueId}`;
      jumpForm.submit();

      document.body.removeChild(jumpForm);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Layout className="onboarding" style={{ padding: '0px 12px' }}>

      <Route exact path={route.path} component={route.component} />

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{ marginTop: '5%' }}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={rules.email}
        >
          <Input
            placeholder="Please input your E-mail!"
            onChange={(e) => {
              e.persist();
              restaurant_email = e.target.value;
            }}
          />
        </Form.Item>

        {/* Do we really need password? */}
        <Form.Item
          hasFeedback
          label="Password"
          name="password"
          rules={rules.password}
        >
          <Input.Password
            placeholder="Please input your password!"
            onChange={(e) => {
              e.persist();
              restaurant_password = e.target.value;
            }}
          />
        </Form.Item>

        <Form.Item
          dependencies={['password']}
          hasFeedback
          label="Confirm Password"
          name="confirm"
          rules={rules.secondPassword}
        >
          <Input.Password
            placeholder="Please confirm your password!"
            onChange={(e) => {
              e.persist();
              confirm_password = e.target.value;
            }}
          />
        </Form.Item>

        <Form.Item
          label="Restaurant Name"
          name="name"
          rules={rules.name}
        >
          <Input
            placeholder="Please input your restaurant's name!"
            onChange={(e) => {
              e.persist();
              restaurant_name = e.target.value;
            }}
          />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={rules.location}
        >
          <Input
            placeholder="Please input your restaurant's location!"
            onChange={(e) => {
              e.persist();
              restaurant_location = e.target.value;
            }}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={rules.phone}
        >
          <Input
            placeholder="Please input your phone!"
            onChange={(e) => {
              e.persist();
              restaurant_phone = e.target.value;
            }}
          />
        </Form.Item>

        <Form.Item
          label="Avatar"
          name="avatar"
          rules={rules.avatar}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gallery"
          name="gallery"
          rules={rules.gallery}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Open_time"
          name="open_time"
          rules={rules.open_time}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Odoo"
          name="odoo"
          rules={rules.odoo}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Pos"
          name="pos"
          rules={rules.pos}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Pictures"
          name="pictures"
          tooltip={{
            title: 'Please update picture of your restaurant (excluding menu)',
            icon: <InfoCircleOutlined />,
          }}
          rules={rules.picture}
        >
          <PicturesWall />
        </Form.Item>

        <Form.Item
          name="agreement"
          rules={[
            {
              validator: (_, value) => (value ? Promise.resolve() : Promise.reject('Should accept agreement')),
            },
          ]}
          valuePropName="checked"
          {...tailFormItemLayout}
        >

          <Checkbox>
            I have read the
            {' '}
            <a href="https://www.google.com">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>

          <Button
            htmlType="submit"
            type="primary"
            history={menuStore.history}
          >
            Register

          </Button>

        </Form.Item>
      </Form>
    </Layout>
  );
};
export default inject('menuStore')(observer(Onboard));
