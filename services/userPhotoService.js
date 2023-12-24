import * as uuid from 'uuid';
import * as path from 'path';

class userPhotoService {

  generateName(file) {
    try {
      const prefix = 'user_';
      const ext = file.mimetype == 'image/png' ? '.png' : '.jpg';

      const fileName = prefix + uuid.v4() + ext;

      return fileName
    } catch {
      return ''
    }
  }

  saveOnDisc(file, fileName) {
    try {
      const filePath = path.resolve('static/images/users', fileName);
      file.mv(filePath);

      return true
    } catch(err) {
      return false
    }
  }
}

export default new userPhotoService();
