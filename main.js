/*
 * Your program must print string with the number of years and months and the total number of
 days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly
 into the code. All code need to be written in this file.
 *
 * Result must be shown as a string in years, months and total days. If years or months
 are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];


function outputDate(dates) {
  function pluralSingularString(number, pluralStr, singularStr) {
    let fullString = number
    if   (number === 1) fullString += ` ${singularStr}, `;
    else if(number > 1) fullString += ` ${pluralStr}, `;
    else                fullString = '';
    return              fullString;
  }
  const dateFormat      = date => {
    const  formated = date.split('.');
    return new Date(Date.parse(`${formated[1]}.${formated[0]}.${formated[2]}`));
  }
  const getDaysInMonth   = (year, month) => new Date(year, month + 1, 0).getDate();
  const dayToMilisecond = 1000 * 60 * 60 * 24;
  const startDate       = dateFormat(dates[0]);
  const endDate         = dateFormat(dates[1]);
  let months            = -1;
  let daysDifference    = Math.ceil((endDate - startDate) / dayToMilisecond);
  let days              = `total ${daysDifference} days`;

  while (daysDifference >= 0) {
    daysDifference -= getDaysInMonth(startDate.getUTCFullYear(), startDate.getMonth());
    months     += 1;
    startDate.setMonth(startDate.getMonth() + 1)
  }

  const years = pluralSingularString(Math.floor(months / 12), 'years', 'year');
  months      = pluralSingularString((months %= 12), 'months', 'month');

  return years + months + days;
}

