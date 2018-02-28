// Program was written in Google Chrome
// Untested in other browsers (!!!)

(function StyleCleaner(){
    var scope = this;
    
    this.csv = 0;
    this.styleTags = 0;
    this.mediaQueries = 0;
    this.selectorArr = [];
    this.uniqueSelectors = [];
    this.duplicateSelectors = 0;
    
    this.loopCSSRules = function(rules){
        for(var i = 0; i < rules.length; i++){
            var selectors = rules[i].selectorText;
            if(selectors){
                scope.loopSelectors(selectors);
            }
            else{
                // Handle Media Queries
                var mediaRules = rules[i].cssRules;
                scope.loopCSSRules(mediaRules);
                scope.mediaQueries++;
            }
        }
    }
    
    this.loopSelectors = function(selectors){
        if(selectors.indexOf(',') == -1){
            if($(selectors).length <= 0) scope.selectorArr.push(selectors);
        }
        else{
            scope.csv++;
            selectors = selectors.split(',');
            for(var s = 0; s < selectors.length; s++){
                if($(selectors[s]).length <= 0) scope.selectorArr.push(selectors[s]);
            }
        }
    }
    
    this.removeDuplicates = function(selectors){
        $.each(selectors, function(i, el){
            if($.inArray(el, scope.uniqueSelectors) === -1){
                scope.uniqueSelectors.push(el);
            } 
            else{
                scope.duplicateSelectors++;
            }
        });
        scope.report();
    }
    
    this.report = function(){
        console.log('Style Tags: ' + scope.styleTags);
        console.log('Media Queries: ' + scope.mediaQueries);
        console.log('Comma-Separated Selectors: ' + scope.csv);
        console.log('Duplicate Selectors: ' + scope.duplicateSelectors);
        console.log(scope.uniqueSelectors);
    }
    
    this.run = (function(){
        var styles = document.getElementsByTagName('style');
        scope.styleTags = styles.length;

        for(var o = 0; o < scope.styleTags; o++){
            var rules = styles[o].sheet.cssRules;
            scope.loopCSSRules(rules);
        }
        removeDuplicates(scope.selectorArr);
    }());
}());
