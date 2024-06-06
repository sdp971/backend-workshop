import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  // const authorizationHeader = req.headers.authorization;

  // if (!authorizationHeader) {
  //   return res.status(401).json({
  //     message: 'You need a token',
  //   });
  // }

  // if (!token) {
  //   return res.status(401).json({
  //     message: 'Authentication failed'
  //   });
  // }

  // const token = authorizationHeader.split(' ')[1];
  // console.log(token, 'TOKEN');

  // jwt.verify(token, process.env.JWT_SECRET ||'secret', (err, decoded) => {
  //   if (err) {
  //     return res.status(403).json({
  //       message: 'Unauthorized',
  //     });
  //   }
  //   next();
  // });

  if (req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message :'Authentication failed'
      });
    }

     jwt.verify(token, process.env.JWT_SECRET ||'secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }
       console.log(decoded, "DECODED")
       req.user={userId :decoded.userId, username :decoded.username, role:decoded.role}
    next();
     })
    
  } else {
    res.status(401).json({
      messsage : 'Authentication failed'
    });
  }

}
