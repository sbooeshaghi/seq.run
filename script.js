function estimateFileSize() {
  var numberOfReads = parseInt(
    document.getElementById("fileSizeNumberOfReads").value
  );
  var unitMultiplier = parseInt(
    document.getElementById("fileSizeUnitMultiplier").value
  );
  numberOfReads *= unitMultiplier;

  var basesPerRead = parseInt(
    document.getElementById("fileSizeBasesPerRead").value
  );

  var linesPerRead = 4;
  var readLength = basesPerRead + 1;
  var qualityScoreLength = basesPerRead + 1;
  var headerLength = 63 + 1; // Header + newline
  var spacerLength = 1 + 1; // Newline + plus sign
  var compressionRatio = 5.2173; // Estimated average compression ratio

  var estimatedSize =
    numberOfReads *
    (readLength + qualityScoreLength + headerLength + spacerLength) *
    (1 / compressionRatio);
  var fileSize = formatSize(estimatedSize);
  var peFileSize = formatSize(estimatedSize * 2);

  var assumptions = {
    "Number of reads": numberOfReads.toLocaleString(),
    "Length of header": headerLength,
    "Length of read": basesPerRead + "bp",
    "Length of quality score": basesPerRead + "bp",
    "Lines per read": "4 (matching the FASTQ file standard)",
    "Compression ratio": `1 / ${compressionRatio}`,
  };

  var list = document.getElementById("fileSizeAssumptions");
  list.textContent = "";
  for (var key in assumptions) {
    var listItem = document.createElement("li");
    listItem.innerHTML = `<b>${key}</b>` + ": " + assumptions[key];
    list.appendChild(listItem);
  }

  document.getElementById(
    "fileSizeResult"
  ).textContent = `Estimated gzipped FASTQ file size: ${fileSize}, (${peFileSize} for paired-end)`;
  document.getElementById("fileSizeAnalysis").innerHTML =
    "How the compression ratio was calculated: <a href='model.html'>link</a>";
}

function estimateNumReads() {
  var fileSize = parseInt(document.getElementById("numReadsFileSize").value);
  var unitMultiplier = parseInt(
    document.getElementById("numReadsUnitMultiplier").value
  );
  fileSize *= unitMultiplier;

  var basesPerRead = parseInt(
    document.getElementById("numReadsBasesPerRead").value
  );

  var linesPerRead = 4;
  var readLength = basesPerRead + 1;
  var qualityScoreLength = basesPerRead + 1;
  var headerLength = 63 + 1; // Header + newline
  var spacerLength = 1 + 1; // Newline + plus sign
  var compressionRatio = 5.2173; // Estimated average compression ratio

  var numReads =
    (fileSize * compressionRatio) /
    (readLength + qualityScoreLength + headerLength + spacerLength);
  // var fileSize = formatSize(estimatedSize);
  // var peFileSize = formatSize(estimatedSize * 2);

  var assumptions = {
    "File size": formatSize(fileSize),
    "Length of header": headerLength,
    "Length of read": basesPerRead + "bp",
    "Length of quality score": basesPerRead + "bp",
    "Lines per read": "4 (matching the FASTQ file standard)",
    "Compression ratio": `1 / ${compressionRatio}`,
  };

  var list = document.getElementById("numReadsAssumptions");
  list.textContent = "";
  for (var key in assumptions) {
    var listItem = document.createElement("li");
    listItem.innerHTML = `<b>${key}</b>` + ": " + assumptions[key];
    list.appendChild(listItem);
  }

  document.getElementById(
    "numReadsResult"
  ).textContent = `Estimated number of reads in gzipped FASTQ: ${Math.round(
    numReads
  ).toLocaleString()}`;
  document.getElementById("numReadsAnalysis").innerHTML =
    "How the compression ratio was calculated: <a href='model.html'>link</a>";
}

function formatSize(sizeInBytes) {
  var units = ["B", "kB", "MB", "GB", "TB", "PB"];
  var power = 0;
  while (sizeInBytes >= 1000 && power < units.length - 1) {
    sizeInBytes /= 1000;
    power++;
  }
  return sizeInBytes.toFixed(2) + " " + units[power];
}
