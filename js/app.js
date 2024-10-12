
function clearInput(){
  document.getElementById("line-start").value="";
  document.getElementById("line-end").value="";
  document.getElementById("circle-start").value="";
  document.getElementById("circle-radius").value="";

}

var x1,y1,x2,y2,r = 0;
function basicAlgorithm() {
  var dx = 1;
  var m = (y2 - y1) / (x2 - x1);
  const coordinates = [];
  var tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
  var tableHead = document.getElementById('resultTable').getElementsByTagName('thead')[0];
  resetTable();
  document.getElementById('question').innerText = '(' + x1 + ',' + y1 + ') --> (' + x2 + ',' + y2 + ') - Basic Algorithm (TABLE)';
  document.getElementById('chart-question').innerHTML = '<h2>(' + x1 + ',' + y1 + ') --> (' + x2 + ',' + y2 + ') - Basic Algorithm (CHART)</h2>';

  // Jika x1 sama dengan x2, gradient tidak terdefinisi
  if (x1 === x2) {
    document.getElementById("error-answer").innerHTML = "Undefined because <br> m = (y2 - y1) / (x2 - x1) = Δy / 0 <br> Δy / 0 = Undefined";
    drawChart(coordinates);
    return;
  }

  // Membuat header tabel
  createTableHeaderBasic(tableHead);

  // Inisialisasi nilai awal
  insertRowBasic(tableBody, x1, "", x1, y1, "", y1, `(${x1},${Math.round(y1)})`);
  coordinates.push({ x: x1, y: Math.round(y1) });


  // Tentukan arah perubahan x dan y berdasarkan apakah x1 < x2 atau x1 > x2
  var stepX = x1 < x2 ? dx : -dx;
  var stepY = x1 < x2 ? m : -m;

  // Loop untuk menghitung nilai x dan y berikutnya
  for (; x1 !== x2; x1 += stepX, y1 += stepY) {
    insertRowBasic(tableBody, x1, x1 < x2 ? dx : -dx, x1 + stepX, y1, x1 < x2 ? m : -m, y1 + stepY, `(${x1 + stepX},${Math.round(y1 + stepY)})`);
    coordinates.push({ x: Math.round(x1 + stepX), y: Math.round(y1 + stepY) });
  }
  drawChart(coordinates);

}
function ddaAlgorithm() {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var k = 0;
  const coordinates = [];
  var tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
  var tableHead = document.getElementById('resultTable').getElementsByTagName('thead')[0];

  document.getElementById('question').innerText = '(' + x1 + ',' + y1 + ') --> (' + x2 + ',' + y2 + ') - DDA (Digital Differential Analyzer) (TABLE)';
  document.getElementById('chart-question').innerHTML = '<h2>(' + x1 + ',' + y1 + ') --> (' + x2 + ',' + y2 + ') - DDA (Digital Differential Analyzer) (CHART)</h2>';

  // Menentukan jumlah langkah
  if (dx<dy){
    step = Math.max(Math.abs(dy));
  }
  else {
    step = Math.max(Math.abs(dx));
  }
  var x_increment = dx / step;
  var y_increment = dy / step;

  resetTable();
  document.getElementById('diketahui').innerHTML = 'Δx : ' + dx + '<br>' + 'Δy : ' + dy + '<br>' + 'Step : ' + step + '<br>' + 'x_increment : ' + x_increment + '<br>' + 'y_increment : ' + y_increment;

  // Membuat header tabel
  createTableHeader();


  // Memasukkan nilai awal
  insertRow(tableBody, '', x1, y1, `(${x1},${Math.round(y1)})`);
  coordinates.push({ x: x1, y: Math.round(y1) });

  // Loop DDA untuk menghitung koordinat berikutnya
  for (let i = 0; i < step; i++) {
    x1 += x_increment;
    y1 += y_increment;

    // Menampilkan hasil dalam tabel
    insertRow(tableBody, k, x1, y1, `(${Math.round(x1)},${Math.round(y1)})`);
    coordinates.push({ x: Math.round(x1), y: Math.round(y1) });
    k++;
  }

  drawChart(coordinates);
}

