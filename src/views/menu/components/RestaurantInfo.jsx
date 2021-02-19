import React, { useState } from 'react';
import {
  Card, Layout, Row, Col, Button, Divider, notification, Popover, message, Image,
} from 'antd';
import {
  EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined, CopyOutlined,
} from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function RestaurantInfo() {
  const [pictures] = useState([1, 2, 3, 4, 5, 6, 7]);
  const telephone = '0741000000';
  const address = 'Exhibition Rd, South Kensington, London SW7 2BU';
  const openTime = '11:00am - 21:00pm';

  const lzp = () => {
    const w = window.open('about: blank');
    w.location.href = `https://www.google.com/maps/place/${address.replaceAll(' ', '+')}`;
  };

  const openNotification = () => {
    notification.open({
      message: `Calling: ${telephone}`,
      icon: <PhoneOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const addrCopySuccess = () => {
    message.success('Address copied');
  };

  const addrPopContent = (
    <div>
      <CopyToClipboard text={address}>
        <Button type="dashed" shape="circle" icon={<CopyOutlined />} onClick={addrCopySuccess} />
      </CopyToClipboard>
    </div>
  );

  const phoneCopySuccess = () => {
    message.success('Telephone Number copied');
  };

  const phonePopContent = (
    <div>
      <CopyToClipboard text={telephone}>
        <Button type="dashed" shape="circle" icon={<CopyOutlined />} onClick={phoneCopySuccess} />
      </CopyToClipboard>
    </div>
  );

  return (
    <Layout className="restaurant-info">

      <Row style={{ position: 'relative' }}>
        <Col span={4}>
          <Image
            className="restaurant-info-img"
            // width="120px"
            // height="100%"
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        </Col>
        <Col span={20}>
          <Card title="Shake Shack">
            <p> The most famous and expensive buger place around the world! </p>
          </Card>
        </Col>
      </Row>

      <div style={{ padding: '10px 0' }}>
        <Card type="inner">
          <Popover content={addrPopContent} placement="right">
            <EnvironmentOutlined />
            <b>Address: </b>
            {address}
          </Popover>
          <Button type="link" style={{ float: 'right', width: '0px' }} icon={<EnvironmentOutlined />} onClick={lzp} />
          <Divider type="vertical" style={{ float: 'right', height: '30px' }} />
        </Card>

        <Card type="inner">
          <Popover content={phonePopContent} placement="right">
            <PhoneOutlined />
            <b>Telephone: </b>
            {telephone}
          </Popover>
          <Button type="link" style={{ float: 'right', width: '0px' }} icon={<PhoneOutlined />} onClick={openNotification} />
          <Divider type="vertical" style={{ float: 'right', height: '30px' }} />
        </Card>

        <Card type="inner">
          <p>
            <ClockCircleOutlined />
            <b>Open Time: </b>
            {openTime}
          </p>
        </Card>
      </div>
      <div style={{ padding: '10px 0' }}>
        <Card title="Picture">
          <Row>
            {
              pictures.map((el) => (
                <Image
                  key={el}
                  width="20%"
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              ))
            }
          </Row>
        </Card>
      </div>
    </Layout>
  );
}

export default RestaurantInfo;
