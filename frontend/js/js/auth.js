const API_USER = "http://localhost:5000/api/user";

// ===== LOGIN =====
export async function login(email, password) {
    if (!email || !password) return alert("Enter email and password");

    try {
        const res = await fetch(`${API_USER}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("fxpro_token", data.token);
            localStorage.setItem("walletBalance", data.balance);
            localStorage.setItem("userName", data.name);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Login failed");
        }
    } catch (err) {
        console.error(err);
        alert("Server error during login");
    }
}

// ===== SIGNUP =====
export async function signup(name, email, password) {
    if (!name || !email || !password) return alert("All fields are required");

    try {
        const res = await fetch(`${API_USER}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (res.ok) {
            alert("Registration successful. Please login.");
            window.location.href = "auth.html";
        } else {
            alert(data.message || "Registration failed");
        }
    } catch (err) {
        console.error(err);
        alert("Server error during signup");
    }
}
