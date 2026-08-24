const validaReports = (req, res, next) => {
    const {
        title,
        description,
        type,
        project,
        assignee,
        priority,
        status
    } = req.body;

    if (
        !title ||
        !description ||
        !type ||
        !project ||
        !assignee ||
        !priority ||
        !status
    ) {
        return res.status(400).json({
            message: "Tüm alanların doldurulması zorunludur."
        });
    }

    if (type !== "bug" && type !== "feature") {
        return res.status(400).json({
            message: "Type sadece bug veya feature olabilir."
        });
    }

    if (
        priority !== "low" &&
        priority !== "medium" &&
        priority !== "high" &&
        priority !== "critical"
    ) {
        return res.status(400).json({
            message: "Priority low, medium, high veya critical olmalıdır."
        });
    }

    if (
        status !== "pending" &&
        status !== "in-progress" &&
        status !== "testing" &&
        status !== "completed"
    ) {
        return res.status(400).json({
            message: "Status pending, in-progress, testing veya completed olmalıdır."
        });
    }

    next();
};

module.exports = validaReports;