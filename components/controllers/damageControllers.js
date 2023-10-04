const dbQuery = require('../../db')

exports.addDamage = async (req, res) => {
    const { bp_id, user_id, dm_brand, dm_color, dm_details, dm_picture, dm_vehicle } = req.body

    await dbQuery.execute('INSERT INTO Damage (bp_id, user_id, dm_brand, dm_color, dm_details, dm_picture, dm_vehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [bp_id, user_id, dm_brand, dm_color, dm_details, dm_picture, dm_vehicle])
    .then((response) => {
        return res.status(200).send({ msg: 'ทำการแจ้งความเสียหายสำเร็จ, ทางร้านจะตอบกลับคุณโดยเร็วที่สุด...' })
    })
    .catch((err) => {
        console.log(err)
        return res.status(403).send({ msg: 'ไม่สามารถทำการแจ้งความเสียหายได้' })
    })
}