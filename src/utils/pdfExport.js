import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export function exportTripPlanAsPDF(tripData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Road Trip Plan', 14, 22);

  // Prepare table columns and rows
  const columns = ['Destination', 'Address'];
  const rows = tripData.destinations.map(dest => [dest.name, dest.address]);

  // Use autoTable as a standalone function, passing doc as the first parameter
  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 30
  });

  // Add trip stats
  const statsY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text(`Total Distance: ${Math.round(tripData.stats.totalDistance * 10) / 10} km`, 14, statsY);
  doc.text(`Total Duration: ${Math.floor(tripData.stats.totalDuration / 60)} hr ${Math.round(tripData.stats.totalDuration % 60)} min`, 14, statsY + 10);
  doc.text(`Fuel Efficiency: ${tripData.stats.fuelEfficiency} L/100km`, 14, statsY + 20);
  doc.text(`Fuel Price: $${tripData.stats.fuelPrice} per liter`, 14, statsY + 30);
  
  // Calculate and display fuel cost
  const fuelNeeded = (tripData.stats.totalDistance / 100) * tripData.stats.fuelEfficiency;
  const fuelCost = fuelNeeded * tripData.stats.fuelPrice;
  doc.text(`Estimated Fuel Cost: $${Math.round(fuelCost * 100) / 100}`, 14, statsY + 40);

  doc.save('road-trip-plan.pdf');
}