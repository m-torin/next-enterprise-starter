// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { IconHeart } from '@tabler/icons-react'; // Assuming you're using tabler icons

const meta = {
  title: 'Mantine/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'filled',
        'light',
        'outline',
        'subtle',
        'white',
        'gradient',
        'default',
        'custom',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'color',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'filled',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'outline',
    size: 'md',
  },
};

export const CustomVariant: Story = {
  args: {
    children: 'Custom Button',
    variant: 'custom',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Like',
    icon: <IconHeart size={16} />,
    variant: 'filled',
    size: 'md',
  },
};
