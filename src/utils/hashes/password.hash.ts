import * as argon from 'argon2';
exports.hashPassword = (password:string) =>{
  return argon.hash(password);
}

exports.verifyPassword = (hashedPassword:string, password:string)=>{
    return argon.verify(hashedPassword,password)
}