const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
// Middleware functions

// @description   Get all bootcamps
// @route         GET /api/v1/bootcamps
// @access        Public
exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find();

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @description   Get a bootcamp
// @route         GET /api/v1/bootcamps/:id
// @access        Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return new ErrorResponse(
        `Bootcamp not found with id of ${req.params.id}`,
        404
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
};

// @description   Create new bootcamp
// @route         POST /api/v1/bootcamps/:id
// @access        Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ sucess: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @description   Update bootcamp
// @route         PUT /api/v1/bootcamps/:id
// @access        Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({ sucess: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @description   Delete bootcamp
// @route         DELETE /api/v1/bootcamps/:id
// @access        Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      res.status(400).json({ success: false });
    }

    res.status(200).json({ sucess: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
