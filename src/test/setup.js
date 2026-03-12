import "@testing-library/jest-dom/vitest";

// Mock canvas getContext for jsdom (used by ElectricMeshBackground)
HTMLCanvasElement.prototype.getContext = function () {
  return {
    clearRect: () => {},
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    fill: () => {},
    stroke: () => {},
    arc: () => {},
    fillRect: () => {},
    scale: () => {},
    createLinearGradient: () => ({
      addColorStop: () => {},
    }),
    createRadialGradient: () => ({
      addColorStop: () => {},
    }),
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
  };
};
