const dbQuery = require('../../db')

exports.getNotification = async (req, res) => {
    const { user_id } = req.params
    const [findNotification] = await dbQuery.execute('SELECT * FROM Notifications WHERE user_id = ? ORDER BY id DESC', [user_id])
    if(findNotification.length > 0) {
        return res.status(200).send({ msg: 'พบรายการแจ้งเตือน', value: findNotification })
    } else {
        return res.status(404).send({ msg: 'ไม่พบรายการแจ้งเตือนของคุณ' })
    }
}