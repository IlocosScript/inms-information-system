"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DebugPage() {
  const { user, isAuthenticated, hasRole, refreshUser } = useAuth();
  const [testResults, setTestResults] = useState<any>({});

  const runRoleTests = () => {
    const results = {
      isAuthenticated,
      userRoles: user?.roles || [],
      hasMemberRole: hasRole('Member'),
      hasAdminRole: hasRole('Admin'),
      hasSuperAdminRole: hasRole('SuperAdmin'),
      userActive: user?.isActive,
      userEmail: user?.email,
      userId: user?.id,
    };
    
    setTestResults(results);
    console.log('Role Test Results:', results);
  };

  useEffect(() => {
    runRoleTests();
  }, [user, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Authentication Debug</h1>
        
        <div className="grid gap-6">
          {/* Current User Info */}
          <Card>
            <CardHeader>
              <CardTitle>Current User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Authenticated:</strong> 
                  <Badge className={isAuthenticated ? "bg-green-100 text-green-700 ml-2" : "bg-red-100 text-red-700 ml-2"}>
                    {isAuthenticated ? "Yes" : "No"}
                  </Badge>
                </div>
                
                {user && (
                  <>
                    <div><strong>User ID:</strong> {user.id}</div>
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>Full Name:</strong> {user.fullName}</div>
                    <div><strong>Active:</strong> 
                      <Badge className={user.isActive ? "bg-green-100 text-green-700 ml-2" : "bg-red-100 text-red-700 ml-2"}>
                        {user.isActive ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div><strong>Roles:</strong> 
                      <div className="mt-2 space-x-2">
                        {user.roles?.map((role, index) => (
                          <Badge key={index} variant="outline">{role}</Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role Tests */}
          <Card>
            <CardHeader>
              <CardTitle>Role Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Has Member Role:</strong> 
                  <Badge className={testResults.hasMemberRole ? "bg-green-100 text-green-700 ml-2" : "bg-red-100 text-red-700 ml-2"}>
                    {testResults.hasMemberRole ? "Yes" : "No"}
                  </Badge>
                </div>
                
                <div>
                  <strong>Has Admin Role:</strong> 
                  <Badge className={testResults.hasAdminRole ? "bg-green-100 text-green-700 ml-2" : "bg-red-100 text-red-700 ml-2"}>
                    {testResults.hasAdminRole ? "Yes" : "No"}
                  </Badge>
                </div>
                
                <div>
                  <strong>Has SuperAdmin Role:</strong> 
                  <Badge className={testResults.hasSuperAdminRole ? "bg-green-100 text-green-700 ml-2" : "bg-red-100 text-red-700 ml-2"}>
                    {testResults.hasSuperAdminRole ? "Yes" : "No"}
                  </Badge>
                </div>
                
                <Button onClick={runRoleTests} className="mt-4">
                  Run Tests Again
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-x-4">
                <Button onClick={refreshUser}>
                  Refresh User Data
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    console.log('Current User:', user);
                    console.log('Auth State:', { isAuthenticated, hasRole: hasRole('Member') });
                  }}
                >
                  Log to Console
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Raw Data */}
          <Card>
            <CardHeader>
              <CardTitle>Raw Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify({ user, testResults }, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 