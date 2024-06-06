import jwt from 'jsonwebtoken';

// export default function generateToken(payload={}) {
//   const token =  jwt.sign(payload, 'secret', {
//     expiresIn: "1h"
//   })

//   console.log(token, 'TOKEN');
//   return token;
  
// }

const generateToken = (data={}) => {
  return jwt.sign(data, process.env.JWT_SECRET || 'secret', {
    expiresIn: "1h",
  })
}

export default generateToken