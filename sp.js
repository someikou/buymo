const request = require('superagent');
const fs = require('fs');
// request
// .post('https://grp02.id.rakuten.co.jp/rms/nid/logini')
// .set('Content-Type', 'application/x-www-form-urlencoded')
// .send('service_id:p11')
// .send('u:kousomei%40yahoo.cn')
// .send('p:5917364')
// .send('submit:%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3')
// .send('pp_version:20170213')
// .send('device_fp:9317b4116abea57761923b91a6887895')
// .send('time_zone:-540')
// .send('os_info:Win32')
// .then(function(res) {
//     //console.log(res.header['set-cookie']);
//     console.log(res.text);
// })
// .catch(function(err) {
//     console.log(err);
// });


var cookies = 'lc_item={%22type%22:%22picttext%22%2C%22image_size%22:%22240%22%2C%22show_name%22:true%2C%22caption_pos%22:%22right%22%2C%22caption_width%22:250%2C%22show_price%22:true%2C%22fixed_name%22:false%2C%22show_border%22:true%2C%22show_comment%22:true%2C%22comment_pos%22:%22down%22%2C%22enable_colors%22:true%2C%22link_color%22:%22%22%2C%22price_color%22:%22%22%2C%22border_color%22:%22#95a5a6%22%2C%22comment_color%22:%22#000000%22%2C%22background_color%22:%22#FFFFFF%22%2C%22show_button%22:true}; _ra=1552102822385|569bd502-7a79-4415-8c44-7423922cd77f; Rp=c6f1ec8cc2f5a263d7a35b510c5c8335ab6dbaf; Ry=1&ae514f4289558245ac4334b0ac811ff8c96f450b0ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEF&20190309132600; Rz=AyW_hYvUbCY7RzOy4YaCAhhj1omUav16-KaGLGrS0Mc8blsY4LeXCZGxG5v4nS_lcLBYHrW5E1TsVfhbg5Nvyv8xxcPBJgaxVa4VCTjpNyE8G2F5in3MJy3wZQO6zaDOLQ~~; Rq=M01.2&5c834058; XSRF-TOKEN=eyJpdiI6IkVFRVBGd2pxTUErNU5rRkxcLzJtV1dBPT0iLCJ2YWx1ZSI6IkpZUmF1NDY3bnI5Y3VUWXd6cllLbEE1ejFHSkQ0UzhsNXRLWXU5XC8raHpBSFNLc0g4KzJmRUZ3RXZ0alZVdUNsIiwibWFjIjoiMDQxYTMwNWMzYWFhNjdjMGNiM2Q4Y2E2ZGYxYzZmYTAyNWNmMjE4MGE3MWNjMWQyMzZlYmY0M2UwNTk0M2UzNiJ9; laravel_session=eyJpdiI6IkF1UGdyK2VSRlwvNm16SEZTNDErVjhBPT0iLCJ2YWx1ZSI6InBTR1g5b1wvblF4Q3V6TEF6UXhISmJBN1BpUTdZd1VqNTRZQjRhTUFjNHVaWUFYTGZmMGF3alppejEra01GUHR0IiwibWFjIjoiNjc0ZTY2Y2UwNDk0OTI2Y2ViODk1MjA3MDMwN2RhYjNkMDBlNDUyZjAwNWRhZTU4ODUzNzRkZmNkMGYwZGIzNiJ9; hdZZeVD53Vam9G9IQCqvWVdMs9mOo1baQNBCmfNp=eyJpdiI6IndRSnJ4dFdwS3Q2Y2l1TjZkR3RwOEE9PSIsInZhbHVlIjoiU1ZGckZNSzFqbklzSGRQOFpybnVnMzdNTWFqMTkzN1VZRWIydWlhanNrSVIyamx3emRTdnM2Nm95V1B5VWttODB4ZHFnc1FnaU4yXC9SWkEzaWJcL2Q3dUsrYnQ4XC9wc3paMkYxc0FEYVFZbnRhdktLNCt4QUo5eFhkbTB2cVo5NHVuYndwbmhMZnA5WW13MmpkU0hSZkVSOTFsTmFPcU1RRW8wNlp2bXppaHR1NWZhR3dIQlwvNVpuY2pcL2R4VkFcL1Y1dzhhZTRzaHQ1UURCeU5pWW4wS2M4eUpUVlFVa3paOFNJTU83NGlZRTlmQkllTDlQYytWOHMrOGkzbjhha090dlkwRGFxRDRtWitEdmpDMThaUWVuRmtiQUNYTE1XYWF6ZUg4RVVOM1ZLaGhORXVLenZGWkdNQWhnUVg4MjNvbHEiLCJtYWMiOiI2ODllZWFjMGY3NWY0MzcwNjE4ODRjZWJmMDk0MDBmZTUwYTYzNmZhMmZmM2ExYzllZDc5MTI3YjU1MWMzZGY0In0%3D; _kyp=QEkQBpnNVRNcQUJR0aAZZvqfRSvF2YJbT9h5XQmoGnKW0sFo6I5gltP2ZnjkbRW6Oi194MboScIgwyAl4N9xwFnUXLK+EDTOmCW0saOzpR2sLQbzECXg33HAUdrC0G8wS2n7MoVT_.rakuten.co.jp; __ulfpc=201903091247515494; s_pers=%20s_mrcr%3D1200400000000000%257C4000000000000%257C4000000000000%257C4000000000000%7C1709785567784%3B%20s_fid%3D6DB3473B9B5FA512-25B4FD2BA655F110%7C1615264019651%3B; s_sess=%20s_cc%3Dtrue%3B%20s_prevsite%3Daffiliate%3B%20s_sq%3Drakutencommonidprod%253D%252526pid%25253Drms%2525253Anid%2525253Alogini%252526pidt%25253D1%252526oid%25253D%252525E7%25252599%252525BB%252525E5%252525BD%25252595%252526oidt%25253D3%252526ot%25253DSUBMIT%3B; Rb=1sf83e5M01; _kys=QEkRC6asVuajAA_.rakuten.co.jp; rat_v=7279a73b1e7c04add0814173cc5c834049df2c5; ak_bmsc=170C8C0D3BE1CCCBD05C244684227EA06EE89935A35B00005D40835C12419F68~pl8ZyHxmvGz6GHgiXp+OOT0nQLWmyPiUthVz946XU71KV5XDIshD6OQP33uwniC8HHA5/0KC8YeYsD2yx3xspV8n4OeVSNV/X66I2Ke4J+ajLGJ4nX2u3zSrg2i6kyYgqj9F7U9ac+rXadETzD2yw9NysD4YFRLknaxFbAYkMaNOF4cQ/0VuvXrNUfIKUka5CScWURclNVsij7xuTsAajTy/eZnOfnf7urdGdwo6XIEROf+8dziv86DmA3KvgfMKrO; Rt=a399cbeada77326ebeafd9aee16a4eb7; Rg=1cae16%265280f898ccf73d00810cd575a05a9723de57acbb03dcd8c55690d20d5c840f70d262cdc5e564a1bff66e68a39b0b6284cb4dcc99b124193fc3bd2c198387e6504b8493553cad67d28cbd4bca9b7f72f4de57acbb03dcd8c55690d20d5c840f70924e7ebaec3148a3b72d32e1f27a546871117a06b9ce307ae8ae95355cad2211d958247589e14f651426df67e2ae8ead%262019-03-09+13%3A26%3A11; __gads=ID=076c8fef4040a296:T=1552105578:S=ALNI_MbWhDa1JM8XvhYKWM3tC5e_u34pDw; aflr=D; afls=2018-10-13+19%3A55%3A30';
request.get('https://affiliate.rakuten.co.jp/link/pc/item?me_id=1351383&item_id=10000012')
.set('Host','affiliate.rakuten.co.jp')
.set('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0')
.set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')    
.set('Accept-Language','zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2')
.set('Accept-Encoding','gzip, deflate, br')
.set('Connection', 'keep-alive')
.set('Cookie', cookies)
.set('Upgrade-Insecure-Requests','1')    
.set('Cache-Control','max-age=0')    
.then(function (res) {
        //console.log(res.header['set-cookie']);
        console.log(res.text);
        fs.writeFile('./demo1.html', res.text, function(err){
            if(err) console.log(err)
            else console.log('写文件操作成功');
        })
    })
    .catch(function (err) {
        console.log(err);
    });