import DataModel from "../models/dataModel.js";

const dataProcessor = async (req, res) => {
    try {
        const data = await DataModel.findAll();

        // Process data for aggregation
        const phaseCounts = {};
        data.forEach((item) => {
            const phase = item.phase;
            if (!phaseCounts[phase]) {
                phaseCounts[phase] = 1;
            } else {
                phaseCounts[phase]++;
            }
        });

        // Prepare data for response
        const responseData = Object.entries(phaseCounts).map(([phase, count]) => ({
            phase,
            count,
        }));

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching data for data visualization:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default dataProcessor;