// pages/heatmap.js
import dynamic from "next/dynamic";

// Disable SSR for Heatmap
const Heatmap = dynamic(() => import("../components/Heatmap"), { ssr: false });

export default function HeatmapPage() {
    return (
        <div>
            <Heatmap />
        </div>
    );
}
