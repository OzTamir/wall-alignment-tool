import React from "react";
import { Frame } from "lucide-react";
import { Measurements } from "../types";

interface VisualPreviewProps {
  measurements: Measurements | null;
  wallLength: number;
  imageWidth: number;
  imageCount: number;
  nailPositions: number[];
}

const VisualPreview: React.FC<VisualPreviewProps> = ({
  measurements,
  wallLength,
  imageWidth,
  imageCount,
  nailPositions,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Frame className="w-5 h-5" />
        Visual Preview
      </h2>

      <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
        {measurements && (
          <div className="absolute inset-0 flex items-center">
            {/* Left wall space */}
            <div
              style={{
                width: `${(measurements.wallToFirst / wallLength) * 100}%`,
              }}
              className="h-full flex items-center justify-center text-sm text-gray-500 border-r border-dashed border-gray-300"
            >
              {measurements.wallToFirst.toFixed(1)}cm
            </div>

            {/* Images and spaces between */}
            {Array.from({ length: imageCount }).map((_, index) => (
              <React.Fragment key={index}>
                <div className="relative">
                  {/* Nail position marker and rulers */}
                  <div className="absolute -top-8 left-0 w-full">
                    <div className="relative w-full flex items-center justify-center">
                      {/* Nail point and position */}
                      <div className="w-2 h-2 bg-red-600 rounded-full z-10" />
                      <div className="absolute -top-4 w-full text-center text-xs text-red-600">
                        {nailPositions[index].toFixed(1)}cm
                      </div>
                    </div>
                  </div>
                  {/* Image */}
                  <div
                    style={{
                      width: `${(imageWidth / wallLength) * 100}vw`,
                      height: `${(imageWidth / wallLength) * 100}%`,
                      minHeight: "40px",
                    }}
                    className="bg-blue-500 rounded"
                  />
                </div>
                {index < imageCount - 1 && (
                  <div
                    style={{
                      width: `${
                        (measurements.betweenImages / wallLength) * 100
                      }%`,
                    }}
                    className="h-full flex items-center justify-center text-sm text-gray-500 border-x border-dashed border-gray-300"
                  >
                    {measurements.betweenImages.toFixed(1)}cm
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Right wall space */}
            <div
              style={{
                width: `${(measurements.lastToWall / wallLength) * 100}%`,
              }}
              className="h-full flex items-center justify-center text-sm text-gray-500 border-l border-dashed border-gray-300"
            >
              {measurements.lastToWall.toFixed(1)}cm
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualPreview;
