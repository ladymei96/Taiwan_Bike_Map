import Tainan from '@/statics/assets/taiwanPhoto/Tainan.jpg';
import Keelung from '@/statics/assets/taiwanPhoto/Keelung.jpg';
import Hualien from '@/statics/assets/taiwanPhoto/Hualien.jpg';
import Taitung from '@/statics/assets/taiwanPhoto/Taitung.jpg';

export const TOP_ROAD = [
  {
    RouteName: '七股瀉湖自行車道',
    AuthorityName: '七股區公所',
    CityCode: 'TNN',
    City: '臺南市',
    Town: '七股區',
    RoadSectionStart: '觀海樓東側入口',
    RoadSectionEnd: '七股鹽山',
    Direction: '雙向',
    CyclingLength: 3010,
    UpdateTime: '2022-04-15T00:00:38+08:00',
    Url: `bg-[Url('src/statics/assets/taiwanPhoto/Tainan.jpg')]`,
    Style: `background-image: Url(${Tainan})`,
    ImgUrl: Tainan
  },
  {
    RouteName: '基隆市自行車道濱海支線路網',
    AuthorityName: '觀光及城市行銷處、工務處養護工程科、產業發展處',
    CityCode: 'KEE',
    City: '基隆市',
    Town: '中正區',
    RoadSectionStart: '中正里基隆二信旁巷弄',
    RoadSectionEnd: '潮境公園',
    Direction: '雙向',
    CyclingLength: 6000,
    finishedTime: '1060827',
    UpdateTime: '2022-04-15T00:00:38+08:00',
    Url: `bg-[Url('src/statics/assets/taiwanPhoto/Keelung.jpg')]`,
    Style: `background-image: Url(${Keelung})`,
    ImgUrl: Keelung
  },
  {
    RouteName: '光復糖廠自行車道',
    AuthorityName: '花蓮台糖公司',
    CityCode: 'HUA',
    City: '花蓮縣',
    Town: '光復鄉',
    RoadSectionStart: '糖廠街',
    RoadSectionEnd: '糖廠街',
    Direction: '雙向',
    CyclingLength: 2000,
    finishedTime: '1010325',
    UpdateTime: '2022-04-15T00:00:38+08:00',
    Url: `bg-[Url('src/statics/assets/taiwanPhoto/Hualien.jpg')]`,
    Style: `background-image: Url(${Hualien})`,
    ImgUrl: Hualien
  },
  {
    RouteName: '三仙台自行車道',
    CityCode: 'TTT',
    City: '臺東縣',
    UpdateTime: '2022-04-15T00:00:05+08:00',
    Url: `bg-[Url('src/statics/assets/taiwanPhoto/Taitung.jpg')]`,
    Style: `background-image: Url(${Taitung})`,
    ImgUrl: Taitung
  }
];
