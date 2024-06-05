
const Baseurl = () => {
  var currentDomain = window.location.hostname;
  // console.log("Current domain:", currentDomain);
  // const baseURL = process.env.REACT_APP_API_ENDPOINT
  const baseURL = 'http://'+currentDomain+':8000';
  //  const baseURL = window.location.origin;
  //  const baseURL = 'https://ivendsoft.indeftts.net'
  return baseURL
}
export default Baseurl



