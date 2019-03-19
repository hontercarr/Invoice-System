# CattyShack Invoice

A custom built invoice system for the CattyShack built ontop of NodeJS utilizing Express and MongoDB.

  - Customers
  - Invoice List
  - Auto Emails

# Development Information

  - NodeJS, Express, MongoDB application
  - Uses PhantomJS for auto emails


Build Info:
  ```sh
$ git clone https://github.com/suaw-dev/Invoice-System.git
$ npm i
$ npm run star-watch
```
Auto Email Information:
 - All customer emails need to be retrieved and stored in my.json before running the mass email
```sh
$ node getEmails.js
```
 - After emails are harvested and stored, run emailAll.js with Phantom (below is assuming a windows enviornment)
```sh
$ .\phantomjs .\emailAll.js
```
## Gallery
Main Dashboard
![Dashboard](https://github.com/suaw-dev/Invoice-System/blob/Isaac/README_images/dashboard.png?raw=true)
Invoices List
![Invoices List](https://github.com/suaw-dev/Invoice-System/blob/Isaac/README_images/invoices.png?raw=true)
Customers List
![Customers List](https://github.com/suaw-dev/Invoice-System/blob/Isaac/README_images/customers.png?raw=true)
Add Invoice
![Add Invoices](https://github.com/suaw-dev/Invoice-System/blob/Isaac/README_images/add_invoice.png?raw=true)
Example Email sent to Customers
![Email](https://github.com/suaw-dev/Invoice-System/blob/Isaac/README_images/email.png?raw=true)



## Info
Developed by Hunter with from Isaac.

Twitter – [@suawdev](https://twitter.com/suawdev) – suawdev@gmail.com

[https://github.com/suaw-dev](https://github.com/suaw-dev/)

