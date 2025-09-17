// // "use client";
// import React, { useState } from "react";

// export default function LoginPage() {
//   const [fullName, setFullName] = useState("");
//   const [password, setPassword] = useState("");

//   // ⬇️ Add your handleLogin here inside the component
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("http://localhost:5000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fullName, password }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       alert("Login successful");
//     } else {
//       alert("User not registered");
//     }
//   };

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";

export default function LoginPage() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  // ⬅️ Add handleLogin here, inside the component
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Login successful");
    } else {
      alert(data.message); // User not registered OR missing fields
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
