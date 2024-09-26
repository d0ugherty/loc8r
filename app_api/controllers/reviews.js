const reviewCreate = (req, res) => {
    res.status(201).json({
        "status" : "success",
    });
}

const reviewsReadOne = (req, res) => {
    res.status(200).json({
        "status" : "success",
    });
}

const reviewsUpdateOne = (req, res) => {
    res.status(200).json({
        "status" : "success",
    });
}

const reviewsDeleteOne = (req, res) => {
    res.status(204).json({
        "status" : "success",
    });
}

module.exports = {
    reviewCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne,
}