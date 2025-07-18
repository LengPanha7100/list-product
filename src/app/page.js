"use client";

import { useState } from "react";

export default function Home() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      type: "សាច់",
      name: "Tech Jungle",
      price: 973.48,
      amount: 973.48,
      dueDate: "05 Oct 2022",
    },
    {
      id: 2,
      type: "បន្លែ",
      name: "Signal Cloud",
      price: 480.21,
      amount: 480.21,
      dueDate: "24 Sep 2022",
    },
    {
      id: 3,
      type: "ផ្លែឈើ",
      name: "Hog Bridge",
      price: 1254.37,
      amount: 1254.37,
      dueDate: "17 Sep 2022",
    },
    {
      id: 4,
      type: "គ្រឿងសមុទ្រ",
      name: "Cone Care",
      price: 973.4,
      amount: 973.4,
      dueDate: "11 Sep 2022",
    },
    {
      id: 5,
      type: "របស់ប្រើប្រាស់ជាប្រចាំថ្ងៃ",
      name: "Driftcast",
      price: 7094.45,
      amount: 7094.45,
      dueDate: "02 Sep 2022",
    },
    {
      id: 6,
      type: "សាច់",
      name: "Ocean Hut",
      price: 4599.75,
      amount: 4599.75,
      dueDate: "30 Aug 2022",
    },
    {
      id: 7,
      type: "បន្លែ",
      name: "Smartbit",
      price: 804.56,
      amount: 804.56,
      dueDate: "16 Aug 2022",
    },
    {
      id: 8,
      type: "ផ្លែឈើ",
      name: "Fresh Fruits Co",
      price: 1250.0,
      amount: 1250.0,
      dueDate: "15 Aug 2022",
    },
    {
      id: 9,
      type: "គ្រឿងសមុទ្រ",
      name: "Sea Delights",
      price: 890.3,
      amount: 890.3,
      dueDate: "12 Aug 2022",
    },
    {
      id: 10,
      type: "របស់ប្រើប្រាស់ជាប្រចាំថ្ងៃ",
      name: "Daily Essentials",
      price: 450.75,
      amount: 450.75,
      dueDate: "10 Aug 2022",
    },
    {
      id: 11,
      type: "សាច់",
      name: "Premium Meats",
      price: 3200.0,
      amount: 3200.0,
      dueDate: "08 Aug 2022",
    },
    {
      id: 12,
      type: "បន្លែ",
      name: "Green Valley",
      price: 675.25,
      amount: 675.25,
      dueDate: "05 Aug 2022",
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filters = [
    { name: "All", count: invoices.length },
    {
      name: "សាច់",
      count: invoices.filter((inv) => inv.type === "សាច់").length,
    },
    {
      name: "បន្លែ",
      count: invoices.filter((inv) => inv.type === "បន្លែ").length,
    },
    {
      name: "ផ្លែឈើ",
      count: invoices.filter((inv) => inv.type === "ផ្លែឈើ").length,
    },
    {
      name: "គ្រឿងសមុទ្រ",
      count: invoices.filter((inv) => inv.type === "គ្រឿងសមុទ្រ").length,
    },
    {
      name: "របស់ប្រើប្រាស់ជាប្រចាំថ្ងៃ",
      count: invoices.filter((inv) => inv.type === "របស់ប្រើប្រាស់ជាប្រចាំថ្ងៃ")
        .length,
    },
  ];

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesFilter =
      selectedFilter === "All" || invoice.type === selectedFilter;
    const matchesSearch =
      invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInvoice(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
            List Product
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-base">
            អាចដាក់ទំនិញដែលអ្នកបានទិញទាំងអស់នៅកន្លែងនេះ
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.name)}
                className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter.name
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="hidden sm:inline">{filter.name} </span>
                <span className="sm:hidden">{filter.name}</span>
                {filter.count}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 sm:pl-10 sm:pr-4 sm:py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 text-sm transition-all duration-200"
            />
            <svg
              className="absolute left-2 sm:left-3 top-2 sm:top-2.5 w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto max-h-[400px] sm:max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors">
                    <div className="flex items-center gap-1">
                      ID
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors">
                    <div className="flex items-center gap-1">
                      Type
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors">
                    <div className="flex items-center gap-1">
                      Name
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors">
                    <div className="flex items-center gap-1">
                      Due Date
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors">
                    <div className="flex items-center gap-1">
                      Price
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors">
                    <div className="flex items-center gap-1">
                      Amount
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{invoice.id}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {invoice.type}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                        {invoice.name}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.dueDate}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                        {formatCurrency(invoice.price)}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                        {formatCurrency(invoice.amount)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-24 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 ">
                            No products found
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {searchTerm
                              ? `No results found for "${searchTerm}"`
                              : "No products available"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
