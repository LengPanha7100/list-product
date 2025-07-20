"use client";

import { useState, useEffect } from "react";
import {
  parseDate,
  getLocalTimeZone,
  today,
  CalendarDate,
} from "@internationalized/date";
import { productApi, handleApiError } from "../lib/api";
import PWAInstallPrompt from "../components/PWAInstallPrompt";
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
      // Return a fallback date
      return new CalendarDate(2024, 12, 20);
    }
  },

  // Safe date validation
  isValidDateString: (dateString) => {
    if (!dateString || typeof dateString !== "string") return false;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;

    try {
      const date = new Date(dateString + "T00:00:00");
      return date instanceof Date && !isNaN(date.getTime());
    } catch (error) {
      return false;
    }
  },

  // Convert JavaScript Date to CalendarDate
  jsDateToCalendarDate: (jsDate) => {
    if (!(jsDate instanceof Date) || isNaN(jsDate.getTime())) {
      // Return fallback date if invalid
      return dateUtils.getToday();
    }

    try {
      return new CalendarDate(
        jsDate.getFullYear(),
        jsDate.getMonth() + 1,
        jsDate.getDate()
      );
    } catch (error) {
      console.warn("Failed to convert JS Date to CalendarDate:", error);
      return dateUtils.getToday();
    }
  },
};

