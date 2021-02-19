import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/restaurantapi-env-1.eba-mr6k5igv.eu-west-2.elasticbeanstalk.com/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default new class Service {
  async getMenu(payload) {
    return axiosInstance.get('/menu', {
      params: {
        venueid: payload,
      },
    }).then((res) => res).catch((err) => {
      throw new Error(err);
    });
    // const ROOT_URL = 'http://restaurantapi-env-1.eba-mr6k5igv.eu-west-2.elasticbeanstalk.com/api/menu/?venueid=12345';
    // return fetch(`${ROOT_URL}`, { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  async placeOrder(payload) {
    return axiosInstance.post('/order/place', payload).then((res) => res.data)
      .catch((error) => { throw new Error(error); });
  }

  async onboard(payload) {
    return axiosInstance.post('/onboarding', payload).then((res) => res.data)
      .catch((error) => { throw new Error(error); });
  }

  async getTables(payload) {
    return axiosInstance.get('venues/tables', {
      params: {
        venueid: payload,
      },
    }).then((res) => res.data);
  }
}();
