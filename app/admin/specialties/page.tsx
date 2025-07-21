"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Stethoscope, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  ArrowLeft,
  MoreHorizontal,
  Filter,
  SortAsc,
  SortDesc,
  Shield,
  Power,
  PowerOff
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { useAuth } from '@/contexts/AuthContext';
import { useSpecialties, useCreateSpecialty, useUpdateSpecialty, useDeleteSpecialty, useToggleSpecialtyStatus } from '@/hooks/useSpecialty';
import { SearchFilter } from '@/types/api';
import { toast } from '@/hooks/use-toast';

export default function SpecialtiesPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, hasRole } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Form states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<any>(null);
  const [viewingSpecialty, setViewingSpecialty] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy, setSortBy] = useState('name');
  const [sortDescending, setSortDescending] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Route protection for admin
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/');
        return;
      }
      if (!hasRole('Admin')) {
        router.push('/dashboard');
        return;
      }
    }
  }, [isAuthenticated, authLoading, hasRole, router]);

  // Search filter
  const filter: SearchFilter = {
    searchTerm: searchTerm || undefined,
    pageNumber: currentPage,
    pageSize,
    sortBy,
    sortDescending
  };

  // API hooks
  const { data: specialtiesData, loading: isLoading, refetch } = useSpecialties(filter);
  const createSpecialtyMutation = useCreateSpecialty();
  const updateSpecialtyMutation = useUpdateSpecialty();
  const deleteSpecialtyMutation = useDeleteSpecialty();
  const toggleStatusMutation = useToggleSpecialtyStatus();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Specialty name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      await createSpecialtyMutation.mutate(formData);
      toast({
        title: "Success",
        description: "Specialty created successfully"
      });
      setIsCreateDialogOpen(false);
      setFormData({ name: '', description: '' });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create specialty",
        variant: "destructive"
      });
    }
  };

  const handleEdit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Specialty name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      await updateSpecialtyMutation.mutate({
        id: editingSpecialty.specialtyId,
        data: formData
      });
      toast({
        title: "Success",
        description: "Specialty updated successfully"
      });
      setIsEditDialogOpen(false);
      setEditingSpecialty(null);
      setFormData({ name: '', description: '' });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update specialty",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (specialtyId: number) => {
    try {
      await deleteSpecialtyMutation.mutate(specialtyId);
      toast({
        title: "Success",
        description: "Specialty deleted successfully"
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete specialty",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = async (specialtyId: number, currentStatus: boolean) => {
    try {
      await toggleStatusMutation.mutate({
        id: specialtyId,
        isActive: !currentStatus
      });
      toast({
        title: "Success",
        description: `Specialty ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update specialty status",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (specialty: any) => {
    setEditingSpecialty(specialty);
    setFormData({
      name: specialty.name,
      description: specialty.description || ''
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (specialty: any) => {
    setViewingSpecialty(specialty);
    setIsViewDialogOpen(true);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDescending(!sortDescending);
    } else {
      setSortBy(field);
      setSortDescending(false);
    }
  };

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated or not admin
  if (!isAuthenticated || !hasRole('Admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar onDesktopToggle={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <TopBar 
          onMenuClick={() => {}}
          title="Specialty Management"
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 pt-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Button
                variant="ghost"
                onClick={() => router.push('/admin')}
                className="mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Specialty Management</h1>
              <p className="text-gray-600">Manage medical specialties for member registration</p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Specialty
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Specialty</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Specialty Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g., Cardiology"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description of the specialty"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreate}
                    disabled={createSpecialtyMutation.loading}
                  >
                    {createSpecialtyMutation.loading ? 'Creating...' : 'Create Specialty'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search specialties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleSort('name')}
                    className="flex items-center"
                  >
                    Name
                    {sortBy === 'name' && (
                      sortDescending ? <SortDesc className="w-4 h-4 ml-1" /> : <SortAsc className="w-4 h-4 ml-1" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSort('isActive')}
                    className="flex items-center"
                  >
                    Status
                    {sortBy === 'isActive' && (
                      sortDescending ? <SortDesc className="w-4 h-4 ml-1" /> : <SortAsc className="w-4 h-4 ml-1" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specialties Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="w-5 h-5 mr-2" />
                Medical Specialties
                {specialtiesData && (
                  <Badge variant="secondary" className="ml-2">
                    {specialtiesData.totalCount} total
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : specialtiesData?.items && specialtiesData.items.length > 0 ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Specialty Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {specialtiesData.items.map((specialty) => (
                        <TableRow key={specialty.specialtyId}>
                          <TableCell className="font-medium">
                            {specialty.name}
                          </TableCell>
                          <TableCell className="max-w-md">
                            <p className="text-sm text-gray-600 truncate">
                              {specialty.description || 'No description provided'}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge variant={specialty.isActive ? "default" : "secondary"}>
                              {specialty.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openViewDialog(specialty)}
                                title="View specialty details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(specialty)}
                                title="Edit specialty"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleStatus(specialty.specialtyId, specialty.isActive)}
                                disabled={toggleStatusMutation.loading}
                                title={specialty.isActive ? "Deactivate specialty" : "Activate specialty"}
                                className={specialty.isActive ? "text-green-600 hover:text-green-700" : "text-gray-400 hover:text-gray-600"}
                              >
                                {specialty.isActive ? (
                                  <Power className="w-4 h-4" />
                                ) : (
                                  <PowerOff className="w-4 h-4" />
                                )}
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" title="Delete specialty">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Specialty</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete &quot;{specialty.name}&quot;? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(specialty.specialtyId)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {specialtiesData.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-gray-600">
                        Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, specialtiesData.totalCount)} of {specialtiesData.totalCount} results
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, specialtiesData.totalPages))}
                          disabled={currentPage === specialtiesData.totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No specialties found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first specialty.'}
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Specialty
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Specialty</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Specialty Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Cardiology"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the specialty"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEdit}
              disabled={updateSpecialtyMutation.loading}
            >
              {updateSpecialtyMutation.loading ? 'Updating...' : 'Update Specialty'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Stethoscope className="w-5 h-5 mr-2" />
              Specialty Details
            </DialogTitle>
          </DialogHeader>
          {viewingSpecialty && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Specialty Name</Label>
                <p className="text-lg font-semibold text-gray-900 mt-1">{viewingSpecialty.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <p className="text-gray-600 mt-1">
                  {viewingSpecialty.description || 'No description provided'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <div className="mt-1">
                  <Badge variant={viewingSpecialty.isActive ? "default" : "secondary"}>
                    {viewingSpecialty.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Specialty ID</Label>
                <p className="text-gray-600 mt-1">{viewingSpecialty.specialtyId}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 