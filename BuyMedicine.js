import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/medicines")
      .then(res => res.json())
      .then(data => setMedicines(data))
      .catch(err => console.error("Error fetching medicines:", err));
  }, []);

  const handleQuantityChange = (medicineId, quantity) => {
    if (quantity < 0) return;
    const med = medicines.find(m => m._id === medicineId);
    if (quantity > med.stock) {
      alert(`⚠️ Only ${med.stock} units available`);
      return;
    }
    setCart(prev => ({ ...prev, [medicineId]: quantity }));
  };

  useEffect(() => {
    let total = 0;
    for (const [id, qty] of Object.entries(cart)) {
      const med = medicines.find(m => m._id === id);
      if (med) total += med.price * qty;
    }
    setTotalPrice(total);
  }, [cart, medicines]);

  const handleCheckout = async () => {
    const orderItems = Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const med = medicines.find(m => m._id === id);
        return { medicineId: id, quantity: qty, price: med.price };
      });

    if (orderItems.length === 0) {
      alert("⚠️ Please select at least one medicine");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: orderItems, totalPrice }),
      });

      if (!res.ok) throw new Error("Failed to create bill");
      const data = await res.json();
      navigate(`/billing/${data._id}`); // Redirect to billing page with bill ID
    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order");
    }
  };

  const styles = {
    container: { maxWidth: "900px", margin: "40px auto", fontFamily: "Segoe UI, Tahoma, sans-serif" },
    table: { width: "100%", borderCollapse: "collapse", marginBottom: "20px" },
    th: { border: "1px solid #ddd", padding: "12px", background: "#059669", color: "#fff" },
    td: { border: "1px solid #ddd", padding: "12px", textAlign: "center" },
    input: { width: "60px", textAlign: "center" },
    checkoutBtn: { padding: "10px 18px", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  };

  return (
    <div style={styles.container}>
      <h2>💊 Buy Medicines</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Medicine</th>
            <th style={styles.th}>Stock</th>
            <th style={styles.th}>Price (₹)</th>
            <th style={styles.th}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map(m => (
            <tr key={m._id}>
              <td style={styles.td}>{m.name}</td>
              <td style={styles.td}>{m.stock}</td>
              <td style={styles.td}>₹ {m.price.toFixed(2)}</td>
              <td style={styles.td}>
                <input
                  type="number"
                  min="0"
                  max={m.stock}
                  value={cart[m._id] || ""}
                  onChange={e => handleQuantityChange(m._id, parseInt(e.target.value) || 0)}
                  style={styles.input}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total Price: ₹ {totalPrice.toFixed(2)}</h3>
      <button style={styles.checkoutBtn} onClick={handleCheckout}>🛒 Checkout</button>
    </div>
  );
}




// const handleCheckout = async () => {
//   const orderItems = Object.entries(cart)
//     .filter(([_, qty]) => qty > 0)
//     .map(([id, qty]) => {
//       const med = medicines.find(m => m._id === id);
//       return { medicineId: id, quantity: qty, price: med.price };
//     });

//   if (orderItems.length === 0) {
//     alert("⚠️ Please select at least one medicine");
//     return;
//   }

//   // Example: ask for address and payment method in prompt (or redirect to BillingForm)
//   const address = prompt("Enter delivery address:");
//   const paymentMethod = prompt("Enter payment method (Cash/UPI/Card):");

//   try {
//     const res = await fetch("http://localhost:8000/api/medicine-orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: orderItems, totalPrice, address, paymentMethod }),
//     });
//     if (!res.ok) throw new Error("Failed to create order");
//     const data = await res.json();
//     alert("✅ Order placed successfully!");
//     setCart({});
//     window.location.href = "/ordermedicine"; // redirect to orders page
//   } catch (err) {
//     console.error(err);
//     alert("❌ Failed to place order");
//   }
// };
