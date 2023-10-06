const schedule = require('node-schedule')
const dbQuery = require('../../db')

// ทำลาย Case ที่ยังไม่ได้การตอบรับทิ้งทุกๆ 5 นาที
schedule.scheduleJob('*/5 * * * *', async () => {
    const [findDamageNotConfirm] = await dbQuery.execute('SELECT id, dm_datedestroy FROM Damage WHERE dm_status = 1')
    if(findDamageNotConfirm.length > 0) {
        const currentDate = new Date();
        for (const row of findDamageNotConfirm) {
            const dmDateDestroy = new Date(row.dm_datedestroy);

            if (dmDateDestroy < currentDate) {
                await dbQuery.execute('DELETE FROM Damage WHERE id = ?', [row.id])
            }
        }
    }
})