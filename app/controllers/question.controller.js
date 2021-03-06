const Question = require("../models/question.model")

exports.getAll = (req, res) => {
    Question.getAll((err, data) => {
        if (err)
            res.status(500).send({
                error: "Server error"
            })
        else
            res.send(data)
    })
}

exports.getById = (req, res) => {
    Question.getNameById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).send({
                    error: "No poll with id",
                })
            else
                res.status(500).send({
                    error: "serverError"
                })
        } else {
            Question.getPollById(req.params.id, (err2, answers) => {
                if (err2)
                    res.status(500).send({
                        error: "serverError"
                    })
                else {
                    data.answers = answers
                    res.send(data)
                }
                
            })            
        }
    })
}

exports.create = (req, res) => {
    if (req.body.title == "" || req.body.title == undefined)
        res.status(400).send({
            error: "Something is missing"
        })
    else {
        const question = new Question({
            title: req.body.title
        })
        
        Question.create(question, (err, data) => {
            if (err)
                res.status(500).send({
                    error: "Server error"
                })
            else
                res.send({
                    success: "Successful create",
                    insertId: data.insertId
                })
        })
    }
}

exports.update = (req, res) => {
    if (req.body.title == "" || req.body.title == undefined)
        res.status(400).send({
            error: "Something is missing"
        })
    else {
        const question = new Question({
            title: req.body.title
        })

        Question.update(req.params.id, question, (err) => {
            if (err) {
                if (err.kind === "not_found")
                    res.status(404).send({
                        error: "Unsuccessful update"
                    })
                else
                    res.status(500).send({
                        error: "Server error"
                    })
            } else
                res.send({
                    success: "Successful update"
                })
        })
    }
}

exports.delete = (req, res) => {
    Question.delete(req.params.id, (err) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).send({
                    error: "Unsuccessful delete"
                })
            else
                res.status(500).send({
                    error: "Server error"
                })
        } else
            res.send({
                success: "Successful delete"
            })
    })
}