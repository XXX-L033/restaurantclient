import Menu from './Menu';

const menuStore = new Menu();

export default {
  menuStore,
  rootStore: {
    menuStore,
  },
};
