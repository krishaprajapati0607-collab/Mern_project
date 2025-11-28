import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import L from "leaflet";

// Fix Leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker({ setAddress }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        setAddress(res.data.display_name || "Address not found");
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Failed to fetch address");
      }
    },
  });

  return position ? <Marker position={position}></Marker> : null;
}

export default function BillingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bill, setBill] = useState(null);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  useEffect(() => {
    fetch(`http://localhost:8000/api/bills/${id}`)
      .then((res) => res.json())
      .then((data) => setBill(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!bill) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billId: bill._id,
          items: bill.items,
          totalPrice: bill.totalPrice,
          address,
          paymentMethod,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      alert("✅ Order placed successfully!");
      navigate("/ordermedicine");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order");
    }
  };

  const styles = {
    container: {
      maxWidth: "700px",
      margin: "40px auto",
      fontFamily: "Segoe UI, Tahoma, sans-serif",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    th: {
      border: "1px solid #ddd",
      padding: "12px",
      background: "#059669",
      color: "#fff",
    },
    td: { border: "1px solid #ddd", padding: "12px", textAlign: "center" },
    formGroup: { marginBottom: "15px" },
    label: { display: "block", marginBottom: "5px", fontWeight: "600" },
    select: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    map: {
      height: "300px",
      width: "100%",
      borderRadius: "8px",
      marginTop: "10px",
    },
    submitBtn: {
      padding: "10px 20px",
      background: "#059669",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h2>🧾 Billing & Delivery</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Medicine</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item) => (
            <tr key={item.medicineId._id}>
              <td style={styles.td}>{item.medicineId.name}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>₹ {item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ₹ {bill.totalPrice.toFixed(2)}</h3>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Delivery Location on Map</label>
          <MapContainer
            center={[23.0225, 72.5714]} // default Ahmedabad
            zoom={13}
            style={styles.map}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker setAddress={setAddress} />
          </MapContainer>
          <p>
            📌 <strong>Selected Address:</strong>{" "}
            {address || "Click on map to choose"}
          </p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={styles.select}
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>
        </div>

        <button type="submit" style={styles.submitBtn}>
          ✅ Place Order
        </button>
      </form>
    </div>
  );
}



















// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function BillingForm() {
//   const { id } = useParams(); // bill ID
//   const navigate = useNavigate();

//   const [bill, setBill] = useState(null);
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Cash");

//   useEffect(() => {
//     fetch(`http://localhost:8000/api/bills/${id}`)
//       .then(res => res.json())
//       .then(data => setBill(data))
//       .catch(err => console.error(err));
//   }, [id]);

//   if (!bill) return <p>Loading...</p>;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`http://localhost:8000/api/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           billId: bill._id,
//           items: bill.items,
//           totalPrice: bill.totalPrice,
//           address,
//           paymentMethod
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to place order");

//       alert("✅ Order placed successfully!");
//       navigate("/ordermedicine"); // redirect to medicine orders page
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to place order");
//     }
//   };

//   const styles = {
//     container: { maxWidth: "700px", margin: "40px auto", fontFamily: "Segoe UI, Tahoma, sans-serif" },
//     table: { width: "100%", borderCollapse: "collapse", marginBottom: "20px" },
//     th: { border: "1px solid #ddd", padding: "12px", background: "#059669", color: "#fff" },
//     td: { border: "1px solid #ddd", padding: "12px", textAlign: "center" },
//     formGroup: { marginBottom: "15px" },
//     label: { display: "block", marginBottom: "5px", fontWeight: "600" },
//     input: { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
//     select: { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
//     submitBtn: { padding: "10px 20px", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>🧾 Billing & Delivery</h2>

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Medicine</th>
//             <th style={styles.th}>Quantity</th>
//             <th style={styles.th}>Price (₹)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bill.items.map(item => (
//             <tr key={item.medicineId._id}>
//               <td style={styles.td}>{item.medicineId.name}</td>
//               <td style={styles.td}>{item.quantity}</td>
//               <td style={styles.td}>₹ {item.price.toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h3>Total: ₹ {bill.totalPrice.toFixed(2)}</h3>

//       <form onSubmit={handleSubmit}>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Delivery Address</label>
//           <input
//             type="text"
//             required
//             value={address}
//             onChange={e => setAddress(e.target.value)}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>Payment Method</label>
//           <select
//             value={paymentMethod}
//             onChange={e => setPaymentMethod(e.target.value)}
//             style={styles.select}
//           >
//             <option value="Cash">Cash</option>
//             <option value="UPI">UPI</option>
//             <option value="Card">Card</option>
//           </select>
//         </div>

//         <button type="submit" style={styles.submitBtn}>✅ Place Order</button>
//       </form>
//     </div>
//   );
// }
