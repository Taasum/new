
// src/app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="font-bold text-lg">AgriChain</h3>
          <p className="text-sm mt-2">Transparent agriculture supply chain — build trust, pay fair.</p>
        </div>
        <div className="flex gap-8">
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-2 text-sm space-y-1">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul className="mt-2 text-sm space-y-1">
              <li>Docs</li>
              <li>Blog</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
