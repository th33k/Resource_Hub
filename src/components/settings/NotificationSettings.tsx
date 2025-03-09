import React, { useState } from 'react';
import { SettingsLayout } from './SettingsLayout';
import { Toggle, Select, Button, Input } from './FormElements';
import { Bell, Clock, Volume2, Mail } from 'lucide-react';
import { showSuccessToast, showErrorToast, showLoadingToast, ConfirmDialog } from './Feedback';
import { toast } from 'react-hot-toast';

interface NotificationChannel {
  id: string;
  type: 'email' | 'push' | 'sms';
  value: string;
  verified: boolean;
}

export const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    dndStart: '22:00',
    dndEnd: '07:00',
    notificationSound: 'default',
  });

  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: '1',
      type: 'email',
      value: 'john.doe@example.com',
      verified: true,
    },
    {
      id: '2',
      type: 'sms',
      value: '+1234567890',
      verified: false,
    },
  ]);

  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [verificationState, setVerificationState] = useState({
    channelId: '',
    code: '',
    error: '',
  });

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const handleChannelVerification = async (channelId: string) => {
    const channel = channels.find(c => c.id === channelId);
    if (!channel) return;

    const loadingToast = showLoadingToast('Sending verification code...', 'Please wait');

    try {
      // Simulate sending verification code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setVerificationState({
        channelId,
        code: '',
        error: '',
      });
      setShowVerificationDialog(true);
      showSuccessToast(
        'Verification code sent',
        `Please check your ${channel.type} for the verification code`
      );
    } catch (error) {
      showErrorToast(
        'Failed to send verification code',
        'Please try again later'
      );
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationState.code) {
      setVerificationState(prev => ({
        ...prev,
        error: 'Please enter the verification code',
      }));
      return;
    }

    const loadingToast = showLoadingToast('Verifying code...', 'Please wait');

    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setChannels(prev => prev.map(channel => 
        channel.id === verificationState.channelId
          ? { ...channel, verified: true }
          : channel
      ));

      showSuccessToast('Channel verified successfully', 'You will now receive notifications on this channel');
      setShowVerificationDialog(false);
    } catch (error) {
      showErrorToast(
        'Failed to verify code',
        'Please check the code and try again'
      );
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleAddChannel = async (type: 'email' | 'sms', value: string) => {
    if (type === 'sms' && !validatePhoneNumber(value)) {
      showErrorToast('Invalid phone number', 'Please enter a valid phone number');
      return;
    }

    const newChannel: NotificationChannel = {
      id: Date.now().toString(),
      type,
      value,
      verified: false,
    };

    setChannels(prev => [...prev, newChannel]);
    handleChannelVerification(newChannel.id);
  };

  const handleSave = async () => {
    const loadingToast = showLoadingToast('Saving settings...', 'Please wait');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      showSuccessToast('Settings saved successfully', 'Your notification preferences have been updated');
    } catch (error) {
      showErrorToast(
        'Failed to save settings',
        'Please try again later'
      );
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <SettingsLayout
      title="Notification Settings"
      description="Manage how you receive notifications"
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Notification Channels</h3>
          </div>
          <div className="space-y-4">
            {channels.map(channel => (
              <div key={channel.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {channel.type === 'email' ? (
                    <Mail className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Bell className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <p className="font-medium">{channel.value}</p>
                    <p className="text-sm text-gray-500">{channel.type.toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {channel.verified ? (
                    <span className="px-2 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                      Verified
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => handleChannelVerification(channel.id)}
                    >
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            <div className="mt-4">
              <Button
                variant="secondary"
                onClick={() => handleAddChannel('sms', '')}
              >
                Add Phone Number
              </Button>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Do Not Disturb</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Start Time"
              id="dndStart"
              value={settings.dndStart}
              onChange={(e) => setSettings({ ...settings, dndStart: e.target.value })}
              options={[
                { value: '20:00', label: '8:00 PM' },
                { value: '21:00', label: '9:00 PM' },
                { value: '22:00', label: '10:00 PM' },
                { value: '23:00', label: '11:00 PM' },
              ]}
            />
            <Select
              label="End Time"
              id="dndEnd"
              value={settings.dndEnd}
              onChange={(e) => setSettings({ ...settings, dndEnd: e.target.value })}
              options={[
                { value: '06:00', label: '6:00 AM' },
                { value: '07:00', label: '7:00 AM' },
                { value: '08:00', label: '8:00 AM' },
                { value: '09:00', label: '9:00 AM' },
              ]}
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Sound Settings</h3>
          </div>
          <div className="space-y-4">
            <Toggle
              id="soundEnabled"
              label="Enable Notification Sounds"
              description="Play sounds for notifications"
              checked={settings.soundEnabled}
              onChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
            />
            <Select
              label="Notification Sound"
              id="notificationSound"
              value={settings.notificationSound}
              onChange={(e) => setSettings({ ...settings, notificationSound: e.target.value })}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'chime', label: 'Chime' },
                { value: 'bell', label: 'Bell' },
                { value: 'melody', label: 'Melody' },
              ]}
            />
          </div>
        </section>

        <div className="flex gap-4">
          <Button onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary">
            Reset
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showVerificationDialog}
        onClose={() => {
          setShowVerificationDialog(false);
          setVerificationState({
            channelId: '',
            code: '',
            error: '',
          });
        }}
        onConfirm={handleVerifyCode}
        title="Verify Notification Channel"
        message={
          <div className="space-y-4">
            <p>Please enter the verification code sent to your device</p>
            <Input
              type="text"
              label="Verification Code"
              id="verificationCode"
              value={verificationState.code}
              onChange={(e) => setVerificationState(prev => ({ ...prev, code: e.target.value }))}
              error={verificationState.error}
              required
            />
          </div>
        }
        confirmLabel="Verify"
        cancelLabel="Cancel"
        type="info"
      />
    </SettingsLayout>
  );
};