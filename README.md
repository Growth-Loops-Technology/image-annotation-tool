

# Image Annotation Tool

This project is an interactive image annotation tool built with React, TypeScript, Konva, Vite, and Tailwind CSS. It allows users to upload images, add annotations (rectangles, circles, and text), and interact with them (drag, resize, rotate) within a canvas.

## Features

- **Image Upload:** Users can upload an image and display it on the canvas.
- **Shape Annotations:** Users can add and manipulate rectangle, circle, and text annotations on the image.
- **Drag and Resize:** Annotations are draggable and resizable, with boundaries that prevent them from going outside the image area.
- **Rotate Annotations:** Users can rotate annotations using the built-in transformer.
- **Interactive UI:** The tool provides a user-friendly interface with an easy-to-use toolbar for adding annotations and interacting with them.

## Technologies Used

- **React**: Front-end framework used to build the user interface.
- **Konva**: Canvas library used to draw and manipulate shapes on the canvas.
- **TypeScript**: Provides type safety and better development experience.
- **Vite**: Build tool that provides fast development and production builds.
- **Tailwind CSS**: Utility-first CSS framework used for styling the application.

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/image-annotation-tool.git
```

### 2. Navigate to the project folder:

```bash
cd image-annotation-tool
```

### 3. Install the dependencies:

```bash
npm install
```

### 4. Run the application:

```bash
npm run dev
```

This will start a development server and open the app in your default browser. By default, it will be accessible at `http://localhost:5173`.

## Usage

### Adding Annotations

1. Upload an image using the "Upload" button in the toolbar.
2. Select a shape (rectangle, circle, or text) from the toolbar.
3. Click on the canvas to add the selected shape. You can drag, resize, and rotate the shapes as needed.
4. Shapes are added with default properties, which can be modified via dragging or resizing them.

### Shape Interaction

- **Dragging:** Click and drag shapes to reposition them on the canvas.
- **Resizing:** Use the transformer handles to resize shapes.
- **Rotating:** Use the rotation handle from the transformer to rotate shapes.

### Responsive Design

The tool is responsive and adjusts the canvas size based on the window size. The canvas will automatically scale and maintain the aspect ratio of the uploaded image.

## File Structure

```
/src
  /pages                   #
  /components
    /AnnotationTool        # Contains the core annotation tool components
      /shapes              # Contains shape-specific components like Rectangle, Circle, etc.
    /ui                    # Reusable UI components (e.g., buttons, tooltips)
  /hooks                   # Custom hooks (e.g., useCalculatedDimensions)
  /lib
    /types                 # TypeScript types for annotations and states
  /assets                  # Static assets (icons, images)
  /styles                  # Tailwind CSS and custom styles
```

## Contributing

We welcome contributions to improve this project! If you have ideas, improvements, or fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

