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

    return {
        post: post,
        get: get
    }
}



module.exports = playerController;
