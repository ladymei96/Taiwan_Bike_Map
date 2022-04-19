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
        return key.includes('class');
      });
      const classType = item[findClass] ? item[classkey] : '未分類';
      const phone = Phone ? Phone : '未提供';
      return {
        name: ScenicSpotName,
        description: DescriptionDetail,
        openTime: OpenTime,
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
      return {
        name: RestaurantName,
        description: Description,
        address: Address,
        openTime: OpenTime,
        city: City,
        phone,
        imgUrl
      };
    });
  }
};
