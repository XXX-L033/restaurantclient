import React from 'react';

import {
  Skeleton,
  Layout, Menu, Spin,
} from 'antd';

import {
  inject, observer,
} from 'mobx-react';
import { toJS } from 'mobx';

import Basket from './Basket';

import DishCard from './DishCard';

import TableInput from './TableInput';

const { Content, Sider } = Layout;

@inject('menuStore') @observer
class DishesCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedTab: 'all',
    };
    this.showDishCard = this.showDishCard.bind(this);
    this.menuStore = this.props.menuStore;
    Object.keys(this.menuStore).forEach((el) => {
      this.menuStore[el] = toJS(this.menuStore[el]);
    });
  }

  showDishCard(tab) {
    const { state } = this;
    this.setState({
      ...state,
      openedTab: tab.key,
    });
  }

  computedMenuItems() {
    const { menu, status } = this.menuStore;
    if (status === 'pending') {
      return [1, 2, 3].map((el) => (
        <span key={el}>
          <Skeleton active />
        </span>
      ));
    }
    const outer = Object.keys(menu).map((el) => (
      <Menu.Item key={el}>
        {el}
      </Menu.Item>
    ));
    outer.unshift(<Menu.Item key="all"> All </Menu.Item>);
    return outer;
  }

  computedDishCards() {
    const { openedTab } = this.state;
    const { menu, status } = this.menuStore;
    if (status === 'pending') {
      return (
        <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%' }} />
      );
    }
    let displayedDishes;
    if (openedTab === 'all') {
      displayedDishes = Object.values(menu).flat();
    } else {
      displayedDishes = menu[openedTab] || [];
    }
    return displayedDishes.map((el) => (
      <DishCard key={el.item_id} data={el} />
    ));
  }

  render() {
    const dishes = this.computedDishCards();
    const menuItems = this.computedMenuItems();

    return (
      <Layout className="dishcards" style={{ padding: '24px 0', height: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width="150px"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu
            onClick={this.showDishCard}
            style={{ height: '100%' }}
            className="dishcard-menu"
            defaultSelectedKeys={['all']}
            theme="light"
            mode="inline"
          >
            {menuItems}
          </Menu>
        </Sider>

        <Content
          className="dishcards"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Layout className="tableinput" style={{ padding: '10px 12px', height: '14%' }}>
            <TableInput />
          </Layout>
          {dishes}
        </Content>
        <Basket />
      </Layout>

    );
  }
}

export default DishesCards;
