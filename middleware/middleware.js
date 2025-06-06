import express from "express"
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).send("Missing authorization token")
  }

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedJWT;

  if (!req.user) {
      return res.status(401).send("Invalid token");
  }

 next();

}