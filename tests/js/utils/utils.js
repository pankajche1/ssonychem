   /* this function is useful to parse the parameters that come with 
        url ? thing 
   */
    function matchParams(query) {
       var match;
       var params = {};

       // replace addition symbol with a space
       var pl = /\+/g;

       // delimit params
       var search = /([^&=]+)=?([^&]*)/g;


       var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };

       while (match = search.exec(query)){
         params[decode(match[1])] = decode(match[2]);
       }
       return params;
    }//function matchParams(query)
