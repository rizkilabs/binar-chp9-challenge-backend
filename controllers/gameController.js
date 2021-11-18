const { Game, Detail, User } = require('../models');

const findAll = (req, res) => {
    Game.findAll()
        .then(data => {
            res.status(200).json({
                result: "success",
                message: "successfully retrieve data",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                result: "failed",
                message: "some eror occured while retrieving game.",
                error: err.message
            });
        })
}

const findOne = (req, res) => {
    Game.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    result: 'failed',
                    message: "game not registered",

                });
            }
            res.status(200).json({
                result: "success",
                message: "successfully retrieve data",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                result: "failed",
                message: "some error occured while retrieving game",
                error: err.message
            })
        })
}

const getLeaderboard = (req, res) => {
    Detail.findAll({
        where: {
            gameId: req.params.id
        },
        attributes: [
            'gameId', 'userId', 'score'
        ],
        order: [["score", "DESC"]],
        include: {
            model: User,
            as: 'detail_user',
            attributes: [
                'first_name', 'last_name', 'username', 'email'
            ],
        }
    })
        .then(detail => {
            res.status(200).json({
                result: "success",
                message: "successfully retrieve data",
                data: detail
            });
        })
        .catch(err => {
            res.status(500).json({
                result: "failed",
                message: "some error occured while retrieving game",
                error: err.message
            })
        })
}
module.exports = {
    findAll,
    findOne,
    getLeaderboard
}