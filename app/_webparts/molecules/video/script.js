if ( $('[data-video-ytID]').length ) {
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var players = [];
	var videoIds = [];
	var controls = [];

	function onYouTubeIframeAPIReady() {
	$('[data-video-ytID]').each(function(index) {
		videoIds[index] = $(this).attr('id');
		
		if ( $(this).attr('data-video-controls') == 0 ) {
			controls[index] = 0 
		} else {
			controls[index] = 1;
		};

		var ytID = $('#' + videoIds[index]).attr('data-video-ytID');
			players[index] = new YT.Player(videoIds[index], {
				height: '100%',
				width: '100%',
				videoId: ytID,
				playerVars: { 
					'showinfo':0,
					'controls':controls[index], 
					'rel':0,
					'fs':0,
					'modestbranding':1,
				},
				events: {
					'onReady': function(event) {
						// console.log(event);
						var autoplay = $('#' + videoIds[index]).attr('data-video-autoplay');
						
						if (autoplay == 1) {
							event.target.mute();
							event.target.playVideo();
						}

						if (controls[index] == 1) {
							// show controls
							// console.log(players[index]);
							// console.log(event.target);
							// players[index].iframe.classList.addClass('controlsABC');
							
							var controlsHTML = "<div class='controls'></div>"
							$('#' + videoIds[index]).parent().prepend(controlsHTML);

							//$('#' + videoIds[index]).addClass('controls');
						}
					},
					onStateChange: function(event) {
						loopVideo(event, videoIds[index], players[index]);
					}
				}
			});
		});
	}
	function loopVideo(event, videoIdsIndex, playersIndex){
		var loop = $('#' + videoIdsIndex).attr('data-video-loop')
		if (event.data === YT.PlayerState.ENDED && loop == 1 ) {
			playersIndex.playVideo(); 
		}
	}
}