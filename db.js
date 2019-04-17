var sqlite3 = require('sqlite3');

module.exports.init = function (file) {
    return new sqlite3.Database(file);
};
module.exports.addItems = function (db, parms) {
    var selectParm = {
        $item_id: parms.$item_id
    }
    var addItem = new Promise(function (resolve, reject) {
        db.serialize(function () {
            db.get('select id from items where item_id = $item_id',
                selectParm,
                function (err, res) {
                    if (err) return reject(err);
                    if (res === undefined || res.id === undefined) {
                        //当不存在的时候 插入数据
                        insertItem(db,parms);
                    } else {
                        //存在时更新数据
                        parms.$id = res.id;
                        updateItem(db,parms);
                    }
                    //resolve(res);
                });
        });
    });
    return addItem;
};
module.exports.getItems = function (db, parms) {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            db.run('Insert Into items (id,item_id,afl_url,afl_img_url,img_length,text,price,item_url,store_name,store_msg,upd_time,del_flg) values ((select count(*)+1 from items),$item_id,$afl_url,$afl_img_url,$img_length,$text,$price,$item_url,$store_name,$store_msg,$upd_time,$del_flg)',
                parms,
                function (err, res) {
                    if (err) return reject(err);
                    resolve(res);
                });
        });
    });
};

function insertItem(db, parms) {
    db.serialize(function () {
        db.run('Insert Into items (id,item_id,afl_url,afl_img_url,img_length,text,price,item_url,store_name,store_msg,upd_time,del_flg) values ((select count(*)+1 from items),$item_id,$afl_url,$afl_img_url,$img_length,$text,$price,$item_url,$store_name,$store_msg,$upd_time,$del_flg)',
            parms,
            function (err, res) {
                if (err) {
                    return console.error(err.message);
                }
                console.log('插入(itemId)：' + parms.$item_id);
                return true;
            });
    });
}
function updateItem(db, parms) {
    // 当存在的时候 更新数据
    // let sql = `UPDATE langs
    // SET name = ?
    // WHERE name = ?`;
    var updParm = {
        $item_id: parms.$item_id,
        $afl_url: parms.$afl_url,
        $afl_img_url: parms.$afl_img_url,
        $img_length: parms.$img_length,
        $text: parms.$text,
        $price: parms.$price,
        $item_url: parms.$item_url,
        $store_name: parms.$store_name,
        $store_msg: parms.$store_msg,
        $upd_time: parms.$upd_time,
        $del_flg: parms.$del_flg,
        $id: parms.$id,
    }
    db.serialize(function () {
        db.run(
            'update items set ' +
            'item_id = $item_id, ' +
            'afl_url = $afl_url, ' +
            'afl_img_url = $afl_img_url, ' +
            'img_length = $img_length, ' +
            'text = $text, ' +
            'price = $price, ' +
            'item_url = $item_url, ' +
            'store_name = $store_name, ' +
            'store_msg = $store_msg, ' +
            'upd_time = $upd_time, ' +
            'del_flg = $del_flg ' +
            'where id = $id',
            updParm,
            function (err, res) {
                if (err) {
                    return console.error(err.message);
                }
                console.log('更新(itemId)：' + updParm.$item_id);
                return true;
            });
    })
}