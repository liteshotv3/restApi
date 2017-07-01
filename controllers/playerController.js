var playerController = function (Player) {

    var post = function (req, res) {
        var player = new Player(req.body);
        player.save();
        res.status(201).send(player);
    }

    var get = function (req, res) {
        // var responseJson = {hi: "This is my hockey player api"};
        // res.json(responseJson);
        var query = {};
        if (req.query.position) {
            query.position = req.query.position;
        }
        Player.find(query, function (error, players) {
            if (error)
                res.status(500).send(error);
            else
                res.json(players);
        });

    }

    var getById = (function (req, res) {
        res.json(req.player);
    })

    var putById = (function (req, res) {
        req.player.position = req.body.position;
        req.player.id = req.body.id;
        req.player.weight = req.body.weight;
        req.player.height = req.body.weight;
        req.player.imageUrl = req.body.imageUrl;
        req.player.birthplace = req.body.birthplace;
        req.player.age = req.body.age;
        req.player.name = req.body.name;
        req.player.birthdate = req.body.birthdate;
        req.player.number = req.body.number;
        req.player.save(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.json(req.player);
            }
        });
    });

    var patchById = (function (req, res) {
        if (req.body._id)
            delete req.body._id;
        for (var i in req.body) {
            req.player[i] = req.body[i];
        }
        req.player.save(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.json(req.player);
            }
        });
    })

    var deleteById = function (req, res) {
        req.player.remove(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.status(204).send('Removed');
            }
        });
    };

    return {
        post: post,
        get: get,
        getById: getById,
        putById: putById,
        patchById: patchById,
        deleteById: deleteById
    }
}


module.exports = playerController;
