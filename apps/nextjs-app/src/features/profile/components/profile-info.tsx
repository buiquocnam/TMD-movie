'use client';

import { User } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Profile } from '../api/get-profile';

type ProfileInfoProps = {
  profile: Profile;
};

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Avatar and Basic Info */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              {profile.avatar.tmdb.avatar_path ? (
                <img src={profile.avatar.tmdb.avatar_path} alt="Avatar" className="w-10 h-10 rounded-full" />
              ) : (
                <User className="w-10 h-10 text-blue-600" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {profile.username}
            </h2>
            <p className="text-gray-600">{profile.include_adult ? 'Adult' : 'Not Adult'}</p>
            </div>
        </div>


        {/* Profile Details */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <div className="text-gray-900">{profile.name || 'Unknown Name'}</div>
            </div>
          
          </div>
        </div>
      </div>
    </Card>
  );
};
