import express from "express"

export const filterMiddleware = (req, res, next) => {
    if (req.body && req.body.message) {
      const message = req.body.message;
  
      // Define regular expressions for sensitive information
      const phoneRegex = /(\+\d{1,3}[- ]?\d{10})|(\d{3}[- ]?\d{3}[- ]?\d{4})/;
      const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/; 
  
      const filteredMessage = message
        .replace(phoneRegex, "message removed by admin")
        .replace(emailRegex, "message removed by admin");
  
      req.body.message = filteredMessage;
    }
  
    next(); 
  };