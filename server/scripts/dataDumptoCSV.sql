-- Create a temporary table to store the aggregated data
CREATE TEMPORARY TABLE temp_aggregated_data
SELECT
  "Date",
  COUNT(*) AS total_records,
  COUNT(DISTINCT patent_id) AS unique_patents,
  -- Add other fields as needed for aggregation
FROM
  "dataModels"
GROUP BY
  "Date";

-- Export the aggregated data to a CSV file
COPY temp_aggregated_data TO 'C:/Users/Ibrahim/Desktop/Software Projects/technext-data-viz/server/scripts/aggregated_data.csv' WITH CSV HEADER;

-- Drop the temporary table
DROP TABLE temp_aggregated_data;
