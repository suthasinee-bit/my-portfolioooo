// รอให้ DOM โหลดสมบูรณ์ก่อนทำงาน
document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------
    // 1. ระบบสลับโหมดมืด/สว่าง (Dark Mode Toggle) + localStorage (ภารกิจเสริม)
    // -------------------------------------------------------------
    
    // เลือกองค์ประกอบปุ่มสลับธีมด้วย querySelector
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const themeText = themeToggleBtn.querySelector('span');

    // ตรวจสอบธีมเดิมที่เคยบันทึกไว้ใน localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // หากเคยเลือกธีม dark ไว้ ให้เปิดโหมดมืดทันที
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-sun';
        themeText.textContent = 'โหมดสว่าง';
    }

    // เพิ่ม Event Listener เมื่อผู้ใช้คลิกปุ่มสลับธีม
    themeToggleBtn.addEventListener('click', () => {
        // ตรวจสอบธีมปัจจุบัน
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // สลับเป็นโหมดสว่าง
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light'); // บันทึกสถานะลง localStorage
            themeIcon.className = 'fa-solid fa-moon';
            themeText.textContent = 'โหมดมืด';
        } else {
            // สลับเป็นโหมดมืด
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // บันทึกสถานะลง localStorage
            themeIcon.className = 'fa-solid fa-sun';
            themeText.textContent = 'โหมดสว่าง';
        }
    });

    // -------------------------------------------------------------
    // 2. การตรวจสอบฟอร์มติดต่อ (Form Validation) (ภารกิจเสริม)
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // ป้องกันการ reload หน้าจอ

        const emailValue = emailInput.value.trim();

        // ตรวจสอบความถูกต้องของอีเมล (ต้องกรอกและมีเครื่องหมาย @)
        if (emailValue === '') {
            emailError.textContent = 'กรุณากรอกอีเมลของคุณ';
            return;
        } else if (!emailValue.includes('@')) {
            emailError.textContent = 'รูปแบบอีเมลไม่ถูกต้อง (ต้องมี @)';
            return;
        } else {
            emailError.textContent = ''; // ล้างข้อความแจ้งเตือนเมื่อถูกต้อง
        }

        // แสดงข้อความสำเร็จ
        formStatus.style.color = '#10b981';
        formStatus.textContent = '✓ ส่งข้อความเรียบร้อยแล้ว! ขอบคุณที่ติดต่อเรา';
        
        // ล้างข้อมูลในฟอร์ม
        contactForm.reset();

        // ซ่อนข้อความแจ้งเตือนหลังผ่านไป 4 วินาที
        setTimeout(() => {
            formStatus.textContent = '';
        }, 4000);
    });
});