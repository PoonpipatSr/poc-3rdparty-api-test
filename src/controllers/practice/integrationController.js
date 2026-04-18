import { fetchProfileFromExternalAPI } from '../../repositories/practice/thirdPartyRepository.js';

export const testThirdPartyAPI = async (req, res) => {
    try {
        // 1. รับ Token จากลูกค้าที่ยิงมา (จำลองว่าลูกค้าส่ง Token ของ Eventpop มาให้เรา)
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ error: "กรุณาส่ง Token มาด้วย" });
        }

        console.log("กำลังเดินทางไปคุยกับ 3rd Party...");

        // 2. สั่งให้ Repository ยิง API ไปหา 3rd Party
        const externalData = await fetchProfileFromExternalAPI(token);

        // 3. ส่งข้อมูลที่ได้กลับไปโชว์ให้ลูกค้าดู
        res.json({
            message: "ดึงข้อมูลจากโลกภายนอกสำเร็จ!",
            data: externalData
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};