import React, { useEffect, useState } from "react";

export default function OrderMedicine() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/orders?populate=items.medicineId,billId");
      const data = await res.json();
      console.log("📦 API Response:", data); // 👈 View this in console
      setOrders(data);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
    }
  };




  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/orders/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");
      alert("✅ Order canceled successfully");
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete order");
    }
  };

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "50px auto",
      padding: "20px",
      fontFamily: "Segoe UI, Tahoma, sans-serif",
      backgroundColor: "#f9fafb",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      border: "1px solid #ddd",
      padding: "12px",
      backgroundColor: "#059669",
      color: "#fff",
      textAlign: "center",
      fontSize: "16px",
    },
    td: {
      border: "1px solid #ddd",
      padding: "12px",
      textAlign: "center",
      fontSize: "15px",
    },
    trHover: {
      backgroundColor: "#f1f5f9",
    },
    orderItems: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    heading: {
      textAlign: "center",
      color: "#059669",
      fontSize: "28px",
      fontWeight: "600",
    },
    actionBtn: {
      padding: "6px 12px",
      margin: "2px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      color: "#fff",
    },
    deleteBtn: {
      backgroundColor: "#ef4444",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 Medicine Orders</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Order ID</th>
            <th style={styles.th}>Items</th>
            <th style={styles.th}>Total Price (₹)</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Payment Method</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id || index} style={index % 2 === 0 ? {} : styles.trHover}>
                <td style={styles.td}>{order._id || "—"}</td>

                <td style={{ ...styles.td, textAlign: "left" }}>
                  <div style={styles.orderItems}>
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item, i) => (
                        <span key={i}>
                          {item.medicineId?.name ||
                            item.medicine?.name ||
                            item.medicineId?.attributes?.name ||
                            "Unnamed Medicine"}{" "}
                          x {item.quantity || item.qty || 1} @ ₹
                          {item.price?.toFixed?.(2) ||
                            item.amount?.toFixed?.(2) ||
                            "0.00"}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: "gray" }}>— No items found —</span>
                    )}
                  </div>
                </td>

                <td style={styles.td}>
                  ₹ {order.totalPrice?.toFixed?.(2) || "0.00"}
                </td>

                <td style={styles.td}>
                  {order.address || order.billId?.address || "—"}
                </td>

                {/* 💳 Payment Method */}
                <td style={styles.td}>
                  {order.paymentMethod || order.billId?.paymentMethod || "—"}
                </td>

                <td style={styles.td}>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "—"}
                </td>

                <td style={styles.td}>
                  <button
                    style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                    onClick={() => handleDelete(order._id)}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.td}>
                🕐 No orders found or unable to fetch data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


























// import React, { useState, useEffect } from "react";

// export default function BuyMedicine() {
//   const [orders, setOrders] = useState([]);

//   // Fetch all orders from backend
//   useEffect(() => {
//     fetch("http://localhost:8000/api/medicine-orders")
//       .then((res) => res.json())
//       .then((data) => setOrders(data))
//       .catch((err) => console.error("Error fetching orders:", err));
//   }, []);

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Segoe UI, Tahoma, sans-serif" }}>
//       <h1 style={{ color: "#059669" }}>💊 Your Medicine Orders</h1>
//       <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
//         <thead>
//           <tr style={{ background: "#059669", color: "#fff" }}>
//             <th style={{ padding: "10px", border: "1px solid #e0f2e9" }}>Medicine</th>
//             <th style={{ padding: "10px", border: "1px solid #e0f2e9" }}>Quantity</th>
//             <th style={{ padding: "10px", border: "1px solid #e0f2e9" }}>Total Price</th>
//             <th style={{ padding: "10px", border: "1px solid #e0f2e9" }}>Order Date</th>
//             <th style={{ padding: "10px", border: "1px solid #e0f2e9" }}>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id} style={{ background: "#f2fdf7" }}>
//               <td style={{ padding: "8px", border: "1px solid #e0f2e9" }}>{order.medicineId?.name}</td>
//               <td style={{ padding: "8px", border: "1px solid #e0f2e9" }}>{order.quantity}</td>
//               <td style={{ padding: "8px", border: "1px solid #e0f2e9" }}>₹ {order.totalPrice}</td>
//               <td style={{ padding: "8px", border: "1px solid #e0f2e9" }}>
//                 {new Date(order.orderDate).toLocaleDateString()}
//               </td>
//               <td style={{ padding: "8px", border: "1px solid #e0f2e9" }}>{order.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }









