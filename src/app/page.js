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
      const date = new Date(dateString + 'T00:00:00');
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [formData, setFormData] = useState({
    type: "សាច់",
    name: "",
    dueDate: dateUtils.getToday(),
    quantity: "",
    price: "",
    amount: 0,
  });

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
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
        setError('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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

  const handleFormChange = (field, value) => {
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

      const newFormData = { ...formData, [field]: processedValue };

      // Only calculate amount if both quantity and price are valid numbers
      if (field === "quantity" || field === "price") {
        const qty = field === "quantity" ? processedValue : formData.quantity;
        const price = field === "price" ? processedValue : formData.price;
        
        if (qty !== "" && price !== "" && !isNaN(qty) && !isNaN(price)) {
          newFormData.amount = Number(qty) * Number(price);
        } else {
          newFormData.amount = 0;
        }
      }

      setFormData(newFormData);
    } catch (error) {
      console.error("Form change error:", error);
      // Keep the previous value if there's an error
    }
  };

  const handleAddProduct = async () => {
    try {
      setActionLoading(true);
      setError(null);
      
      // Prevent zoom on form submission by blurring active element
      if (document.activeElement) {
        document.activeElement.blur();
      }
      
      // Force viewport scale to 1 (prevent zoom)
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      }
      
      // Convert CalendarDate to string for storage
      const productData = {
        ...formData,
        dueDate: dateUtils.dateValueToString(formData.dueDate) || formData.dueDate,
        // Remove amount as it will be calculated on the backend
        amount: undefined,
      };

      if (editingProduct) {
        // Update existing product
        const response = await productApi.update(editingProduct.id, productData);
        if (response.success) {
          // Refresh the product list
          await fetchProducts();
          handleCloseForm();
      } else {
          setError('Failed to update product');
        }
      } else {
        // Create new product
        const response = await productApi.create(productData);
        if (response.success) {
          // Refresh the product list
          await fetchProducts();
      handleCloseForm();
        } else {
          setError('Failed to create product');
        }
      }
    } catch (error) {
      console.error("Add/Update product error:", error);
      setError(handleApiError(error));
    } finally {
      setActionLoading(false);
      
      // Ensure focus is removed from any input to prevent zoom
      if (document.activeElement && document.activeElement.tagName !== 'BODY') {
        document.activeElement.blur();
      }
    }
  };

  const handleEditProduct = (product) => {
    try {
      setEditingProduct(product);
      const editFormData = { ...product };

      // Safely convert date string back to DateValue
      if (product.dueDate && typeof product.dueDate === "string") {
        const convertedDate = dateUtils.stringToDateValue(product.dueDate);
        editFormData.dueDate = convertedDate || dateUtils.getToday();
      } else if (product.dueDate && typeof product.dueDate === "object") {
        editFormData.dueDate = product.dueDate;
      } else {
        editFormData.dueDate = dateUtils.getToday();
      }

      setFormData(editFormData);
      setShowAddForm(true);
    } catch (error) {
      console.error("Edit product error:", error);
      // Reset form to safe state if there's an error
      setFormData({
        type: "សាច់",
        name: "",
        dueDate: dateUtils.getToday(),
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
        setError('Failed to delete product');
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

  const handleCloseForm = () => {
    // Prevent zoom when closing form
    if (document.activeElement) {
      document.activeElement.blur();
    }
    
    // Force viewport reset
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    }
    
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({
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
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <span className="text-gray-600 ml-2">កំពុងទាញយកទិន្នន័យ...</span>
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
                topContent={
                  (sortBy) ? (
                    <div className="p-3 sm:p-4 bg-white border-b border-gray-200">
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="flat"
                          color="default"
                          onPress={clearAllFilters}
                          className="font-medium text-xs"
                          startContent={<Icons.Clear />}
                        >
                          សម្អាត
                        </Button>
                      </div>
                    </div>
                  ) : null
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
                              <span className="text-gray-600 text-xs">ផលិតផល</span>
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

        {/* Enhanced Add/Edit Product Modal - Consistent Size for Both Modes */}
        <Modal
          isOpen={showAddForm}
          onOpenChange={setShowAddForm}
          placement="center"
          size="md"
          scrollBehavior="inside"
          backdrop="blur"
          isDismissable={true}
          isKeyboardDismissDisabled={false}
          hideCloseButton={false}
          classNames={{
            backdrop: "bg-black/60",
            base: "border-none shadow-2xl rounded-xl w-[90vw] h-auto max-w-[90vw] max-h-[75vh] mx-4 my-auto md:w-[500px] md:h-auto md:max-w-[500px] md:max-h-[75vh]",
            header: "border-b border-gray-200 rounded-t-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-3 flex-shrink-0",
            body: "py-3 px-3 flex-shrink-0",
            footer: "border-t border-gray-200 bg-gray-50 p-3 flex-shrink-0 rounded-b-xl",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex-shrink-0">
                  <div className="flex items-center gap-3 [@media(width:428px)]:gap-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white [@media(width:428px)]:p-1.5 flex-shrink-0">
                      <Icons.Package />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-bold text-gray-900 truncate">
                        {editingProduct ? "កែប្រែទំនិញ" : "បន្ថែមទំនិញថ្មី"}
                      </h2>
                      <p className="text-gray-600 text-sm truncate">
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
                    className="space-y-2"
                  >
                    <div className="grid grid-cols-1 gap-2">
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
                          size="sm"
                          classNames={{
                            trigger: "bg-white shadow-sm h-10 rounded-xl",
                            label: "text-xs",
                            value: "text-xs",
                            listbox: "text-xs",
                            popoverContent: "text-xs",
                          }}
                        >
                          {productTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              startContent={
                                <span className="text-xs">
                                  {filters.find((f) => f.name === type)?.icon}
                                </span>
                              }
                              className="text-xs"
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
                          size="sm"
                          classNames={{
                            inputWrapper: "bg-white shadow-sm h-10 rounded-xl",
                            label: "text-xs",
                            input: "text-xs placeholder:text-xs",
                          }}
                        />

                        {/* Due Date */}
                        <DatePicker
                          label="កាលបរិច្ឆេទ"
                          value={formData.dueDate}
                          onChange={(date) => handleFormChange("dueDate", date)}
                          isRequired
                          variant="bordered"
                          size="sm"
                          showMonthAndYearPickers
                          inert={false}
                          classNames={{
                            base: "bg-white",
                            inputWrapper: "bg-white shadow-sm border-gray-300 focus-within:border-blue-500 h-10 rounded-xl",
                            label: "text-xs",
                            input: "text-xs",
                            popoverContent: "text-xs",
                          }}
                        />

                        {/* Quantity */}
                        <Input
                          type="number"
                          label="បរិមាណ"
                          placeholder="បញ្ចូលបរិមាណ"
                          value={formData.quantity === 0 || formData.quantity === "" ? "" : formData.quantity?.toString()}
                          onValueChange={(value) => {
                            handleFormChange("quantity", value === "" ? "" : value);
                          }}
                          onFocus={() => {
                            if (formData.quantity === 0 || formData.quantity === 1) {
                              handleFormChange("quantity", "");
                          }
                          }}
                          min="1"
                          isRequired
                          variant="bordered"
                          size="sm"
                          classNames={{
                            inputWrapper: "bg-white shadow-sm h-10 rounded-xl",
                            label: "text-xs",
                            input: "text-xs placeholder:text-xs",
                          }}
                        />

                        {/* Price */}
                        <Input
                          type="number"
                          label="តម្លៃ"
                          placeholder="បញ្ចូលតម្លៃ"
                          value={formData.price === 0 || formData.price === "" ? "" : formData.price?.toString()}
                          onValueChange={(value) => {
                            handleFormChange("price", value === "" ? "" : value);
                          }}
                          onFocus={() => {
                            if (formData.price === 0) {
                              handleFormChange("price", "");
                          }
                          }}
                          min="0"
                          step="0.01"
                          isRequired
                          variant="bordered"
                          size="sm"
                          endContent={
                            <span className="text-gray-600 font-medium text-xs">៛</span>
                          }
                          classNames={{
                            inputWrapper: "bg-white shadow-sm h-10 rounded-xl",
                            label: "text-xs",
                            input: "text-xs placeholder:text-xs",
                          }}
                        />
                      </div>
                    </form>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      size="sm"
                      className="text-sm h-9 min-w-[80px] rounded-xl"
                    >
                      បោះបង់
                    </Button>
                    <Button 
                      color="primary" 
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-sm h-9 min-w-[100px] rounded-xl"
                      onPress={() => {
                        try {
                          handleAddProduct();
                        } catch (error) {
                          console.error("Submit error:", error);
                        }
                      }}
                      isDisabled={
                        actionLoading ||
                        !formData.name ||
                        !formData.dueDate ||
                        !formData.quantity || 
                        formData.quantity === "" || 
                        Number(formData.quantity) <= 0 ||
                        !formData.price || 
                        formData.price === "" || 
                        Number(formData.price) <= 0
                      }
                      isLoading={actionLoading}
                    >
                      <span className="truncate">
                        {actionLoading 
                          ? (editingProduct ? "កំពុងរក្សាទុក..." : "កំពុងបន្ថែម...") 
                          : (editingProduct ? "រក្សាទុកការកែប្រែ" : "បន្ថែមទំនិញ")
                        }
                      </span>
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* Minimal Delete Confirmation Modal */}
          <Modal
            isOpen={showDeleteConfirm}
            onOpenChange={setShowDeleteConfirm}
            placement="center"
            backdrop="blur"
            isDismissable={true}
            isKeyboardDismissDisabled={false}
            hideCloseButton={true}
            classNames={{
              backdrop: "bg-black/30",
              base: "border-none shadow-xl rounded-3xl w-[85vw] max-w-[350px] mx-4 my-auto bg-white",
              header: "p-0",
              body: "p-0",
              footer: "p-0",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody>
                    <div className="p-6">
                      {/* Header with close button */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            លុបទំនិញ?
                          </h3>
                          <p className="text-gray-500 text-sm mt-1">
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
                              <span className="text-blue-600 font-semibold text-sm">
                                {productToDelete.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">
                                {productToDelete.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">
                                  {productToDelete.type}
                                </span>
                                <span className="text-xs text-gray-300">•</span>
                                <span className="text-xs font-medium text-emerald-600">
                                  {formatCurrency(productToDelete.amount)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="flat"
                          onPress={onClose}
                          className="flex-1 bg-gray-100 text-gray-700 rounded-2xl h-12 font-medium hover:bg-gray-200"
                        >
                          បោះបង់
                        </Button>
                        <Button
                          color="danger"
                          onPress={confirmDelete}
                          className="flex-1 bg-red-500 text-white rounded-2xl h-12 font-medium hover:bg-red-600"
                          isDisabled={actionLoading}
                          isLoading={actionLoading}
                        >
                          {actionLoading ? "កំពុងលុប..." : "លុប"}
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
