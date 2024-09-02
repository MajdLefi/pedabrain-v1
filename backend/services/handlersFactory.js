const asyncHandler = require('express-async-handler');
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures")
const {sanitizeData} = require('../utils/sanitizeData')
const createToken = require('../utils/createToken')
const bcrypt = require("bcrypt");

exports.getAll = (Model) => asyncHandler(async (req, res) => {
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
        .filter()
        .sort()
        .search(Model)
        .limitFields()
        .paginate(documentsCounts)

    const { mongooseQuery, paginationResult } = apiFeatures
    const documents = await mongooseQuery;

    res.status(200).json({ results: documents.length, data: documents });
});

exports.getOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
        return next(new ApiError("Can't find the document", 404));
    }
    res.status(200).json({ data: document });
});

exports.createOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const document = await Model.create(req.body);
        //const sanitizedData = sanitizeData(Model.modelName, document);
        res.status(200).json({ data: document, msg: "Added with success" });
    });

exports.updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!document) {
            return next(new ApiError(`No document for this id ${req.params.id}`, 404));
        }

        res.status(200).json({ data: document, msg: "Updated successfully" });
    });

exports.deleteOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const document = await Model.findByIdAndDelete(id);
        if (!document) {
            return next(new ApiError(`No document for this id ${id}`, 404));
        }
        res.status(204).send();
})


exports.signup = (Model) => asyncHandler(async (req, res, next) => {
    const user = await Model.create(req.body);
    const token = createToken(user._id);
    res.status(200).json({ data: sanitizeData(user), token, msg: "Signup with success" });
});


exports.login = (Model) => asyncHandler(async (req, res, next) => {
    const user = await Model.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError('Incorrect email or password', 401));
    }

    const token = createToken(user._id);
    res.status(200).json({ data : user, token, msg: "Login successful" });
});

exports.changeUserPassword =(Model) => asyncHandler(async (req, res, next) => {
    const model = await Model.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.newPassword, 12),
            passwordChangedAt: Date.now(),
        },
        {
            new: true
        })
    if (!model) {
        return next(new ApiError(`No model for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: sanitizeData(model), msg: "Password changed with success" });
})