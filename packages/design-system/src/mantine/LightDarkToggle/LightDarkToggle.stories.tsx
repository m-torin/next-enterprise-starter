import type { Meta, StoryObj } from '@storybook/react';
import { LightDarkToggle } from './LightDarkToggle';

const meta = {
  title: 'Mantine/LightDarkToggle',
  component: LightDarkToggle,
  parameters: {
    layout: 'centered',
    // Adding color scheme controls to test both light and dark modes
    chromatic: { modes: { light: {}, dark: {} } },
  },
  // Adding Mantine's color scheme decorator to properly handle theme switching
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'], // Enables automatic documentation generation
} satisfies Meta<typeof LightDarkToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {},
};

// Light mode story
export const LightMode: Story = {
  parameters: {
    colorScheme: 'light',
  },
};

// Dark mode story
export const DarkMode: Story = {
  parameters: {
    colorScheme: 'dark',
  },
};

// Interactive story showing the toggle functionality
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the icon to toggle between light and dark mode.',
      },
    },
  },
};

// Story demonstrating the component in a custom container
export const InContainer: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '2rem',
          background: 'var(--mantine-color-body)',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
