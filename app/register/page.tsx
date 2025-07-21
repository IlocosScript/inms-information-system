"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building,
  Stethoscope,
  Shield,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { authService } from '@/services/authService';
import { memberService } from '@/services/memberService';
import { useMutation } from '@/hooks/useApi';
import { RegisterRequest, CreateMemberRequest, MembershipType } from '@/types/api';
import { useSpecialties, useHospitals } from '@/hooks/useLookup';

const steps = [
  { id: 1, title: 'Personal Information', icon: User },
  { id: 2, title: 'Professional Details', icon: Stethoscope },
  { id: 3, title: 'Emergency Contact', icon: Phone },
  { id: 4, title: 'Account Setup', icon: Shield },
  { id: 5, title: 'Review & Submit', icon: CheckCircle },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    address: '',
    pmaNumber: '',
    licenseNumber: '',
    specialtyId: '',
    subspecialtyId: '',
    hospitalId: '',
    clinicAddress: '',
    clinicHours: '',
    clinicPhone: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    emergencyContactEmail: '',
    password: '',
    confirmPassword: '',
  });

  const { specialties, loading: specialtiesLoading } = useSpecialties();
  const { hospitals, loading: hospitalsLoading } = useHospitals();
  const registerMutation = useMutation(authService.register);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    // Use local date methods to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.birthday) errors.push('Birthday is required');
    
    // Validate date format
    if (formData.birthday) {
      const date = new Date(formData.birthday);
      if (isNaN(date.getTime())) {
        errors.push('Please enter a valid date of birth');
      } else if (date > new Date()) {
        errors.push('Date of birth cannot be in the future');
      }
    }
    if (!formData.gender) errors.push('Gender is required');
    if (!formData.address.trim()) errors.push('Address is required');
    if (!formData.pmaNumber.trim()) errors.push('PMA number is required');
    if (!formData.licenseNumber.trim()) errors.push('License number is required');
    if (!formData.specialtyId) errors.push('Specialty is required');
    if (!formData.emergencyContactName.trim()) errors.push('Emergency contact name is required');
    if (!formData.emergencyContactRelationship) errors.push('Emergency contact relationship is required');
    if (!formData.emergencyContactPhone.trim()) errors.push('Emergency contact phone is required');
    if (!formData.password) errors.push('Password is required');
    if (!formData.confirmPassword) errors.push('Password confirmation is required');
    
    if (formData.password !== formData.confirmPassword) {
      errors.push('Passwords do not match');
    }
    
    if (formData.password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    return errors;
  };

  const onSubmit = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      alert(`Please fix the following errors:\n${validationErrors.join('\n')}`);
      return;
    }

    // First, create the member record
    const memberData: CreateMemberRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      birthday: formData.birthday ? new Date(formData.birthday + 'T00:00:00.000Z').toISOString() : '',
      gender: formData.gender,
      address: formData.address,
      pmaNumber: formData.pmaNumber,
      licenseNumber: formData.licenseNumber,
      specialtyId: parseInt(formData.specialtyId),
      subspecialtyId: formData.subspecialtyId ? parseInt(formData.subspecialtyId) : 0,
      hospitalId: formData.hospitalId ? parseInt(formData.hospitalId) : 0,
      clinicAddress: formData.clinicAddress || '',
      clinicHours: formData.clinicHours || '',
      clinicPhone: formData.clinicPhone || '',
      membershipType: MembershipType.Regular,
      emergencyContact: {
        name: formData.emergencyContactName,
        relationship: formData.emergencyContactRelationship,
        phone: formData.emergencyContactPhone,
        email: formData.emergencyContactEmail || '',
      },
    };

    try {
      // Create member first
      const member = await memberService.createMember(memberData);
      const memberId = member.memberId;

      // Then create the user account
      const registerData: RegisterRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phoneNumber: formData.phone,
        memberId: memberId,
      };

      await registerMutation.mutate(registerData);
      router.push('/register/success');
    } catch (error: any) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Request data:', memberData);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors.join(', ');
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Check for specific backend date error
      if (errorMessage.includes('DateTime with Kind=Unspecified') || errorMessage.includes('timestamp with time zone')) {
        errorMessage = 'There was an issue with the date format. Please try again or contact support.';
      }
      
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://static.wixstatic.com/media/d26da8_84af75d85a764d6284abc56355731316~mv2.png/v1/fill/w_214,h_206,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d26da8_84af75d85a764d6284abc56355731316~mv2.png"
              alt="INMS Logo"
              className="w-16 h-16 mr-4 object-contain"
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800">Join INMS</h1>
              <p className="text-lg text-gray-600">Become a member of the Ilocos Norte Medical Society</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-center mt-2 text-sm text-gray-600">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
          </p>
        </div>

        {/* Registration Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 mr-2" })}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName"
                        placeholder="Enter your first name" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName"
                        placeholder="Enter your last name" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="Enter your email address" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone"
                      placeholder="Enter your phone number" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="birthday">Date of Birth *</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Select 
                            value={formData.birthday ? new Date(formData.birthday + 'T00:00:00').getDate().toString() : ''} 
                            onValueChange={(day) => {
                              const currentDate = formData.birthday ? new Date(formData.birthday + 'T00:00:00') : new Date();
                              const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(day));
                              handleInputChange('birthday', formatDate(newDate));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-black">
                              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <SelectItem key={day} value={day.toString()}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Select 
                            value={formData.birthday ? (new Date(formData.birthday + 'T00:00:00').getMonth() + 1).toString() : ''} 
                            onValueChange={(month) => {
                              const currentDate = formData.birthday ? new Date(formData.birthday + 'T00:00:00') : new Date();
                              const newDate = new Date(currentDate.getFullYear(), parseInt(month) - 1, currentDate.getDate());
                              handleInputChange('birthday', formatDate(newDate));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-black">
                              {[
                                'January', 'February', 'March', 'April', 'May', 'June',
                                'July', 'August', 'September', 'October', 'November', 'December'
                              ].map((month, index) => (
                                <SelectItem key={index + 1} value={(index + 1).toString()}>
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Select 
                            value={formData.birthday ? new Date(formData.birthday + 'T00:00:00').getFullYear().toString() : ''} 
                            onValueChange={(year) => {
                              const currentDate = formData.birthday ? new Date(formData.birthday + 'T00:00:00') : new Date();
                              const newDate = new Date(parseInt(year), currentDate.getMonth(), currentDate.getDate());
                              handleInputChange('birthday', formatDate(newDate));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-black">
                              {Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select onValueChange={(value) => handleInputChange('gender', value)} value={formData.gender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Complete Address *</Label>
                    <Textarea 
                      id="address"
                      placeholder="Enter your complete address" 
                      rows={3}
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Professional Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pmaNumber">PMA Number *</Label>
                      <Input 
                        id="pmaNumber"
                        placeholder="Enter your PMA number" 
                        value={formData.pmaNumber}
                        onChange={(e) => handleInputChange('pmaNumber', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">License Number *</Label>
                      <Input 
                        id="licenseNumber"
                        placeholder="Enter your license number" 
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="specialtyId">Medical Specialty *</Label>
                      <Select onValueChange={(value) => handleInputChange('specialtyId', value)} value={formData.specialtyId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your specialty" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          {specialtiesLoading ? (
                            <SelectItem value="" disabled>Loading specialties...</SelectItem>
                          ) : (
                            specialties.map((specialty) => (
                              <SelectItem key={specialty.specialtyId} value={specialty.specialtyId.toString()}>
                                {specialty.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subspecialtyId">Subspecialty (Optional)</Label>
                      <Select onValueChange={(value) => handleInputChange('subspecialtyId', value)} value={formData.subspecialtyId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subspecialty" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="1">Interventional Cardiology</SelectItem>
                          <SelectItem value="2">Pediatric Cardiology</SelectItem>
                          <SelectItem value="3">Neonatology</SelectItem>
                          <SelectItem value="4">Cardiothoracic Surgery</SelectItem>
                          <SelectItem value="5">Maternal-Fetal Medicine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hospitalId">Primary Hospital (Optional)</Label>
                                          <Select onValueChange={(value) => handleInputChange('hospitalId', value)} value={formData.hospitalId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary hospital" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          {hospitalsLoading ? (
                            <SelectItem value="" disabled>Loading hospitals...</SelectItem>
                          ) : (
                            hospitals.map((hospital) => (
                              <SelectItem key={hospital.hospitalId} value={hospital.hospitalId.toString()}>
                                {hospital.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clinicAddress">Clinic Address (Optional)</Label>
                      <Textarea 
                        id="clinicAddress"
                        placeholder="Enter your clinic address" 
                        rows={2}
                        value={formData.clinicAddress}
                        onChange={(e) => handleInputChange('clinicAddress', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="clinicPhone">Clinic Phone (Optional)</Label>
                      <Input 
                        id="clinicPhone"
                        placeholder="Enter clinic phone number" 
                        value={formData.clinicPhone}
                        onChange={(e) => handleInputChange('clinicPhone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="clinicHours">Clinic Hours (Optional)</Label>
                    <Input 
                      id="clinicHours"
                      placeholder="e.g., Mon-Fri 9AM-5PM" 
                      value={formData.clinicHours}
                      onChange={(e) => handleInputChange('clinicHours', e.target.value)}
                    />
                  </div>
                </div>
              )}

                              {/* Step 3: Emergency Contact */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Emergency Contact Information</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Please provide contact information for someone we can reach in case of emergency.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                        <Input 
                          id="emergencyContactName"
                          placeholder="Enter emergency contact name" 
                          value={formData.emergencyContactName}
                          onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
                                              <Select onValueChange={(value) => handleInputChange('emergencyContactRelationship', value)} value={formData.emergencyContactRelationship}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <SelectItem value="Spouse">Spouse</SelectItem>
                          <SelectItem value="Parent">Parent</SelectItem>
                          <SelectItem value="Sibling">Sibling</SelectItem>
                          <SelectItem value="Child">Child</SelectItem>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="Colleague">Colleague</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                        <Input 
                          id="emergencyContactPhone"
                          placeholder="Enter emergency contact phone" 
                          value={formData.emergencyContactPhone}
                          onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContactEmail">Emergency Contact Email</Label>
                        <Input 
                          id="emergencyContactEmail"
                          type="email"
                          placeholder="Enter emergency contact email (optional)" 
                          value={formData.emergencyContactEmail}
                          onChange={(e) => handleInputChange('emergencyContactEmail', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Account Setup */}
                {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Password Requirements</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Your password must be at least 8 characters long and contain uppercase, lowercase, and numeric characters.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input 
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password" 
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input 
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password" 
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

                              {/* Step 5: Review & Submit */}
                {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Review Your Information</p>
                        <p className="text-sm text-green-700 mt-1">
                          Please review all the information below before submitting your registration.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Personal Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</div>
                        <div><span className="font-medium">Email:</span> {formData.email}</div>
                        <div><span className="font-medium">Phone:</span> {formData.phone}</div>
                        <div><span className="font-medium">Birthday:</span> {formData.birthday}</div>
                        <div><span className="font-medium">Gender:</span> {formData.gender}</div>
                        <div><span className="font-medium">Address:</span> {formData.address}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Stethoscope className="w-4 h-4 mr-2" />
                        Professional Information
                      </h3>
                                              <div className="space-y-2 text-sm">
                          <div><span className="font-medium">PMA Number:</span> {formData.pmaNumber}</div>
                          <div><span className="font-medium">License Number:</span> {formData.licenseNumber}</div>
                          <div><span className="font-medium">Specialty:</span> {specialties.find(s => s.specialtyId.toString() === formData.specialtyId)?.name || formData.specialtyId}</div>
                          {formData.subspecialtyId && (
                            <div><span className="font-medium">Subspecialty:</span> {formData.subspecialtyId}</div>
                          )}
                          {formData.hospitalId && (
                            <div><span className="font-medium">Hospital:</span> {hospitals.find(h => h.hospitalId.toString() === formData.hospitalId)?.name || formData.hospitalId}</div>
                          )}
                                                    {formData.clinicAddress && (
                            <div><span className="font-medium">Clinic Address:</span> {formData.clinicAddress}</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Emergency Contact
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Name:</span> {formData.emergencyContactName}</div>
                          <div><span className="font-medium">Relationship:</span> {formData.emergencyContactRelationship}</div>
                          <div><span className="font-medium">Phone:</span> {formData.emergencyContactPhone}</div>
                          {formData.emergencyContactEmail && (
                            <div><span className="font-medium">Email:</span> {formData.emergencyContactEmail}</div>
                          )}
                        </div>
                      </div>
                    </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Important Notice</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          Your registration will be reviewed by the INMS administration. You will receive an email notification once your account is activated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={onSubmit}
                    disabled={registerMutation.loading}
                    className="flex items-center"
                  >
                    {registerMutation.loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Submit Registration
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => router.push('/')}
              className="text-green-600 hover:underline font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 