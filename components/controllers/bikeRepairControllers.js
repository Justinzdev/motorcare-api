const dbQuery = require('../../db')

exports.getStores = async (req, res) => {
    await dbQuery.execute('SELECT * FROM Bike_repair')
    .then(([response]) => {
        return res.status(200).send({ value: response })
    })
    .catch((err) => {
        return res.status(404).send({ msg: 'ไม่มีรายการร้านค้าในระบบ' })
    })
}