function bressenhamAlgorithm(){
  var dx = Math.abs(x2 - x1);
  var dy = Math.abs(y2 - y1);
  // var d2y = 2*dy;
  // var d2y_dx = 2 * (dy - dx); // 2 * Δy - 2 * Δx;
  // var p = 2*dy-dx;
  let sx = (x1 < x2) ? 1 : -1;
  let sy = (y1 < y2) ? 1 : -1;
  var k = 0;
  var err = dx - dy;
  const coordinates = [];
  var tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
  var tableHead = document.getElementById('resultTable').getElementsByTagName('thead')[0];

  document.getElementById('question').innerText = '(' + x1 + ',' + y1 + ') --> (' + x2 + ',' + y2 + ') - Bressenham Algorithm (TABLE)';
  document.getElementById('chart-question').innerHTML = '<h2>(' + x1 + ',' + y1 + ') --> (' + x2 + ',' + y2 + ') - Bressenham Algorithm (CHART)</h2>';
  resetTable();
  // document.getElementById('diketahui').innerHTML = 'Δx : ' + dx + '<br>' + 'Δy : ' + dy  + '<br>' + 'p0 : ' + p  ;
  document.getElementById('diketahui').innerHTML = 'Δx : ' + dx + '<br>' + 'Δy : ' + dy  + '<br>' + 'err : ' + err  + '<br>' + 'e2 : ' + 2*err   ;
  createTableHeaderBressenherm(tableHead);

  insertRowBressenherm(tableBody, '', '', x1, y1,`(${x1},${y1})`);
  coordinates.push({ x: x1, y: y1 });
  // formula bressenham algorithm from PPT
  // while (true) {
  //
  //   if (x1 === x2 && y1 === y2) break;
  //
  //   if (p > 0) {
  //     p += d2y_dx;
  //     x1 += sx;
  //     y1 += sy;
  //     insertRowBressenherm(tableBody, k, p, x1, y1, `(${x1},${y1})`);
  //     coordinates.push({ x: x1, y: y1 });
  //     console.log(x1, y1, p, sx, sy, k);
  //   }
  //   if (p < 0) {
  //     p += d2y;
  //     x1 += sx;
  //     insertRowBressenherm(tableBody, k, p, x1, y1, `(${x1},${y1})`);
  //     coordinates.push({ x: x1, y: y1 });
  //     console.log(x1, y1);
  //   }
  //   k++;
  // }

  //another formula for bressenham algorithm
  while (x1 !== x2 || y1 !== y2) {
    let e2 = 2 * err;

    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }

    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }

    insertRowBressenherm(tableBody, k, e2, x1, y1, `(${x1},${y1})`);
    coordinates.push({ x: x1, y: y1 });
    k++;
  }


  drawChart(coordinates);
}

