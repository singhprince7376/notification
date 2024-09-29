// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
              console.log('ServiceWorker registered: ', registration);
          })
          .catch(error => {
              console.log('ServiceWorker registration failed: ', error);
          });
  });
}

// Function to schedule a notification based on user-selected time
function scheduleNotification() {
  const timeInput = document.getElementById('notificationTime').value;
  
  if (!timeInput) {
      alert('Please select a time for the notification.');
      return;
  }

  const [hours, minutes] = timeInput.split(':').map(Number);
  const now = new Date();
  const scheduledTime = new Date(now);

  scheduledTime.setHours(hours);
  scheduledTime.setMinutes(minutes);
  scheduledTime.setSeconds(0);  // Set seconds to 0 for precise timing

  // Calculate the delay in milliseconds
  const delay = scheduledTime - now;

  // If the time is in the past, assume it's for the next day
  if (delay < 0) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const finalDelay = scheduledTime - now;  // Recalculate for next day case

  // Set a timeout to show the notification at the scheduled time
  setTimeout(() => {
      showNotification();
  }, finalDelay);

  alert('Notification scheduled!');
}

// Show a notification
function showNotification() {
  if (Notification.permission === 'granted') {
      new Notification('It\'s time to switch your phone to ring mode!');
  } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
              new Notification('It\'s time to switch your phone to ring mode!');
          }
      });
  }
}
