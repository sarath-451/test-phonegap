/**
 * Created by duongle on 6/16/14.
 */
(function($){
  "use strict";
    $(document).ready(function() {
        $(".fa.fa-envelope-o").on("click",function(){
            $.post(
                ajax_subscribe.ajaxurl,
                {
                    action : 'awe_subscribe',

                    // send the nonce along with the request
                    subscribeNonce : ajax_subscribe.subscribeNonce,
                    email: $("input.fv-subscribe-email").val()
                },
                function( response ) {
                    var data = JSON.parse(response);
                    if(data.type=='error')
                    {
                        $(".subscribe-status").html(data.msg).addClass("alert-error").removeClass("alert-done").fadeIn();
                    }
                    else{
                        $(".subscribe-status").html(data.msg).addClass("alert-done").removeClass("alert-error").fadeIn();
                    }
                }
            );
            return false;
        })

     /// load more posts
     var page_post = $('.post-page').val();
       if($('#load').attr('data-page') >= page_post){
          $('#load').parent().css('display','none');
       }
      $(document).on("click", "#load",function(e){
          e.preventDefault();
           var paged = $(this).attr("data-page");
           $.ajax({
             type : "post",
                url : ajax_process.ajaxurl,
                crossDomain: true,
                data: {
                   action: "load_more_posts",
                   paged: paged
                },
                success: function(res){
                    var $newItem = $(res);
                    $("#blog-content").append($newItem).masonry( 'appended', $newItem, true );
                    $('.blog-grid').masonry({
                        columnWidth: '.grid-sizer',
                        itemSelector: '.post'
                    });
                      var p = parseInt(paged) + 1;
                      console.log($("#load").attr("data-page"));
                      $("#load").attr("data-page",p);
                      if(p == parseInt( page_post ) ){
                         $('#load').parent().css('display','none');                        
                      }
                },
                error: function(MLHttpRequest, textStatus, errorThrown){  
                    console.log(errorThrown);  
                  }
                })
       });      

    });
})(jQuery);