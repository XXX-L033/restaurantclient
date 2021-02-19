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
  location: [{ required: true, message: 'Please input your restaurant\'s location!', whitespace: true }],
  name: [[{ required: true, message: 'Please input your restaurant\'s name!', whitespace: true }]],
  phone: [{ required: true, message: 'Please input your phone number!' }],
  website: [{ required: true, message: 'Please input website!' }],
  Odoo: [{ required: true, message: 'Please input Odoo Link!' }],
  POS: [{ required: true, message: 'Please input POS Link!' }],

};

module.exports = {
  formItemLayout, tailFormItemLayout, rules,
};
