import React from 'react';
import { Layout, Steps, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import {
  CameraOutlined, CoffeeOutlined, PayCircleOutlined, SmileOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import logo from '../../public/assets/logo.svg';

const { Step } = Steps;
const { Header, Content } = Layout;

const Minimal = (props) => {
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  });
  const { children, menuStore, location } = props;
  const status = menuStore.getPayStatus(location.search) === 'success';
  let stepArray = status ? ['finish', 'finish', 'finish', 'finish'] : ['finish', 'process', 'wait', 'wait'];
  if (!status && location.pathname === '/payoffline') {
    stepArray = ['finish', 'finish', 'process', 'wait'];
  }
  return (
    <Layout>
      <Header className="header">
        <img
          alt="LOGO"
          className="logo"
          src={logo}
        />
        <span>
          {/* {menuStore.restaurant?.name || 'Name To be Plugged In With Scanning QR'} */}
        </span>
        <Link to="/onboarding" target="_blank" style={{ position: 'absolute', right: '10px' }}>
          Join Us!
        </Link>
      </Header>
      { !isTabletOrMobileDevice
      && (
        <div style={{ margin: '10px 10% 0' }}>
          <Steps size="small" direction={isTabletOrMobileDevice ? 'vertical' : 'horizontal'}>
            <Step status={stepArray[0]} title="Scan QR" icon={<CameraOutlined className="progress-icon" />} onClick={() => { message.success('Take me to the scanning page'); }} />

            <Step status={stepArray[1]} title="Pick your Meals" icon={<CoffeeOutlined className="progress-icon" />} />
            {/* CoffeeOutlined */}
            <Step status={stepArray[2]} title="Pay" icon={<PayCircleOutlined className="progress-icon" />} />
            <Step status={stepArray[3]} title="Done" icon={<SmileOutlined className="progress-icon" />} />
          </Steps>
        </div>
      ) }
      <Content>
        {children}
      </Content>
    </Layout>
  );
};
export default inject('menuStore')(observer(Minimal));
