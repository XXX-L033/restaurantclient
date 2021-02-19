import {
  observable,
  action,
  computed,
  runInAction,
  makeObservable,
} from 'mobx';
import Service from '@/services/Service';
import getUrlParams from '@/utils/getUrlParams';

export default class Menu {
  @observable menu = {};
  // var menu = observable({})

  @observable status = 'pending'; // enum: pending, done, error

  @observable restaurants = [];

  @observable restaurantOpenId = null;

  @observable cart = {};

  @observable tables = [];

  @observable page = true;

  @observable venueid = '';

  @observable payStatus = '';

  @computed get restaurant() {
    return this.restaurants.find((rest) => rest.id === this.restaurantOpenId);
  }

  constructor() {
    makeObservable(this);
  }

  @action addCart(data) {
    if (data.count === 0) {
      delete this.cart[data.item_id];
      return;
    }
    this.cart[data.item_id] = data;
  }

  @action getVenueId(search) {
    this.venueid = getUrlParams('venueid', search);
    return this.venueid;
  }

  @action getPayStatus(search) {
    this.payStatus = getUrlParams('paid', search);
    return this.payStatus;
  }

  @action async getMenu(restaurantID) {
    this.status = 'pending';
    try {
      const res = await Service.getMenu(restaurantID);
      runInAction(() => {
        this.status = 'done';
        this.menu = res.data;
      });
      await this.getTable(restaurantID);
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }

  @action async getTable(restaurantID) {
    const res = await Service.getTables(restaurantID);
    runInAction(() => {
      this.tables = res.tables;
    });
  }

  @action async onboard(resInfo) {
    try {
      const formattedResInfo = resInfo;
      const res = await Service.placeOrder(formattedResInfo);
      return res;
    } catch (err) {
      this.status = 'error';
      throw err;
    }
  }

  @action async placeOrder(order) {
    try {
      const itemArray = Object.entries(this.cart).map(([k, v]) => ({
        item_id: k,
        ...v,
      })).map((el) => ({
        item_id: `${el.item_id}`,
        price_per_unit: `${el.price}`,
        quantity: `${el.count}`,

      }));
      const formattedOrder = {
        venueid: this.venueid || '12345',
        time: Date.now().toString(),
        ...order,
        order: itemArray,
      };
      const res = await Service.placeOrder(formattedOrder);
      return res;
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }
}
