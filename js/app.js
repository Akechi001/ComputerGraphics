
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
  var xc = x1;
  var yc = y1;
  var k = 0;
  var x = 0;
  var y = r;
  var p = 1 - r;
  const coordinates = [];
  var tableBody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
  var tableHead = document.getElementById('resultTable').getElementsByTagName('thead')[0];

  resetTable();
  document.getElementById('question').innerText = 'Center: (' + xc + ',' + yc + ') Radius: ' + r + ' - Bresenham Circle Algorithm (TABLE)';
  document.getElementById('chart-question').innerHTML = '<h2>Center: (' + xc + ',' + yc + ') Radius: ' + r + ' - Bresenham Circle Algorithm (CHART)</h2>';
  document.getElementById('diketahui').innerHTML = 'p0 : ' + p;
  createTableHeaderBressenherm(tableHead);


  insertRowBressenherm(tableBody, '', '', x1, y1,`(${x1},${y1})`);
  coordinates.push({ x: x1, y: y1 });
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

  createGrid(coordinates,x1,y1, r);

  boundaryFill(x1, y1, 'fill', 'highlight');

}



let currentChart = null;

function drawChart(coordinates) {
  document.getElementById('chart-answer').innerHTML = '<canvas id="ddaCanvas" width="400" height="400"></canvas>';

  const ctx = document.getElementById('ddaCanvas').getContext('2d');

  if (currentChart) {
    currentChart.destroy();
  }

  const xValues = coordinates.map(coord => Math.round(coord.x));
  const yValues = coordinates.map(coord => Math.round(coord.y));
  const minX = Math.floor(Math.min(...xValues)) - 1;
  const maxX = Math.ceil(Math.max(...xValues)) + 1;
  const minY = Math.min(...yValues) - 1;
  const maxY = Math.max(...yValues) + 1;

  const xLabels = [];
  for (let i = maxX; i >= minX; i--) {
    xLabels.push(i);
  }

  const chartData = {
    labels: xLabels,
    datasets: [{
      label: "Digital Line",
      data: coordinates,
      borderColor: 'orange',
      backgroundColor: 'rgba(255, 150, 0, 0.3)', // You can keep this for line color if you want
      fill: false, // Set to false to remove the fill under the line
      lineTension: 0, // Set tension to 0 for a straight line
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
          const canvasWidth = chart.width;
          const canvasHeight = chart.height;

          chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((point, index) => {
              const xPos = point.x;
              const yPos = point.y;
              const coord = coordinates[index];
              const label = `(${coord.x}, ${coord.y})`;

              ctx.fillStyle = 'black';
              ctx.font = '12px Arial';

              const labelWidth = ctx.measureText(label).width;
              const labelHeight = 12;

              const adjustedX = (xPos + 5 + labelWidth > canvasWidth) ? xPos - labelWidth - 5 : xPos + 5;
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
      id: 'drawCoordinates',
      afterDatasetsDraw: chartOptions.plugins.drawCoordinates.afterDatasetsDraw
    }]
  });
}

function createGrid(coordinates, x1, y1, radius) {
  // Tentukan ukuran grid berdasarkan radius dan margin tambahan di sekitar lingkaran
  const margin = 3; // Sel tambahan di sekitar lingkaran agar tidak menempel di tepi
  const gridSize = 2 * radius + margin; // Ukuran total grid
  const grid = document.getElementById('grid'); // Elemen grid

  if (!grid) {
    console.error("Grid element not found");
    return;
  }

  // Bersihkan grid sebelumnya
  grid.innerHTML = '';

  // Set ukuran setiap sel dalam grid
  const cellSize = 40;
  grid.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;

  // Offset agar titik pusat `(x1, y1)` berada di tengah grid
  const centerOffsetX = Math.floor(gridSize / 2) - x1;
  const centerOffsetY = Math.floor(gridSize / 2) + y1;

  // Membuat sel dalam grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';

      // Hitung koordinat untuk ditampilkan, dengan titik pusat di tengah
      const displayX = j - centerOffsetX;
      const displayY = centerOffsetY - i;
      cell.textContent = `(${displayX},${displayY})`;

      // Sorot sel jika merupakan bagian dari koordinat lingkaran
      if (coordinates.some(coord => coord.x === displayX && coord.y === displayY)) {
        cell.classList.add('highlight');
      }

      grid.appendChild(cell);
    }
  }

  grid.style.display = 'grid'; // Tampilkan grid
}
function boundaryFill(x, y, fillClass, boundaryClass) {
  const grid = document.getElementById('grid');
  const cells = Array.from(grid.getElementsByClassName('cell'));
  const gridSize = Math.sqrt(cells.length);

  // Convert grid cell coordinates to a 1D index
  function getCellIndex(x, y) {
    return (gridSize - y - 1) * gridSize + (x + Math.floor(gridSize / 2));
  }

  // Check if a cell is out of bounds, a boundary, or already filled
  function isBoundaryOrFilled(x, y) {
    const index = getCellIndex(x, y);
    if (index < 0 || index >= cells.length) return true; // Out of grid bounds
    return cells[index].classList.contains(boundaryClass) || cells[index].classList.contains(fillClass);
  }

  // Initialize stack with the starting point
  const stack = [{ x, y }];

  // Iterative fill using a stack
  while (stack.length > 0) {
    const { x, y } = stack.pop();
    if (isBoundaryOrFilled(x, y)) continue;

    const cell = cells[getCellIndex(x, y)];
    cell.classList.add(fillClass);

    // Add neighboring cells
    stack.push({ x: x + 1, y }); // Right
    stack.push({ x: x - 1, y }); // Left
    stack.push({ x, y: y + 1 }); // Up
    stack.push({ x, y: y - 1 }); // Down
  }
}

