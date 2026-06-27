export const Customers = () => {
  const sampleUsers = [
    { name: "তাহসিন আহমেদ", email: "tahsin@gmail.com", spending: "8,400 BDT", location: "Dhaka" },
    { name: "নাজিয়া ইসলাম", email: "nazia.islam@yahoo.com", spending: "4,200 BDT", location: "Chittagong" }
  ];
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Registered Customers</h2>
        <p className="text-xs text-gray-400 mt-0.5">View profiles and total lifetime value</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleUsers.map((user, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 flex items-center justify-center font-bold text-[#C5A880] text-sm">
              {user.name[0]}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">{user.name}</h4>
              <p className="text-xs text-gray-400">{user.email} • {user.location}</p>
              <p className="text-xs font-semibold text-gray-600 mt-1.5">LTV Total: <span className="text-gray-800 font-bold">{user.spending}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};