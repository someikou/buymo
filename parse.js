var cheerio = require('cheerio');
const fs = require('fs');

// fs.readFile('./demo1.html', 'utf8', (err, data) => {
//     if (err) throw err;
//     //console.log(data);
//     $ =  cheerio.load(data);
//     var a = $('#sns_pc_url').text()
//     const text = $('#codebox');
//     console.log(text.val());
//   });

module.exports.getData = function (params) {
$ =  cheerio.load(params.codebox);
// 商品的URL
const aflUrl = $('a')[0].attribs.href;
// 图片的URL
const aflImgUrl = $('a')[0].children[0].attribs.src;
// 标题
const text = $('a')[1].children[0].data;

return {
    $item_id : getInfo(aflImgUrl,'item_id=','&'),
    $afl_url : aflUrl,
    $afl_img_url : aflImgUrl,
    $img_length : params.$img_length,
    $text : text,
    $price:666,
    $item_url: params.$item_url,
    $store_name : params.$store_name,
    $store_msg : params.$store_msg,
    $upd_time : timetrans(new Date()),
    $del_flg : 0
}
}; 
// 截取被固定字符串包围的内容
function getInfo(source,start,end){
    var oReg=new RegExp(start+".*?"+end,"img");
    var oRegStart=new RegExp(start,"g");
    var oRegEnd=new RegExp(end,"g");
    return source.match(oReg)[0].replace(oRegStart,"").replace(oRegEnd,"");
}
// 时间格式转换
function timetrans(date){
    //var date = new Date(date*1000);//如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
  }
