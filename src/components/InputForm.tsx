import React from "react";

interface InputFormProps {
  wallLength: number;
  imageWidth: number;
  imageCount: number;
  onWallLengthChange: (value: number) => void;
  onImageWidthChange: (value: number) => void;
  onImageCountChange: (value: number) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  wallLength,
  imageWidth,
  imageCount,
  onWallLengthChange,
  onImageWidthChange,
  onImageCountChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Wall Length (cm)
        </label>
        <div className="relative">
          <input
            type="number"
            value={wallLength}
            onChange={(e) => onWallLengthChange(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            min="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Image Width (cm)
        </label>
        <div className="relative">
          <input
            type="number"
            value={imageWidth}
            onChange={(e) => onImageWidthChange(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            min="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Number of Images
        </label>
        <div className="relative">
          <input
            type="number"
            value={imageCount}
            onChange={(e) => onImageCountChange(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm;
