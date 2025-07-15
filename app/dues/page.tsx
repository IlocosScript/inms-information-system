"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  CreditCard, 
  CheckCircle, 
  Clock, 
  Download, 
  QrCode,
  Smartphone,
  Building,
  Calendar,
  Receipt,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface DuesRecord {
  id: number;
  type: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
  paymentMethod?: string;
  receiptNumber?: string;
  year: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  fee: number;
  description: string;
}

export default function DuesPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const duesRecords: DuesRecord[] = [
    {
      id: 1,
      type: 'Annual Dues',
      description: 'INMS Annual Membership Dues 2024',
      amount: 2000,
      dueDate: '2024-03-31',
      status: 'paid',
      paymentDate: '2024-01-15',
      paymentMethod: 'GCash',
      receiptNumber: 'INMS-2024-001234',
      year: 2024
    },
    {
      id: 2,
      type: 'PMA Dues',
      description: 'Philippine Medical Association Dues 2024',
      amount: 1500,
      dueDate: '2024-04-30',
      status: 'paid',
      paymentDate: '2024-02-10',
      paymentMethod: 'Bank Transfer',
      receiptNumber: 'PMA-2024-005678',
      year: 2024
    },
    {
      id: 3,
      type: 'Event Fee',
      description: 'Cardiology Symposium 2024 Registration',
      amount: 1500,
      dueDate: '2024-02-10',
      status: 'pending',
      year: 2024
    },
    {
      id: 4,
      type: 'Merchandise',
      description: 'INMS T-Shirt (Size: Large)',
      amount: 500,
      dueDate: '2024-02-20',
      status: 'pending',
      year: 2024
    },
    {
      id: 5,
      type: 'Annual Dues',
      description: 'INMS Annual Membership Dues 2023',
      amount: 1800,
      dueDate: '2023-03-31',
      status: 'paid',
      paymentDate: '2023-01-20',
      paymentMethod: 'Credit Card',
      receiptNumber: 'INMS-2023-001234',
      year: 2023
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'gcash',
      name: 'GCash',
      icon: Smartphone,
      fee: 15,
      description: 'Pay via GCash mobile wallet'
    },
    {
      id: 'maya',
      name: 'Maya (PayMaya)',
      icon: Smartphone,
      fee: 15,
      description: 'Pay via Maya mobile wallet'
    },
    {
      id: 'credit_card',
      name: 'Credit Card',
      icon: CreditCard,
      fee: 25,
      description: 'Visa, Mastercard, JCB accepted'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: Building,
      fee: 10,
      description: 'Direct bank transfer'
    }
  ];

  const filteredRecords = duesRecords.filter(record => 
    selectedYear === 'all' || record.year.toString() === selectedYear
  );

  const totalPaid = filteredRecords
    .filter(record => record.status === 'paid')
    .reduce((sum, record) => sum + record.amount, 0);

  const totalPending = filteredRecords
    .filter(record => record.status === 'pending')
    .reduce((sum, record) => sum + record.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handlePayment = (recordId: number) => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }
    
    // Simulate payment process
    alert(`Processing payment via ${paymentMethods.find(p => p.id === selectedPayment)?.name}...`);
  };

  const downloadReceipt = (receiptNumber: string) => {
    // Simulate receipt download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Receipt-${receiptNumber}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Dues & Payments"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-600">Manage your membership dues and payments</p>
            </div>
            <div className="flex items-center space-x-4">
              <Label htmlFor="year">Filter by Year:</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Paid ({selectedYear})</p>
                    <p className="text-2xl font-bold text-green-600">₱{totalPaid.toLocaleString()}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Payments</p>
                    <p className="text-2xl font-bold text-yellow-600">₱{totalPending.toLocaleString()}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <Badge className={totalPending === 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {totalPending === 0 ? 'All Paid' : 'Has Pending'}
                    </Badge>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Dues Records */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Dues & Payment Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{record.type}</p>
                              <p className="text-sm text-gray-600">{record.description}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ₱{record.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {record.dueDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(record.status)}>
                              <div className="flex items-center">
                                {getStatusIcon(record.status)}
                                <span className="ml-1">{record.status}</span>
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {record.status === 'paid' ? (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => downloadReceipt(record.receiptNumber!)}
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  Receipt
                                </Button>
                              ) : (
                                <Button 
                                  size="sm"
                                  onClick={() => handlePayment(record.id)}
                                >
                                  Pay Now
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedPayment === method.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <method.icon className="w-5 h-5 mr-3 text-gray-600" />
                            <div>
                              <p className="font-medium text-sm">{method.name}</p>
                              <p className="text-xs text-gray-600">{method.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">Fee: ₱{method.fee}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* INMS Bank QR Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="w-5 h-5 mr-2" />
                    INMS Bank QR
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-gray-100 p-6 rounded-lg mb-4">
                    <QrCode className="w-32 h-32 mx-auto text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Scan this QR code to pay directly to INMS bank account
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p><strong>Bank:</strong> BPI Laoag Branch</p>
                    <p><strong>Account:</strong> INMS Official Account</p>
                    <p><strong>Account No:</strong> 1234-5678-90</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Receipt className="w-5 h-5 mr-2" />
                    Payment Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium mb-1">Online Payment:</h4>
                      <ol className="list-decimal list-inside text-gray-600 space-y-1">
                        <li>Select payment method</li>
                        <li>Click "Pay Now" on pending item</li>
                        <li>Complete payment process</li>
                        <li>Receipt will be emailed to you</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Bank Transfer:</h4>
                      <p className="text-gray-600">
                        Send payment screenshot to admin@inms.org for verification.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}