import React, { useEffect } from 'react';
import { Tabs, notification, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import DishesCards from './components/DishesCards';
import RestaurantInfo from './components/RestaurantInfo';
import '../../store/index';

const { TabPane } = Tabs;

function MenuLayout({ menuStore, ...props }) {
  useEffect(() => {
    const { search } = props.location;
    const venueId = menuStore.getVenueId(search);
    if (!venueId) {
      Modal.error({
        title: 'Looks like you are entering a wrong restaurant...',
        content: (
          <div>
            <div> Please re-scan the QR </div>
          </div>),
      });
      return;
    }
    async function fetch() {
      const res = await menuStore.getMenu(venueId);
      if (res) notification.error(`${res.code}:${res.message}`);
    }
    fetch();

    const status = menuStore.getPayStatus(search);
    if (status === 'fail') {
      Modal.error({
        title: 'Payment Failed!',
        content: <span>Failed to pay the bill, please try again </span>,
      });
    } else if (status === 'success') {
      Modal.success({
        title: 'Payment Successful!',
        content: <span> Your Bill Has Been Paid </span>,
      });
    }
  }, [props.location]);

  const TabChange = () => (

    <Tabs defaultActiveKey="1" style={{ padding: '10px', maxHeight: '100%', overflow: 'auto' }}>
      <TabPane tab="Menu" key="1">
        <DishesCards />
      </TabPane>
      <TabPane tab="Comments" key="2">
        Comments
      </TabPane>
      <TabPane tab="Restaurant Info" key="3">
        <RestaurantInfo />
      </TabPane>
    </Tabs>
  );

  return (
    <TabChange />
  );
}
export default inject('menuStore')(observer(MenuLayout));
