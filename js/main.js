/*  ---------------------------------------------------
    Template Name: Europa Hotel And Spa
    Description: Europa Hotel And Spa HTML Template
    Author: Colorlib
    Author URI: http://www.colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });
    // Intro carousel
    var heroCarousel = $("#heroCarousel");

    heroCarousel.on('slid.bs.carousel', function(e) {
        $(this).find('h2').addClass('animated fadeInDown');
        $(this).find('p').addClass('animated fadeInUp');
        $(this).find('.btn-get-started').addClass('animated fadeInUp');
    });
    
  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // book isotope and filter
  $(window).on('load', function() {
    var bookIsotope = $('.book-container').isotope({
      itemSelector: '.book-item',
      layoutMode: 'fitRows'
    });

    $('#book-flters li').on('click', function() {
      $("#book-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      bookIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

    
    // Initi AOS
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false
  });

  //click see more
  
$("document").ready(function(){
      $("#seemore").click(function(){
        $("#seemore").css("display","none");
        $("#seemorep").css("display","block");
        $("#seeless").css("display","block");
      })
      $("#seeless").click(function(){
        $("#seemorep").css("display","none");
        $("#seeless").css("display","none");
      })
    })

  
//Click add to cart

$("document").ready(function(){
        count();
        getData();

      function getData(){
        $(".addtocart").click(function(){
        var id=$(this).data('id');
        var author=$(this).data('author');
        var bname=$(this).data('bname');
        var price=$(this).data('price');

        var item={
              id:id,
              author:author,
              bname:bname,
              price:price,
              qty:1
              };
      

        var book_str=localStorage.getItem("book_shop");
        var book_arr;
        if(book_str == null){
           book_arr=Array();
        }
        else{
           book_arr=JSON.parse(book_str);
        }
        var status=false;
        $.each(book_arr,function(i,v){

          if(id==v.id){
            status=true;
            v.qty++;
          }
        })
        if(!status){
        book_arr.push(item);  
        }
        
        var book_data=JSON.stringify(book_arr);
        localStorage.setItem("book_shop",book_data);
        count();
      })
    }
      function count(){
        var book_str=localStorage.getItem("book_shop");
        var book_arr;
        if(book_str){
          book_arr=JSON.parse(book_str);
          var count=0;
          $.each(book_arr,function(i,v){
            var qty=v.qty;
            count+=parseInt(qty);
            $("#count").text(count);
          })
        }else{
        $("#count").text('');
      }
      }
    })

/*Checkout*/

    $(document).ready(function(){

      count();
      getData();
      function getData(){
        var book_str=localStorage.getItem("book_shop");
        var book_arr;
        if(book_str){
          var html='',j=1,subTotal,total=0;
          book_arr=JSON.parse(book_str);
          $.each(book_arr,function(i,v){
            subTotal=v.price*v.qty;
            total+=subTotal;
            html+=`<tr>
                <th scope="row">${j++}</td>
                <td scope="row" id="bname">${v.bname}</td>
                <td>${v.author}</td>
                <td>${v.price}</td>
                <td><span id="plus" data-i="${i}"> + </span> ${v.qty}<span id="minus" data-i="${i}"> - </span></td>
                <td>${subTotal}</td>
                 </tr>`;

          })
          html+=`<tr>
                 <td colspan="5" style="text-align:center"></td>
                 <td>Subtotal:${total}</td>
                 </tr>`;
                 $("#tbody").html(html);


        }
      }
        $("#tbody").on('click','#plus',function(){
        var datai=$(this).data('i');

        var book_str=localStorage.getItem("book_shop");
        var book_arr;
        if(book_str){
          var qty;
          book_arr=JSON.parse(book_str);
          $.each(book_arr,function(i,v){
            if(datai == i){
              v.qty++;
            }

          })
          var book_data=JSON.stringify(book_arr);
          localStorage.setItem("book_shop",book_data);
          getData();count();
          
        }
        
      })
        $("#tbody").on('click','#minus',function(){
          var datai=$(this).data('i');
          var book_str=localStorage.getItem("book_shop");
          var book_arr;
          if(book_str){
            book_arr=JSON.parse(book_str);
            $.each(book_arr,function(i,v){
              if(datai == i){
                v.qty--;
                if(v.qty == 0 ){
                  book_arr.splice(datai,1);
                }
              }
            })
          var book_data=JSON.stringify(book_arr);
          localStorage.setItem("book_shop",book_data);
          getData();
          count();
          
          }

        })
        $("#order").click(function(){
          localStorage.clear();
          $("#tbody").html('');
          getData();
          count();
        })


    })
    function count(){
      var book_str=localStorage.getItem("book_shop");
      var book_arr;
      if(book_str){
        var count=0;
        book_arr=JSON.parse(book_str);
        $.each(book_arr,function(i,v){
          var qty=v.qty;
          count+=parseInt(qty);
          $("#count").text(count);
        })
      }else{
        $("#count").text('');
      }
    }
 


})(jQuery);