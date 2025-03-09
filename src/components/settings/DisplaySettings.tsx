import React, { useState } from 'react';
import { SettingsLayout } from './SettingsLayout';
import { Select, Toggle, Button } from './FormElements';
import { Palette, Type, Layout as LayoutIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const DisplaySettings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    colorScheme: 'blue',
    compactMode: false,
    language: 'en',
  });

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Display settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  return (
    <SettingsLayout
      title="Display Settings"
      description="Customize your viewing experience"
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Theme & Colors</h3>
          </div>
          <div className="space-y-4">
            <Select
              label="Theme"
              id="theme"
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              options={[
                { value: 'light', label: 'Light Mode' },
                { value: 'dark', label: 'Dark Mode' },
                { value: 'system', label: 'System Default' },
              ]}
            />
            <Select
              label="Color Scheme"
              id="colorScheme"
              value={settings.colorScheme}
              onChange={(e) => setSettings({ ...settings, colorScheme: e.target.value })}
              options={[
                { value: 'blue', label: 'Blue' },
                { value: 'green', label: 'Green' },
                { value: 'purple', label: 'Purple' },
                { value: 'red', label: 'Red' },
              ]}
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Text & Language</h3>
          </div>
          <div className="space-y-4">
            <Select
              label="Font Size"
              id="fontSize"
              value={settings.fontSize}
              onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
                { value: 'xl', label: 'Extra Large' },
              ]}
            />
            <Select
              label="Language"
              id="language"
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' },
                { value: 'fr', label: 'Français' },
                { value: 'de', label: 'Deutsch' },
              ]}
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <LayoutIcon className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium">Layout Preferences</h3>
          </div>
          <Toggle
            id="compactMode"
            label="Compact Mode"
            description="Use a more compact layout to show more content"
            checked={settings.compactMode}
            onChange={(checked) => setSettings({ ...settings, compactMode: checked })}
          />
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