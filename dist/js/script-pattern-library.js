

$('.nav-show-hide').click(function(){
	$('.pattern-library-nav').toggleClass('hide-nav');
	$('.pattern-library-body').toggleClass('hide-nav');
});

// $(window).resize(function() {
// 	navDisplay();
// });

// $(document).ready(function(){
// 	navDisplay();
// })

// function navDisplay(){
// 	if($(window).width() <=1200) {
// 		$('.pattern-library-nav').addClass('hide-nav');
// 		$('.pattern-library-body').addClass('hide-nav');
// 	} else {
// 		$('.pattern-library-nav').removeClass('hide-nav');
// 		$('.pattern-library-body').removeClass('hide-nav');

// 	}
// }
