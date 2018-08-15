(function($) {
    "use strict";
    	// console.log("aaa");
    $(window).load(function(){
    	 $('.navigation').find('.nav > li').each(function(){
            // console.log($(this).find("a").attr("href"));
            var curent_link = $(this).find("a").attr("href");
            if(curent_link !== undefined){
                if(curent_link.search("#") != -1 && curent_link.search("http://") == -1){
                    // var new_link = curent_link.replace(AWEHOME,'');
                    $(this).find("a").attr("href",AWEHOME+curent_link);
                }
            }
        })
    })
})(jQuery);