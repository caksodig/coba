//load model untuk `user` table//
const menuModel = require (`../models/index`).menu;
//load operasi untuk sequelize//
const Op = require(`sequelize`).Op
const {request,response} = require ('express')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const upload = require(`./uploadMenu`).single(`gambar`)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//buat function untuk read semua data//
exports.getAllMenu = async (request, response) => {
    //panggil findAll() untuk menampilkan semua data//
    let menu = await userModel.findAll()
    return response.json({
        succes: true,
        data: menu,
        message: `semua menu ditampilkan`
    })
}

//buat function untuk filter//
exports.findMenu = async (request, response) => {
    //define keyword untuk menemukan data//
    let keyword = request.body.keyword

    //call findAll() within where clause and operation to find data based on keyword//
    let menu = await menuModel.findAll ({
        where: {
            [Op.or]: [
                { nama_menu: { [Op.substring]: keyword } },
                { jenis: { [Op.susbtring]: keyword } },
                { deskripsi: { [Op.susbtring]: keyword } },
                { gambar: { [Op.susbtring]: keyword } },
                { harga: { [Op.susbtring]: keyword } },
                { stok: { [Op.susbtring]: keyword } }

            ]
        }
})
return response.json({
    succes: true,
    data: menu,
    message: ` semua menu diambil datanya`
})
}

exports.addMenu = (request, response) => {
    upload(request, response, async (error) => {
      if (error) {
        return response.json({ message: error });
      }
  
      if (!request.file) {
        return response.json({ message: `Nothing to upload` });
      }
  
      let newMenu = {
        nama_menu: request.body.nama_menu,
        jenis: request.body.jenis,
        deskripsi: request.body.deskripsi,
        gambar: request.file.filename,
        harga: request.body.harga,
      };
  
      console.log(newMenu);
  
      menuModel
        .create(newMenu)
        .then((result) => {
          return response.json({
            success: true,
            data: result,
            message: `New Menu has been inserted`,
          });
        })
        .catch((error) => {
          return response.json({
            success: false,
            message: error.message,
          });
        });
    });
  };
  
  //mengupdate salah satu data
  exports.updateMenu = (request, response) => {
    upload(request, response, async (error) => {
      if (error) {
        return response.json({ message: error });
      }
  
      let idType = request.params.id;
  
      let dataType = {
        nama_menu: request.body.nama_menu,
        jenis: request.body.jenis,
        deskripsi: request.body.deskripsi,
        gambar: request.file.filename,
        harga: request.body.harga,
      };
  
      if (request.file) {
        const selectedUser = await tipeModel.findOne({
          where: { id: idType },
        });
  
        const oldFotoUser = selectedUser.gambar;
        const patchFoto = path.join(__dirname, `../gambar`, oldFotoUser);
  
        if (fs.existsSync(patchFoto)) {
          fs.unlink(patchFoto, (error) => console.log(error));
        }
        dataType.gambar = request.file.filename;
      }
  
      tipeModel
        .update(dataType, { where: { id: idType } })
        .then((result) => {
          return response.json({
            success: true,
            message: `Data menu has been update`,
          });
        })
        .catch((error) => {
          return response.json({
            success: false,
            message: error.message,
          });
        });
    });
};

exports.deleteMenu = (request, response) => {
    let id_menu = request.params.id
    memberMenu.destroy({ where: { id: id_menu } })
        .then(result => {
            return response.json({
                succes: true,
                message: `data menu dihapus`
            })
        })
        .catch(error => {
            return response.json({
                succes: false,
                message: error.message
            })
        })

}