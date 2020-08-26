const User = require("../model/user")


exports.searchVolunteers = (req, res) => {

    User.find({ status: 1, role: "volunteer" })
        .then(data => {

            res.send(data)

        })
        .catch(e => console.log(e))


}

exports.updatelocation = (req, res) => {


    User.updateOne({ _id: req.body.id }, { $set: { "status": 1 } })
        .then(result => {
            res.status(200).send(result)
        })





}
exports.removelocation = (req, res) => {
    User.updateOne({ _id: req.body.id }, { $set: { "status": 0 } })
        .then(result => {
            res.status(200).send(result)
        })
}