function bresenhamCircleAlgorithm() {
  // Use the predefined variables
  var xc = x1; // Center X-coordinate
  var yc = y1; // Center Y-coordinate
  var k = 0;
  var x = 0;
  var y = r;
  var p = 1 - r;  // Initial decision parameter
  const coordinates = [];

  var tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
  var tableHead = document.getElementById('resultTable').getElementsByTagName('thead')[0];

  document.getElementById('question').innerText = 'Center: (' + xc + ',' + yc + ') Radius: ' + r + ' - Bresenham Circle Algorithm (TABLE)';
  document.getElementById('chart-question').innerHTML = '<h2>Center: (' + xc + ',' + yc + ') Radius: ' + r + ' - Bresenham Circle Algorithm (CHART)</h2>';
  resetTable();
  document.getElementById('diketahui').innerHTML = 'p0 : ' + p;
  createTableHeaderBressenherm(tableHead);


  insertRowBressenherm(tableBody, '', '', x1, y1,`(${x1},${y1})`);
  coordinates.push({ x: x1, y: y1 });
  // Function to plot points considering the 8-way symmetry
  function plotCirclePoints(xc, yc, x, y) {
    const points = [
      { x: xc + x, y: yc + y },
      { x: xc - x, y: yc + y },
      { x: xc + x, y: yc - y },
      { x: xc - x, y: yc - y },
      { x: xc + y, y: yc + x },
      { x: xc - y, y: yc + x },
      { x: xc + y, y: yc - x },
      { x: xc - y, y: yc - x }
    ];

    points.forEach(point => {
      coordinates.push(point);
      insertRowBressenherm(tableBody, k, p, point.x, point.y, `(${point.x},${point.y})`);
    });
  }

  plotCirclePoints(xc, yc, x, y);  // Initial plot of points

  while (x < y) {
    x++;
    if (p < 0) {
      p += 2 * x + 1;  // Midpoint is inside the circle
    } else {
      y--;
      p += 2 * (x - y) + 1;  // Midpoint is outside the circle
    }
    k++;
    plotCirclePoints(xc, yc, x, y);
  }

  drawCircleChart(coordinates);
}



let currentChart = null; // Menyimpan referensi ke chart saat ini

function drawChart(coordinates) {
    document.getElementById('chart-answer').innerHTML='<canvas id="ddaCanvas" width="400" height="400"></canvas>';

  const ctx = document.getElementById('ddaCanvas').getContext('2d');

  if (currentChart) {
    currentChart.destroy();
  }
  const xValues = coordinates.map(coord => Math.round(coord.x));
  const yValues = coordinates.map(coord => Math.round(coord.y));
  const minX = Math.floor(Math.min(...xValues)) -1; // Floor untuk mendapatkan nilai integer
  const maxX = Math.ceil(Math.max(...xValues)) +1; // Ceil untuk mendapatkan nilai integer
  const minY = Math.min(...yValues)-1;
  const maxY = Math.max(...yValues)+1;
  const xLabels = [];
  for (let i = maxX; i >= minX; i--) {
    xLabels.push(i); // Push all integers from maxX to minX
  }
  const chartData = {
    labels: xLabels, // Menetapkan label sumbu x sesuai dengan koordinat,
    datasets: [{
      label: "Digital Line",
      data: coordinates,
      borderColor: 'orange',
      backgroundColor: 'rgba(255, 150, 0, 0.5)',
      fill: false,
      lineTension: 0,
    }]
  };



  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'X Axis'
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y Axis'
        },
        min: minY,
        max: maxY,
        ticks: {
          stepSize: 1,
        }
      }
    },
    plugins: {
      drawCoordinates: {
        afterDatasetsDraw: (chart, args, options) => {
          const ctx = chart.ctx;
          const canvasWidth = chart.width; // Lebar canvas
          const canvasHeight = chart.height; // Tinggi canvas
          chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((point, index) => {
              const xPos = point.x;
              const yPos = point.y;
              const coord = coordinates[index];
              const label = `(${coord.x}, ${coord.y})`;

              // Set styling for text
              ctx.fillStyle = 'black';
              ctx.font = '12px Arial';

              // Penempatan label dengan penyesuaian untuk tidak keluar dari canvas
              const labelWidth = ctx.measureText(label).width; // Lebar label
              const labelHeight = 12; // Tinggi label (sesuaikan dengan font)

              // Cek dan sesuaikan posisi x
              const adjustedX = (xPos + 5 + labelWidth > canvasWidth) ? xPos - labelWidth - 5 : xPos + 5;
              // Cek dan sesuaikan posisi y
              const adjustedY = (yPos - labelHeight - 5 < 0) ? yPos + labelHeight + 5 : yPos - 5;

              ctx.fillText(label, adjustedX, adjustedY); // Positioning the label near the point
            });
          });
        }
      }
    }
  };


  currentChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions,
    plugins: [{
      id: 'drawCoordinates', // Custom plugin ID
      afterDatasetsDraw: chartOptions.plugins.drawCoordinates.afterDatasetsDraw
    }]
  });
}
// Fungsi untuk mengatur ulang tabel
function resetTable() {
  document.getElementById('diketahui').innerHTML = '';
  document.getElementById("head-table").innerText = "";
  document.getElementById("answer-table").innerText = "";
  document.getElementById("error-answer").innerHTML = "";
}

