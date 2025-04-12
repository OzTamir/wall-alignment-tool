import React, { useState, useCallback } from "react";
import { Ruler, Frame } from "lucide-react";

interface Measurements {
  wallToFirst: number;
  betweenImages: number;
  lastToWall: number;
}

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
        // Add half of image width to get to the center
        currentPosition += imageWidth / 2;
        positions.push(currentPosition);
        // Move to the start of next image
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Ruler className="w-6 h-6" />
            Wall Alignment Calculator
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Wall Length (cm)
                </label>
                <input
                  type="number"
                  value={wallLength}
                  onChange={(e) => setWallLength(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image Width (cm)
                </label>
                <input
                  type="number"
                  value={imageWidth}
                  onChange={(e) => setImageWidth(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image Height (cm)
                </label>
                <input
                  type="number"
                  value={imageHeight}
                  onChange={(e) => setImageHeight(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Images
                </label>
                <input
                  type="number"
                  value={imageCount}
                  onChange={(e) => setImageCount(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="1"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Nail Positions</h2>
              {isValid ? (
                <div className="space-y-2">
                  {nailPositions.map((position, index) => (
                    <div key={index} className="text-red-600">
                      <p>
                        Nail #{index + 1}: {position.toFixed(1)} cm from wall
                        start
                      </p>
                      {index > 0 && (
                        <p className="text-sm text-gray-600 ml-4">
                          Distance from previous nail:{" "}
                          {(position - nailPositions[index - 1]).toFixed(1)} cm
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-500">
                  Images won't fit on the wall! Please adjust the measurements.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Frame className="w-5 h-5" />
            Visual Preview
          </h2>

          <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
            {isValid && (
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
                          height: `${(imageHeight / wallLength) * 100}%`,
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
      </div>
    </div>
  );
}

export default App;
