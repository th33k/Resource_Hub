import React, { useState } from 'react';
import { SettingsLayout } from './SettingsLayout';
import { Toggle, Select, Button } from './FormElements';
import { Eye, Share2, Lock, UserX } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    dataSharing: true,
    activityStatus: true,
    thirdPartyAccess: false,
  });

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Privacy settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  return (
    <SettingsLayout
      title="Privacy Settings"
      description="Control your privacy and data sharing preferences"
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Profile Visibility</h3>
          </div>
          <Select
            label="Who can see your profile"
            id="profileVisibility"
            value={settings.profileVisibility}
            onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
            options={[
              { value: 'public', label: 'Everyone' },
              { value: 'connections', label: 'Connections Only' },
              { value: 'private', label: 'Only Me' },
            ]}
          />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Data Sharing</h3>
          </div>
          <div className="space-y-4">
            <Toggle
              id="dataSharing"
              label="Allow Data Sharing"
              description="Share your usage data to help improve our services"
              checked={settings.dataSharing}
              onChange={(checked) => setSettings({ ...settings, dataSharing: checked })}
            />
            <Toggle
              id="thirdPartyAccess"
              label="Third-Party Access"
              description="Allow third-party applications to access your data"
              checked={settings.thirdPartyAccess}
              onChange={(checked) => setSettings({ ...settings, thirdPartyAccess: checked })}
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Activity Status</h3>
          </div>
          <Toggle
            id="activityStatus"
            label="Show Activity Status"
            description="Let others see when you're active"
            checked={settings.activityStatus}
            onChange={(checked) => setSettings({ ...settings, activityStatus: checked })}
          />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <UserX className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Blocked Users</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-4">
              You haven't blocked any users yet. Blocked users won't be able to see your profile or contact you.
            </p>
            <Button variant="secondary">
              Manage Blocked Users
            </Button>
          </div>
        </section>

        <div className="flex gap-4">
          <Button onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </SettingsLayout>
  );
};