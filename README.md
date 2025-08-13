# Flood Simulation And Monitoring System

A modern web-based dashboard for monitoring and predicting flood-related data, featuring interactive maps, real-time charts, and alert systems.

## Features

- **Interactive Map**: Real-time flood monitoring with color-coded markers
- **Data Visualization**: Multiple chart types showing flood alerts, rainfall, and tide levels
- **Alert System**: Real-time alerts for flooded areas, water levels, and rainfall
- **Prediction Models**: 1-hour, 24-hour, 3-day, and 7-day flood predictions
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Download or clone** the project files to your local machine
2. **Open** `index.html` in a modern web browser
3. **No server required** - the application runs entirely in the browser

## Usage

### Map Interface
- **Search**: Use the search bar to find specific locations or camera numbers
- **Markers**: Click on colored markers to view location details
- **Legend**: Reference the legend to understand marker colors:
  - Red: Current Flooded
  - Orange: 1 Day Prediction
  - Yellow: 3 Day Prediction
  - Blue: 7 Day Prediction

### Charts and Widgets
- **Flood Alerts**: Monthly and daily flood alert statistics
- **Rain Cumulative**: Rainfall accumulation over time
- **Weekly Tides**: Tide level predictions for the week
- **No Data Available**: Placeholder for additional data sources

### Alert System
The right sidebar displays real-time alerts:
- **Flooded**: Currently flooded areas
- **Water Raised**: Areas with rising water levels
- **Raining**: Areas experiencing rainfall
- **Predictions**: Future flood predictions at various time intervals

### Theme Toggle
- Click the "Dark" toggle in the header to switch between light and dark themes
- Theme preference is saved in your browser

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Leaflet.js**: Interactive mapping
- **Chart.js**: Data visualization
- **Font Awesome**: Icons
- **OpenStreetMap**: Map tiles

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Adding New Data Sources
1. Modify the `initCharts()` function in `script.js`
2. Add new chart configurations
3. Update the HTML structure in `index.html`

### Adding New Map Markers
1. Edit the `locations` array in the `initMap()` function
2. Add new coordinates and marker types
3. Update the `getMarkerColor()` function if needed

### Styling Changes
1. Modify `styles.css` for visual changes
2. Add new CSS classes for custom components
3. Update responsive breakpoints as needed

## Data Sources

This is a demonstration application with sample data. In a production environment, you would:

1. Connect to real-time weather APIs
2. Integrate with flood monitoring sensors
3. Implement actual prediction algorithms
4. Add user authentication and permissions
5. Include data logging and analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please create an issue in the repository or contact the development team.





