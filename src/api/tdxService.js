import axios from 'axios';
import jsSHA from 'jssha';
import qs from 'qs';
import { appId, appKey } from '@/ptxToken.env.js';
import { clientId, clientSecret } from '@/tdxToken.env.js';

const PTX_BASIC_URL = 'https://ptx.transportdata.tw/MOTC/v2';
const TDX_BASIC_URL = 'https://tdx.transportdata.tw/api/advanced/v2/Bike';
const TDX_TOKEN_URL =
  'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';

const generateAuthorizationHeader = ({ appId, appKey }) => {
  const GMTString = new Date().toGMTString();
  const shaObj = new jsSHA('SHA-1', 'TEXT');
  shaObj.setHMACKey(appKey, 'TEXT');
  shaObj.update('x-date: ' + GMTString);
  const HMAC = shaObj.getHMAC('B64');
  const Authorization = `hmac username="${appId}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return {
    Authorization,
    'X-Date': GMTString
  };
};
// todos:  cache access token
// 取得 cookie
// 沒有就拿,或者過期了就拿
// 拿完寫入 cookie
export const getTdxAccessToken = async () => {
  const params = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  };
  try {
    // axios POST 法1:
    // const res = await axios({
    //   method: 'POST',
    //   url: TDX_TOKEN_URL,
    //   data: qs.stringify(params),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // });

    // axios POST 法2:
    const configs = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    const {
      data: { access_token, expires_in }
    } = await axios.post(TDX_TOKEN_URL, qs.stringify(params), configs);
    return access_token;
  } catch (error) {
    console.log(error);
  }
};

export const getStationData = async ({ latitude, longitude }) => {
  const url = `${TDX_BASIC_URL}/Station/NearBy`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $spatialFilter: `nearby(${latitude},${longitude},600)`
      },
      headers: {
        authorization: `Bearer ${await getTdxAccessToken()}`
      } // todo: 加入 cache
    });
    console.log('station', data);
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
export const getAvailableData = async ({ latitude, longitude }) => {
  const url = `${TDX_BASIC_URL}/Availability/NearBy`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $spatialFilter: `nearby(${latitude},${longitude},600)`
      },
      headers: {
        authorization: `Bearer ${await getTdxAccessToken()}`
      }
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
export const getCityStation = async city => {
  const url = `${PTX_BASIC_URL}/Bike/Station/${city}`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $top: 60
      },
      headers: generateAuthorizationHeader({ appId, appKey })
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
export const getCityAvailableData = async city => {
  const url = `${PTX_BASIC_URL}/Bike/Availability/${city}`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $top: 60
      },
      headers: generateAuthorizationHeader({ appId, appKey })
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
export const getCyclingData = async city => {
  const url = `${PTX_BASIC_URL}/Cycling/Shape/${city}`;
  try {
    const { data } = await axios.get(url, {
      params: {
        $top: 30
      },
      headers: generateAuthorizationHeader({ appId, appKey })
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};

export const getScenicSpotData = async params => {
  const { city, spatialFilter } = params;
  const url = `${PTX_BASIC_URL}/Tourism/ScenicSpot/${city}`;
  const config = {
    params: {
      $top: 20
    },
    headers: generateAuthorizationHeader({ appId, appKey })
  };
  if (spatialFilter) {
    config.params.$spatialFilter = spatialFilter;
  }
  try {
    const { data } = await axios.get(url, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
export const getRestaurantData = async params => {
  const { city, spatialFilter } = params;
  const url = `${PTX_BASIC_URL}/Tourism/Restaurant/${city}`;
  const config = {
    params: {
      $top: 20
    },
    headers: generateAuthorizationHeader({ appId, appKey })
  };
  if (spatialFilter) {
    config.params.$spatialFilter = spatialFilter;
  }
  try {
    const { data } = await axios.get(url, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.Message);
  }
};
