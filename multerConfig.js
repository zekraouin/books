const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const PUBLIC_DIRECTORY = path.join(__dirname, "public");
const UPLOADS_DIRECTORY = path.join(PUBLIC_DIRECTORY, "uploads");

// Ensure that the public directory exists
if (!fs.existsSync(PUBLIC_DIRECTORY)) {
  fs.mkdirSync(PUBLIC_DIRECTORY);
}

if (!fs.existsSync(UPLOADS_DIRECTORY)) {
  fs.mkdirSync(UPLOADS_DIRECTORY);
}

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIRECTORY); 
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-";
    cb(null, uniquePrefix + file.originalname);
  },
});

// Create multer instance with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;
