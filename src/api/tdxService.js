import axios from 'axios';
import jsSHA from 'jssha';

const basicURL = 'https://ptx.transportdata.tw/MOTC/v2/Bike';

const generateAuthorizationHeader = () => {
  const appId = '55f7102368fd4a128dbfa3b5140f02e4';
  const appKey = 'LGEfSTJYQ4nIfFpfRXBttdXhmYo';
  const GMTString = new Date().toGMTString();
  const shaObj = new jsSHA('SHA-1', 'TEXT');
  shaObj.setHMACKey(appKey, 'TEXT');
  shaObj.update('x-date: ' + GMTString);
  const HMAC = shaObj.getHMAC('B64');
  const Authorization = `hmac username="${appId}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return {
    Authorization,
    'X-Date': GMTString,
    'Accept-Encoding': 'gzip'
  };
};

export const getStationData = async ({ latitude, longitude }) => {
  const url = `${basicURL}/Station/NearBy`;
  const { data } = await axios.get(url, {
    params: {
      $spatialFilter: `nearby(${latitude},${longitude},500)`
    },
    headers: generateAuthorizationHeader()
  });
  return data;
};
export const getAvailableData = async ({ latitude, longitude }) => {
  const url = `${basicURL}/Availability/NearBy`;
  const { data } = await axios.get(url, {
    params: {
      $spatialFilter: `nearby(${latitude},${longitude},500)`
    },
    headers: generateAuthorizationHeader()
  });
  return data;
};
