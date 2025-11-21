// frontend/js/trade.js

const API_TRADE = "http://localhost:5000/api/trade";
const token = localStorage.getItem("fxpro_token");

// Store active trades in memory
let activeTrades = [];

// ===== Open Trade =====
async function openTrade(amount, type) {
    if (!amount || amount <= 0) {
        return alert("Enter a valid trade amount.");
    }

    try {
        const res = await fetch(`${API_TRADE}/open`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ amount, type }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            alert(`Trade opened: ${type.toUpperCase()} KES ${amount}`);
            activeTrades.push(data.trade);
            updateWalletBalance(data.balance);
        } else {
            alert(data.message || "Failed to open trade.");
        }
    } catch (err) {
        console.error(err);
        alert("Server error while opening trade.");
    }
}

// ===== Close Trade =====
async function closeTrade() {
    if (activeTrades.length === 0) return alert("No active trades to close.");

    const trade = activeTrades.pop(); // Remove last trade

    try {
        const res = await fetch(`${API_TRADE}/close`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ tradeId: trade._id }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            alert(`Trade closed: ${trade.type.toUpperCase()} KES ${trade.amount}`);
            updateWalletBalance(data.balance);
        } else {
            alert(data.message || "Failed to close trade.");
        }
    } catch (err) {
        console.error(err);
        alert("Server error while closing trade.");
    }
}

// ===== Update Wallet Balance in Dashboard =====
function updateWalletBalance(balance) {
    const walletDisplay = document.getElementById("walletBalance");
    if (walletDisplay) walletDisplay.textContent = `Balance: KES ${balance.toLocaleString()}`;
    localStorage.setItem("walletBalance", balance);
}

// ===== Initialize Trade Buttons =====
document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openTradeBtn");
    const closeBtn = document.getElementById("closeTradeBtn");
    const amountInput = document.getElementById("tradeAmount");
    const typeSelect = document.getElementById("tradeType");

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            const amount = parseInt(amountInput.value);
            const type = typeSelect.value;
            openTrade(amount, type);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => closeTrade());
    }
});
