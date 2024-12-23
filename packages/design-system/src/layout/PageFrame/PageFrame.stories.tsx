import type { Meta, StoryObj } from '@storybook/react';
import { Button, Text, Box } from '@mantine/core';
import { PageFrame } from './PageFrame';

const meta = {
  title: 'Layout/PageFrame',
  component: PageFrame,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive page container component that supports animations, titles, and side content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title of the page',
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable animations',
    },
    children: {
      control: 'text',
      description: 'Main content of the page',
    },
    sideContent: {
      control: false,
      description: 'Optional content to display on the right side of the title',
    },
  },
} satisfies Meta<typeof PageFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock content component for stories
const MockContent = () => (
  <Box
    p="md"
    style={{ background: 'var(--mantine-color-gray-1)', borderRadius: '8px' }}
  >
    <Text>Page content goes here</Text>
  </Box>
);

// Basic usage with just content
export const Basic: Story = {
  args: {
    children: <MockContent />,
  },
};

// With title
export const WithTitle: Story = {
  args: {
    title: 'Welcome to My App',
    children: <MockContent />,
  },
};

// With title and side content
export const WithSideContent: Story = {
  args: {
    title: 'Dashboard',
    sideContent: <Button>Add New</Button>,
    children: <MockContent />,
  },
};

// With animations enabled
export const Animated: Story = {
  args: {
    title: 'Animated Page',
    sideContent: <Button>Settings</Button>,
    children: <MockContent />,
    animate: true,
  },
};

// Responsive example
export const Responsive: Story = {
  args: {
    title: 'Responsive Layout',
    sideContent: (
      <>
        <Button variant="outline" mr="xs">
          Cancel
        </Button>
        <Button>Save</Button>
      </>
    ),
    children: (
      <>
        <Box mb="lg">
          <Text>This layout adjusts based on screen size:</Text>
          <Text size="sm" c="dimmed">
            • Title font size changes on mobile • Container padding adjusts •
            Maintains spacing between elements
          </Text>
        </Box>
        <MockContent />
      </>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story:
          'The PageFrame component is fully responsive and adjusts its layout based on screen size.',
      },
    },
  },
};

// Long content example
export const LongContent: Story = {
  args: {
    title: 'Scrolling Content',
    children: (
      <>
        {[...Array(5)].map((_, index) => (
          <Box key={index} mb="xl">
            <Text fw={700} mb="md">
              Section {index + 1}
            </Text>
            <MockContent />
          </Box>
        ))}
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The PageFrame component handles long content with proper scrolling behavior.',
      },
    },
  },
};

// Mobile view example
export const MobileView: Story = {
  args: {
    title: 'Mobile Layout',
    sideContent: <Button size="sm">Action</Button>,
    children: <MockContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view with adjusted typography and spacing.',
      },
    },
  },
};
