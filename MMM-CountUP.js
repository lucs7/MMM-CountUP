/* global Module */

/* Magic Mirror
 * Module: MMM-CountUP
 *
 * By Jose Forte
 * MIT Licensed.
 */

Module.register("MMM-CountUP", {
  defaults: {
    header: 'Days passed since COVID19 Quarantine',
    date: '2020-03-20', // YYYY-MM-DD
    time: '00:00:00', // HH:MM:SS
    showFullDate : false,
    showOnlyWeeks: false,
    showSeconds: true
  },

  getStyles: function() {
    return ["MMM-CountUP.css"]
  },

  start: function() {
    Log.info("Starting module: " + this.name);
    
    // Schedule update interval.
    var self = this;
    var calcCountUP = setInterval(function() {
      self.updateDom();
    }, 1000)
  },

  getHeader: function() {
    return this.config.header
  },

  getDom: function() {
    var startDate = new Date(this.config.date + ' ' + this.config.time)
    // milliseconds since start timedate
    var timestamp = startDate.getTime()
    // difference between timestamp and now
    var datesDifference = this.dateDiff(timestamp)

    var wrapper = document.createElement("table")
    wrapper.className = 'countUP'

    var infoRow = document.createElement("tr")

    var yearsWrapper = document.createElement("td"),
        monthsWrapper = document.createElement("td"),
        weeksWrapper = document.createElement("td"),
        daysWrapper = document.createElement("td"),
        hoursWrapper = document.createElement("td"),
        minutesWrapper = document.createElement("td"),
        secondsWrapper = document.createElement("td");

    yearsWrapper.innerHTML = datesDifference.year
    yearsWrapper.className = 'digits'
    monthsWrapper.innerHTML = datesDifference.month
    monthsWrapper.className = 'digits'
    weeksWrapper.innerHTML = datesDifference.week
    weeksWrapper.className = 'digits'
    daysWrapper.innerHTML = datesDifference.day
    daysWrapper.className = 'digits'
    hoursWrapper.innerHTML = datesDifference.hour
    hoursWrapper.className = 'digits'
    minutesWrapper.innerHTML = datesDifference.minute
    minutesWrapper.className = 'digits'
    if(this.config.showSeconds){ secondsWrapper.innerHTML = datesDifference.second }

    infoRow.appendChild(yearsWrapper)
    infoRow.appendChild(monthsWrapper)
    infoRow.appendChild(weeksWrapper)
    infoRow.appendChild(daysWrapper)
    infoRow.appendChild(hoursWrapper)
    infoRow.appendChild(minutesWrapper)
    if(this.config.showSeconds){ infoRow.appendChild(secondsWrapper) }

    wrapper.appendChild(infoRow)

    var textsRow = document.createElement("tr")
    textsRow.className = 'textsRow'

    var textYearsWrapper = document.createElement("td"),
        textMonthsWrapper = document.createElement("td"),
        textWeeksWrapper = document.createElement("td"),
        textDaysWrapper = document.createElement("td"),
        textHoursWrapper = document.createElement("td"),
        textMinutesWrapper = document.createElement("td"),
        textSecondsWrapper = document.createElement("td");

    textYearsWrapper.innerHTML = 'YEARS'
    textMonthsWrapper.innerHTML = 'MONTHS'
    textWeeksWrapper.innerHTML = 'WEEKS'
    textDaysWrapper.innerHTML = 'DAYS'
    textHoursWrapper.innerHTML = 'HOURS'
    textMinutesWrapper.innerHTML = 'MINUTES'
    if(this.config.showSeconds){ textSecondsWrapper.innerHTML = 'SECONDS' }
    

    textsRow.appendChild(textYearsWrapper)
    textsRow.appendChild(textMonthsWrapper)
    textsRow.appendChild(textWeeksWrapper)  
    textsRow.appendChild(textDaysWrapper)
    textsRow.appendChild(textHoursWrapper)
    textsRow.appendChild(textMinutesWrapper)
    if(this.config.showSeconds){ textsRow.appendChild(textSecondsWrapper) }

    wrapper.appendChild(textsRow)
    
    if (this.config.showOnlyWeeks || !this.config.showFullDate || datesDifference.year == 0 ) {
      yearsWrapper.className += ' none'
      textYearsWrapper.className += ' none'
    }
    if (this.config.showOnlyWeeks || !this.config.showFullDate || datesDifference.month == 0 ) {
      monthsWrapper.className += ' none'
      textMonthsWrapper.className += ' none'
    }
    
    if (this.config.showOnlyWeeks) { // hide hours, minutes and seconds, then finish
      hoursWrapper.className += ' none'
      textHoursWrapper.className += ' none'
      minutesWrapper.className += ' none'
      textMinutesWrapper.className += ' none'
      secondsWrapper.className += ' none'
      if(this.config.showSeconds){ textSecondsWrapper.className += ' none' }

      return wrapper
    }

    if (!this.config.showFullDate || datesDifference.week == 0 ) {
      weeksWrapper.className += ' none'
      textWeeksWrapper.className += ' none'
    }

    return wrapper
  },

  dateDiff: function (timestamp) {
    let structure = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    }
    
    let delta = Math.abs(timestamp - new Date().getTime()) / 1000
    let res = {}

    if (this.config.showOnlyWeeks) {
      delete structure['year']
      delete structure['month']
    } else if (!this.config.showFullDate) {
      delete structure['year']
      delete structure['month']
      delete structure['week']
    }
    for(let key in structure) {
      res[key] = Math.floor(delta / structure[key])
      delta -= res[key] * structure[key]
    }

    return res
  }

})
