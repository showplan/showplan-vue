# ShowPlan-Vue

ShowPlan-Vue is a Vue.js component for rendering [showplan.js](https://github.com/showplan/showplan-js) parsed SQL Server SHOWPLAN XML files into a strongly typed object. 

[![npm version](https://badge.fury.io/js/showplan-vue.svg)](https://badge.fury.io/js/showplan-vue)

## Installation

Use NPM or YARN to install foobar.

```bash
yarn add showplan-vue
```

## Usage

```html
<showplan-statement :showPlan="showPlan"></showplan-statement>
```

``` typescript
import { Statement as ShowplanStatement } from 'showplan-vue';
import 'showplan-vue/dist/showplan-vue.css';

// showplan.js is required for parsing XML files
import { ShowPlanParser } from 'showplan-js';
const showPlan = ShowPlanParser.Parse(showPlanXml);
```

ShowPlan-Vue uses CSS variables for its styling. 

``` css
--background: #fff;
--foreground: rgba(0, 0, 0, 0.8);
--alt-background: #F1F1EF;
--border: rgba(0,0,0,.25);
--alt-border: rgba(0,0,0,.2);
--red: #A71D5D;
--blue: #183691;
--green: #63a35c;
--grey: #969896;
--brown: #75715E;
--orange: #df5000;
--purple: #795da3;
--light-blue: #445588;
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
