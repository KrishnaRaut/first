const categoriesService = require("../services/categoriesService");
const upload = require("../middleware/categoryUpload");

// Creating a Product:
exports.create = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      var model = {
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        categoryImage: path != "" ? "/" + path : "",
      };

      categoriesService.createCategory(model, (error, results) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "success",
            data: results,
          });
        }
      });
    }
  });
};

// Finding all products
exports.findAll = (req, res, next) => {
  var model = {
    categoryName: req.query.categoryName,
    pageSize: req.query.pageSize,
    page: req.query.page,
  };
  
  categoriesService.getCategories(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "success",
        data: results,
      });
    }
  });
};

// Finding One Product:
exports.findOne = (req, res, next) => {
  var model = {
    categoryId: req.params.id,
  };
  categoriesService.getCategoryById(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "success",
        data: results,
      });
    }
  });
};

// Updating Information
exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      var model = {
        categoryId: req.params.id,
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        categoryImage: path != "" ? "/" + path : "",
      };

      categoriesService.updateCategory(model, (error, results) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "success",
            data: results,
          });
        }
      });
    }
  });
};

// Delete category
exports.delete = (req, res, next) => {
  var model = {
    categoryId: req.params.id,
  };
  categoriesService.deleteCategory(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "success",
        data: results,
      });
    }
  });
};
