


export const regValidator = (login, password) => {
  try {
    if (!login || !password) {
      throw 'need login and password!';
    }
    
    let invalid = false;
    const cyrillicPattern = /^[\u0400-\u04FF]+$/;
    const specialsPattern = /\W/;

    // checks
    cyrillicPattern.test(login) ? invalid = "login is can't be cyrillic!" : null;
    cyrillicPattern.test(password) ? invalid = "password is can't be cyrillic!" : null;

    specialsPattern.test(login) ? invalid = "login is can't be include special characters except _" : null;

    login.length < 2 ? invalid = "login length is can't be less than 5!" : null;
    password.length < 2 ? invalid = "password length is can't be less than 5!" : null;

    login.includes(' ') ? invalid = "login is can't be include SPACE!" : null;
    password.includes(' ') ? invalid = "password is can't be include SPACE!" : null;
  
  
    return invalid; 
  } catch(err) {
    console.log(err);

    return err
  }
}
