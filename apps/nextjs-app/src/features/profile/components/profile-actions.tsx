'use client';

import { Edit, Settings, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const ProfileActions = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h4 className="font-medium text-gray-900">Update Profile</h4>
            <p className="text-sm text-gray-600">Change your personal information</p>
          </div>
          <Button variant="outline" size="sm" disabled>
            <Edit className="w-4 h-4 mr-2" />
            Update Profile
          </Button>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <h4 className="font-medium text-gray-900">Change Password</h4>
            <p className="text-sm text-gray-600">Update your account password</p>
          </div>
          <Button variant="outline" size="sm" disabled>
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        </div>
        
        <div className="flex items-center justify-between py-3">
          <div>
            <h4 className="font-medium text-gray-900">Account Settings</h4>
            <p className="text-sm text-gray-600">Manage your account preferences</p>
          </div>
          <Button variant="outline" size="sm" disabled>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </Card>
  );
};
