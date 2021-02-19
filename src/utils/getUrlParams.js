export default function getUrlParams(name, str) {
  const urlParams = new URLSearchParams(str);
  const myParam = urlParams.get(name);
  return myParam;
}
