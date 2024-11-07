const User = require("../model/User");
const myError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const crypto = require("crypto");

exports.createUser = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      data: user,
   });
});
exports.getUsers = asyncHandler(async (req, res, next) => {
   const sort = req.query.sort;
   const select = req.query.select;
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 50;
   ["sort", "select", "page", "limit"].forEach((el) => delete req.query[el]);

   const pagination = await paginate(User, page, limit);

   const users = await User.find(req.query, select)
      .sort(sort)
      .skip(pagination.start - 1)
      .limit(pagination.limit);
});
exports.getUser = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      data: user,
   });
});
exports.updateUsers = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      data: user,
   });
});
exports.deleteUser = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      data: user,
   });
});
exports.register = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      data: user,
   });
});
exports.login = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      data: user,
   });
});
exports.forgotPassword = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      data: user,
   });
});
exports.resetPassword = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      data: user,
   });
});
