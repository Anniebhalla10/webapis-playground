const isSupported = () => {
  return navigator.getBattery ? true : false;
};

let charging, level;

const getBatteryStatus = () => {
  if (navigator.getBattery) {
    navigator.getBattery().then(function (battery) {
      function updateAllBatteryInfo() {
        updateLevelInfo();
        updateChargeInfo();
      }
      updateAllBatteryInfo();

      battery.addEventListener('chargingchange', function () {
        updateChargeInfo();
      });
      function updateChargeInfo() {
        charging = battery.charging;
        let chargeMessage = battery.charging ? 'Yes' : 'No';
        console.log('Battery charging? ' + chargeMessage);

        let batteryElem = document.getElementById('battery-status-id');
        let batteryChargingElem = document.getElementById(
          'battery-charging-status-id'
        );
        let statusElem = document.getElementById('battery-status-charging');

        if (batteryElem && batteryChargingElem) {
          if (charging) {
            batteryChargingElem.style.display = 'block';
            batteryElem.style.display = 'none';
          } else {
            batteryChargingElem.style.display = 'none';
            batteryElem.style.display = 'block';
          }
        }

        if (statusElem) {
          statusElem.innerHTML = `<b>${chargeMessage}</b>`;
        }
      }

      battery.addEventListener('levelchange', function () {
        updateLevelInfo();
      });

      function updateLevelInfo() {
        console.log('Battery level: ' + battery.level * 100 + '%');
        level = battery.level * 100;
        let statusElem = document.getElementById('battery-status-level');
        if (statusElem) {
          statusElem.innerHTML = `<b style="color: ${getColor()}">${level}</b>%`;
        }
      }
    });
  } else {
    console.log(`This API is Not Supported`);
  }
};

const getColor = () => {
  let color = '#000000';

  if (level >= 0 && level <= 20) {
    color = '#FF0000';
  } else if (level > 20 && level <= 60) {
    color = '#FFBF00';
  }
  if (level > 60 && level <= 100) {
    color = '#008000';
  }
  return color;
};

export { isSupported, getBatteryStatus };
