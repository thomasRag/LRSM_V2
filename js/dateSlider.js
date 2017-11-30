
/**********************************************/
// Create a new date from a string, return as a timestamp.
function timeStamp (str) {
  return new Date(str).getTime()
}
// Create a list of day and monthnames.
var	months = [
  '01', '02', '03',
  '04', '05', '06', '07',
  '08', '09', '10',
  '11', '12'
]

// Create a string representation of the date.
function formatDate (date) {
  return date.getDate() + '-' +
    // weekdays[date.getDay()] + ", " +

        months[date.getMonth()] + '-' +
        date.getFullYear()
}

function toFormat (v) {
  return formatDate(new Date(v))
}

var dateSlider = document.getElementById('slider-date')
noUiSlider.create(dateSlider, {
// Create two timestamps to define a range.
  connect: true,
	  start: [ timeStamp('2017'), timeStamp('2018') ],
  range: {
		// Starting at 500, step the value by 500,
		// until 4000 is reached. From there, step by 1000.
    'min': timeStamp('0000'),
    '10%': [ timeStamp('2017'), 7 * 24 * 60 * 60 * 1000 ],
    '80%': [ timeStamp('2018'), 7 * 24 * 60 * 60 * 1000 ],
    'max': timeStamp('9999')
  },

// Steps of one week
  step: 7 * 24 * 60 * 60 * 1000,

// Two more timestamps indicate the handle starting positions.

  format: { to: toFormat, from: Number }

})

function sp (event) { event.stopPropagation() }

function makeTT (i, slider) {
  var tooltip = document.createElement('div'),
  		input = document.createElement('input')

	// Add the input to the tooltip
  tooltip.className = 'noUi-tooltip'
  tooltip.appendChild(input)

  // On change, set the slider
  input.addEventListener('change', function () {
  	var values = []
    var toNumber = timeStamp(this.value)
    values[i] = toNumber
    slider.noUiSlider.set(values)
  })

  // Catch all selections and make sure they don't reach the handle
  input.addEventListener('mousedown', sp)
  input.addEventListener('touchstart', sp)
  input.addEventListener('pointerdown', sp)
  input.addEventListener('MSPointerDown', sp)

  // Find the lower/upper slider handle and insert the tooltip
  slider.querySelector(i ? '.noUi-handle-upper' : '.noUi-handle-lower').appendChild(tooltip)

  return input
}
// An 0/1 indexed array of input elements
var tooltipInputs = [makeTT(0, dateSlider), makeTT(1, dateSlider)]

/* updateJSON function from timeslider is located in filter.js*/

