"use client";

import { useState } from "react";
import {
  parseDate,
  getLocalTimeZone,
  today,
  CalendarDate,
} from "@internationalized/date";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Badge,
  Tooltip,
  Avatar,
  Spacer,
  Progress,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  DatePicker,
  Pagination,
} from "@nextui-org/react";

// Icons as components for better consistency
const Icons = {
  Add: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  ),
  Search: () => (
    <svg
      className="w-4 h-4"
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
  ),
  Edit: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  ),
  Delete: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),
  Filter: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
      />
    </svg>
  ),
  Clear: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  Package: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
  Calendar: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  Menu: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
  SortAsc: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      />
    </svg>
  ),
  SortDesc: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
      />
    </svg>
  ),
  Sort: () => (
    <svg
      className="w-4 h-4"
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
  ),
};

// Utility functions for date handling
const dateUtils = {
  // Convert DateValue to string
  dateValueToString: (dateValue) => {
    if (!dateValue) return null;

    try {
      // If it's already a string, return it
      if (typeof dateValue === "string") return dateValue;

      // Handle CalendarDate objects
      if (
        dateValue &&
        typeof dateValue === "object" &&
        dateValue.year &&
        dateValue.month &&
        dateValue.day
      ) {
        const year = dateValue.year;
        const month = dateValue.month.toString().padStart(2, "0");
        const day = dateValue.day.toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      return null;
    } catch (error) {
      console.warn("Date conversion error:", error);
      return null;
    }
  },

  // Convert string to DateValue
  stringToDateValue: (dateString) => {
    if (!dateString || typeof dateString !== "string") return null;

    try {
      // First validate the string format
      if (!dateUtils.isValidDateString(dateString)) return null;

      // Handle YYYY-MM-DD format
      const dateParts = dateString.split("-");
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const day = parseInt(dateParts[2], 10);

        // Validate date parts more strictly
        if (
          !isNaN(year) &&
          !isNaN(month) &&
          !isNaN(day) &&
          year >= 1900 &&
          year <= 2100 &&
          month >= 1 &&
          month <= 12 &&
          day >= 1 &&
          day <= 31
        ) {
          // Additional validation: check if the date is actually valid
          const testDate = new Date(year, month - 1, day);
          if (
            testDate.getFullYear() === year &&
            testDate.getMonth() === month - 1 &&
            testDate.getDate() === day
          ) {
            return new CalendarDate(year, month, day);
          }
        }
      }

      return null;
    } catch (error) {
      console.warn("Date parsing error:", error);
      return null;
    }
  },

  // Get today's date as CalendarDate
  getToday: () => {
    try {
      const now = new Date();
      return new CalendarDate(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
      );
    } catch (error) {
      console.warn("Failed to get today's date:", error);
      return null;
    }
  },

    // Safe date validation
  isValidDateString: (dateString) => {
    if (!dateString || typeof dateString !== "string") return false;
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  },

  // Convert JavaScript Date to CalendarDate
  jsDateToCalendarDate: (jsDate) => {
    if (!(jsDate instanceof Date) || isNaN(jsDate.getTime())) return null;
    
    try {
      return new CalendarDate(
        jsDate.getFullYear(),
        jsDate.getMonth() + 1,
        jsDate.getDate()
      );
    } catch (error) {
      console.warn("Failed to convert JS Date to CalendarDate:", error);
      return null;
    }
  },
};

