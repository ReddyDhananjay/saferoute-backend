const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

function calculateSafetyScore(route) {
    let score = 100;
    const dangerZonePenalty = route.passesThroughDangerZone ? 30 : 0;
    const mainRoadBonus = route.isMainRoad ? 20 : 0;
    const safeHavenBonus = route.openBusinessesCount * 5;
    score = score - dangerZonePenalty + mainRoadBonus + safeHavenBonus;
    return Math.min(score, 100);
}

app.post('/api/get-safe-routes', async (req, res) => {
    const { origin, destination } = req.body;
    const mockRoutes = [
        { id: 'A', name: 'Main St Route', distance: '2.1 mi', time: '45 mins', isMainRoad: true, passesThroughDangerZone: false, openBusinessesCount: 3 },
        { id: 'B', name: 'Park Shortcut', distance: '1.5 mi', time: '30 mins', isMainRoad: false, passesThroughDangerZone: true, openBusinessesCount: 0 },
        { id: 'C', name: 'Avenue Route', distance: '2.3 mi', time: '50 mins', isMainRoad: true, passesThroughDangerZone: false, openBusinessesCount: 1 }
    ];

    const scoredRoutes = mockRoutes.map(route => {
        return { ...route, safetyScore: calculateSafetyScore(route) };
    });

    scoredRoutes.sort((a, b) => b.safetyScore - a.safetyScore);
    res.json({ routes: scoredRoutes });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Safety Routing API is running on http://localhost:${PORT}`);
});
