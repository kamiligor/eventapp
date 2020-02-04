exports.isValidDate = function(value) {
  var date = new Date(value);
  var today = new Date();
  today.setHours(0,0,0,0);
  return (!isNaN(date.getTime()) && date >= today);
}