// Fungsi untuk membuat header tabel
function createTableHeader() {
  var tableHead = document.getElementById('resultTable').getElementsByTagName('thead')[0];
  var rowHead = tableHead.insertRow();
  rowHead.insertCell(0).textContent = 'K';
  rowHead.insertCell(1).textContent = 'X';
  rowHead.insertCell(2).textContent = 'Y';
  rowHead.insertCell(3).textContent = '(X,Y)';
}

// Fungsi untuk menambah baris ke tabel
function insertRow(tableBody, k, x, y, point) {
  var row = tableBody.insertRow();
  row.insertCell(0).textContent = k;
  row.insertCell(1).textContent = Number.isInteger(x) ? x.toString() : x.toFixed(2);
  row.insertCell(2).textContent = Number.isInteger(y) ? y.toString() : y.toFixed(2);
  row.insertCell(3).textContent = point;
}


function split() {
  let input1, input2;

  // Check if the Line inputs are visible (for line selection)
  const lineInputsVisible = !document.getElementById('line-inputs').classList.contains('hidden');

  if (lineInputsVisible) {
    // Get inputs for Line
    input1 = document.getElementById("line-start").value;
    input2 = document.getElementById("line-end").value;

    // Remove parentheses and split by comma
    input1 = input1.replace(/[()]/g, '');
    input2 = input2.replace(/[()]/g, '');

    const coordinates1 = input1.split(',');
    const coordinates2 = input2.split(',');

    x1 = parseFloat(coordinates1[0].trim());
    y1 = parseFloat(coordinates1[1].trim());
    x2 = parseFloat(coordinates2[0].trim());
    y2 = parseFloat(coordinates2[1].trim());

    console.log("Line Coordinates:", { x1, y1, x2, y2 });

  } else {
    // Get inputs for Circle
    input1 = document.getElementById("circle-start").value;
    const radius = document.getElementById("circle-radius").value;

    // Remove parentheses and split by comma
    input1 = input1.replace(/[()]/g, '');

    const coordinates1 = input1.split(',');

    x1 = parseFloat(coordinates1[0].trim());
    y1 = parseFloat(coordinates1[1].trim());
    r = parseFloat(radius.trim());

    console.log("Circle Coordinates and Radius:", { x1, y1, r });
  }
}

