(function($) {
	$.fn.toggle_it = function( options ) {
		var settings = $.extend({
			clickable_heading: 'h2',
			toggle_it_type: 'hidden',
			animation: null,
			toggle_it_start_limit: '25',
			content_div: '.toggle_it_content'
		}, options );
		var object = $(this);
		var html_start;
		var full_html;
		var count = 0;

		$(this).each(function() {

			if( settings.toggle_it_type == 'excerpt' ) {

				//  SETUP
				var html = $(this).find(settings.content_div).html();
				var html_word_count = html.split(' ').length;
				if(html_word_count > settings.toggle_it_start_limit ) {
					html_start = html.split(' ', settings.toggle_it_start_limit);
					html_start = html_start.join(' ');
					html_check = html_start.search('/<p>/i');
					if( html_check != 'NULL' ) {
						html_start = html_start+'... <a class="read_more" href="#">Read More</a></p>';
					}
					full_html = '<div class="toggle_it_start">'+html_start+'</div><!--/toggle_it_start--><div class="toggle_it_full">'+html+'<a class="read_less" href="#">Read Less</a></div>';
					$(this).find(settings.content_div).html(full_html);
				}

				// EXECUTION
				$(settings.content_div+' .toggle_it_full').hide();
				$('.read_more').click(function() {
					$(this).parents(settings.content_div+' .toggle_it_start').hide(settings.animation);
					$(this).parents(settings.content_div).find('.toggle_it_full').show(settings.animation);
					return false;
				});
				$('.read_less').click(function() {
					$(this).parents(settings.content_div+ ' .toggle_it_full').hide(settings.animation);
					$(this).parents(settings.content_div).find('.toggle_it_start').show(settings.animation);
					return false;
				});
			}
			if( settings.toggle_it_type == 'hidden' ) {
				$(this).children(settings.content_div).hide();
				$(this).children(settings.content_div).first().show();
				$(this).children(settings.clickable_heading).css('cursor', 'pointer');
				$(this).children(settings.clickable_heading).click(function() {
					if( $(this).hasClass('open') ) {
						object.find(settings.content_div).hide('fast');
						object.find(settings.clickable_heading).removeClass('open');
					} else {
						object.find(settings.content_div).hide();
						$(this).next(settings.content_div).show('slow');
						object.find(settings.clickable_heading).removeClass('open');
						$(this).addClass('open');
					}

				});
			}
		});
		return this;
	}; //  END ACCORDION FUNCTION
}(jQuery));