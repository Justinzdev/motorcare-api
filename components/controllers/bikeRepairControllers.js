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

exports.getJobs = async (req, res) => {
    const { bp_id } = req.params
    const [jobs] = await dbQuery.execute('SELECT * FROM Damage WHERE bp_id = ? AND dm_status = 1', [bp_id])
    if(jobs.length > 0) {
        return res.status(200).send({ msg: 'พบรายการงานของคุณ', value: jobs })
    } else {
        return res.status(404).send({ msg: 'ไม่พบรายการงาน' })
    }
}