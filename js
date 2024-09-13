function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');  // Loads the HTML UI
}


function getEmployees() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');
  return sheet.getDataRange().getValues();
}


function validateUser(username, password) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === username && data[i][1] === password) {
      return { success: true, username: username };
    }
  }
  return { success: false, message: "Login failed. Please check your credentials." };
}


function validateUser(username, password) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Employee');
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === username && data[i][1] === password) {
      return { success: true, username: username };
    }
  }
  return { success: false, message: "Login failed. Please check your credentials." };
}


function logLoginAttempt(username, status, ip) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Login History Details');
  var now = new Date();
  sheet.appendRow([username, status, now, ip]);
}


function clockIn(location) {
  if (!location || !location.latitude || !location.longitude) {
    throw new Error('Invalid location data. Latitude and Longitude are required.');
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Primary');
  var now = new Date();
  var ip = getIP(); // Replace with your method of capturing IP address

  // Log clock-in with latitude, longitude, and IP
  sheet.appendRow([username, now.toLocaleTimeString(), '', '', location.latitude, location.longitude, ip, 'Clocked In', 1]);
  return { success: true, message: "Clocked in successfully!" };
}




function clockOut(username) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Primary');
  var now = new Date();
  var data = sheet.getDataRange().getValues();
  var rowToUpdate = -1;

  // Find the clock-in row for the user
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === username && data[i][2] === '') {  // If user has not clocked out
      rowToUpdate = i;
      break;
    }
  }

  if (rowToUpdate > -1) {
    sheet.getRange(rowToUpdate + 1, 3).setValue(now.toLocaleTimeString());  // Set check-out time
    sheet.getRange(rowToUpdate + 1, 4).setValue(calculateTotalTime(data[rowToUpdate][1], now));  // Calculate total time
    return { success: true, message: "Clocked out successfully!" };
  }
  return { success: false, message: "You are not clocked in." };
}

function calculateTotalTime(checkInTime, checkOutTime) {
  var checkIn = new Date("1970-01-01T" + checkInTime + "Z");
  var checkOut = new Date("1970-01-01T" + checkOutTime + "Z");
  var totalTime = (checkOut - checkIn) / 3600000;  // Time in hours
  return totalTime.toFixed(2) + " hours";  // Return total hours worked
}


function getIP() {
  // Use Apps Script's native method to capture the user's IP address
  return Session.getEffectiveUser().getEmail();  // Replace with actual IP capturing logic if needed
}