function validateInputs() {
  const result = document.getElementById('result');
  let message = '';
  let isValid = true;

  // Regular expression to validate the coordinate format (x, y)
  const regex = /^\(-?\d+,-?\d+\)$/;

  // Check if the Line inputs are visible (for line selection)
  const lineInputsVisible = !document.getElementById('line-inputs').classList.contains('hidden');

  if (lineInputsVisible) {
    // Get and validate Line inputs
    const input1 = document.getElementById("line-start").value;
    const input2 = document.getElementById("line-end").value;

    if (input1 === '') {
      message += '- Starting Point is Empty! Please fill it first!<br>';
      isValid = false;
    } else if (!regex.test(input1)) {
      message += '- Starting Point is not valid! Must be in Format (x, y).<br>';
      isValid = false;
    } else {
      // Parse input1 and assign to x1, y1
      const coordinates1 = input1.replace(/[()]/g, '').split(',');
      x1 = parseFloat(coordinates1[0].trim());
      y1 = parseFloat(coordinates1[1].trim());
    }

    if (input2 === '') {
      message += '- End Point is Empty! Please fill it first!<br>';
      isValid = false;
    } else if (!regex.test(input2)) {
      message += '- End Point is not valid! Must be in Format (x, y).<br>';
      isValid = false;
    } else {
      // Parse input2 and assign to x2, y2
      const coordinates2 = input2.replace(/[()]/g, '').split(',');
      x2 = parseFloat(coordinates2[0].trim());
      y2 = parseFloat(coordinates2[1].trim());
    }

  } else {
    // Get and validate Circle inputs
    const input1 = document.getElementById("circle-start").value;
    const radius = document.getElementById("circle-radius").value;

    if (input1 === '') {
      message += '- Starting Point is Empty! Please fill it first!<br>';
      isValid = false;
    } else if (!regex.test(input1)) {
      message += '- Starting Point is not valid! Must be in Format (x, y).<br>';
      isValid = false;
    } else {
      // Parse input1 and assign to x1, y1
      const coordinates1 = input1.replace(/[()]/g, '').split(',');
      x1 = parseFloat(coordinates1[0].trim());
      y1 = parseFloat(coordinates1[1].trim());
    }

    if (radius === '') {
      message += '- Radius is Empty! Please fill it first!<br>';
      isValid = false;
    } else if (isNaN(radius) || radius <= 0) {
      message += '- Radius is not valid! It must be a positive number.<br>';
      isValid = false;
    } else {
      // Assign radius to r
      r = parseFloat(radius.trim());
    }
  }

  // Display the validation result
  result.innerHTML = message;
  return isValid;
}


function createTableHeaderBasic(tableHead) {
  var rowHead = tableHead.insertRow();
  rowHead.insertCell(0).textContent = 'x';
  rowHead.insertCell(1).textContent = 'dx';
  rowHead.insertCell(2).textContent = 'x';
  rowHead.insertCell(3).textContent = 'y(b)';
  rowHead.insertCell(4).textContent = 'm';
  rowHead.insertCell(5).textContent = 'y';
  rowHead.insertCell(6).textContent = '(X,Y)';
}

// Fungsi untuk menambah baris ke tabel
function insertRowBasic(tableBody, x, dx, nextX, y, m, nextY, point) {
  var row = tableBody.insertRow();
  row.insertCell(0).textContent = Number.isInteger(x) ? x.toString() : x.toFixed(2);
  row.insertCell(1).textContent = dx ? (Number.isInteger(dx) ? dx.toString() : dx.toFixed(2)) : "";
  row.insertCell(2).textContent = Number.isInteger(nextX) ? nextX.toString() : nextX.toFixed(2);
  row.insertCell(3).textContent = Number.isInteger(y) ? y.toString() : y.toFixed(2);
  row.insertCell(4).textContent = (typeof m === 'number') ? (Number.isInteger(m) ? m.toString() : m.toFixed(2)) : m;
  row.insertCell(5).textContent = Number.isInteger(nextY) ? nextY.toString() : nextY.toFixed(2);
  row.insertCell(6).textContent = point;
}

function createTableHeaderBressenherm(tableHead) {
  var rowHead = tableHead.insertRow();
  rowHead.insertCell(0).textContent = 'K';
  rowHead.insertCell(1).textContent = 'e2';
  rowHead.insertCell(2).textContent = 'X';
  rowHead.insertCell(3).textContent = 'Y';
  rowHead.insertCell(4).textContent = '(X,Y)';
}

// Fungsi untuk menambah baris ke tabel
function insertRowBressenherm(tableBody, k, pk, x, y, point) {
  var row = tableBody.insertRow();

  row.insertCell(0).textContent = k;
  row.insertCell(1).textContent = pk;
  row.insertCell(2).textContent = Number.isInteger(x) ? x.toString() : x.toFixed(2);
  row.insertCell(3).textContent = Number.isInteger(y) ? y.toString() : y.toFixed(2);
  row.insertCell(4).textContent = point;
}

function showLineInputs() {
  toggleInputs('line-inputs', 'circle-inputs');
  enableButtons('basic-algorithm', 'dda-algorithm');
  document.querySelector('a[href="#"][onclick="showLineInputs()"]').classList.add('onclick');
  document.querySelector('a[href="#"][onclick="showCircleInputs()"]').classList.remove('onclick');
}

