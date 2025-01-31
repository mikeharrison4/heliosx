import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6">
      <div>
        <div className="text-center md:text-left">
          <h3 className="font-mono text-2xl pb-4">Conditions:</h3>
          <ul className="font-sans flex flex-col gap-2">
            <li>
              <button className="p-2 bg-gray-100">Genovian Pear</button>
            </li>
            <li>
              <button className="p-2 text-gray-500 hover:bg-gray-100 hover:cursor-not-allowed">
                Other condition
              </button>
            </li>
            <li>
              <button className="p-2 text-gray-500 hover:bg-gray-100 hover:cursor-not-allowed">
                Other condition
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Link
          className="font-sans text-3xl bg-primary-yellow p-4 hover:opacity-80"
          href="/genovian-pear/consultation"
        >
          Start consultation
        </Link>
      </div>
    </div>
  );
}
