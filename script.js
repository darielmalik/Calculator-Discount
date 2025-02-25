function formatPrice(value) {
    let num = value.replace(/\D/g, ''); // Hapus non-angka
    if (!num) return '';
    return Number(num).toLocaleString('id-ID'); // Format otomatis
}

function calculateDiscount() {
    const price = Number(document.getElementById("price").value.replace(/\./g, ""));
    const discountInput = document.getElementById("discount").value; // Perbaikan: Ambil nilai asli dari input
    const discount = Number(discountInput);
    const errorDiv = document.getElementById("error");

    // Perbaikan validasi
    errorDiv.textContent = !price ? "Item price cannot be empty" :
                         discountInput === "" || discount === 0 ? "Diskon tidak boleh kosong atau 0%" :
                         discount < 1 || discount > 99 || !Number.isInteger(discount) ? "Discount cannot be 100%" : "";

    if (errorDiv.textContent) return;

    const discountAmount = Math.round(price * (discount / 100));
    const finalPrice = price - discountAmount;

    document.getElementById("result").innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Discounted</td>
                    <td>Rp. ${formatPrice(discountAmount.toString())}</td>
                </tr>
                <tr>
                    <td>Final Price</td>
                    <td>Rp. ${formatPrice(finalPrice.toString())}</td>
                </tr>
            </tbody>
        </table>
    `;
}

function resetCalculator() {
    ["price", "discount"].forEach(id => document.getElementById(id).value = '');
    ["result", "error"].forEach(id => document.getElementById(id).textContent = '');
}

document.getElementById('price').addEventListener('input', function() {
    this.value = formatPrice(this.value);
});
