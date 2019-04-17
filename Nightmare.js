var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var parseItem = require('./parse.js');
var sqlite = require('./db.js'),
  db = sqlite.init('./afl.db');
var path = require('path'); //系统路径模块
const fs = require('fs');

const url = {
  top: 'https://affiliate.rakuten.co.jp/',
  login: 'https://grp02.id.rakuten.co.jp/rms/nid/vc?__event=login&service_id=p11',
  shop: 'https://affiliate.rakuten.co.jp/link/pc/shop?me_id=1301725',
  item: 'https://affiliate.rakuten.co.jp/link/pc/item?me_id=1279405&item_id=12014065&me_url=https%3A%2F%2Fitem.rakuten.co.jp%2Fstylife%2Fr12158%2F&me_img_src=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fstylife%2Fcabinet%2Fitem%2F158%2Fr12158-10_1.jpg&goods_name=%E3%80%90SALE%EF%BC%8F10%25OFF%E3%80%91nano%E3%83%BBuniverse+Anti+Soaked+30%2F-V%E3%83%8D%E3%83%83%E3%82%AFT%E3%82%B7%E3%83%A3%E3%83%84+%E3%83%8A%E3%83%8E%E3%83%A6%E3%83%8B%E3%83%90%E3%83%BC%E3%82%B9+%E3%82%AB%E3%83%83%E3%83%88%E3%82%BD%E3%83%BC%E3%80%90RBA_S%E3%80%91%E3%80%90RBA_E%E3%80%91&mitem_flg=1&price=3693&tax_flg=0&postage_flg=1&change_flg=0'
}
const temp = {
  "itemId": "02",
  "imgUrl": "https://hbb.afl.rakuten.co.jp/hgb/17e8eb54.bf577ba1.17e8eb55.0e75b916/?me_id=1331207&item_id=10000233&m=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Ftryangle%2Fcabinet%2F05312198%2F05824090%2Fta-oop10-1.jpg%3F_ex%3D80x80&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Ftryangle%2Fcabinet%2F05312198%2F05824090%2Fta-oop10-1.jpg%3F_ex%3D300x300&s=300x300&t=pict",
  "itemName": "パーティードレス 結婚式ワンピース お呼ばれ 他と被らない ロング フィッシュテール ワンピース フラワーモチーフ ロングドレス シフォン 冬　秋冬 SSS",
  "price": "2,900",
  "btnName": "楽天で購入",
  "btnUrl": "https://hb.afl.rakuten.co.jp/hgc/17e8eb54.bf577ba1.17e8eb55.0e75b916/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Ftryangle%2Fta-op10%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Ftryangle%2Fi%2F10000233%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjMwMHgzMDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjF9"
}
// dipatch();
appStart();
function dipatch() {
  var callback = function (err, data) {
    if (err) {
      res.send('文件读取失败');
    } else {
      var category = JSON.parse(data);
      var ladys = category.ladys.childNodes;
      var t = ladys[0].childNodes[0].url
      console.log(t);
      // for (var i = 0; i < ladys.length; i++) {
      //   if (ladys[i].c) 
      //   console.log(ladys[i].title);
      // }
    }
  }
  var category = getFile('category', callback);
}

function appStart() {
  nightmare
    .goto(url.login)
    .viewport(1024, 768)
    .wait('input[name="submit"]')
    .type('input[name="u"]', 'kousomei@yahoo.cn')
    .type('input[name="p"]', '5917364')
    .click('input[name="submit"]')
    .wait('form[id="item_search"]')
    .then(function () {
      console.log('jump to:' + url.item);
      jumpto(url.item);
    })
    .catch(error => {
      console.error('Search failed:', error)
    })
}

function jumpto(url) {
  nightmare
    .goto(url)
    .wait('#codebox')
    .wait('#preview_box')
    .evaluate(function () {
      //document.querySelector('#r1-0 a.result__a').href
      let data = {
        $item_url: $('#preview_box a')[0].href,
        codebox: $('#codebox').val(),
        $img_length: $('#alt_imgs_container .p-1').length,
        $store_name: $('span[class="emphasis-md afl-pink margin-left-sm"]').text(),
        $store_msg: $('#create_link > div:nth-child(2) > div.col-md-7.pb-3 > div > p:nth-child(5)').text()
      }
      return data;
    })
    .then(function (data) {
      console.log('item_url:' + data.$item_url);
      var item = parseItem.getData(data);
      // 插入到数据库
      sqlite.addItems(db, item).then(function (result) {
        console.log('Success:', result);
      }).catch(function (err) {
        console.log('Failure:', err);
      });
    })
    .catch(error => {
      console.error('Search failed:', error)
    })
}

function end() {
  nightmare
    .end()
    .then()
    .catch(error => {
      console.error('Search failed:', error)
    });
}

function getCategory() {

  var ladys = {
    title: 'レディスファッション',
    url: 'https://affiliate.rakuten.co.jp/search/?g=100371&gl=2&v=2&l-id=affiliate_PC_top_g%3D100371&s=1',
    childNodes: []
  }
  var li = $('form[method="get"]+p[class="mb-1 text-palette-black-light emphasis-sm"] + ul[class="list-unstyled ml-2 mb-2"] > li[class="my-2"]');
  var childNodes = [];
  for (i = 0; i < li.length; i++) {
    var child = {
      "title": "",
      "url": "",
    }
    child.title = li[i].childNodes[1].firstElementChild.innerText;
    child.url = li[i].childNodes[1].href;
    childNodes.push(child);
  }
  ladys.childNodes = childNodes;

}

function getFile(filename, callback) {
  var baseUrl = path.join(__dirname + "/json/");
  var file = path.join(baseUrl + filename + ".json");
  //读取json文件
  fs.readFile(file, 'utf-8', callback);
}