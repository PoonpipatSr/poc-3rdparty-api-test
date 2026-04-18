import axios from 'axios';

// ฟังก์ชันนี้จำลองการยิงไปดึงข้อมูล Profile โดยต้องใช้ Token
export const fetchProfileFromExternalAPI = async (externalToken) => {
    try {
        // 1. กำหนด URL ปลายทาง (ถ้าเป็น Eventpop ก็จะเป็น https://www.eventpop.me/api/public/me)
        const url = 'https://httpbin.org/bearer'; 

        // 2. ใช้ axios.get ยิงคำสั่ง และแนบ Header ไปด้วย
        // สังเกตการใส่คำว่า Bearer และเว้นวรรคให้ถูกต้อง
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${externalToken}`
            }
        });

        // 3. ถ้าสำเร็จ axios จะเก็บข้อมูลไว้ในตัวแปร .data เสมอ!
        return response.data;

    } catch (error) {
        // 🚨 การจัดการ Error ของ axios จะพิเศษกว่าปกตินิดหน่อยครับ
        if (error.response) {
            // กรณีที่ 1: ยิงไปถึงเซิร์ฟเวอร์เขาแล้ว แต่เขาด่ากลับมา (เช่น 401 Token ผิด, 404 หาไม่เจอ)
            console.error("3rd Party Error:", error.response.data);
            throw new Error(`External API Error: ${error.response.status}`);
        } else if (error.request) {
            // กรณีที่ 2: ยิงไปแล้ว แต่ไม่มีคนตอบรับ (เช่น เน็ตพัง, เซิร์ฟเวอร์เขาล่ม, ลืมต่อเน็ต)
            console.error("No response from 3rd Party");
            throw new Error("External API is down or not responding");
        } else {
            // กรณีที่ 3: โค้ดเราเขียนผิดเองก่อนยิง
            throw new Error("Error setting up the request");
        }
    }
};