// Start filling from the circle's center


// Call the boundaryFill function with the center coordinates and class names for fill and boundary

function resetTable() {
  document.getElementById('diketahui').innerHTML = '';
  document.getElementById("head-table").innerText = "";
  document.getElementById("answer-table").innerText = "";
  document.getElementById("error-answer").innerHTML = "";
  document.getElementById('chart-answer').innerHTML = "";
  document.getElementById('grid').innerHTML = "";
  document.getElementById('grid').removeAttribute('style');

}

function createTableHeader() {
  var tableHead = document.getElementById('resultTable').getElementsByTagName('thead')[0];
  var rowHead = tableHead.insertRow();
  rowHead.insertCell(0).textContent = 'K';
  rowHead.insertCell(1).textContent = 'X';
  rowHead.insertCell(2).textContent = 'Y';
  rowHead.insertCell(3).textContent = '(X,Y)';
}

function insertRow(tableBody, k, x, y, point) {
  var row = tableBody.insertRow();
  row.insertCell(0).textContent = k;
  row.insertCell(1).textContent = Number.isInteger(x) ? x.toString() : x.toFixed(2);
  row.insertCell(2).textContent = Number.isInteger(y) ? y.toString() : y.toFixed(2);
  row.insertCell(3).textContent = point;
}


function split() {
  let input1, input2;
  const lineInputsVisible = !document.getElementById('line-inputs').classList.contains('hidden');

  if (lineInputsVisible) {
    input1 = document.getElementById("line-start").value;
    input2 = document.getElementById("line-end").value;

    input1 = input1.replace(/[()]/g, '');
    input2 = input2.replace(/[()]/g, '');

    const coordinates1 = input1.split(',');
    const coordinates2 = input2.split(',');

    x1 = parseFloat(coordinates1[0].trim());
    y1 = parseFloat(coordinates1[1].trim());
    x2 = parseFloat(coordinates2[0].trim());
    y2 = parseFloat(coordinates2[1].trim());


  } else {
    input1 = document.getElementById("circle-start").value;
    const radius = document.getElementById("circle-radius").value;

    input1 = input1.replace(/[()]/g, '');

    const coordinates1 = input1.split(',');

    x1 = parseFloat(coordinates1[0].trim());
    y1 = parseFloat(coordinates1[1].trim());
    r = parseFloat(radius.trim());

  }
}

function validateInputs() {
  const result = document.getElementById('result');
  let message = '';
  let isValid = true;

  const regex = /^\(-?\d+,-?\d+\)$/;

  const lineInputsVisible = !document.getElementById('line-inputs').classList.contains('hidden');

  if (lineInputsVisible) {
    const input1 = document.getElementById("line-start").value;
    const input2 = document.getElementById("line-end").value;

    if (input1 === '') {
      message += '- Starting Point is Empty! Please fill it first!<br>';
      isValid = false;
    } else if (!regex.test(input1)) {
      message += '- Starting Point is not valid! Must be in Format (x, y).<br>';
      isValid = false;
    } else {
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
      const coordinates2 = input2.replace(/[()]/g, '').split(',');
      x2 = parseFloat(coordinates2[0].trim());
      y2 = parseFloat(coordinates2[1].trim());
    }

  } else {
    const input1 = document.getElementById("circle-start").value;
    const radius = document.getElementById("circle-radius").value;

    if (input1 === '') {
      message += '- Starting Point is Empty! Please fill it first!<br>';
      isValid = false;
    } else if (!regex.test(input1)) {
      message += '- Starting Point is not valid! Must be in Format (x, y).<br>';
      isValid = false;
    } else {
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
      r = parseFloat(radius.trim());
    }
  }

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

function showCircleInputs() {
  toggleInputs('circle-inputs', 'line-inputs');
  disableButtons('basic-algorithm', 'dda-algorithm');
  document.querySelector('a[href="#"][onclick="showCircleInputs()"]').classList.add('onclick');
  document.querySelector('a[href="#"][onclick="showLineInputs()"]').classList.remove('onclick');
}

function toggleInputs(showId, hideId) {
  document.getElementById(showId).classList.remove('hidden');
  document.getElementById(hideId).classList.add('hidden');
}

function enableButtons(...buttonIds) {
  buttonIds.forEach(id => {
    const button = document.getElementById(id);
    button.disabled = false;
    button.classList.remove('no-hover');
    button.style.pointerEvents = 'auto';
  });
}

function disableButtons(...buttonIds) {
  buttonIds.forEach(id => {
    const button = document.getElementById(id);
    button.disabled = true;
    button.classList.add('no-hover');
    button.style.pointerEvents = 'none';
  });
}


function runBressenhamalgorithm(){
  if (document.getElementById('line-inputs').classList.contains('hidden')){
    bresenhamCircleAlgorithm();
  }else{
    bressenhamAlgorithm();
  }
}
