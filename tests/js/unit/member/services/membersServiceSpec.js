/*global describe, it, beforeEach, inject, expect*/
(function () {
		'use strict()';
function matchParams(query) {
   var match;
   var params = {};

   // replace addition symbol with a space
   var pl = /\+/g;

   // delimit params
   var search = /([^&=]+)=?([^&]*)/g;


   var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };

   while (match = search.exec(query))
     params[decode(match[1])] = decode(match[2]);

   return params;
}
	describe('Members Service test', function () {
		var ctrl, scope, store, membersService;
                var pages = [];
                //var urlBase = '/members';
		beforeEach(module('app'));
                beforeEach(function(){

                   inject(function($injector){

                       membersService = $injector.get("membersService");
                   });//inject
                    var i = 0;
                    var nPages = 5;
                    var page = {};
                    pages = [];
                    var prevCursor = null;
                    var nextCursor = null;
                    var next = false;
                    var prev = false;
                    for(i=0; i<nPages; i++){
                        if(i==0){ prevCursor = null;prev=false;next=true; nextCursor='cursor'+(i+1);}
                        else if(i==nPages-1){ prevCursor = 'cursor'+(i-1);prev=true;next=false;nextCursor=null;}
                        else {prevCursor = 'cursor'+(i-1);prev=true;next=true;nextCursor='cursor'+(i+1);}
                        page = {'objects':[],'cursor':'cursor'+i,'prevCursor':prevCursor,'nextCursor':nextCursor,
                                 'next':next, 'prev':prev
                                 };
                        pages.push(page);

                    }
                });//beforeEach
		beforeEach(inject(function (_$httpBackend_) {
			$httpBackend = _$httpBackend_;
                    //return $http.get(urlBase+"?prev_cursor="+cursor);            
        		$httpBackend.expect('GET',/\/members?.*/g,undefined,undefined,[])
                             .respond(function(method, url, data, headers, params){
                           //console.log(url);//it is ok
                           //console.log(data);//gives undefined
                            //       console.log(params);//gives undefined
                          var params2 = matchParams(url.split('?')[1]);
                          if(params2.prev_cursor != undefined){
                                     console.log(params2.prev_cursor);

                          }
                          if(params2.next_cursor != undefined){
                              console.log(params2.next_cursor);

                          }
                                         return {};

                         });
		}));//before each http

                /*
		beforeEach(inject(function (_$httpBackend_,$controller, $rootScope) {
                   
		}));//before each
                */

		// Load the module containing the app, only 'ng' is loaded by default.
		//beforeEach(module('todomvc'));
		it('should have a non-null service', function () {
            
			expect(membersService).not.toBe(null);
			expect(membersService).not.toBe(undefined);
                        //console.log(membersService.getMessage('pankaj')); 
                       
		});
                it('should cache first page', function(){
                    //create some pages first:
                    var pagesFromCache = [];
                    expect(pages.length).toBe(5);
                    expect(pages[3].cursor).toBe('cursor3');
                    //console.log(pages);
                    // cache first page in the service:
                    membersService.cachePage(pages[0]);
                    pagesFromCache = membersService.getPages();
                    expect(pagesFromCache).not.toBe(undefined);
                    expect(pagesFromCache.length).toBe(1);
                    expect(pagesFromCache[0].cursor).toBe('cursor0');
                    // now try to cache the same page again
                    membersService.cachePage(pages[0]);
                    pagesFromCache = membersService.getPages();
                    expect(pagesFromCache).not.toBe(undefined);
                    // the length should be 1 again cz it will not cache the same page again
                    expect(pagesFromCache.length).toBe(1);
                    expect(pagesFromCache[0].cursor).toBe('cursor0');
                });//it
                it('it should cache the second page', function(){
                    var pagesFromCache = [];
                    // cache first page and second pages in the service:
                    membersService.cachePage(pages[0]);
                    membersService.cachePage(pages[1]);
                    pagesFromCache = membersService.getPages();
                    expect(pagesFromCache).not.toBe(undefined);
                    expect(pagesFromCache.length).toBe(2);
                    expect(pagesFromCache[0].cursor).toBe('cursor0');
                    expect(pagesFromCache[1].cursor).toBe('cursor1');
                    // now cache the second page again and expect the same lengths of the pages:
                    membersService.cachePage(pages[1]);
                    pagesFromCache = membersService.getPages();
                    expect(pagesFromCache).not.toBe(undefined);
                    expect(pagesFromCache.length).toBe(2);
                    expect(pagesFromCache[0].cursor).toBe('cursor0');
                    expect(pagesFromCache[1].cursor).toBe('cursor1');

               });//it
               it('it should give the correct page from the cache', function(){
                   // first cache two pages:
                    var pagesFromCache = [];
                    var page = null;
                    // cache first page and second pages in the service:
                    membersService.cachePage(pages[0]);
                    membersService.cachePage(pages[1]);
                    // now get the second page from the cache:
                    page =  membersService.getPageFromCache(pages[1].cursor);
                    expect(page).not.toBe(null);
                    expect(page.cursor).toBe('cursor1');


               });//it
               it('it should not give the not cached page', function(){
                   // first cache two pages:
                    var pagesFromCache = [];
                    var page = null;
                    // cache first page and second pages in the service:
                    membersService.cachePage(pages[0]);
                    membersService.cachePage(pages[1]);
                    // now get the third page that is not existing from the cache:
                    page =  membersService.getPageFromCache(pages[2].cursor);
                    expect(page).toBe(null);


               });//it
               it('load next page from server',function(){
                     membersService.getNextPage('sunny')
                      .then(function (response) {
                             //$scope.isLoading=false;
                             // processData(response.data);

                    }, function (error) {
              
                      });//member service get prev page
			$httpBackend.flush();

               });//it
               it('load prev page from server',function(){

                        membersService.getPrevPage('pankaj');
			$httpBackend.flush();
               });//it
               it('should give the first page from cache', function(){
                      //first push a page to the cache:
                   // first cache two pages:
                    var pagesFromCache = [];
                    var page = null;
                    // cache first page and second pages in the service:
                    membersService.cachePage(pages[0]);
                    membersService.cachePage(pages[1]);
                    // now get the third page that is not existing from the cache:
                    page =  membersService.getFirstPageFromCache();
                    expect(page).not.toBe(null);
                    expect(page.prev).toBe(false);


               });//it
		/*
		it('should have two projects in the list', function () {
			pending();
			var projects = scope.projects;
			expect(projects).not.toBe(null);
			expect(projects.length).toBe(2);
		});
		it('should have correct first project', function () {
			pending();
			var projects = scope.projects;
			project = projects[0];
			expect(project).not.toBe(null);
			expect(project.name).toBe('Ayuroma Centre');
		});
		it('should download the projects',function(){
			// at first it should have any projects:
			expect(scope.projects).not.toBe(null);
			//expect(scope.projects.length).toBe(0);
			scope.fetchProjects();
			// now mock load
			$httpBackend.flush();
			var projects = scope.projects;
			expect(projects).not.toBe(null);
			expect(projects.length).toBe(2);
			var project = projects[0];
			expect(project).not.toBe(null);
			expect(project.name).toBe('Ayuroma Centre 2' );


		
		});
           */
	});
}());
