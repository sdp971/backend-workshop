
const isAdmin = (req,res, next) => {
  if (req.user.role === 3) {
    next();
    
  } else {
     res.status(403).json({ message: 'Not authorized' });
  }
 
}


export {isAdmin}