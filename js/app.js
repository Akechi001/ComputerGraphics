
function clearInput(){
  document.getElementById("input1").value="";
  document.getElementById("input2").value="";

}

var x1,y1,x2,y2 = 0;
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


function split(){
  var input1 = document.getElementById("input1").value;
  var input2 = document.getElementById("input2").value;

  input1 = input1.replace(/[()]/g,'');
  input2 = input2.replace(/[()]/g,'');

  var coordinates1 = input1.split(',');
  var coordinates2 = input2.split(',');

  x1 = parseFloat(coordinates1[0].trim());
  y1 = parseFloat(coordinates1[1].trim());
  x2 = parseFloat(coordinates2[0].trim());
  y2 = parseFloat(coordinates2[1].trim());

}

function validateInputs() {
  const input1 = document.getElementById('input1').value;
  const input2 = document.getElementById('input2').value;
  const result = document.getElementById('result');
  let message = '';
  let isValid = true;


  const regex = /^\(-?\d+,-?\d+\)$/;

  if (input1 ==='') {
    message += '- Starting Point is Empty! Please fill it first!<br>';
    isValid = false;
  }
  else if (!regex.test(input1)){
    message += '- Starting Point is not valid! Must be in Format (number,number).<br>';
    isValid = false;
  }

  if (input2 ==='') {
    message += '- End Point is Empty! Please fill it first!<br>';
    isValid = false;
  }
  else if(!regex.test(input2)){
    message += '- End Point is not valid! Must be in Format (number,number).<br>';
    isValid = false;
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
