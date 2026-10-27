// Each JSON file defines one chart, including its own tooltips and dropdown.
const charts = [
  ['chart9', 'chart9_treemap.json'], ['chart1', 'chart1_heatmap.json'],
  ['chart10', 'chart10_coverage.json'], ['chart2', 'chart2_symbols.json'],
  ['chart3', 'chart3_choropleth.json'], ['chart4', 'chart4_flow.json'],
  ['chart5', 'chart5_brands.json'], ['chart6', 'chart6_country_mix.json'],
  ['chart11', 'chart11_alluvial.json'], ['chart12', 'chart12_mosaic.json'],
  ['chart7', 'chart7_scales.json'], ['chart8', 'chart8_trend.json']
];
const views = new Map();

async function drawChart(id, file) {
  const container = document.getElementById(id);
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error('Could not load ' + file);
    const spec = await response.json();
    // Vega diagrams need a numeric width. Vega-Lite uses "container".
    if (!spec.$schema.includes('vega-lite')) spec.width = container.clientWidth;
    const result = await vegaEmbed(container, spec, {
      actions: false, renderer: 'svg', tooltip: {theme: 'light'}
    });
    views.set(id, result.view);
    container.dataset.loaded = 'true';
  } catch (error) {
    container.classList.add('chart-error');
    container.textContent = 'This chart could not load. Please refresh the page or check your internet connection.';
    console.error(file, error);
  }
}

// Fit the charts to the window when its size changes.
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    for (const [id, view] of views) {
      view.width(document.getElementById(id).clientWidth).resize().runAsync();
    }
  }, 150);
});

Promise.all(charts.map(([id, file]) => drawChart(id, file)));
