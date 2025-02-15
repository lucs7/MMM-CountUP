# MMM-CountUP
A [MagicMirror²](https://magicmirror.builders) helper module to create a progressive counter from a specific date.

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/bibaldo/MMM-CountUP/master/LICENSE)

![Example](.github/example.gif)

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/bibaldo/MMM-CountUP.git
````

Add the module to the modules array in the `config/config.js` file:
````javascript
  {
    module: "MMM-CountUP"
  },
````

## Configuration options

The following properties can be configured:


| Option                       | Description
| ---------------------------- | -----------
| `header`                     | The header text <br><br> **Default value:** `'Days passed since COVID19 Quarantine'`
| `date`                       | Start date <br> **Format:** `YYYY-MM-DD`
| `time`                       | Start time <br> **Format:** `HH:MM:SS`
| `showSeconds`                | Show or not seconds in the time display <br><br>**Default value:** `true`
| `showFullDate`               | Show or not a full date with years, months, weeeks, etc <br><br>**Default value:** `false`
| `showOnlyWeeks`              | Show or not date with weeeks and days only <br><br>**Default value:** `false`

## Config Example

````javascript
  {
    module: "MMM-CountUP",
    config: {
      header: 'Days passed since COVID19 Quarantine',
      showSeconds: true,
      date: '2020-03-20',
      time: '00:00:00'
    }
  },
````
## Updating

To update the module to the latest version, use your terminal to go to your MMM-CountUP module folder and type the following command:

````
git pull
```` 

I've inspired in doing this module because of the COVID-19 Quarantine but you can use it for whatever you want

Feel free to open any Issue :smiley:
