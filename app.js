// Load one Vega-Lite file into the HTML div with the matching id.
function drawChart(id, file) {
  vegaEmbed('#' + id, file, {actions: false, renderer: 'svg'})
    .catch(console.error);
}

drawChart('chart1', 'chart1_heatmap.json');
drawChart('chart2', 'chart2_symbols.json');
drawChart('chart3', 'chart3_choropleth.json');
drawChart('chart4', 'chart4_flow.json');
drawChart('chart5', 'chart5_brands.json');
drawChart('chart6', 'chart6_country_mix.json');
drawChart('chart7', 'chart7_scales.json');
drawChart('chart8', 'chart8_trend.json');
