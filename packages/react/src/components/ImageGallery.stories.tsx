import type { Meta, StoryObj } from "@storybook/react";

import { ImageGallery } from "./ImageGallery";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "ImageGallery",
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: () => (
    <div className="w-[600px]">
      <ImageGallery
        images={[
          {
            src: "https://assets.sook.dev/medisola-rd-1.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-2.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-3.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-4.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-5.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-6.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-7.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-8.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-9.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-10.png",
            width: 2940,
            height: 1596,
          },
          {
            src: "https://assets.sook.dev/medisola-rd-11.png",
            width: 2940,
            height: 1596,
          },
        ]}
      />
    </div>
  ),
};