// Function to show inputs for circle
function showCircleInputs() {
  toggleInputs('circle-inputs', 'line-inputs');
  disableButtons('basic-algorithm', 'dda-algorithm');
  document.querySelector('a[href="#"][onclick="showCircleInputs()"]').classList.add('onclick');
  document.querySelector('a[href="#"][onclick="showLineInputs()"]').classList.remove('onclick');
}

// Helper to toggle visibility
function toggleInputs(showId, hideId) {
  document.getElementById(showId).classList.remove('hidden');
  document.getElementById(hideId).classList.add('hidden');
}

// Helper to enable buttons and allow hover
function enableButtons(...buttonIds) {
  buttonIds.forEach(id => {
    const button = document.getElementById(id);
    button.disabled = false;
    button.classList.remove('no-hover'); // Remove the class that disables hover
    button.style.pointerEvents = 'auto'; // Enable interaction
  });
}

// Helper to disable buttons and remove hover
function disableButtons(...buttonIds) {
  buttonIds.forEach(id => {
    const button = document.getElementById(id);
    button.disabled = true;
    button.classList.add('no-hover'); // Add the class that disables hover
    button.style.pointerEvents = 'none'; // Disable interaction
  });
}


function runBressenhamalgorithm(){
  if (document.getElementById('line-inputs').classList.contains('hidden')){
    bresenhamCircleAlgorithm();
  }else{
    bressenhamAlgorithm();
  }
}


function drawCircleChart(coordinates) {
  // Clear previous canvas content
  document.getElementById('chart-answer').innerHTML = '<canvas id="circleCanvas" width="400" height="400"></canvas>';

  const ctx = document.getElementById('circleCanvas').getContext('2d');

  if (currentChart) {
    currentChart.destroy();
  }

  const xValues = coordinates.map(coord => coord.x);
  const yValues = coordinates.map(coord => coord.y);
  const minX = Math.floor(Math.min(...xValues)) - 1;
  const maxX = Math.ceil(Math.max(...xValues)) + 1;
  const minY = Math.floor(Math.min(...yValues)) - 1;
  const maxY = Math.ceil(Math.max(...yValues)) + 1;

  const xLabels = [];
  for (let i = minX; i <= maxX; i++) {
    xLabels.push(i);
  }

  const chartData = {
    labels: xLabels,
    datasets: [{
      label: "Bresenham Circle",
      data: coordinates,
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 150, 255, 0.5)',
      fill: false,
      lineTension: 0,
    }]
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'X Axis'
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y Axis'
        },
        min: minY,
        max: maxY,
        ticks: {
          stepSize: 1,
        }
      }
    },
    plugins: {
      drawCoordinates: {
        afterDatasetsDraw: (chart) => {
          const ctx = chart.ctx;
          chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((point, index) => {
              const xPos = point.x;
              const yPos = point.y;
              const coord = coordinates[index];
              const label = `(${coord.x}, ${coord.y})`;

              // Set styling for text
              ctx.fillStyle = 'black';
              ctx.font = '12px Arial';

              // Label positioning adjustments
              const labelWidth = ctx.measureText(label).width; // Width of the label
              const labelHeight = 12; // Height of the label

              // Adjust x position
              const adjustedX = (xPos + 5 + labelWidth > chart.width) ? xPos - labelWidth - 5 : xPos + 5;
              // Adjust y position
              const adjustedY = (yPos - labelHeight - 5 < 0) ? yPos + labelHeight + 5 : yPos - 5;

              ctx.fillText(label, adjustedX, adjustedY); // Draw the label
            });
          });
        }
      }
    }
  };

  currentChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions,
    plugins: [{
      id: 'drawCoordinates',
      afterDatasetsDraw: chartOptions.plugins.drawCoordinates.afterDatasetsDraw
    }]
  });
}
