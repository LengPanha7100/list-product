'use client'

import { useState } from "react";
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
  Chip
} from '@nextui-org/react';

export default function Home() {
  const [invoiceData, setInvoiceData] = useState([
    { id: 1, type: 'សាច់', name: 'សាច់គោ', dueDate: '2024-12-20', quantity: 2, price: 15000, amount: 30000 },
    { id: 2, type: 'សាច់', name: 'សាច់ជ្រូក', dueDate: '2024-12-19', quantity: 3, price: 12000, amount: 36000 },
    { id: 3, type: 'បន្លែ', name: 'ស្ពៃ', dueDate: '2024-12-21', quantity: 5, price: 2000, amount: 10000 },
    { id: 4, type: 'បន្លែ', name: 'ត្រកួន', dueDate: '2024-12-20', quantity: 4, price: 1500, amount: 6000 },
    { id: 5, type: 'ផ្លែឈើ', name: 'ចែក', dueDate: '2024-12-22', quantity: 10, price: 3000, amount: 30000 },
    { id: 6, type: 'ផ្លែឈើ', name: 'ស្វាយ', dueDate: '2024-12-18', quantity: 8, price: 4000, amount: 32000 },
    { id: 7, type: 'គ្រឿងសមុទ្រ', name: 'ត្រីទូណា', dueDate: '2024-12-20', quantity: 2, price: 18000, amount: 36000 },
    { id: 8, type: 'គ្រឿងសមុទ្រ', name: 'បង្កង', dueDate: '2024-12-19', quantity: 15, price: 2500, amount: 37500 },
    { id: 9, type: 'ប្រចាំថ្ងៃ', name: 'អង្ករ', dueDate: '2024-12-25', quantity: 25, price: 3500, amount: 87500 },
    { id: 10, type: 'ប្រចាំថ្ងៃ', name: 'ប្រេង', dueDate: '2024-12-23', quantity: 3, price: 8000, amount: 24000 },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    type: 'សាច់',
    name: '',
    dueDate: '',
    quantity: 1,
    price: 0,
    amount: 0
  });

  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ទាំងអស់');

  const productTypes = ['សាច់', 'បន្លែ', 'ផ្លែឈើ', 'គ្រឿងសមុទ្រ', 'ប្រចាំថ្ងៃ'];
  
  // Calculate filter counts dynamically
  const getFilterCounts = () => {
    const counts = {
      'ទាំងអស់': invoiceData.length,
      'សាច់': 0,
      'បន្លែ': 0,
      'ផ្លែឈើ': 0,
      'គ្រឿងសមុទ្រ': 0,
      'ប្រចាំថ្ងៃ': 0
    };
    
    invoiceData.forEach(item => {
      if (counts.hasOwnProperty(item.type)) {
        counts[item.type]++;
      }
    });
    
    return counts;
  };

  const filterCounts = getFilterCounts();
  const filters = [
    { name: 'ទាំងអស់', count: filterCounts['ទាំងអស់'], icon: '📦' },
    { name: 'សាច់', count: filterCounts['សាច់'], icon: '🥩' },
    { name: 'បន្លែ', count: filterCounts['បន្លែ'], icon: '🥬' },
    { name: 'ផ្លែឈើ', count: filterCounts['ផ្លែឈើ'], icon: '🍎' },
    { name: 'គ្រឿងសមុទ្រ', count: filterCounts['គ្រឿងសមុទ្រ'], icon: '🐟' },
    { name: 'ប្រចាំថ្ងៃ', count: filterCounts['ប្រចាំថ្ងៃ'], icon: '🛒' },
  ];

  const handleFormChange = (field, value) => {
    const newFormData = { ...formData, [field]: field === 'quantity' || field === 'price' ? Number(value) || 0 : value };
    if (field === 'quantity' || field === 'price') {
      newFormData.amount = newFormData.quantity * newFormData.price;
    }
    setFormData(newFormData);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setInvoiceData(invoiceData.map(item => 
        item.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id, amount: formData.quantity * formData.price }
          : item
      ));
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
        amount: formData.quantity * formData.price
      };
      setInvoiceData([...invoiceData, newProduct]);
    }
    handleCloseForm();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddForm(true);
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setInvoiceData(invoiceData.filter(item => item.id !== productToDelete.id));
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({
      type: 'សាច់',
      name: '',
      dueDate: '',
      quantity: 1,
      price: 0,
      amount: 0
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      'តាងមាន12': 'text-red-600 bg-red-50 border-red-200',
      'ក្រូនីស': 'text-blue-600 bg-blue-50 border-blue-200',
      'បុកកេត': 'text-green-600 bg-green-50 border-green-200',
      'ប្រុយវិនេ': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'រុបវិនេ2': 'text-purple-600 bg-purple-50 border-purple-200',
      'ប្រុយវិន2': 'text-indigo-600 bg-indigo-50 border-indigo-200'
    };
    return colors[type] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatCurrency = (amount) => {
    return `${Math.round(amount).toLocaleString('en-US')} ៛`;
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortedData = () => {
    let filtered = [...invoiceData];
    
    // Filter by type first
    if (selectedFilter && selectedFilter !== 'ទាំងអស់') {
      filtered = filtered.filter(item => {
        return item.type === selectedFilter;
      });
    }
    
    // Then filter by text search
    if (filterText && filterText.trim()) {
      filtered = filtered.filter(item => 
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
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  };

  const sortedData = getSortedData();
  const totalAmount = sortedData.reduce((sum, item) => sum + item.amount, 0);
  
  const clearAllFilters = () => {
    setSelectedFilter('ទាំងអស់');
    setFilterText('');
    setSortBy('');
    setSortOrder('asc');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                បញ្ជីទំនិញ
          </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                ប្រព័ន្ធគ្រប់គ្រងទំនិញ និងស្តុកទំនិញ
          </p>
        </div>

            <Button
              color="primary"
              size="md"
              className="bg-blue-600 text-white font-medium shadow-sm w-full sm:w-auto"
              onPress={() => setShowAddForm(true)}
              startContent={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              <span className="hidden sm:inline">បន្ថែមទំនិញថ្មី</span>
              <span className="sm:hidden">បន្ថែម</span>
            </Button>
          </div>
        </div>

        <Card className="shadow-sm border border-gray-200">
          <CardBody className="p-0">


            {/* Filter */}
            <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Filter Buttons */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">ប្រភេទទំនិញ</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                      <Button
                        key={filter.name}
                        variant={selectedFilter === filter.name ? "solid" : "bordered"}
                        color={selectedFilter === filter.name ? "primary" : "default"}
                        size="sm"
                        className={`text-sm font-medium transition-colors ${
                          selectedFilter === filter.name
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-gray-300 text-gray-700"
                        }`}
                        onPress={() => setSelectedFilter(filter.name)}
                      >
                        {filter.name} ({filter.count})
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="w-full lg:max-w-sm">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">ស្វែងរក</h3>
                  <Input
                    type="text"
                    placeholder="ស្វែងរកតាមឈ្មោះទំនិញ..."
                    value={filterText}
                    onValueChange={setFilterText}
                    className="w-full"
                    size="md"
                    classNames={{
                      input: "text-sm",
                      inputWrapper: "border border-gray-300 focus-within:border-blue-600 bg-white"
                    }}
                    startContent={
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  />
                </div>
              </div>
                    </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white">
              <Table
                aria-label="Product table"
                classNames={{
                  wrapper: "max-h-[400px] overflow-y-auto shadow-none scrollbar-hide",
                  th: "bg-gray-50 text-gray-900 font-medium text-sm border-b border-gray-200 sticky top-0 z-10",
                  td: "py-4 text-sm border-b border-gray-100",
                  tr: ""
                }}
                topContent={
                  <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        {selectedFilter === 'ទាំងអស់' ? 'ទំនិញទាំងអស់' : `${selectedFilter}`}
                      </h2>
                      <div className="text-sm text-gray-600">
                        <span>ចំនួនសរុប: {sortedData.length} ផលិតផល</span>
                        {filterText && (
                          <span className="ml-3 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            ស្វែងរក: "{filterText}"
                          </span>
                        )}
                    </div>
                    </div>
                    {(selectedFilter !== 'ទាំងអស់' || filterText) && (
                      <Button
                        size="sm"
                        variant="solid"
                        color="default"
                        onPress={clearAllFilters}
                        className="text-sm bg-gray-600 text-white"
                        startContent={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                        }
                      >
                        សម្អាត
                      </Button>
                    )}
                    </div>
                }
              >
                <TableHeader>
                  <TableColumn className="hidden lg:table-cell w-20">ប្រភេទ</TableColumn>
                  <TableColumn>ឈ្មោះ</TableColumn>
                  <TableColumn className="hidden lg:table-cell">កាលបរិច្ឆេទ</TableColumn>
                  <TableColumn className="w-16 sm:w-20 text-center">ចំនួន</TableColumn>
                  <TableColumn className="text-right">តម្លៃ</TableColumn>
                  <TableColumn className="hidden lg:table-cell text-right">សរុប</TableColumn>
                  <TableColumn className="w-20 sm:w-24 text-center">សកម្មភាព</TableColumn>
                </TableHeader>
                <TableBody>
                  {sortedData.map((invoice) => (
                    <TableRow key={invoice.id}>
                                            <TableCell className="hidden lg:table-cell">
                        <Chip 
                          size="sm" 
                          variant="flat"
                          className="text-xs font-medium"
                          color={
                            invoice.type === 'សាច់' ? 'danger' :
                            invoice.type === 'បន្លែ' ? 'success' :
                            invoice.type === 'ផ្លែឈើ' ? 'warning' :
                            invoice.type === 'គ្រឿងសមុទ្រ' ? 'primary' :
                            invoice.type === 'ប្រចាំថ្ងៃ' ? 'secondary' : 'default'
                          }
                        >
                          {invoice.type}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">
                          {invoice.name}
                          <div className="lg:hidden text-xs text-gray-500 mt-1">
                            {invoice.type}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-gray-700">
                        {invoice.dueDate}
                      </TableCell>
                      <TableCell className="text-center font-medium text-gray-900">
                        {invoice.quantity}
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900">
                        {formatCurrency(invoice.price)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-right font-semibold text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <Button
                            isIconOnly
                            size="sm"
                            color="primary"
                            variant="light"
                            onPress={() => handleEditProduct(invoice)}
                            className="min-w-7 h-7 sm:min-w-8 sm:h-8 text-blue-600 -mr-3 sm:-mr-2 hover:bg-transparent"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="light"
                            onPress={() => handleDeleteProduct(invoice)}
                            className="min-w-7 h-7 sm:min-w-8 sm:h-8 text-red-600 hover:bg-transparent"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>

        {/* Add Product Form Modal */}
        <Modal 
          isOpen={showAddForm} 
          onOpenChange={setShowAddForm}
          placement="center"
          size="lg"
          scrollBehavior="inside"
          classNames={{
            backdrop: "bg-black/50 backdrop-blur-sm",
            base: "border-none shadow-2xl mx-2 sm:mx-0",
            header: "border-b-[1px] border-gray-200 px-4 sm:px-6 py-4",
            body: "px-4 sm:px-6 py-4 sm:py-6",
            footer: "border-t-[1px] border-gray-200 px-4 sm:px-6 py-3 sm:py-4"
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                    {editingProduct ? 'កែប្រែទំនិញ' : 'បន្ថែមទំនិញថ្មី'}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal">
                    {editingProduct ? 'កែប្រែព័ត៌មានទំនិញរបស់អ្នក' : 'បំពេញព័ត៌មានទំនិញថ្មីរបស់អ្នក'}
                  </p>
                </ModalHeader>
                
                <ModalBody>
                  <form onSubmit={handleAddProduct} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Type Dropdown */}
                      <Select
                        label="ប្រភេទ"
                        placeholder="ជ្រើសរើសប្រភេទទំនិញ"
                        selectedKeys={formData.type ? [formData.type] : []}
                        onSelectionChange={(keys) => {
                          const selectedValue = Array.from(keys)[0];
                          handleFormChange('type', selectedValue);
                        }}
                        isRequired
                        variant="bordered"
                        classNames={{
                          base: "max-w-full",
                          trigger: "min-h-unit-12",
                          label: "text-slate-700 font-semibold"
                        }}
                        startContent={
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        }
                      >
                        {productTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </Select>

                      {/* Name Input */}
                      <Input
                        type="text"
                        label="ឈ្មោះ"
                        placeholder="បញ្ចូលឈ្មោះទំនិញ"
                        value={formData.name}
                        onValueChange={(value) => handleFormChange('name', value)}
                        isRequired
                        variant="bordered"
                        classNames={{
                          base: "max-w-full",
                          label: "text-slate-700 font-semibold"
                        }}
                        startContent={
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        }
                      />

                                             {/* Due Date Input */}
                       <Input
                         type="date"
                         label="កាលបរិច្ឆេទ"
                         value={formData.dueDate}
                         onValueChange={(value) => handleFormChange('dueDate', value)}
                         isRequired
                         variant="bordered"
                         classNames={{
                           base: "max-w-full",
                           label: "text-slate-700 font-semibold"
                         }}
                         startContent={
                           <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                           </svg>
                         }
                       />

                      {/* Quantity Input */}
                      <Input
                        type="number"
                        label="បរិមាណ"
                        placeholder="បញ្ចូលបរិមាណ"
                        value={formData.quantity?.toString() || ''}
                        onValueChange={(value) => handleFormChange('quantity', value)}
                        min="1"
                        isRequired
                        variant="bordered"
                        classNames={{
                          base: "max-w-full",
                          label: "text-slate-700 font-semibold"
                        }}
                        startContent={
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                        }
                      />

                      {/* Price Input */}
                      <Input
                        type="number"
                        label="តម្លៃ"
                        placeholder="បញ្ចូលតម្លៃ"
                        value={formData.price?.toString() || ''}
                        onValueChange={(value) => handleFormChange('price', value)}
                        min="0"
                        step="0.01"
                        isRequired
                        variant="bordered"
                        classNames={{
                          base: "max-w-full",
                          label: "text-slate-700 font-semibold"
                        }}
                        startContent={
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        }
                        endContent={
                          <span className="text-slate-500 font-semibold text-sm">៛</span>
                        }
                      />

                      {/* Amount (Read-only) */}
                      <div className="sm:col-span-2">
                        <Input
                          label="សរុប"
                          value={formatCurrency(formData.amount)}
                          isReadOnly
                          variant="bordered"
                          classNames={{
                            base: "max-w-full",
                            input: "text-indigo-900 font-bold text-base sm:text-lg",
                            inputWrapper: "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200",
                            label: "text-slate-700 font-semibold"
                          }}
                          startContent={
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          }
                          endContent={
                            <Chip size="sm" color="primary" variant="flat" className="text-xs">
                              AUTO
                            </Chip>
                          }
                        />
                        <Card className="mt-3" shadow="sm">
                          <CardBody className="py-2 sm:py-3">
                            <div className="flex items-center text-xs text-slate-600 mb-2">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              គណនាស្វ័យប្រវត្តិ
                            </div>
                            <div className="text-xs sm:text-sm font-semibold text-slate-800 break-words">
                              {formData.quantity} × {formData.price.toLocaleString('en-US')} ៛ = <span className="text-emerald-600">{formData.amount.toLocaleString('en-US')} ៛</span>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </form>
                </ModalBody>
                
                <ModalFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button 
                    color="danger" 
                    variant="light" 
                    onPress={onClose}
                    className="w-full sm:w-auto order-2 sm:order-1"
                    size="md"
                  >
                    បោះបង់
                  </Button>
                  <Button 
                    color="primary" 
                    className="w-full sm:w-auto order-1 sm:order-2"
                    size="md"
                    onPress={() => {
                      const form = document.querySelector('form');
                      if (form) {
                        form.requestSubmit();
                      }
                    }}
                  >
                    <span className="hidden sm:inline">{editingProduct ? 'រក្សាទុកការកែប្រែ' : 'បន្ថែមទំនិញ'}</span>
                    <span className="sm:hidden">{editingProduct ? 'រក្សាទុក' : 'បន្ថែម'}</span>
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Delete Confirmation Modal */}
                <Modal 
          isOpen={showDeleteConfirm} 
          onOpenChange={setShowDeleteConfirm}
          placement="center"
          size="sm"
          classNames={{
            backdrop: "bg-black/50 backdrop-blur-sm",
            base: "border-none shadow-2xl mx-4 sm:mx-0",
            header: "border-b-[1px] border-gray-200 px-4 sm:px-6 py-4",
            body: "px-4 sm:px-6 py-4 sm:py-6",
            footer: "border-t-[1px] border-gray-200 px-4 sm:px-6 py-3 sm:py-4"
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto sm:mx-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">បញ្ជាក់ការលុប</h3>
                    <p className="text-slate-600 text-xs sm:text-sm font-normal">តើអ្នកពិតជាចង់លុបទំនិញនេះមែនទេ?</p>
                  </div>
                </ModalHeader>
                
                <ModalBody>
                  {productToDelete && (
                    <Card shadow="sm">
                      <CardBody className="py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <Chip 
                            size="sm" 
                            variant="flat"
                            className="text-xs"
                            color={
                              productToDelete.type === 'សាច់' ? 'danger' :
                              productToDelete.type === 'បន្លែ' ? 'success' :
                              productToDelete.type === 'ផ្លែឈើ' ? 'warning' :
                              productToDelete.type === 'គ្រឿងសមុទ្រ' ? 'primary' :
                              productToDelete.type === 'ប្រចាំថ្ងៃ' ? 'secondary' : 'default'
                            }
                          >
                            {productToDelete.type}
                          </Chip>
                          <div className="text-center sm:text-left">
                            <p className="font-medium text-slate-900 text-sm break-words">{productToDelete.name}</p>
                            <p className="text-xs sm:text-sm text-slate-600">{formatCurrency(productToDelete.amount)}</p>
          </div>
        </div>
                      </CardBody>
                    </Card>
                  )}
                </ModalBody>
                
                <ModalFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button 
                    color="default" 
                    variant="light" 
                    onPress={onClose}
                    className="w-full sm:w-auto order-2 sm:order-1"
                    size="md"
                  >
                    បោះបង់
                  </Button>
                  <Button 
                    color="danger" 
                    onPress={confirmDelete}
                    className="w-full sm:w-auto order-1 sm:order-2"
                    size="md"
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
