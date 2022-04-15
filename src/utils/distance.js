/** 兩點座標距離 */
export const twoPointDistance = (p1, p2) => {
  const distance = Math.sqrt(
    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
  );
  return distance;
};

/** 經緯度換算距離
 * N: 英里
 * K: 公里
 * M: 公尺
 */
export const distance = (p1, p2, unit) => {
  if (p1.x == p2.x && p1.y == p2.y) {
    return 0;
  } else {
    var radlat1 = (Math.PI * p1.x) / 180;
    var radlat2 = (Math.PI * p2.x) / 180;
    var theta = p1.y - p2.y;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    if (unit == 'M') {
      dist = dist * 1.609344 * 1000;
    }
    return parseInt(dist, 10);
  }
};
