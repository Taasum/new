// app/login/page.tsx
export default function LoginPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="block w-full border p-2 mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              className="block w-full border p-2 mb-4"
            />
            <button
              type="submit"
              className="bg-lime-800 text-white px-4 py-2 rounded hover:bg-lime-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  