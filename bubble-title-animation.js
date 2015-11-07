var bubbleTitleAnimation = (function () {

	function textToHTML(text) {
		var startHtml = '<div><table><tr>',
			endHtml = '</tr></table></div>',
			html = '';
		var speed = 1 / text.length;
		var letter, delay;

		for (var i=0;i < text.length;i++) {
			letter = text.charAt(i);
			delay = speed * i;

			if (letter === "\n") {
				html += endHtml + startHtml;

			} else if (letter === " ") {
				html += '<td>&nbsp;</td>';

			} else {
				html += '<td style="animation-delay: '+
					delay
					+ 's, ' +
					(1.5 + delay)
					+ 's, 2.5s; animation-duration: 1.5s, '+
					(1.5 - delay)
					+'s, 1s"><span>' + letter + '</span></td>';
			}
		}

		return startHtml + html + endHtml;
	}

	function fixElementSize(rootElement, tagName) {
		var tags = rootElement.getElementsByTagName(tagName);
		var tag, i;

		for (i=0;i < tags.length;i++) {
			tag = tags[i];

			tag.style.width = tag.offsetWidth + 'px';
			tag.style.height = tag.offsetHeight + 'px';
		}
	}

	function fixElementPosition(rootElement, tagName) {
		var tags = rootElement.getElementsByTagName(tagName);
		var tag, i;
		var viewportHeight = window.innerHeight;

		for (i=0;i < tags.length;i++) {
			tag = tags[i];

			tag.style.bottom = (
				viewportHeight - tag.clientHeight - tag.offsetTop
			) + 'px';
			tag.style.left = tag.offsetLeft + 'px';
		}
	}

	function fixLetterSize(element) {
		fixElementSize(element, 'table');
		fixElementSize(element, 'td');
		fixElementPosition(element, 'div');
	}

	return function (element, text) {
		var className = 'bubble-title-animation ';

		var html = textToHTML(text);

		// remove class
		element.className = element.className.replace(className, '');

		// set html
		element.innerHTML = html;

		// fix positions and sizes
		fixLetterSize(element);

		// add class
		element.className = className + element.className;
	};
})();
