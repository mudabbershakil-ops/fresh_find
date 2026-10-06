

export function getMarketCurrentStatus(operatingHours  = []) {
  var now= new Date();

  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDayName= daysOfWeek[now.getDay()];
  let currentMinutes  = now.getHours() * 60 + now.getMinutes();

  var todaySchedule = operatingHours.find(
    (h) => h.day.toLowerCase() == currentDayName.toLowerCase()
  );

  if (!todaySchedule) {
    
    return {
      isOpen: false,
      statusLabel: 'Closed Today',
      todayHours: null,
      currentDayName,
      detail: `Closed on ${currentDayName}s`
    };
  }

  const [openHour, openMin]= todaySchedule.open.split(':').map(Number);
  const [closeHour, closeMin]= todaySchedule.close.split(':').map(Number);

  var openMinutesTotal = openHour * 60 + openMin;
  let closeMinutesTotal = closeHour * 60 + closeMin;

  if (currentMinutes >= openMinutesTotal && currentMinutes < closeMinutesTotal) {
    var minutesLeft= closeMinutesTotal - currentMinutes;
    var hoursLeft = Math.floor(minutesLeft / 60);
    var minsLeft= minutesLeft % 60;
    var closingInText  = hoursLeft > 0 ? `${hoursLeft}h ${minsLeft}m` : `${minsLeft}m`;

    return {
      isOpen: true,
      statusLabel: 'Open Right Now',

      todayHours: `${todaySchedule.open} – ${todaySchedule.close}`,
      closingSoon: minutesLeft <= 60,
      closingInText,
      currentDayName,
      detail: `Open today until ${todaySchedule.close} (Closes in ${closingInText})`
    };
  }

  if (currentMinutes < openMinutesTotal) {
    return {
      isOpen: false,
      statusLabel: 'Opens Later Today',
      todayHours: `${todaySchedule.open} – ${todaySchedule.close}`,
      currentDayName,
      detail: `Opens today at ${todaySchedule.open}`
    };
  }

  return {
    isOpen: false,

    statusLabel: 'Closed For The Day',
    todayHours: `${todaySchedule.open} – ${todaySchedule.close}`,
    currentDayName,
    detail: `Closed at ${todaySchedule.close}`
  };
}

export function formatSchedule(operatingHours  = []) {
  if (!operatingHours || operatingHours.length == 0) return 'Hours not listed';
  return operatingHours.map((h) => `${h.day}: ${h.open} – ${h.close}`).join(' • ');
}
