import axios from 'axios';
import jsSHA from 'jssha';
import { appId, appKey } from '@/token.env.js';
import { baseCompile } from '@vue/compiler-core';

const basicURL = 'https://ptx.transportdata.tw/MOTC/v2';

const generateAuthorizationHeader = ({ appId, appKey }) => {
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
  const url = `${basicURL}/Bike/Station/NearBy`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $spatialFilter: `nearby(${latitude},${longitude},600)`
      },
      headers: generateAuthorizationHeader({ appId, appKey })
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
export const getAvailableData = async ({ latitude, longitude }) => {
  const url = `${basicURL}/Bike/Availability/NearBy`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $spatialFilter: `nearby(${latitude},${longitude},600)`
      },
      headers: generateAuthorizationHeader({ appId, appKey })
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
export const getCityStation = async city => {
  const url = `${basicURL}/Bike/Station/${city}`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $top: 20
      },
      headers: generateAuthorizationHeader({ appId, appKey })
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
export const getCityAvailableData = async city => {
  const url = `${basicURL}/Bike/Availability/${city}`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $top: 20
      },
      headers: generateAuthorizationHeader({ appId, appKey })
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
export const getCyclingData = async city => {
  const url = `${basicURL}/Cycling/Shape/${city}`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $top: 30
      },
      headers: generateAuthorizationHeader({ appId, appKey })
    });
    return data;
  } catch (error) {}
};
