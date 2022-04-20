export default {
  scenicSpot(originData) {
    return originData.map(item => {
      const {
        ScenicSpotName,
        DescriptionDetail,
        Phone,
        OpenTime,
        Picture,
        City
      } = item;
      const imgUrl = Picture?.PictureUrl1 ? Picture.PictureUrl1 : null;
      const findClass = Object.keys(item).find(key => {
        return key.includes('Class');
      });
      const classType = item[findClass] ? item[findClass] : '未分類';
      const phone = Phone ? Phone : '未提供';
      const openTime = OpenTime ? OpenTime : '未提供';
      return {
        name: ScenicSpotName,
        description: DescriptionDetail,
        openTime,
        city: City,
        class: classType,
        phone,
        imgUrl
      };
    });
  },
  restaurant(originData) {
    return originData.map(item => {
      const {
        RestaurantName,
        Description,
        Address,
        OpenTime,
        Picture,
        City,
        Phone
      } = item;
      const imgUrl = Picture?.PictureUrl1 ? Picture.PictureUrl1 : null;
      const phone = Phone ? Phone : '未提供';
      const openTime = OpenTime ? OpenTime : '未提供';
      return {
        name: RestaurantName,
        description: Description,
        address: Address,
        openTime,
        city: City,
        phone,
        imgUrl
      };
    });
  }
};
