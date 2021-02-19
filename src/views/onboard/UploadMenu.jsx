import {
  Layout, Row, Col,
} from 'antd';
import React from 'react';
import { inject, observer } from 'mobx-react';
import QRCode from 'qrcode.react';

const UploadMenu = () => {
  const venueId = sessionStorage.getItem('ID');

  console.log(`venueId${venueId}`);

  // setTimeout(function () {
  //     location.replace('http://localhost:3001/uploadMenu?venueid='+venueId);
  // }, 3000);

  return (
    <Layout className="uploading" style={{ padding: '0px 12px' }}>
      <div
        id="idRes"
        style={{
          marginTop: '10%',
          marginLeft: '15%',
        }}
      >
        <Col>
          <Row gutter={[0, 100]}>
            <h1>ID:</h1>
            <div id="restaurantId" style={{ padding: '0px 8px' }}>
              <h1>{venueId}</h1>
            </div>
          </Row>
          <Row>
            <h1>QR Code:</h1>
            <div id="qrcode" style={{ padding: '0px 8px' }}>
              <QRCode
                value={`https://yiy142.github.io/imp-res-2020/#/menu/?venueid=${venueId}`}
                size={256}
              />
            </div>
          </Row>
        </Col>
      </div>
    </Layout>
  );
};
export default inject('menuStore')(observer(UploadMenu));
