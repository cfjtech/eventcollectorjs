# CFJ Web Tracking
## Why create this project?
* Need tracking user interaction without GA 
* Build custom event tracking easy way
* Simple && fast client js
* Zero Dependence with any other library
* Very light weight just 4kb after minify
* Full browser support


## Build:
* ``npm i && npm run build``

## API:
### ``init({options})`` : Init params for client tracking

* url : required , API entry point.
* time : optional , schedule tracking timer.
* userId: optional.
* userEmail: optional.
* routeName: optional.
* app: optional.
* git_branch: optional.
* git_revision: optional.
* encode : optional . When encode = true tracking data will be encode before send to server.


## Setup:
Includes setting code to anywhere on your website
```html
<script>(function(w,d,s,l,i){w[l]=w[l]||[];var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s);j.async=true;j.src='https://localhost/public/eventcollectorjs/sdk-0.1.1.js';f.parentNode.insertBefore(j,f);
    w['cfjEndpoint'] = i;
    })(window,document,'script','cfjDataLayer','https://localhost/api/pixel');
    cfjDataLayer.push({event: 'pageView'})
</script>
```

## Run:
* Demo : ``npm start``  => and open => http://localhost:1234
* Live : includes build file to anywhere on your website