export default function Home() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [createFormData, setCreateFormData] = useState({
    type: "សាច់",
    name: "",
    dueDate: dateUtils.getToday(),
    quantity: "",
    price: "",
    amount: 0,
  });

  const [editFormData, setEditFormData] = useState({
    type: "សាច់",
    name: "",
    dueDate: dateUtils.getToday(),
    quantity: "",
    price: "",
    amount: 0,
  });


  const [filterText, setFilterText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ទាំងអស់");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const productTypes = ["សាច់", "បន្លែ", "ផ្លែឈើ", "គ្រឿងសមុទ្រ", "ប្រចាំថ្ងៃ"];

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.getAll();
      if (response.success) {
        setInvoiceData(response.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

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

  const handleCreateFormChange = (field, value) => {
    let processedValue = value;

    try {
      if (field === "quantity" || field === "price") {
        // Handle empty string to allow clearing input
        if (value === "" || value === null || value === undefined) {
          processedValue = "";
        } else {
          processedValue = Number(value) || 0;
        }
      } else if (field === "dueDate") {
        // Handle date conversion more safely
        if (value === null || value === undefined) {
          processedValue = dateUtils.getToday();
        } else if (typeof value === "string") {
          // If it's a string, try to convert it safely
          const convertedDate = dateUtils.stringToDateValue(value);
          processedValue = convertedDate || dateUtils.getToday();
        } else if (value && typeof value === "object") {
          // It's already a CalendarDate object, use it directly
          processedValue = value;
        } else {
          processedValue = dateUtils.getToday();
        }
      }

      const newFormData = { ...createFormData, [field]: processedValue };

      // Only calculate amount if both quantity and price are valid numbers
      if (field === "quantity" || field === "price") {
        const qty =
          field === "quantity" ? processedValue : createFormData.quantity;
        const price = field === "price" ? processedValue : createFormData.price;

        if (qty !== "" && price !== "" && !isNaN(qty) && !isNaN(price)) {
          newFormData.amount = Number(qty) * Number(price);
        } else {
          newFormData.amount = 0;
        }
      }

      setCreateFormData(newFormData);
    } catch (error) {
      console.error("Create form change error:", error);
      // Keep the previous value if there's an error
    }
  };

  const handleEditFormChange = (field, value) => {
    let processedValue = value;

    try {
      if (field === "quantity" || field === "price") {
        // Handle empty string to allow clearing input
        if (value === "" || value === null || value === undefined) {
          processedValue = "";
        } else {
          processedValue = Number(value) || 0;
        }
      } else if (field === "dueDate") {
        // Handle date conversion more safely
        if (value === null || value === undefined) {
          processedValue = dateUtils.getToday();
        } else if (typeof value === "string") {
          // If it's a string, try to convert it safely
          const convertedDate = dateUtils.stringToDateValue(value);
          processedValue = convertedDate || dateUtils.getToday();
        } else if (value && typeof value === "object") {
          // It's already a CalendarDate object, use it directly
          processedValue = value;
        } else {
          processedValue = dateUtils.getToday();
        }
      }

      const newFormData = { ...editFormData, [field]: processedValue };

      // Only calculate amount if both quantity and price are valid numbers
      if (field === "quantity" || field === "price") {
        const qty =
          field === "quantity" ? processedValue : editFormData.quantity;
        const price = field === "price" ? processedValue : editFormData.price;

        if (qty !== "" && price !== "" && !isNaN(qty) && !isNaN(price)) {
          newFormData.amount = Number(qty) * Number(price);
        } else {
          newFormData.amount = 0;
        }
      }

      setEditFormData(newFormData);
    } catch (error) {
      console.error("Edit form change error:", error);
      // Keep the previous value if there's an error
    }
  };

  const handleCreateProduct = async () => {
    try {
      setActionLoading(true);
      setError(null);

      // Convert CalendarDate to string for storage
      const productData = {
        ...createFormData,
        dueDate:
          dateUtils.dateValueToString(createFormData.dueDate) ||
          createFormData.dueDate,
        // Remove amount as it will be calculated on the backend
        amount: undefined,
      };

      // Create new product
      const response = await productApi.create(productData);
      if (response.success) {
        // Refresh the product list
        await fetchProducts();
        handleCloseCreateForm();
      } else {
        setError("Failed to create product");
      }
    } catch (error) {
      console.error("Create product error:", error);
      setError(handleApiError(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      setActionLoading(true);
      setError(null);

      // Convert CalendarDate to string for storage
      const productData = {
        ...editFormData,
        dueDate:
          dateUtils.dateValueToString(editFormData.dueDate) ||
          editFormData.dueDate,
        // Remove amount as it will be calculated on the backend
        amount: undefined,
      };

      // Update existing product
      const response = await productApi.update(editingProduct.id, productData);
      if (response.success) {
        // Refresh the product list
        await fetchProducts();
        handleCloseEditForm();
      } else {
        setError("Failed to update product");
      }
    } catch (error) {
      console.error("Update product error:", error);
      setError(handleApiError(error));
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    try {
      setEditingProduct(product);
      const formData = { ...product };

      // Safely convert date string back to DateValue
      if (product.dueDate && typeof product.dueDate === "string") {
        const convertedDate = dateUtils.stringToDateValue(product.dueDate);
        formData.dueDate = convertedDate || dateUtils.getToday();
      } else if (product.dueDate && typeof product.dueDate === "object") {
        formData.dueDate = product.dueDate;
      } else {
        formData.dueDate = dateUtils.getToday();
      }

      setEditFormData(formData);
      setShowEditForm(true);
    } catch (error) {
      console.error("Edit product error:", error);
      // Reset form to safe state if there's an error
      setEditFormData({
        type: "សាច់",
        name: "",
        dueDate: dateUtils.getToday(),
        quantity: "",
        price: "",
        amount: 0,
      });
    }
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      setActionLoading(true);
      setError(null);

      const response = await productApi.delete(productToDelete.id);
      if (response.success) {
        // Refresh the product list
        await fetchProducts();
        setShowDeleteConfirm(false);
        setProductToDelete(null);
      } else {
        setError("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete product error:", error);
      setError(handleApiError(error));
    } finally {
      setActionLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    setCreateFormData({
      type: "សាច់",
      name: "",
      dueDate: dateUtils.getToday(),
      quantity: "",
      price: "",
      amount: 0,
    });
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setEditingProduct(null);
    setEditFormData({
      type: "សាច់",
      name: "",
      dueDate: dateUtils.getToday(),
      quantity: "",
      price: "",
      amount: 0,
    });
  };

  const formatCurrency = (amount) => {
    return `${Math.round(amount).toLocaleString("en-US")} ៛`;
  };



  const getFilteredData = () => {
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

    return filtered;
  };

  const filteredData = getFilteredData();
  const totalAmount = filteredData.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalProducts = filteredData.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();

  const clearAllFilters = () => {
    setSelectedFilter("ទាំងអស់");
    setFilterText("");
    setCurrentPage(1); // Reset to first page when clearing filters
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-2 sm:p-3 lg:p-6 w-full min-w-0">
        {/* Enhanced Header */}
        <div className="mb-4">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardBody className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Title Section */}
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                    <Icons.Package />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      បញ្ជីទំនិញ
                    </h1>
                    <p className="text-gray-600 mt-1 text-sm">
                      ប្រព័ន្ធគ្រប់គ្រងទំនិញ និងស្តុកទំនិញ
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  color="primary"
                  size="md"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-sm"
                  onPress={() => setShowCreateForm(true)}
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
            <div className="p-3 sm:p-4 bg-white border-b border-gray-200">
              <div className="space-y-3">
                {/* Filter Categories */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icons.Filter />
                    <h3 className="text-sm sm:text-base font-medium text-gray-800">
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
                          className={`font-medium transition-all duration-200 text-xs px-2 sm:px-3 ${
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
                          {filter.name}
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="w-full">
                  <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-3">
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
                    size="sm"
                    className="w-full"
                    classNames={{
                      input: "text-xs placeholder:text-xs",
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

            {/* Error Message */}
            {error && (
              <div className="p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="mt-2 text-xs text-red-600 underline hover:text-red-800"
                    >
                      បិទសារ
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center p-8">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                  <div
                    className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <span className="text-gray-600 ml-2">
                    កំពុងទាញយកទិន្នន័យ...
                  </span>
                </div>
              </div>
            )}

            {/* Enhanced Table Section */}
            {!loading && (
              <div className="bg-white overflow-x-hidden">
                <Table
                  aria-label="Product inventory table"
                  removeWrapper={false}
                  className="w-full"
                  classNames={{
                    wrapper: "shadow-none w-full overflow-visible",
                    base: "w-full",
                    table: "w-full lg:table-auto table-fixed",
                    th: "bg-gray-100 text-gray-800 font-medium text-xs sm:text-sm lg:text-sm border-b-2 border-gray-200 group-hover:bg-gray-200 transition-colors px-1 sm:px-3 py-2",
                    td: "py-2 sm:py-3 text-xs sm:text-sm lg:text-sm border-b border-gray-100 px-1 sm:px-3",
                    tr: "hover:bg-gray-50 transition-colors duration-200",
                  }}

                >
                  <TableHeader>
                    {/* Category - Desktop Only */}
                    <TableColumn className="hidden lg:table-cell">
                      <span className="font-semibold text-gray-800">ប្រភេទ</span>
                    </TableColumn>

                    {/* Product Name - Always Visible */}
                    <TableColumn className="lg:w-auto w-[35%]">
                      <span className="font-semibold text-gray-800">ឈ្មោះទំនិញ</span>
                    </TableColumn>

                    {/* Date - Desktop Only */}
                    <TableColumn className="hidden lg:table-cell">
                      <span className="font-semibold text-gray-800">កាលបរិច្ឆេទ</span>
                    </TableColumn>

                    {/* Quantity - Always Visible */}
                    <TableColumn className="text-center lg:w-auto w-[14%]">
                      <span className="font-semibold text-gray-800">ចំនួន</span>
                    </TableColumn>

                    {/* Price - Always Visible */}
                    <TableColumn className="text-center lg:text-right lg:w-auto w-[32%]">
                      <span className="font-semibold text-gray-800">តម្លៃ</span>
                    </TableColumn>

                    {/* Amount - Desktop Only */}
                    <TableColumn className="hidden lg:table-cell text-right">
                      <span className="font-semibold text-gray-800">សរុប</span>
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
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                              {product.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-xs leading-tight">
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
                                <span className="font-medium text-gray-900 text-sm">
                                  {product.name}
                                </span>
                              }
                              description={
                                <span className="text-gray-600 text-xs">
                                  ផលិតផល
                                </span>
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
                            {product.dueDate || "N/A"}
                          </div>
                        </TableCell>

                        {/* Quantity - Always Visible */}
                        <TableCell className="text-center px-1">
                          <Chip
                            size="sm"
                            color="default"
                            variant="bordered"
                            className="font-medium min-w-6 px-1 text-xs"
                          >
                            {product.quantity}
                          </Chip>
                        </TableCell>

                        {/* Price - Always Visible */}
                        <TableCell className="text-center lg:text-right px-1 lg:px-4">
                          <span className="font-medium text-gray-900 text-xs">
                            {formatCurrency(product.price)}
                          </span>
                        </TableCell>

                        {/* Amount - Desktop Only */}
                        <TableCell className="hidden lg:table-cell text-right">
                          <span className="font-semibold text-sm text-emerald-600">
                            {formatCurrency(product.amount)}
                          </span>
                        </TableCell>

                        {/* Actions - Always Visible */}
                        <TableCell className="text-center px-1 lg:px-4">
                          <div className="flex items-center justify-center gap-0.5">
                            <Tooltip content="កែប្រែ" size="sm">
                              <Button
                                isIconOnly
                                size="sm"
                                color="primary"
                                variant="flat"
                                onPress={() => handleEditProduct(product)}
                                className="transition-all duration-200 hover:scale-105 min-w-6 h-6 lg:min-w-7 lg:h-7"
                              >
                                <Icons.Edit />
                              </Button>
                            </Tooltip>
                            <Tooltip content="លុប" color="danger" size="sm">
                              <Button
                                isIconOnly
                                size="sm"
                                color="danger"
                                variant="flat"
                                onPress={() => handleDeleteProduct(product)}
                                className="transition-all duration-200 hover:scale-105 min-w-6 h-6 lg:min-w-7 lg:h-7"
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
                  <div className="flex flex-col items-center justify-center p-3 sm:p-4 border-t border-gray-200 gap-3">
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
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Icons.Package />
                    </div>
                    <h3 className="text-base font-medium text-gray-600 mb-2">
                      រកមិនឃើញទំនិញ
                    </h3>
                    <p className="text-gray-500 mb-4 text-sm">
                      គ្មានទំនិញដែលត្រូវនឹងការស្វែងរករបស់អ្នក
                    </p>
                    <Button
                      color="primary"
                      variant="flat"
                      size="sm"
                      onPress={clearAllFilters}
                      startContent={<Icons.Clear />}
                      className="text-sm"
                    >
                      សម្អាតការត្រង
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Create Product Modal */}
        <Modal
          isOpen={showCreateForm}
          onOpenChange={setShowCreateForm}
          placement="top-center"
          size="2xl"
          scrollBehavior="normal"
          backdrop="blur"
          isDismissable={true}
          isKeyboardDismissDisabled={false}
          hideCloseButton={false}
          classNames={{
            backdrop: "bg-black/50",
            base: "border-none shadow-2xl mx-2 my-4 rounded-2xl w-[90vw] max-w-[500px] md:max-w-[600px] max-h-[85vh]",
            header:
              "border-b border-gray-200 rounded-t-2xl bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex-shrink-0",
            body: "px-6 py-6 flex-1 overflow-y-auto",
            footer:
              "border-t border-gray-200 bg-gray-50 px-6 py-4 flex-shrink-0 rounded-b-2xl",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex-shrink-0 shadow-md">
                        <Icons.Package />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 truncate">
                          បន្ថែមទំនិញថ្មី
                        </h2>
                      </div>
                    </div>
                  </div>
                </ModalHeader>

                <ModalBody>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCreateProduct();
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5">
                      {/* Type Selection */}
                      <div className="w-full space-y-2">
                        <Select
                          label="ប្រភេទទំនិញ"
                          placeholder="ជ្រើសរើសប្រភេទទំនិញ"
                          selectedKeys={
                            createFormData.type ? [createFormData.type] : []
                          }
                          onSelectionChange={(keys) => {
                            const selectedValue = Array.from(keys)[0];
                            handleCreateFormChange("type", selectedValue);
                          }}
                          isRequired={true}
                          variant="bordered"
                          size="lg"
                          radius="lg"
                          labelPlacement="outside"
                          classNames={{
                            base: "w-full",
                            trigger:
                              "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 data-[hover=true]:border-blue-400 data-[hover=true]:shadow-md data-[focus=true]:border-blue-500 data-[focus=true]:shadow-lg data-[open=true]:border-blue-500 data-[open=true]:shadow-lg",
                            label:
                              "text-base text-gray-700 mb-1",
                            value:
                              "text-base font-medium text-gray-900",
                            listbox: "rounded-lg text-base",
                            popoverContent:
                              "rounded-lg shadow-xl border-0 bg-white backdrop-blur-sm text-base",
                            listboxWrapper: "rounded-lg",
                          }}
                        >
                          {productTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              startContent={
                                <span className="text-xs sm:text-sm mr-1">
                                  {filters.find((f) => f.name === type)?.icon}
                                </span>
                              }
                              classNames={{
                                base: "rounded-lg my-0.5 data-[hover=true]:bg-blue-50 data-[selectable=true]:focus:bg-blue-100 data-[pressed=true]:opacity-70",
                                title:
                                  "text-base sm:text-sm font-medium text-gray-900",
                              }}
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      {/* Product Name */}
                      <div className="w-full space-y-2">
                        <Input
                          label="ឈ្មោះទំនិញ"
                          placeholder="បញ្ចូលឈ្មោះទំនិញរបស់អ្នក"
                          value={createFormData.name}
                          onValueChange={(value) =>
                            handleCreateFormChange("name", value)
                          }
                          isRequired
                          variant="bordered"
                          size="lg"
                          radius="lg"
                          labelPlacement="outside"
                          classNames={{
                            base: "w-full",
                            inputWrapper:
                              "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:shadow-lg data-[hover=true]:border-blue-400 data-[hover=true]:shadow-md",
                            label:
                              "text-base text-gray-700 mb-1",
                            input:
                              "text-base font-medium text-gray-900 placeholder:text-base placeholder:text-gray-400 placeholder:font-normal",
                          }}
                        />
                      </div>

                      {/* Due Date */}
                      <div className="w-full space-y-2">
                        <DatePicker
                          label="កាលបរិច្ឆេទ"
                          value={createFormData.dueDate}
                          onChange={(date) =>
                            handleCreateFormChange("dueDate", date)
                          }
                          isRequired
                          variant="bordered"
                          size="lg"
                          radius="lg"
                          labelPlacement="outside"
                          showMonthAndYearPickers
                          inert={false}
                          classNames={{
                            base: "w-full",
                            inputWrapper:
                              "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:shadow-lg data-[hover=true]:border-blue-400 data-[hover=true]:shadow-md",
                            label:
                              "text-base text-gray-700 mb-1",
                            input:
                              "text-base font-medium text-gray-900",
                            popoverContent:
                              "rounded-lg shadow-xl border-0 bg-white backdrop-blur-sm text-base",
                          }}
                        />
                      </div>

                      {/* Quantity and Price Row */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Quantity */}
                        <div className="w-full space-y-2">
                          <Input
                            type="text"
                            inputMode="numeric"
                            label="បរិមាណ"
                            placeholder="ចំនួន"
                            value={
                              createFormData.quantity === 0 ||
                              createFormData.quantity === ""
                                ? ""
                                : createFormData.quantity?.toString()
                            }
                            onValueChange={(value) => {
                              handleCreateFormChange(
                                "quantity",
                                value === "" ? "" : value
                              );
                            }}
                            onFocus={() => {
                              if (
                                createFormData.quantity === 0 ||
                                createFormData.quantity === 1
                              ) {
                                handleCreateFormChange("quantity", "");
                              }
                            }}
                            isRequired
                            variant="bordered"
                            size="lg"
                            radius="lg"
                            labelPlacement="outside"
                            classNames={{
                              base: "w-full",
                              inputWrapper:
                                "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:shadow-lg data-[hover=true]:border-blue-400 data-[hover=true]:shadow-md",
                              label:
                                "text-base text-gray-700 mb-1",
                              input:
                                "text-base font-medium text-gray-900 placeholder:text-base placeholder:text-gray-400 placeholder:font-normal",
                            }}
                          />
                        </div>

                        {/* Price */}
                        <div className="w-full space-y-2">
                          <Input
                            type="text"
                            inputMode="decimal"
                            label="តម្លៃ"
                            placeholder="តម្លៃ"
                            value={
                              createFormData.price === 0 ||
                              createFormData.price === ""
                                ? ""
                                : createFormData.price?.toString()
                            }
                            onValueChange={(value) => {
                              handleCreateFormChange(
                                "price",
                                value === "" ? "" : value
                              );
                            }}
                            onFocus={() => {
                              if (createFormData.price === 0) {
                                handleCreateFormChange("price", "");
                              }
                            }}
                            isRequired
                            variant="bordered"
                            size="lg"
                            radius="lg"
                            labelPlacement="outside"
                            endContent={
                              <div className="flex items-center">
                                <span className="text-gray-600 font-medium text-base bg-gray-100 px-2 py-1 rounded-md">
                                  ៛
                                </span>
                              </div>
                            }
                            classNames={{
                              base: "w-full",
                              inputWrapper:
                                "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 group-data-[focus=true]:border-blue-500 group-data-[focus=true]:shadow-lg data-[hover=true]:border-blue-400 data-[hover=true]:shadow-md",
                              label:
                                "text-base text-gray-700 mb-1",
                              input:
                                "text-base font-medium text-gray-900 placeholder:text-base placeholder:text-gray-400 placeholder:font-normal",
                            }}
                          />
                        </div>
                      </div>

                      {/* Amount Display */}
                      {createFormData.amount > 0 && (
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-emerald-700">
                              សរុបទាំងអស់
                            </span>
                            <span className="text-sm sm:text-lg font-bold text-emerald-600">
                              {formatCurrency(createFormData.amount)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <div className="flex gap-4 w-full">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      size="lg"
                      radius="lg"
                      className="flex-1 text-base font-medium h-12 min-w-0 hover:bg-red-50"
                    >
                      បោះបង់
                    </Button>
                    <Button
                      color="primary"
                      size="lg"
                      radius="lg"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-base h-12 min-w-0 shadow-md hover:shadow-lg transition-all duration-200"
                      onPress={() => {
                        try {
                          handleCreateProduct();
                        } catch (error) {
                          console.error("Submit error:", error);
                        }
                      }}
                      isDisabled={
                        actionLoading ||
                        !createFormData.name ||
                        !createFormData.dueDate ||
                        !createFormData.quantity ||
                        createFormData.quantity === "" ||
                        Number(createFormData.quantity) <= 0 ||
                        !createFormData.price ||
                        createFormData.price === "" ||
                        Number(createFormData.price) <= 0
                      }
                      isLoading={actionLoading}
                    >
                      <span className="truncate">
                        {actionLoading ? "កំពុងបន្ថែម..." : "បន្ថែមទំនិញ"}
                      </span>
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Edit Product Modal */}
        <Modal
          isOpen={showEditForm}
          onOpenChange={setShowEditForm}
          placement="top-center"
          size="2xl"
          scrollBehavior="normal"
          backdrop="blur"
          isDismissable={true}
          isKeyboardDismissDisabled={false}
          hideCloseButton={false}
          classNames={{
            backdrop: "bg-black/50",
            base: "border-none shadow-2xl mx-2 my-4 rounded-2xl w-[90vw] max-w-[500px] md:max-w-[600px] max-h-[85vh]",
            header:
              "border-b border-gray-200 rounded-t-2xl bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 flex-shrink-0",
            body: "px-6 py-6 flex-1 overflow-y-auto",
            footer:
              "border-t border-gray-200 bg-gray-50 px-6 py-4 flex-shrink-0 rounded-b-2xl",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white flex-shrink-0 shadow-md">
                        <Icons.Edit />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 truncate">
                          កែប្រែទំនិញ
                        </h2>
                      </div>
                    </div>
                  </div>
                </ModalHeader>

                <ModalBody>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateProduct();
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5">
                      {/* Type Selection */}
                      <div className="w-full space-y-2">
                        <Select
                          label="ប្រភេទទំនិញ"
                          placeholder="ជ្រើសរើសប្រភេទទំនិញ"
                          selectedKeys={
                            editFormData.type ? [editFormData.type] : []
                          }
                          onSelectionChange={(keys) => {
                            const selectedValue = Array.from(keys)[0];
                            handleEditFormChange("type", selectedValue);
                          }}
                          isRequired={true}
                          variant="bordered"
                          size="lg"
                          radius="lg"
                          labelPlacement="outside"
                          classNames={{
                            base: "w-full",
                            trigger:
                              "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 data-[hover=true]:border-amber-400 data-[hover=true]:shadow-md data-[focus=true]:border-amber-500 data-[focus=true]:shadow-lg data-[open=true]:border-amber-500 data-[open=true]:shadow-lg",
                            label:
                              "text-base text-gray-700 mb-1",
                            value:
                              "text-base font-medium text-gray-900",
                            listbox: "rounded-lg text-base",
                            popoverContent:
                              "rounded-lg shadow-xl border-0 bg-white backdrop-blur-sm text-base",
                            listboxWrapper: "rounded-lg",
                          }}
                        >
                          {productTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              startContent={
                                <span className="text-xs sm:text-sm mr-1">
                                  {filters.find((f) => f.name === type)?.icon}
                                </span>
                              }
                              classNames={{
                                base: "rounded-lg my-0.5 data-[hover=true]:bg-amber-50 data-[selectable=true]:focus:bg-amber-100 data-[pressed=true]:opacity-70",
                                title:
                                  "text-xs sm:text-sm font-medium text-gray-900",
                              }}
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      {/* Product Name */}
                      <div className="w-full space-y-2">
                        <Input
                          label="ឈ្មោះទំនិញ"
                          placeholder="បញ្ចូលឈ្មោះទំនិញរបស់អ្នក"
                          value={editFormData.name}
                          onValueChange={(value) =>
                            handleEditFormChange("name", value)
                          }
                          isRequired
                          variant="bordered"
                          size="lg"
                          radius="lg"
                          labelPlacement="outside"
                          classNames={{
                            base: "w-full",
                            inputWrapper:
                              "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:shadow-lg data-[hover=true]:border-amber-400 data-[hover=true]:shadow-md",
                            label:
                              "text-base text-gray-700 mb-1",
                            input:
                              "text-base font-medium text-gray-900 placeholder:text-base placeholder:text-gray-400 placeholder:font-normal",
                          }}
                        />
                      </div>

                      {/* Due Date */}
                      <div className="w-full space-y-2">
                        <DatePicker
                          label="កាលបរិច្ឆេទ"
                          value={editFormData.dueDate}
                          onChange={(date) =>
                            handleEditFormChange("dueDate", date)
                          }
                          isRequired
                          variant="bordered"
                          size="lg"
                          radius="lg"
                          labelPlacement="outside"
                          showMonthAndYearPickers
                          inert={false}
                          classNames={{
                            base: "w-full",
                            inputWrapper:
                              "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:shadow-lg data-[hover=true]:border-amber-400 data-[hover=true]:shadow-md",
                            label:
                              "text-base text-gray-700 mb-1",
                            input:
                              "text-base font-medium text-gray-900",
                            popoverContent:
                              "rounded-lg shadow-xl border-0 bg-white backdrop-blur-sm text-base",
                          }}
                        />
                      </div>

                      {/* Quantity and Price Row */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Quantity */}
                        <div className="w-full space-y-2">
                          <Input
                            type="text"
                            inputMode="numeric"
                            label="បរិមាណ"
                            placeholder="ចំនួន"
                            value={
                              editFormData.quantity === 0 ||
                              editFormData.quantity === ""
                                ? ""
                                : editFormData.quantity?.toString()
                            }
                            onValueChange={(value) => {
                              handleEditFormChange(
                                "quantity",
                                value === "" ? "" : value
                              );
                            }}
                            onFocus={() => {
                              if (
                                editFormData.quantity === 0 ||
                                editFormData.quantity === 1
                              ) {
                                handleEditFormChange("quantity", "");
                              }
                            }}
                            isRequired
                            variant="bordered"
                            size="lg"
                            radius="lg"
                            labelPlacement="outside"
                            classNames={{
                              base: "w-full",
                              inputWrapper:
                                "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:shadow-lg data-[hover=true]:border-amber-400 data-[hover=true]:shadow-md",
                              label:
                                "text-base text-gray-700 mb-1",
                              input:
                                "text-base font-medium text-gray-900 placeholder:text-base placeholder:text-gray-400 placeholder:font-normal",
                            }}
                          />
                        </div>

                        {/* Price */}
                        <div className="w-full space-y-2">
                          <Input
                            type="text"
                            inputMode="decimal"
                            label="តម្លៃ"
                            placeholder="តម្លៃ"
                            value={
                              editFormData.price === 0 ||
                              editFormData.price === ""
                                ? ""
                                : editFormData.price?.toString()
                            }
                            onValueChange={(value) => {
                              handleEditFormChange(
                                "price",
                                value === "" ? "" : value
                              );
                            }}
                            onFocus={() => {
                              if (editFormData.price === 0) {
                                handleEditFormChange("price", "");
                              }
                            }}
                            isRequired
                            variant="bordered"
                            size="lg"
                            radius="lg"
                            labelPlacement="outside"
                            endContent={
                              <div className="flex items-center">
                                <span className="text-gray-600 font-medium text-base bg-gray-100 px-2 py-1 rounded-md">
                                  ៛
                                </span>
                              </div>
                            }
                            classNames={{
                              base: "w-full",
                              inputWrapper:
                                "bg-white shadow-sm border-2 border-gray-200 h-12 rounded-lg transition-all duration-200 group-data-[focus=true]:border-amber-500 group-data-[focus=true]:shadow-lg data-[hover=true]:border-amber-400 data-[hover=true]:shadow-md",
                              label:
                                "text-base text-gray-700 mb-1",
                              input:
                                "text-base font-medium text-gray-900 placeholder:text-base placeholder:text-gray-400 placeholder:font-normal",
                            }}
                          />
                        </div>
                      </div>

                      {/* Amount Display */}
                      {editFormData.amount > 0 && (
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-medium text-emerald-700">
                              សរុបទាំងអស់
                            </span>
                            <span className="text-sm sm:text-lg font-bold text-emerald-600">
                              {formatCurrency(editFormData.amount)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <div className="flex gap-4 w-full">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      size="lg"
                      radius="lg"
                      className="flex-1 text-base font-medium h-12 min-w-0 hover:bg-red-50"
                    >
                      បោះបង់
                    </Button>
                    <Button
                      color="warning"
                      size="lg"
                      radius="lg"
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 font-semibold text-base h-12 min-w-0 shadow-md hover:shadow-lg transition-all duration-200"
                      onPress={() => {
                        try {
                          handleUpdateProduct();
                        } catch (error) {
                          console.error("Submit error:", error);
                        }
                      }}
                      isDisabled={
                        actionLoading ||
                        !editFormData.name ||
                        !editFormData.dueDate ||
                        !editFormData.quantity ||
                        editFormData.quantity === "" ||
                        Number(editFormData.quantity) <= 0 ||
                        !editFormData.price ||
                        editFormData.price === "" ||
                        Number(editFormData.price) <= 0
                      }
                      isLoading={actionLoading}
                    >
                      <span className="truncate">
                        {actionLoading
                          ? "កំពុងរក្សាទុក..."
                          : "រក្សាទុកការកែប្រែ"}
                      </span>
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Minimal Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
          placement="top-center"
          size="sm"
          scrollBehavior="normal"
          backdrop="blur"
          isDismissable={true}
          isKeyboardDismissDisabled={false}
          hideCloseButton={true}
          classNames={{
            backdrop: "bg-black/50",
            base: "border-none shadow-2xl mx-2 my-4 rounded-2xl w-[90vw] max-w-[400px] max-h-[85vh] bg-white",
            header: "p-0",
            body: "p-0",
            footer: "p-0",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <div className="p-4 sm:p-6">
                    {/* Header with close button */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          លុបទំនិញ?
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">
                          មិនអាចត្រឡប់វិញបាន
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                      </button>
                    </div>

                    {/* Product Card */}
                    {productToDelete && (
                      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-xs sm:text-sm">
                              {productToDelete.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                              {productToDelete.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs sm:text-sm text-gray-500">
                                {productToDelete.type}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-300">•</span>
                              <span className="text-xs sm:text-sm font-medium text-emerald-600">
                                {formatCurrency(productToDelete.amount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full">
                      <Button
                        color="danger"
                        variant="light"
                        onPress={onClose}
                        size="md"
                        radius="md"
                        className="flex-1 text-sm font-medium h-12 sm:h-10 min-w-0 hover:bg-red-50"
                      >
                        បោះបង់
                      </Button>
                      <Button
                        color="danger"
                        size="md"
                        radius="md"
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 font-semibold text-sm h-12 sm:h-10 min-w-0 shadow-md hover:shadow-lg transition-all duration-200"
                        onPress={confirmDelete}
                        isDisabled={actionLoading}
                        isLoading={actionLoading}
                      >
                        <span className="truncate">
                          {actionLoading ? "កំពុងលុប..." : "លុបទំនិញ"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
      </div>
    </div>
  );
}
