const express = require('express');
const fs = require('fs');
const path = require('path');
const validateReports = require('../middleware/validation');

const router = express.Router();

const filePath = path.join(__dirname, "../data/reports.json");


router.get("/", (req, res) => {

    fs.readFile(filePath, "utf-8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Veriler Okunmasında Hata Oluştu..."
            });
        };

        let reports = JSON.parse(data);

        const {
            type,
            priority,
            status,
            project,
            assignee,
            search,
            page = 1,
            limit = 5
        } = req.query;

        //Tür
        if (type) {
            reports = reports.filter(
                (item) => item.type === type
            );
        }

        //Öncelik
        if (priority) {
            reports = reports.filter(
                (item) => item.priority === priority
            );
        }

        // Durum
        if (status) {
            reports = reports.filter(
                (item) => item.status === status
            );
        }

        // Proje
        if (project) {
            reports = reports.filter(
                (item) => item.project === project
            );
        }

        // Çalışan
        if (assignee) {
            reports = reports.filter(
                (item) => item.assignee === assignee
            );
        }

        // Arama
        if (search) {
            const searchText = search.toLowerCase();

            reports = reports.filter(
                (item) => item.title.toLowerCase().includes(searchText) ||
                    item.description.toLowerCase().includes(searchText)
            );
        }

        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 5;

        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = startIndex + limitNumber;

        const pagiReports = reports.slice(
            startIndex,
            endIndex
        );

        res.json({
            total: reports.length,
            page: pageNumber,
            limit: limitNumber,
            data: pagiReports
        });
    });
});


router.get("/completed", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Veriler Okunamadı..."
            });
        }

        const reports = JSON.parse(data);

        const completedReports = reports.filter(
            (item) => item.status === "completed"
        );

        res.json({
            completed: completedReports
        });
    });
});


router.get("/pending", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Veriler Okunamadı..."
            });
        }

        const reports = JSON.parse(data);

        const pendingReports = reports.filter(
            (item) => item.status === "pending"
        );

        res.json({
            pending: pendingReports
        });
    });
});


router.get("/summary", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Veriler Okunamadı..."
            });
        }

        const reports = JSON.parse(data);

        const completed = reports.filter(
            (item) => item.status === "completed"
        ).length;

        const pending = reports.filter(
            (item) => item.status === "pending"
        ).length;

        const inProgress = reports.filter(
            (item) => item.status === "in-progress"
        ).length;

        const testing = reports.filter(
            (item) => item.status === "testing"
        ).length;

        const bugs = reports.filter(
            (item) => item.type === "bug"
        ).length;

        const features = reports.filter(
            (item) => item.type === "feature"
        ).length;

        res.json({
            total: reports.length,
            completed,
            pending,
            inProgress,
            testing,
            bugs,
            features
        });
    });
});


router.get("/:id", (req, res) => {

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Veriler Okunmasında Hata Oluştu..."
            })
        };

        const reports = JSON.parse(data);

        const reportsId = Number(req.params.id);

        const report = reports.find((item) => item.id === reportsId);

        if (!report) {
            return res.status(404).json({
                message: "Report Bulunamadı..."
            });
        }

        res.json(report);
    });
});


router.post("/", validateReports, (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Verileri Okunamadı..."
            })
        };

        const reports = JSON.parse(data);

        const newReports = {
            id: Date.now(),
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            project: req.body.project,
            assignee: req.body.assignee,
            priority: req.body.priority,
            status: req.body.status,
            createdAt: new Date()
        };

        reports.push(newReports);

        fs.writeFile(
            filePath,
            JSON.stringify(reports, null, 2),
            "utf-8",
            (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Report Kaydedilemedi..."
                    });
                };
                res.status(201).json(newReports);
            }
        )
    });

});


router.put("/:id", validateReports, (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Veriler Okunamadı..."
            });
        }

        const reports = JSON.parse(data);

        const reportId = Number(req.params.id);

        const reportIndex = reports.findIndex(
            (item) => item.id === reportId
        );


        if (reportIndex === -1) {
            return res.status(404).json({
                message: "Veriler Bulunamadı..."
            });
        }

        const updatedReport = {
            id: reports[reportIndex].id,
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            project: req.body.project,
            assignee: req.body.assignee,
            priority: req.body.priority,
            status: req.body.status,
            createdAt: new Date()
        };
        reports[reportIndex] = updatedReport;

        fs.writeFile(
            filePath,
            JSON.stringify(reports, null, 2),
            "utf-8",
            (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Verileri Güncellenemedi..."
                    });
                }

                res.json(updatedReport);
            }
        )
    })
});

router.delete("/:id", (req, res) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Veriler Okunmadı..."
            });
        }

        const reports = JSON.parse(data);

        const reportID = Number(req.params.id);

        const reportIndex = reports.findIndex(
            (item) => item.id === reportID
        );

        if (reportIndex === -1) {
            return res.status(404).json({
                message: "Veriler Bulunamadı..."
            });
        }

        const deletedReport = reports[reportIndex];

        reports.splice(reportIndex, 1);

        fs.writeFile(filePath,
            JSON.stringify(reports, null, 2),
            "utf-8",
            (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Veri Silenemedi..."
                    });
                }

                res.json({
                    message: "Veri Başarıyla Silindi...",
                    deletedReport: deletedReport
                });
            }
        )

    });
});

module.exports = router;

