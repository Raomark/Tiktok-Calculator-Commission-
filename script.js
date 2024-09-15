function calculateProfit() {
    // รับค่าจากอินพุต
    let price = document.getElementById("price").value;
    let discount = document.getElementById("discount").value;
    let shipping = document.getElementById("shipping").value;
    let commissionRate = document.getElementById("commission-rate").value;
    let cost = document.getElementById("cost").value;
    let packingCost = document.getElementById("packing-cost").value;

    // ตรวจสอบว่ากรอกทุกช่องหรือไม่
    if (!price || !discount || !shipping || !commissionRate || !cost || !packingCost) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
        return;
    }

	

    // แปลงค่าที่กรอกเป็นตัวเลข
    price = parseFloat(price);
    discount = parseFloat(discount);
    shipping = parseFloat(shipping);
    commissionRate = parseFloat(commissionRate) / 100;
    cost = parseFloat(cost);
    packingCost = parseFloat(packingCost);

    // ราคาสินค้าหลังหักส่วนลด
    let priceAfterDiscount = price - discount;

    // อัตราค่าคอมมิชชั่น
    let commission = priceAfterDiscount * commissionRate;

    // อัตราค่าธรรมเนียมคำสั่งซื้อ
    let orderFee = (priceAfterDiscount + shipping) * 0.0321;

    // รวมค่าธรรมเนียม
    let totalFee = commission + orderFee;

	// // Calculate Extra Free
	// let extraFree = 0;
	// if (document.getElementById('extraFreeCheckbox').checked) {
	// 	extraFree = priceAfterDiscount * 0.0535;
	// 	document.getElementById('extraFree').textContent = `Extra Free: ${extraFree.toFixed(2)} บาท`;
	// } else {
	// 	document.getElementById('extraFree').textContent = 'Extra Free: ไม่ได้เลือก';
	// }

    // คำนวณกำไร
    let profit = (priceAfterDiscount + shipping) - totalFee - cost - packingCost;

	 

    // แสดงผลลัพธ์ใน Modal
    document.getElementById("modal-price-after-discount").innerText = priceAfterDiscount.toFixed(2);
    document.getElementById("modal-commission").innerText = commission.toFixed(2);
    document.getElementById("modal-order-fee").innerText = orderFee.toFixed(2);
    document.getElementById("modal-total-fee").innerText = totalFee.toFixed(2);
    document.getElementById("modal-profit").innerText = profit.toFixed(2);

    // กรณีกำไรติดลบ
    let adviceText = "";
    if (profit < 0) {
        adviceText = `
            <p style="color: red;">กำไรของคุณติดลบ! นี่คือคำแนะนำเพื่อปรับปรุง:</p>
            <ul>
                <li>เพิ่มราคาสินค้าหรือส่วนลดให้น้อยลง</li>
                <li>ปรับลดต้นทุนสินค้าให้ต่ำลง</li>
                <li>เพิ่มค่าจัดส่งที่ผู้ซื้อต้องจ่าย</li>
                <li>ตรวจสอบค่าคอมมิชชั่นและพิจารณาปรับเปลี่ยนประเภทการขาย</li>
            </ul>
        `;
    }

    // ใส่คำแนะนำลงใน Modal
    document.getElementById("advice-section").innerHTML = adviceText;

    // แสดง Modal
    let resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}