export default function Home() {
  const [invoiceData, setInvoiceData] = useState([
    {
      id: 1,
      type: "សាច់",
      name: "សាច់គោ",
      dueDate: "2024-12-20",
      quantity: 2,
      price: 15000,
      amount: 30000,
    },
    {
      id: 2,
      type: "សាច់",
      name: "សាច់ជ្រូក",
      dueDate: "2024-12-19",
      quantity: 3,
      price: 12000,
      amount: 36000,
    },
    {
      id: 3,
      type: "បន្លែ",
      name: "ស្ពៃ",
      dueDate: "2024-12-21",
      quantity: 5,
      price: 2000,
      amount: 10000,
    },
    {
      id: 4,
      type: "បន្លែ",
      name: "ត្រកួន",
      dueDate: "2024-12-20",
      quantity: 4,
      price: 1500,
      amount: 6000,
    },
    {
      id: 5,
      type: "ផ្លែឈើ",
      name: "ចែក",
      dueDate: "2024-12-22",
      quantity: 10,
      price: 3000,
      amount: 30000,
    },
    {
      id: 6,
      type: "ផ្លែឈើ",
      name: "ស្វាយ",
      dueDate: "2024-12-18",
      quantity: 8,
      price: 4000,
      amount: 32000,
    },
    {
      id: 7,
      type: "គ្រឿងសមុទ្រ",
      name: "ត្រីទូណា",
      dueDate: "2024-12-20",
      quantity: 2,
      price: 18000,
      amount: 36000,
    },
    {
      id: 8,
      type: "គ្រឿងសមុទ្រ",
      name: "បង្កង",
      dueDate: "2024-12-19",
      quantity: 15,
      price: 2500,
      amount: 37500,
    },
    {
      id: 9,
      type: "ប្រចាំថ្ងៃ",
      name: "អង្ករ",
      dueDate: "2024-12-25",
      quantity: 25,
      price: 3500,
      amount: 87500,
    },
    {
      id: 10,
      type: "ប្រចាំថ្ងៃ",
      name: "ប្រេង",
      dueDate: "2024-12-23",
      quantity: 3,
      price: 8000,
      amount: 24000,
    },
    {
      id: 11,
      type: "ប្រចាំថ្ងៃ",
      name: "ប្រេង",
      dueDate: "2024-12-23",
      quantity: 3,
      price: 8000,
      amount: 24000,
    },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [formData, setFormData] = useState({
    type: "សាច់",
    name: "",
    dueDate: dateUtils.jsDateToCalendarDate(new Date()),
    quantity: 1,
    price: 0,
    amount: 0,
  });

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ទាំងអស់");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const productTypes = ["សាច់", "បន្លែ", "ផ្លែឈើ", "គ្រឿងសមុទ្រ", "ប្រចាំថ្ងៃ"];

  // Enhanced filter system with better organization
  const getFilterCounts = () => {
    const counts = {
      ទាំងអស់: invoiceData.length,
      សាច់: 0,
      បន្លែ: 0,
      ផ្លែឈើ: 0,
      គ្រឿងសមុទ្រ: 0,
      ប្រចាំថ្ងៃ: 0,
    };

    invoiceData.forEach((item) => {
      if (counts.hasOwnProperty(item.type)) {
        counts[item.type]++;
      }
    });

    return counts;
  };

  const filterCounts = getFilterCounts();
  const filters = [
    {
      name: "ទាំងអស់",
      count: filterCounts["ទាំងអស់"],
      icon: "📦",
      color: "default",
    },
    { name: "សាច់", count: filterCounts["សាច់"], icon: "🥩", color: "danger" },
    {
      name: "បន្លែ",
      count: filterCounts["បន្លែ"],
      icon: "🥬",
      color: "success",
    },
    {
      name: "ផ្លែឈើ",
      count: filterCounts["ផ្លែឈើ"],
      icon: "🍎",
      color: "warning",
    },
    {
      name: "គ្រឿងសមុទ្រ",
      count: filterCounts["គ្រឿងសមុទ្រ"],
      icon: "🐟",
      color: "primary",
    },
    {
      name: "ប្រចាំថ្ងៃ",
      count: filterCounts["ប្រចាំថ្ងៃ"],
      icon: "🛒",
      color: "secondary",
    },
  ];

  const handleFormChange = (field, value) => {
    let processedValue = value;

    try {
      if (field === "quantity" || field === "price") {
        processedValue = Number(value) || 0;
      } else if (field === "dueDate") {
        // Handle date conversion more safely
        if (value === null || value === undefined) {
          processedValue = null;
        } else if (typeof value === "string") {
          // If it's already a string, validate and use it
          processedValue = dateUtils.isValidDateString(value) ? value : null;
        } else {
          // Convert DateValue to string using utility function
          processedValue = dateUtils.dateValueToString(value);
        }
      }

      const newFormData = { ...formData, [field]: processedValue };

      if (field === "quantity" || field === "price") {
        newFormData.amount = newFormData.quantity * newFormData.price;
      }

      setFormData(newFormData);
    } catch (error) {
      console.error("Form change error:", error);
      // Keep the previous value if there's an error
    }
  };

  const handleAddProduct = () => {
    try {
      // Convert CalendarDate to string for storage
      const productData = {
        ...formData,
        dueDate: dateUtils.dateValueToString(formData.dueDate) || formData.dueDate,
        amount: formData.quantity * formData.price,
      };

      if (editingProduct) {
        setInvoiceData(
          invoiceData.map((item) =>
            item.id === editingProduct.id
              ? {
                  ...productData,
                  id: editingProduct.id,
                }
              : item
          )
        );
      } else {
        const newProduct = {
          ...productData,
          id: Date.now(),
        };
        setInvoiceData([...invoiceData, newProduct]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Add product error:", error);
    }
  };

  const handleEditProduct = (product) => {
    try {
      setEditingProduct(product);
      const editFormData = { ...product };

      // Safely convert date string back to DateValue
      if (product.dueDate && dateUtils.isValidDateString(product.dueDate)) {
        editFormData.dueDate = dateUtils.stringToDateValue(product.dueDate);
      } else {
        editFormData.dueDate = null;
      }

      setFormData(editFormData);
      setShowAddForm(true);
    } catch (error) {
      console.error("Edit product error:", error);
      // Reset form to safe state if there's an error
      setFormData({
        type: "សាច់",
        name: "",
        dueDate: dateUtils.jsDateToCalendarDate(new Date()),
        quantity: 1,
        price: 0,
        amount: 0,
      });
    }
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    try {
      setInvoiceData(
        invoiceData.filter((item) => item.id !== productToDelete.id)
      );
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Delete product error:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({
      type: "សាច់",
      name: "",
      dueDate: dateUtils.jsDateToCalendarDate(new Date()),
      quantity: 1,
      price: 0,
      amount: 0,
    });
  };

  const formatCurrency = (amount) => {
    return `${Math.round(amount).toLocaleString("en-US")} ៛`;
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const getSortedData = () => {
    let filtered = [...invoiceData];

    // Filter by type first
    if (selectedFilter && selectedFilter !== "ទាំងអស់") {
      filtered = filtered.filter((item) => {
        return item.type === selectedFilter;
      });
    }

    // Then filter by text search
    if (filterText && filterText.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(filterText.toLowerCase().trim()) ||
          item.type.toLowerCase().includes(filterText.toLowerCase().trim())
      );
    }

    // Finally sort if needed
    if (sortBy) {
      filtered.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        // Handle different data types
        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  };

  const filteredAndSortedData = getSortedData();
  const totalAmount = filteredAndSortedData.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalProducts = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedData.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();

  const clearAllFilters = () => {
    setSelectedFilter("ទាំងអស់");
    setFilterText("");
    setSortBy("");
    setSortOrder("asc");
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  // Get sort icon helper
  const getSortIcon = (sortKey) => {
    if (sortBy !== sortKey) return <Icons.Sort />;
    return sortOrder === "asc" ? <Icons.SortAsc /> : <Icons.SortDesc />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-2 sm:p-4 lg:p-8 w-full min-w-0">
        {/* Enhanced Header */}
        <div className="mb-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardBody className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Title Section */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                    <Icons.Package />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      បញ្ជីទំនិញ
                    </h1>
                    <p className="text-gray-600 mt-1">
                      ប្រព័ន្ធគ្រប់គ្រងទំនិញ និងស្តុកទំនិញ
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  color="primary"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  onPress={() => setShowAddForm(true)}
                  startContent={<Icons.Add />}
                >
                  បន្ថែមទំនិញថ្មី
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Enhanced Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden w-full min-w-0">
          <CardBody className="p-0">
            {/* Enhanced Filter Section */}
            <div className="p-3 sm:p-6 bg-white border-b border-gray-200">
              <div className="space-y-4">
                {/* Filter Categories */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icons.Filter />
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-800">
                      ប្រភេទទំនិញ
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {filters.map((filter) => (
                      <Badge
                        key={filter.name}
                        content={filter.count}
                        color={filter.color}
                        size="sm"
                        className="cursor-pointer"
                      >
                        <Button
                          variant={
                            selectedFilter === filter.name
                              ? "solid"
                              : "bordered"
                          }
                          color={
                            selectedFilter === filter.name
                              ? filter.color
                              : "default"
                          }
                          size="sm"
                          className={`font-medium transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 ${
                            selectedFilter === filter.name
                              ? "shadow-md"
                              : "hover:shadow-sm"
                          }`}
                          onPress={() => {
                            setSelectedFilter(filter.name);
                            setCurrentPage(1); // Reset to first page when changing filter
                          }}
                          startContent={
                            <span className="text-xs">{filter.icon}</span>
                          }
                        >
                          <span className="hidden sm:inline">
                            {filter.name}
                          </span>
                          <span className="sm:hidden">
                            {filter.name.length > 4
                              ? filter.name.substring(0, 3)
                              : filter.name}
                          </span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="w-full">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-3">
                    ស្វែងរក
                  </h3>
                  <Input
                    type="text"
                    placeholder="ស្វែងរក..."
                    value={filterText}
                    onValueChange={(value) => {
                      setFilterText(value);
                      setCurrentPage(1); // Reset to first page when searching
                    }}
                    size="md"
                    className="w-full"
                    classNames={{
                      input: "text-sm",
                      inputWrapper:
                        "bg-white shadow-sm border-gray-300 focus-within:border-blue-500",
                    }}
                    startContent={<Icons.Search />}
                    isClearable
                    onClear={() => {
                      setFilterText("");
                      setCurrentPage(1); // Reset to first page when clearing search
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Table Section */}
            <div className="bg-white overflow-x-hidden">
              <Table
                aria-label="Product inventory table"
                removeWrapper={false}
                className="w-full"
                classNames={{
                  wrapper: "shadow-none w-full overflow-visible",
                  base: "w-full",
                  table: "w-full lg:table-auto table-fixed",
                  th: "bg-gray-100 text-gray-800 font-semibold text-xs sm:text-sm lg:text-sm border-b-2 border-gray-200 group-hover:bg-gray-200 transition-colors px-1 sm:px-4 py-3",
                  td: "py-3 sm:py-4 text-xs sm:text-sm lg:text-sm border-b border-gray-100 px-1 sm:px-4",
                  tr: "hover:bg-gray-50 transition-colors duration-200",
                }}
                topContent={
                  <div className="p-3 sm:p-6 bg-white border-b border-gray-200">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                          {selectedFilter === "ទាំងអស់"
                            ? "ទំនិញទាំងអស់"
                            : selectedFilter}
                        </h2>
                        {(selectedFilter !== "ទាំងអស់" ||
                          filterText ||
                          sortBy) && (
                          <Button
                            size="sm"
                            variant="flat"
                            color="default"
                            onPress={clearAllFilters}
                            className="font-medium text-xs sm:text-sm self-start sm:self-center"
                            startContent={<Icons.Clear />}
                          >
                            សម្អាត
                          </Button>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-sm text-gray-600">
                        <Chip
                          size="sm"
                          color="primary"
                          variant="flat"
                          className="text-xs"
                        >
                          {totalProducts} ផលិតផល
                        </Chip>
                        <Chip
                          size="sm"
                          color="success"
                          variant="flat"
                          className="text-xs"
                        >
                          {formatCurrency(totalAmount)}
                        </Chip>
                        {totalPages > 1 && (
                          <Chip
                            size="sm"
                            color="secondary"
                            variant="flat"
                            className="text-xs"
                          >
                            ទំព័រ {currentPage}/{totalPages}
                          </Chip>
                        )}
                        {sortBy && (
                          <Chip
                            size="sm"
                            color="secondary"
                            variant="flat"
                            className="font-medium text-xs"
                          >
                            តម្រៀប:{" "}
                            {sortBy === "type"
                              ? "ប្រភេទ"
                              : sortBy === "name"
                              ? "ឈ្មោះ"
                              : sortBy === "dueDate"
                              ? "កាលបរិច្ឆេទ"
                              : sortBy === "quantity"
                              ? "ចំនួន"
                              : sortBy === "price"
                              ? "តម្លៃ"
                              : sortBy === "amount"
                              ? "សរុប"
                              : sortBy}{" "}
                            ({sortOrder === "asc" ? "↑" : "↓"})
                          </Chip>
                        )}
                        {filterText && (
                          <Chip
                            size="sm"
                            color="warning"
                            variant="flat"
                            className="font-medium text-xs"
                          >
                            ស្វែងរក: "{filterText}"
                          </Chip>
                        )}
                      </div>
                    </div>
                  </div>
                }
              >
                <TableHeader>
                  {/* Category - Desktop Only */}
                  <TableColumn className="hidden lg:table-cell">
                    <button
                      onClick={() => handleSort("type")}
                      className="flex items-center gap-2 justify-start w-full font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200 cursor-pointer"
                    >
                      ប្រភេទ
                      <span
                        className={`transition-colors ${
                          sortBy === "type" ? "text-blue-600" : "text-gray-400"
                        }`}
                      >
                        {getSortIcon("type")}
                      </span>
                    </button>
                  </TableColumn>

                  {/* Product Name - Always Visible */}
                  <TableColumn className="lg:w-auto w-[35%]">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 lg:gap-2 justify-start w-full font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 px-1 lg:px-2 py-1 rounded transition-all duration-200 cursor-pointer"
                    >
                      ឈ្មោះទំនិញ
                      <span
                        className={`transition-colors ${
                          sortBy === "name" ? "text-blue-600" : "text-gray-400"
                        }`}
                      >
                        {getSortIcon("name")}
                      </span>
                    </button>
                  </TableColumn>

                  {/* Date - Desktop Only */}
                  <TableColumn className="hidden lg:table-cell">
                    <button
                      onClick={() => handleSort("dueDate")}
                      className="flex items-center gap-2 justify-start w-full font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200 cursor-pointer"
                    >
                      កាលបរិច្ឆេទ
                      <span
                        className={`transition-colors ${
                          sortBy === "dueDate"
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        {getSortIcon("dueDate")}
                      </span>
                    </button>
                  </TableColumn>

                  {/* Quantity - Always Visible */}
                  <TableColumn className="text-center lg:w-auto w-[14%]">
                    <button
                      onClick={() => handleSort("quantity")}
                      className="flex items-center gap-1 lg:gap-2 justify-center w-full font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 px-0 lg:px-2 py-1 rounded transition-all duration-200 cursor-pointer"
                    >
                      ចំនួន
                      <span
                        className={`transition-colors ${
                          sortBy === "quantity"
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        {getSortIcon("quantity")}
                      </span>
                    </button>
                  </TableColumn>

                  {/* Price - Always Visible */}
                  <TableColumn className="text-center lg:text-right lg:w-auto w-[32%]">
                    <button
                      onClick={() => handleSort("price")}
                      className="flex items-center gap-1 lg:gap-2 justify-center lg:justify-end w-full font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 px-0 lg:px-2 py-1 rounded transition-all duration-200 cursor-pointer"
                    >
                      តម្លៃ
                      <span
                        className={`transition-colors ${
                          sortBy === "price" ? "text-blue-600" : "text-gray-400"
                        }`}
                      >
                        {getSortIcon("price")}
                      </span>
                    </button>
                  </TableColumn>

                  {/* Amount - Desktop Only */}
                  <TableColumn className="hidden lg:table-cell text-right">
                    <button
                      onClick={() => handleSort("amount")}
                      className="flex items-center gap-2 justify-end w-full font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200 cursor-pointer"
                    >
                      សរុប
                      <span
                        className={`transition-colors ${
                          sortBy === "amount"
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        {getSortIcon("amount")}
                      </span>
                    </button>
                  </TableColumn>

                  {/* Actions - Always Visible */}
                  <TableColumn className="text-center lg:w-auto w-[19%]">
                    <span className="font-semibold text-gray-800">
                      សកម្មភាព
                    </span>
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((product) => (
                    <TableRow key={product.id}>
                      {/* Category - Desktop Only */}
                      <TableCell className="hidden lg:table-cell">
                        <Chip
                          size="md"
                          variant="flat"
                          className="font-medium"
                          color={
                            product.type === "សាច់"
                              ? "danger"
                              : product.type === "បន្លែ"
                              ? "success"
                              : product.type === "ផ្លែឈើ"
                              ? "warning"
                              : product.type === "គ្រឿងសមុទ្រ"
                              ? "primary"
                              : product.type === "ប្រចាំថ្ងៃ"
                              ? "secondary"
                              : "default"
                          }
                          startContent={
                            <span className="text-xs">
                              {
                                filters.find((f) => f.name === product.type)
                                  ?.icon
                              }
                            </span>
                          }
                        >
                          {product.type}
                        </Chip>
                      </TableCell>

                      {/* Product Name - Responsive */}
                      <TableCell className="px-2 lg:px-4">
                        {/* Mobile Layout */}
                        <div className="lg:hidden flex items-center gap-1.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                            {product.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm leading-tight">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {product.type}
                            </div>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden lg:block">
                          <User
                            name={
                              <span className="font-semibold text-gray-900">
                                {product.name}
                              </span>
                            }
                            description={
                              <span className="text-gray-600">ផលិតផល</span>
                            }
                            avatarProps={{
                              size: "sm",
                              className:
                                "bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600",
                              name: product.name.charAt(0),
                              showFallback: true,
                            }}
                          />
                        </div>
                      </TableCell>

                      {/* Date - Desktop Only */}
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Icons.Calendar />
                          {product.dueDate || 'N/A'}
                        </div>
                      </TableCell>

                      {/* Quantity - Always Visible */}
                      <TableCell className="text-center px-1">
                        <Chip
                          size="sm"
                          color="default"
                          variant="bordered"
                          className="font-bold min-w-8 px-1"
                        >
                          {product.quantity}
                        </Chip>
                      </TableCell>

                      {/* Price - Always Visible */}
                      <TableCell className="text-center lg:text-right px-1 lg:px-4">
                        <span className="font-semibold text-gray-900 text-sm">
                          {formatCurrency(product.price)}
                        </span>
                      </TableCell>

                      {/* Amount - Desktop Only */}
                      <TableCell className="hidden lg:table-cell text-right">
                        <span className="font-bold text-lg text-emerald-600">
                          {formatCurrency(product.amount)}
                        </span>
                      </TableCell>

                      {/* Actions - Always Visible */}
                      <TableCell className="text-center px-1 lg:px-4">
                        <div className="flex items-center justify-center gap-0.5">
                          <Tooltip content="កែប្រែ">
                            <Button
                              isIconOnly
                              size="sm"
                              color="primary"
                              variant="flat"
                              onPress={() => handleEditProduct(product)}
                              className="transition-all duration-200 hover:scale-105 min-w-7 h-7 lg:min-w-8 lg:h-8"
                            >
                              <Icons.Edit />
                            </Button>
                          </Tooltip>
                          <Tooltip content="លុប" color="danger">
                            <Button
                              isIconOnly
                              size="sm"
                              color="danger"
                              variant="flat"
                              onPress={() => handleDeleteProduct(product)}
                              className="transition-all duration-200 hover:scale-105 min-w-7 h-7 lg:min-w-8 lg:h-8"
                            >
                              <Icons.Delete />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center justify-center p-3 sm:p-6 border-t border-gray-200 gap-3">
                  <div className="text-xs sm:text-sm text-gray-600 text-center">
                    បង្ហាញ {(currentPage - 1) * itemsPerPage + 1} ដល់{" "}
                    {Math.min(currentPage * itemsPerPage, totalProducts)} នៃ{" "}
                    {totalProducts} ទំនិញ
                  </div>
                  <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
                    color="primary"
                    size="sm"
                    showControls
                    className="gap-1"
                  />
                </div>
              )}

              {totalProducts === 0 && (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icons.Package />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    រកមិនឃើញទំនិញ
                  </h3>
                  <p className="text-gray-500 mb-4">
                    គ្មានទំនិញដែលត្រូវនឹងការស្វែងរករបស់អ្នក
                  </p>
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={clearAllFilters}
                    startContent={<Icons.Clear />}
                  >
                    សម្អាតការត្រង
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Enhanced Add/Edit Product Modal */}
        <Modal
          isOpen={showAddForm}
          onOpenChange={setShowAddForm}
          placement="center"
          size="2xl"
          scrollBehavior="inside"
          backdrop="blur"
          isDismissable={true}
          isKeyboardDismissDisabled={false}
          hideCloseButton={false}
          classNames={{
            backdrop: "bg-black/60",
            base: "border-none shadow-2xl",
            header:
              "border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50",
            body: "py-6",
            footer: "border-t border-gray-200 bg-gray-50",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      <Icons.Package />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {editingProduct ? "កែប្រែទំនិញ" : "បន្ថែមទំនិញថ្មី"}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        {editingProduct
                          ? "កែប្រែព័ត៌មានទំនិញរបស់អ្នក"
                          : "បំពេញព័ត៌មានទំនិញថ្មីរបស់អ្នក"}
                      </p>
                    </div>
                  </div>
                </ModalHeader>

                <ModalBody>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddProduct();
                    }} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Type Selection */}
                      <Select
                        label="ប្រភេទទំនិញ"
                        placeholder="ជ្រើសរើសប្រភេទ"
                        selectedKeys={formData.type ? [formData.type] : []}
                        onSelectionChange={(keys) => {
                          const selectedValue = Array.from(keys)[0];
                          handleFormChange("type", selectedValue);
                        }}
                        isRequired={true}
                        variant="bordered"
                        size="lg"
                        classNames={{
                          trigger: "bg-white shadow-sm",
                        }}
                      >
                        {productTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            startContent={
                              <span>
                                {filters.find((f) => f.name === type)?.icon}
                              </span>
                            }
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </Select>

                      {/* Product Name */}
                      <Input
                        label="ឈ្មោះទំនិញ"
                        placeholder="បញ្ចូលឈ្មោះទំនិញ"
                        value={formData.name}
                        onValueChange={(value) =>
                          handleFormChange("name", value)
                        }
                        isRequired
                        variant="bordered"
                        size="lg"
                        classNames={{
                          inputWrapper: "bg-white shadow-sm",
                        }}
                      />

                                              {/* Due Date */}
                        <DatePicker
                          label="កាលបរិច្ឆេទ"
                          value={formData.dueDate}
                          onChange={(date) => handleFormChange("dueDate", date)}
                          isRequired
                          variant="bordered"
                          size="lg"
                          inert={false}
                          showMonthAndYearPickers
                          classNames={{
                            base: "bg-white",
                            inputWrapper:
                              "bg-white shadow-sm border-gray-300 focus-within:border-blue-500",
                          }}
                        />

                      {/* Quantity */}
                      <Input
                        type="number"
                        label="បរិមាណ"
                        placeholder="បញ្ចូលបរិមាណ"
                        value={formData.quantity?.toString() || ""}
                        onValueChange={(value) =>
                          handleFormChange("quantity", value)
                        }
                        min="1"
                        isRequired
                        variant="bordered"
                        size="lg"
                        classNames={{
                          inputWrapper: "bg-white shadow-sm",
                        }}
                      />

                      {/* Price */}
                      <Input
                        type="number"
                        label="តម្លៃ"
                        placeholder="បញ្ចូលតម្លៃ"
                        value={formData.price?.toString() || ""}
                        onValueChange={(value) =>
                          handleFormChange("price", value)
                        }
                        min="0"
                        step="0.01"
                        isRequired
                        variant="bordered"
                        size="lg"
                        endContent={
                          <span className="text-gray-600 font-medium">៛</span>
                        }
                        classNames={{
                          inputWrapper: "bg-white shadow-sm",
                        }}
                      />

                      {/* Total Amount (Auto-calculated) */}
                      <div className="md:col-span-2">
                        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                          <CardBody className="p-4">
                            <div className="text-center">
                              <p className="text-sm text-emerald-700 font-medium mb-2">
                                សរុបទឹកប្រាក់
                              </p>
                              <p className="text-2xl font-bold text-emerald-800">
                                {formatCurrency(formData.amount)}
                              </p>
                              <div className="mt-3 text-sm text-emerald-600">
                                {formData.quantity} ×{" "}
                                {formData.price.toLocaleString("en-US")} ៛
                              </div>
                              {formData.quantity > 0 && formData.price > 0 && (
                                <Progress
                                  value={100}
                                  color="success"
                                  size="sm"
                                  className="mt-2"
                                />
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    size="lg"
                  >
                    បោះបង់
                  </Button>
                                    <Button 
                    color="primary" 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold"
                    onPress={() => {
                      try {
                        handleAddProduct();
                      } catch (error) {
                        console.error("Submit error:", error);
                      }
                    }}
                    isDisabled={
                      !formData.name ||
                      !formData.dueDate ||
                      formData.quantity <= 0 ||
                      formData.price <= 0
                    }
                  >
                    {editingProduct ? "រក្សាទុកការកែប្រែ" : "បន្ថែមទំនិញ"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Enhanced Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
          placement="center"
          size="md"
          backdrop="blur"
          isDismissable={true}
          isKeyboardDismissDisabled={false}
          hideCloseButton={false}
          classNames={{
            backdrop: "bg-red-900/20",
            base: "border-none shadow-2xl",
            header: "border-b border-red-200 bg-red-50",
            body: "py-6",
            footer: "border-t border-red-200 bg-red-50",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-red-900">
                        បញ្ជាក់ការលុប
                      </h3>
                      <p className="text-red-700 text-sm">
                        សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ
                      </p>
                    </div>
                  </div>
                </ModalHeader>

                <ModalBody>
                  {productToDelete && (
                    <Card>
                      <CardBody className="p-4">
                        <User
                          name={
                            <span className="font-semibold">
                              {productToDelete.name}
                            </span>
                          }
                          description={
                            <div className="space-y-1">
                              <p className="text-sm text-gray-600">
                                {productToDelete.type}
                              </p>
                              <p className="font-semibold text-emerald-600">
                                {formatCurrency(productToDelete.amount)}
                              </p>
                            </div>
                          }
                          avatarProps={{
                            size: "lg",
                            className:
                              "bg-gradient-to-br from-red-100 to-red-200 text-red-600",
                            name: productToDelete.name.charAt(0),
                            showFallback: true,
                          }}
                        />
                      </CardBody>
                    </Card>
                  )}
                  <p className="text-gray-700 text-center mt-4">
                    តើអ្នកពិតជាចង់លុបទំនិញនេះមែនទេ?
                  </p>
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="default"
                    variant="light"
                    onPress={onClose}
                    size="lg"
                  >
                    បោះបង់
                  </Button>
                  <Button
                    color="danger"
                    onPress={confirmDelete}
                    size="lg"
                    className="font-semibold"
                  >
                    លុបចោល
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
