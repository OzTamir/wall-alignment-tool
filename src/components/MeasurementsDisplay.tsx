import React from "react";
import { Measurements } from "../types";
import { Ruler, MapPin } from "lucide-react";

interface MeasurementsDisplayProps {
  measurements: Measurements | null;
  nailPositions: number[];
}

const MeasurementsDisplay: React.FC<MeasurementsDisplayProps> = ({
  measurements,
  nailPositions,
}) => {
  if (!measurements) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <Ruler className="w-8 h-8 mx-auto" />
        </div>
        <p className="text-gray-500">Enter valid measurements to see results</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Ruler className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-700 text-center">
              Wall to First
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 text-center">
            {measurements.wallToFirst.toFixed(1)} cm
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Ruler className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-700 text-center">
              Between Images
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 text-center">
            {measurements.betweenImages.toFixed(1)} cm
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Ruler className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-700 text-center">
              Last to Wall
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 text-center">
            {measurements.lastToWall.toFixed(1)} cm
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-700">Nail Positions</h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {nailPositions.map((position, index) => (
            <div
              key={index}
              className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-center min-w-[100px]"
            >
              <span className="text-sm font-medium">
                {position.toFixed(1)} cm
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeasurementsDisplay;
