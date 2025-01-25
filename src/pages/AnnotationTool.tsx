import React, { useState } from "react";
import { Camera, Square, Circle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ImageAnnotationTool = () => {
  const [selectedTool, setSelectedTool] = useState("select");
  const [imageFile, setImageFile] = useState<File|null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (!e.target.files) return;
    const file = e.target?.files?.[0];

    setImageFile(file);
  };

  const tools = [
    { name: "select", icon: Square },
    { name: "rectangle", icon: Square },
    { name: "circle", icon: Circle },
  ];

  return (
    <div className="border rounded-lg">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center space-x-2">
          {tools.map((tool) => (
            <TooltipProvider key={tool.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedTool === tool.name ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setSelectedTool(tool.name)}
                  >
                    <tool.icon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {tool.name.charAt(0).toUpperCase() + tool.name.slice(1)}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
            name="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="ghost" size="icon" type="button">
              <Camera className="h-5 w-5" />
            </Button>
          </label>
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5 text-red-500" />
          </Button>
        </div>
      </div>

      {/* Image Upload Area */}
      <div className="h-[600px] flex items-center justify-center">
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <p className="text-gray-400">Upload an image to start annotating</p>
        )}
      </div>
    </div>
  );
};

export default ImageAnnotationTool;
