export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Login</h1>
      <form className="flex flex-col gap-4 w-80 bg-white p-6 shadow-md rounded-lg">
        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded"
        />
        <button className="bg-green-700 text-white py-2 rounded hover:bg-green-800">
          Login
        </button>
      </form>
    </main>
  );
}
