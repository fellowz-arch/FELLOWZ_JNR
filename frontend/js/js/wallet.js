const API_WALLET = "http://localhost:5000/api/wallet";
const token = localStorage.getItem("fxpro_token");

export async function depositKES(amount, phone) {
    if (!amount || !phone) return alert("Enter phone and amount");

    try {
        const res = await fetch(`${API_WALLET}/deposit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ amount, phone }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            alert("STK Push sent! Check your phone.");
            document.getElementById("walletBalance").textContent = `Balance: KES ${data.balance.toLocaleString()}`;
        } else {
            alert(data.message || "Deposit failed");
        }
    } catch (err) {
        console.error(err);
        alert("Server error during deposit");
    }
}

// Deposit button handler
document.addEventListener("DOMContentLoaded", () => {
    const depositBtn = document.getElementById("depositBtn");
    if (depositBtn) {
        depositBtn.addEventListener("click", () => {
            const amount = parseInt(prompt("Enter deposit amount (KES)"));
            const phone = prompt("Enter your phone number (2547...)");
            depositKES(amount, phone);
        });
    }
});
