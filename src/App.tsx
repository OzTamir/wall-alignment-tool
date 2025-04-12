import React, { useState, useCallback } from "react";
import { Ruler } from "lucide-react";
import InputForm from "./components/InputForm";
import MeasurementsDisplay from "./components/MeasurementsDisplay";
import VisualPreview from "./components/VisualPreview";
import { Measurements } from "./types";

function App() {
  const [wallLength, setWallLength] = useState<number>(200);
  const [imageWidth, setImageWidth] = useState<number>(30);
  const [imageHeight, setImageHeight] = useState<number>(20);
  const [imageCount, setImageCount] = useState<number>(3);

  const calculateSpacing = useCallback((): Measurements | null => {
    if (imageCount <= 0) return null;

    const totalImageWidth = imageWidth * imageCount;
    const remainingSpace = wallLength - totalImageWidth;

    if (remainingSpace < 0) return null;

    const gaps = imageCount + 1;
    const spacing = remainingSpace / gaps;

    return {
      wallToFirst: spacing,
      betweenImages: spacing,
      lastToWall: spacing,
    };
  }, [wallLength, imageWidth, imageCount]);

  const calculateNailPositions = useCallback(
    (measurements: Measurements): number[] => {
      const positions: number[] = [];
      let currentPosition = measurements.wallToFirst;

      for (let i = 0; i < imageCount; i++) {
        currentPosition += imageWidth / 2;
        positions.push(currentPosition);
        currentPosition += imageWidth / 2 + measurements.betweenImages;
      }

      return positions;
    },
    [imageCount, imageWidth]
  );

  const measurements = calculateSpacing();
  const isValid = measurements !== null;
  const nailPositions = isValid ? calculateNailPositions(measurements) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Hero Section */}
      <div className="relative px-6 pt-6">
        <div className="mx-auto max-w-2xl py-4">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Ruler className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">
              Wall Alignment Calculator
            </h1>
            <p className="text-sm text-gray-600">
              Perfectly align your wall art with precise measurements
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="w-[90%] mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Input Parameters
              </h2>
              <InputForm
                wallLength={wallLength}
                imageWidth={imageWidth}
                imageCount={imageCount}
                onWallLengthChange={setWallLength}
                onImageWidthChange={setImageWidth}
                onImageCountChange={setImageCount}
              />
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Results
              </h2>
              <MeasurementsDisplay
                measurements={measurements}
                nailPositions={nailPositions}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Visual Preview
          </h2>
          <VisualPreview
            measurements={measurements}
            wallLength={wallLength}
            imageWidth={imageWidth}
            imageCount={imageCount}
            nailPositions={nailPositions}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 py-6 text-center text-sm text-gray-600">
        <p>
          Vibe Coded with <span className="text-red-500">♥</span> by{" "}
          <a
            href="https://oztamir.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Oz
          </a>
          {" • "}
          <a
            href="https://github.com/OzTamir/wall-alignment-tool"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
