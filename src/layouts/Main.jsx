import React from 'react';
import { Layout, message, Steps } from 'antd';
import { inject, observer } from 'mobx-react';

import {
  CarryOutOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import logo from '~/public/assets/logo.svg';

const { Step } = Steps;
const { Header, Content } = Layout;

const Main = (props) => {
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });
  const { children, menuStore } = props;
  const status = menuStore.getPayStatus() === 'success';
  const stepArray = status ? ['finish', 'finish'] : ['process', 'wait'];
  return (
    <Layout>
      <Header className="header">
        <img
          alt="LOGO"
          className="logo"
          src={logo}
        />
      </Header>
      <div style={{ margin: '10px 10%' }}>
        <h1> Register With Us in 5 minutes </h1>
      </div>
      {!isTabletOrMobileDevice
            && (
              <div style={{ margin: '10px 10% 0' }}>
                <Steps size="small" direction={isTabletOrMobileDevice ? 'vertical' : 'horizontal'}>
                  <Step
                    status={stepArray[0]}
                    title="Register"
                    icon={<CarryOutOutlined className="progress-icon" />}
                  />
                  <Step
                    status={stepArray[1]}
                    title="Get Your ID and Update "
                    icon={<BulbOutlined className="progress-icon" />}
                    onClick={() => { message.success('Register at first'); }}
                  />
                </Steps>
              </div>
            )}
      <Content>
        {children}
      </Content>
    </Layout>
  );
};
export default inject('menuStore')(observer(Main));
