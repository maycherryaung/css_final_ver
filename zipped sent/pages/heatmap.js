import dynamic from "next/dynamic";

// Disable SSR for Heatmap
const Heatmap = dynamic(() => import("../components/Heatmap"), { ssr: false });

export default function HeatmapPage() {
    return (
        <div>
            <h1>COVID-19 Interactive Heatmap</h1>
            <Heatmap />
        </div>
    );
}

require('../components/Heatmap')