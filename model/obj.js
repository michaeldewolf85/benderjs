/**
 *	@file
 *	Core model logic.
 */

/**
 *	The render object.
 *
 *	@param array renderObj
 *		The render object to work with.
 */
function RenderInterface(renderObj)	{

	/**
	 *	@var object DOMData
	 *		The render array to work with. An object which stores all of the 
	 *		data about our dom element.
	 */
	this.DOMData;

	/**
	 *	@var array renderedOutput
	 *		An array of the entity's html, sorted by weight and ready to 
	 *		print.
	 */
	this.renderedOutput;

	/**
	 *	Construction logic.
	 */
	this.DOMData = this.buildRenderElement(renderObj);
	this.DOMDataToString();
	this.renderedOutput = this.DOMDataToArray();
}

/**
 *	The workhorse. Builds a DOM element out of the render array.
 *
 *	@param object elem
 *		The element to render.
 */
RenderInterface.prototype.buildRenderElement = function(elem)	{
	for (var x in elem) {
		if (this.isRenderable(elem[x])) {
			if (elem[x].html) {
				continue;
			}
			elem[x] = this.renderNode(elem[x]);
			elem[x] = this.buildRenderElement(elem[x]);
		}
	}
	return elem;
}

/**
 *	Helper function that checks whether a property name contains its own
 *	render array by checking for the type property.
 *
 *	@param object elem
 *		The object to check.
 */
RenderInterface.prototype.isRenderable = function(elem)	{
	return (typeof elem == 'object' && elem.type) ? true : false;
}

/**
 *	Helper function to render the array as a dom object.
 *
 *	@param object elementObj
 *		The render object as passed into this class.
 */
RenderInterface.prototype.renderNode = function(elementObj)	{
	elementObj.element = document.createElement(elementObj.type);
	if (!elementObj.weight) {
		elementObj.weight = 0;
	}
	for (var x in elementObj) {
		switch (x) {
			case 'attributes':
				elementObj = this.addAttributes(elementObj, elementObj[x]);
				break;
			case 'textContent':
				elementObj.element.textContent = elementObj[x];
				break;
		}
	}
	return elementObj;
}

/**
 *	Add attributes to a DOM object.
 *
 *	@param object elementObj
 *		Th DOM element object.
 *	@param object attributes
 *		An object describing the attributes to add to the element.
 */
RenderInterface.prototype.addAttributes = function(elementObj, attributes)	{
	for (var x in attributes) {
		switch (x) {
			case 'id':
				elementObj.element.id = attributes[x];
				break;
			case 'class':
				var len = attributes[x].length;
				for (var i = 0; i < len; i++) {
					elementObj.element.className += attributes[x][i] + ' ';
				}
				break;
			default:
				elementObj.element.setAttribute(x, attributes[x]);
		}
	}
	return elementObj;
}

/**
 *	Convert the DOM object to a string.
 */
RenderInterface.prototype.DOMDataToString = function()	{
	var div = document.createElement('div');
	for (var x in this.DOMData) {
		if (this.DOMData.html) {
			continue;
		}
		div.appendChild(this.DOMData[x].element);
		this.DOMData[x].html = div.innerHTML;
		div.removeChild(div.childNodes[0]);
	}
}

/**
 *	Sort the DOM object by weight.
 */
RenderInterface.prototype.DOMDataToArray = function()	{
	var temp = [];
	var currentMax = 0;
	for (var x in this.DOMData) {
		temp.push(this.DOMData[x]);
	}
	temp.sort(function(a, b)	{
		if (b.weight < a.weight) {
			return 1;
		}
		else if (a.weight > b.weight) {
			return -1
		}
		else {
			return 0;
		}
	});

	var len = temp.length;
	for (var i = 0; i < len; i++) {
		temp[i] = temp[i].html;
	}
	return temp;
}

RenderInterface.prototype.toHTMLString = function()	{
	return this.renderedOutput.join('\n');
}