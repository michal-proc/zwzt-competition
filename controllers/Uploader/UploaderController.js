const Controller = require('../Controller');
const fs = require('fs');

class UploaderController extends Controller {
    constructor() {
        super();
    }

    async uploaderLayer(req, res) {
        let folders = await this.getFolders();
        folders = folders.map(folder => ({folder: folder, files: []}))    
        
        const filesInRoot = await this.getFilesInFolder('./static/uploads');

        for await (const folder of folders) {
            let files = await this.getFilesInFolder('./static/uploads/' + folder.folder);
            folder.files = files;
        }

        folders.push({
            folder: "", files: filesInRoot 
        });

        this.sendTemplatedView(res, 'admin/uploader', { folders: folders, layout: 'admin-layout' });
    }

    changeFile(req,res) {
        const { old_name, name, action } = req.body;

        if (action == "delete") {
            fs.unlinkSync(`./static/uploads/${old_name}`);
            res.redirect('/admin/uploader');
        } else {
            fs.rename(`./static/uploads/${old_name}`, `./static/uploads/${name}`, () => {
                res.redirect('/admin/uploader');
            })
        }
    }

    uploadImage(req, res) {
        const { file } = req.files;
        let { dir } = req.body;
        let path = '';

        if (dir == '/') {
            path = file.name;
        } else {
            path = dir + '/' + file.name;
        }

        file.mv(`./static/uploads/${path}`, err => {
            res.redirect('/admin/uploader');
        })
    }

    getFolders() {
        return new Promise((resolve,reject) => {
            fs.readdir('./static/uploads', { withFileTypes: true }, function(err, dirs) {
                if (!err) {
                    dirs = dirs.filter(dirent => dirent.isDirectory());
                    dirs = dirs.map(dirent => dirent.name);
                    resolve(dirs);
                } else {
                    reject(new Error("Couldn't read dirs"));
                }
            })
        });
    }

    getFilesInFolder(name) {
        return new Promise((resolve, reject) => {
            fs.readdir(name, { withFileTypes: true }, function(err, files) {
                if (!err) {
                    files = files.filter(dirent => dirent.isFile());
                    files = files.map(dirent => dirent.name);
                    resolve(files)
                } else {
                    reject(new Error(err));
                }
            })
        })
    }
}

module.exports = new UploaderController();