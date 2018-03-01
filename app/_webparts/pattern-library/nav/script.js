// $(document).ready(function(){
// 	if ( localStorage.navigation == "true" ) {
// 		console.log('nav-local');
// 		$('.pattern-library-nav').removeClass('hide-nav');
// 		$('.pattern-library-body').removeClass('hide-nav');
// 	} else {
// 		console.log('not set');
// 	}
// });


// function navigationShowHide() {
// 	if ( $('.pattern-library-nav').hasClass('hide-nav') && $('.pattern-library-body').hasClass('hide-nav') ) {
// 		$('.pattern-library-nav').removeClass('hide-nav');
// 		$('.pattern-library-body').removeClass('hide-nav');
// 		localStorage.setItem("navigation", true);
// 	} else {
// 		$('.pattern-library-nav').addClass('hide-nav');
// 		$('.pattern-library-body').addClass('hide-nav');
// 		localStorage.setItem("navigation", false);
// 	}
// }

$('.pattern-library-hover').mouseover(function(){
	console.log('hover2');
	$('.pattern-library-nav').toggleClass('hide-nav');
	$('.pattern-library-body').toggleClass('hide-nav');
})

$('.nav-show-hide').click(function(){

	//navigationShowHide();

	$('.pattern-library-nav').toggleClass('hide-nav');
	$('.pattern-library-body').toggleClass('hide-nav');
});

// $(window).resize(function() {
// 	navDisplay();
// });

// // $(document).ready(function(){
// // 	navDisplay();
// // });

// function navDisplay(){
// 	if($(window).width() <=1200) {
// 		$('.pattern-library-nav').addClass('hide-nav');
// 		$('.pattern-library-body').addClass('hide-nav');
// 	} else {
// 		$('.pattern-library-nav').removeClass('hide-nav');
// 		$('.pattern-library-body').removeClass('hide-nav');

// 	}
// }