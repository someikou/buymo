var sqlite = require('./db.js'),
    db = sqlite.init('./afl.db');

var selectValue = function (parms) {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            db.get('select * from items where id = $id',
                { $id: parms.id },
                function (err, res) {
                    if (err) return reject(err);
                    resolve(res);
                });
        });
    });
};

// var addItems = function (parms) {
//     return new Promise(function (resolve, reject) {
//         db.serialize(function () {
//             db.run('Insert Into items (id,item_id,afl_url,afl_img_url,img_length,text,price,item_url,store_name,store_msg) values ((select count(*)+1 from items),$item_id,$afl_url,$afl_img_url,$img_length,$text,$price,$item_url,$store_name,$store_msg)',
//                 parms,
//                 function (err, res) {
//                     if (err) return reject(err);
//                     resolve(res);
//                 });
//         });
//     });
// };

// 検索してなんかする処理
var parms = {
    id: '10'
};

var item = {
    $item_id:'12014065',
    $afl_url:'222',
    $afl_img_url:'222',
    $img_length:'222',
    $text:'222',
    $price:666,
    $item_url:'222',
    $store_name:'222',
    $store_msg:'222'
}
var updParm = {
    $item_id: '12014065',
    $afl_url: 'parms.$afl_url',
    $afl_img_url: 'bbbbb',
    $img_length: 20,
    $text: 'adfs',
    $price: 667,
    $item_url: 'adfs',
    $store_name: 'adfs',
    $store_msg: 'adfs',
    $upd_time: timetrans(new Date()),
    //$upd_time: '2019/03/24 15:24:29',
    $del_flg: 0,
}
// selectValue(parms).then(function (result) {
//     console.log('Success:', result.text);
// }).catch(function (err) {
//     console.log('Failure:', err);
// });

sqlite.addItems(db,updParm);

// 时间格式转换
function timetrans(date){
    //var date = new Date(date*1000);//如果date为13位不需要乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    var ymdhms = Y+M+D+h+m+s;
    console.log(ymdhms)
    return ymdhms;
  }