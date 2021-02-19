import React from 'react';
import { Row, Col, Image } from 'antd';
import { inject, observer } from 'mobx-react';
import '../../store/index';

function OnboardSuccess(props) {
  // 根据props.restaurantID生成个二维码，二维码的链接是个url.二维码的格式应该是一个path
  const QRSource = `http:/github.io/yiy142/${props.restaurantId}`;
  return (
    <Row>
      <Col>
        <Image src={QRSource} alt="QR Code" />
      </Col>
      <Col />
    </Row>
  );
}
export default inject('menuStore')(observer(OnboardSuccess));
