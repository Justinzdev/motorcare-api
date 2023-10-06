const dbQuery = require('../../db')

exports.addDamage = async (req, res) => {
    const { bp_id, user_id, dm_brand, dm_color, dm_details, dm_picture, dm_vehicle } = req.body

    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 5);

    await dbQuery.execute('INSERT INTO Damage (bp_id, user_id, dm_brand, dm_color, dm_details, dm_picture, dm_vehicle, dm_datedestroy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [bp_id, user_id, dm_brand, dm_color, dm_details, dm_picture, dm_vehicle, currentDate])
    .then((response) => {
        return res.status(200).send({ msg: 'ทำการแจ้งความเสียหายสำเร็จ, ทางร้านจะตอบกลับคุณโดยเร็วที่สุด...' })
    })
    .catch((err) => {
        console.log(err)
        return res.status(403).send({ msg: 'ไม่สามารถทำการแจ้งความเสียหายได้' })
    })
}

exports.cancelJob = async (req, res) => {
    const { dm_id, bp_id } = req.params

    const [findJob] = await dbQuery.execute('SELECT Damage.*, Bike_repair.bp_name FROM Damage INNER JOIN Bike_repair ON Damage.bp_id = Bike_repair.bp_id WHERE Damage.bp_id = ? AND Damage.id = ? LIMIT 1', [bp_id, dm_id])
    if(findJob.length > 0) {
        await dbQuery.execute('UPDATE Damage SET dm_status = 0 WHERE bp_id = ? AND id = ?', [findJob[0].bp_id, findJob[0].id])
        .then(async (response) => {
            await dbQuery.execute('INSERT INTO Notifications (user_id, noti_title, noti_description) VALUES (?, ?, ?)',
            [findJob[0].user_id, "รายการแจ้งถูกยกเลิก", `รายการที่คุณแจ้งไปยัง ${findJob[0].bp_name} ถูกยกเลิกแล้ว`])
            return res.status(200).send({ msg: 'ทำการลบรายการนี้สำเร็จ' })
        })
        .catch((err) => {
            console.log(err)
            return res.status(404).send({ msg: 'ไม่สามารถลบได้' })
        })
    } else {
        return res.status(404).send({ msg: 'ไม่พบรายการงานใดๆ' })
    }
}

exports.confirmJob = async (req, res) => {
    const { dm_id, bp_id } = req.params

    const [findJob] = await dbQuery.execute('SELECT Damage.*, Bike_repair.bp_name FROM Damage INNER JOIN Bike_repair ON Damage.bp_id = Bike_repair.bp_id WHERE Damage.bp_id = ? AND Damage.id = ? LIMIT 1', [bp_id, dm_id])
    if(findJob.length > 0) {
        await dbQuery.execute('UPDATE Damage SET dm_status = 2 WHERE bp_id = ? AND id = ?', [findJob[0].bp_id, findJob[0].id])
        .then(async (response) => {
            await dbQuery.execute('INSERT INTO Notifications (user_id, noti_title, noti_description) VALUES (?, ?, ?)',
            [findJob[0].user_id, "รายการแจ้งได้รับการยืนยัน", `รายการที่คุณแจ้งไปยัง ${findJob[0].bp_name} ได้รับการยืนยันแล้ว`])
            return res.status(200).send({ msg: 'คุณได้ทำการยืนยันรายนี้สำเร็จแล้ว' })
        })
        .catch((err) => {
            console.log(err)
            return res.status(404).send({ msg: 'ไม่สามารถอัปเดตรายการได้' })
        })
    } else {
        return res.status(404).send({ msg: 'ไม่พบรายการงานใดๆ' })
    }
}