function calculateProfit() {
    // รับค่าจากอินพุต
    let price = document.getElementById("price");
    let discount = document.getElementById("discount");
    let shipping = document.getElementById("shipping");
    let commissionRate = document.getElementById("commission-rate");
    let cost = document.getElementById("cost");
    let packingCost = document.getElementById("packing-cost");
    let extraFreeChecked = document.getElementById("extraFree").checked;

    // ตรวจสอบว่ากรอกทุกช่องหรือไม่ ถ้าไม่กรอกให้เปลี่ยนสีเป็นสีแดง
    let fields = [price, discount, shipping, cost, packingCost];
    let allFilled = true;
    
    fields.forEach(field => {
        if (!field.value) {
            field.classList.add('is-invalid');
            allFilled = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });

    if (!allFilled) {
        // alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
        return;
    }

    // แปลงค่าที่กรอกเป็นตัวเลข
    price = parseFloat(price.value);
    discount = parseFloat(discount.value);
    shipping = parseFloat(shipping.value);
    commissionRate = parseFloat(commissionRate.value) / 100;
    cost = parseFloat(cost.value);
    packingCost = parseFloat(packingCost.value);

    // ราคาสินค้าหลังหักส่วนลด
    let priceAfterDiscount = price - discount;

    // อัตราค่าคอมมิชชั่น
    let commission = priceAfterDiscount * commissionRate;

    // อัตราค่าธรรมเนียมคำสั่งซื้อ
    let orderFee = (priceAfterDiscount + shipping) * 0.0321;

	 // คำนวณ Extra Free ถ้าเช็คบ็อกซ์ถูกเลือก
	 let extraFree = 0;
	 if (extraFreeChecked) {
		 extraFree = (priceAfterDiscount + shipping) * 0.0535;
	 }

    // รวมค่าธรรมเนียม
    let totalFee = commission + orderFee + extraFree;

    // คำนวณกำไร
    let profit = (priceAfterDiscount + shipping) - totalFee - cost - packingCost;

	console.log(cost)
	console.log(packingCost)
	console.log( `${priceAfterDiscount} + ${shipping} - ${totalFee} - ${cost} - ${packingCost}`)

    // แสดงผลลัพธ์ใน Modal
	document.getElementById("modal-price").innerHTML = price.toFixed(2);
	document.getElementById("modal-discount").innerHTML = discount.toFixed(2);
    document.getElementById("modal-price-after-discount").innerText = priceAfterDiscount.toFixed(2);
    document.getElementById("modal-commission").innerText = commission.toFixed(3);
    document.getElementById("modal-order-fee").innerText = orderFee.toFixed(3);
    document.getElementById("modal-total-fee").innerText = totalFee.toFixed(3);
    document.getElementById("modal-order-Extrafee").innerText = extraFree.toFixed(3);
    document.getElementById("modal-profit").innerText = profit.toFixed(3);

    // กรณีกำไรติดลบ
    let adviceText = "";
    if (profit < 0) {
        adviceText = `
			<hr>
            <p style="color: red;">กำไรของคุณติดลบ! นี่คือคำแนะนำเพื่อปรับปรุง:</p>
            <ul>
                <li>เพิ่มราคาสินค้าหรือส่วนลดให้น้อยลง</li>
                <li>ปรับลดต้นทุนสินค้าให้ต่ำลง</li>
                <li>เพิ่มค่าจัดส่งที่ผู้ซื้อต้องจ่าย</li>
                <li>ตรวจสอบค่าคอมมิชชั่นและพิจารณาปรับเปลี่ยนประเภทการขาย</li>
            </ul>
        `;
    }

	if(profit < 0){
		document.getElementById("modal-profit").style.color = "#dc3545";
	}else{
		document.getElementById("modal-profit").style.color = "#008000";
	}

    // ใส่คำแนะนำลงใน Modal
    document.getElementById("advice-section").innerHTML = adviceText;

    // แสดง Modal
    let resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}

