import React, { forwardRef } from "react";

const ChartContainer = forwardRef((props, ref) => (
  <div className="chart-container">
    <canvas ref={ref}></canvas>
  </div>
));

export default ChartContainer;
