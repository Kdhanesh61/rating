import { useState } from "react";

const StoreList = () => {
  const [stores, setStores] = useState([
    { id: 1, name: "Store A", address: "Address A", rating: 4 },
    { id: 2, name: "Store B", address: "Address B", rating: 5 },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Store List</h1>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Store Name</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id} className="border">
              <td className="border p-2">{store.name}</td>
              <td className="border p-2">{store.address}</td>
              <td className="border p-2">{store.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
