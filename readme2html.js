function getSectionId(text) {
	var plainId = text
		.trim() // remove spaces from start and the end
		.toLowerCase() // optional
		.replace(/\s/g, '-') // convert all spaces to underscores
		.replace(/[^\w-]/g, ''); // remove all special characters
	var id = plainId;
	while ( document.getElementById(id)!=null ) {
		var index = plainId==id ? 0 : parseInt(id.substring(id.lastIndexOf("-") + 1));
		id = plainId+'-'+(index+1);
	}
	return id;
}

function getHeadingLevel(el) {
	return parseInt(el.nodeName.substring(1),10);
}

function getSelfAndHigherHeadingSelector(level) {
	var selfAndHigherArray = new Array;
	for ( var i = 1 ; i <= level ;i++ ) {
		selfAndHigherArray.push('h'+i);
	}
	return selfAndHigherArray.join(',');
}

function addContentDiv() {
	$('h1').first().nextAll().wrapAll('<div id="content"></div>');
	$('div#content').wrap('<div id="contentArea"></div>');
}

function addSections() {
	$('h2, h3').each(function(i, el){
	  var title = $(this).text();
	  var level = getHeadingLevel(el);
	  var id = getSectionId(title);
	  var section = '<section id="'+id+'" title="'+title+'" aria-level="'+level+'"></section>';
	  $(this).nextUntil(getSelfAndHigherHeadingSelector(level)).addBack().wrapAll(section)
	});
}

function generateToC() {
	$('body').prepend('<div id="tocArea"><ul id="toc"></ul></div>');
	$('section').each(function(i, el) {
		var level = $(this).attr('aria-level');
		var indent = (level-2)+'em';
		var href = getShowSectionHref($(this).attr('id'));
		//var href = '#'+$(this).attr('id');
		var title = $(this).attr('title');
		$('ul#toc').append('<li style="padding-left: '+indent+';"><a href="'+href+'">'+title+'</a></li>');
	});
}

function replaceLocalHashLinks() {
	$('a[href^="#"]').each(function() {
		var id = $(this).attr('href').substring(1);
		$(this).attr('href',getShowSectionHref(id));
	});
}

function getShowSectionHref(id) {
	return 'javascript:showSection(\''+id+'\')';
}

function showSection(id) {
	var $content = $('#content');
	$content.children('section').addClass('hidden');
	$content.children('section#'+id).removeClass('hidden');
	$content.children('section').has('#'+id).removeClass('hidden');
	
	$content.scrollTop(0);
    var $scrollTo = $('#'+id);
	$content.animate({
		scrollTop: $scrollTo.offset().top - $content.offset().top + $content.scrollTop()
	});
}

function showInitialSection() {
	var hash = window.location.hash
	var id = ( typeof hash === 'undefined' || hash === null || document.getElementById(hash)==null ) 
		? $('section').first().attr('id') 
		: hash.substring(1);
	showSection(id);
}

$(function() {
    addSections();
	addContentDiv();
	generateToC();
	replaceLocalHashLinks();
	showInitialSection();
	hljs.initHighlighting();
});