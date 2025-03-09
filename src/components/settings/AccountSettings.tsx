import React, { useState } from 'react';
import { SettingsLayout } from './SettingsLayout';
import { Input, Button } from './FormElements';
import { KeyRound, Mail, Shield } from 'lucide-react';
import { showSuccessToast, showErrorToast, showLoadingToast, ConfirmDialog } from './Feedback';
import { toast } from 'react-hot-toast';

interface EmailVerificationState {
  isVerifying: boolean;
  verificationCode: string;
  emailToVerify: string;
}

export const AccountSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [emailVerification, setEmailVerification] = useState<EmailVerificationState>({
    isVerifying: false,
    verificationCode: '',
    emailToVerify: '',
  });

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: 'john.doe@example.com',
    recoveryEmail: 'backup@example.com',
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
    recoveryEmail: '',
    verificationCode: '',
  });

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid = password.length >= minLength && 
                   hasUpperCase && 
                   hasLowerCase && 
                   hasNumbers && 
                   hasSpecialChar;

    if (!isValid) {
      setErrors(prev => ({
        ...prev,
        newPassword: 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters'
      }));
    }

    return isValid;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }));
    }

    return isValid;
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));

    if (!validatePassword(formData.newPassword)) {
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, email: '', recoveryEmail: '' }));

    if (!validateEmail(formData.email)) {
      return;
    }

    if (formData.recoveryEmail && !validateEmail(formData.recoveryEmail)) {
      setErrors(prev => ({
        ...prev,
        recoveryEmail: 'Please enter a valid recovery email address'
      }));
      return;
    }

    const loadingToast = showLoadingToast('Sending verification code...', 'Please check your email');
    
    try {
      // Simulate sending verification code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailVerification({
        isVerifying: true,
        verificationCode: '',
        emailToVerify: formData.email,
      });
      setShowEmailVerification(true);
      showSuccessToast('Verification code sent', 'Please check your email for the verification code');
    } catch (error) {
      showErrorToast(
        'Failed to send verification code',
        'Please try again later'
      );
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleVerifyEmail = async () => {
    if (!emailVerification.verificationCode) {
      setErrors(prev => ({
        ...prev,
        verificationCode: 'Please enter the verification code'
      }));
      return;
    }

    const loadingToast = showLoadingToast('Verifying email...', 'This may take a moment');

    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccessToast('Email verified successfully', 'Your email has been updated');
      setShowEmailVerification(false);
      setEmailVerification({
        isVerifying: false,
        verificationCode: '',
        emailToVerify: '',
      });
    } catch (error) {
      showErrorToast(
        'Failed to verify email',
        'Please check the code and try again'
      );
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const executePasswordChange = async () => {
    const loadingToast = showLoadingToast('Updating password...', 'This may take a moment');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccessToast(
        'Password updated successfully',
        'Please use your new password for future logins'
      );
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      showErrorToast(
        'Failed to update password',
        'Please check your current password and try again'
      );
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <SettingsLayout
      title="Account Settings"
      description="Manage your account security and preferences"
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <KeyRound className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Password Management</h3>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              type="password"
              label="Current Password"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              error={errors.currentPassword}
              required
            />
            <Input
              type="password"
              label="New Password"
              id="newPassword"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              error={errors.newPassword}
              required
            />
            <Input
              type="password"
              label="Confirm New Password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              required
            />
            <div className="flex gap-4">
              <Button
                type="submit"
                isLoading={isLoading}
              >
                Update Password
              </Button>
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  }));
                  setErrors(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  }));
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Email Settings</h3>
          </div>
          <form onSubmit={handleEmailChange} className="space-y-4">
            <Input
              type="email"
              label="Primary Email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              required
            />
            <Input
              type="email"
              label="Recovery Email"
              id="recoveryEmail"
              value={formData.recoveryEmail}
              onChange={(e) => setFormData({ ...formData, recoveryEmail: e.target.value })}
              error={errors.recoveryEmail}
              description="Used for account recovery and important notifications"
            />
            <div className="flex gap-4">
              <Button type="submit">
                Update Email
              </Button>
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    email: 'john.doe@example.com',
                    recoveryEmail: 'backup@example.com',
                  }));
                  setErrors(prev => ({
                    ...prev,
                    email: '',
                    recoveryEmail: '',
                  }));
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-4">
              Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password.
            </p>
            <Button onClick={() => setShowConfirmDialog(true)}>
              Enable 2FA
            </Button>
          </div>
        </section>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={() => {
          executePasswordChange();
          setShowConfirmDialog(false);
        }}
        title="Confirm Password Change"
        message="Are you sure you want to change your password? You'll be logged out of all other devices."
        confirmLabel="Yes, Change Password"
        cancelLabel="Cancel"
        type="warning"
      />

      <ConfirmDialog
        isOpen={showEmailVerification}
        onClose={() => {
          setShowEmailVerification(false);
          setEmailVerification({
            isVerifying: false,
            verificationCode: '',
            emailToVerify: '',
          });
        }}
        onConfirm={handleVerifyEmail}
        title="Verify Email Address"
        message={
          <div className="space-y-4">
            <p>Please enter the verification code sent to {emailVerification.emailToVerify}</p>
            <Input
              type="text"
              label="Verification Code"
              id="verificationCode"
              value={emailVerification.verificationCode}
              onChange={(e) => setEmailVerification(prev => ({ ...prev, verificationCode: e.target.value }))}
              error={errors.verificationCode}
              required
            />
          </div>
        }
        confirmLabel="Verify Email"
        cancelLabel="Cancel"
        type="info"
      />
    </SettingsLayout>
  );
};