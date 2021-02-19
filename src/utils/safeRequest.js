const safeFx = (fn) => Promise.race([
  fn(),
  new Promise((_, reject) => setTimeout(() => reject({
    statusCode: '403',
    message: 'request timeout',
  }), 2000)),
]).then((res) => res).catch((error) => {
  throw new Error(error);
});
export default safeFx;
