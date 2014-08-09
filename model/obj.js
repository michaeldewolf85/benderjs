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
	this.processHTML();
	this.renderedOutput = this.DOMDataToArray();
}

/**
 *	The workhorse. Builds a DOM element out of the render array.
 *
 *	@param object elem
 *		The element to render.
 *
 *	@return object
 *		The element, modified to include each elements html.
 */
RenderInterface.prototype.buildRenderElement = function(elem)	{
	for (var x in elem) {
		if (this.isRenderable(elem[x])) {
			elem[x] = this.setDefaults(elem[x]);
			if (elem[x].type == 'html') {
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
 *
 *	@return boolean
 *		A boolean indicating whether or not the given render object property
 *		is renderable and should be treated to an additional layer of
 *		processing.
 */
RenderInterface.prototype.isRenderable = function(elem)	{
	return (typeof elem == 'object' && elem.type) ? true : false;
}

/**
 *	Helper function to render the array as a dom object.
 *
 *	@param object elementObj
 *		The render object as passed into this class.
 *
 *	@return object
 *		The DOM Element.
 */
RenderInterface.prototype.renderNode = function(elementObj)	{
	elementObj.element = document.createElement(elementObj.type);
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
 *
 *	@return object
 *		The modified DOM element object.
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
 *
 *	@param object elem
 *		The DOM Object t get html for.
 *
 *	@return string
 *		An HTML string representing the DOM object.
 */
RenderInterface.prototype.DOMDataToString = function(elem)	{
	var div = document.createElement('div');
	div.appendChild(elem);
	return div.innerHTML;
}

/**
 *	Sort the DOM object by weight.
 *
 *	@return array
 *		An array of html ordered by weight.
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

/**
 *	Add rendered output to DOM Data.
 *
 *	@return string
 *		An html string.
 */
RenderInterface.prototype.processHTML = function()	{
	for (var x in this.DOMData) {
		this.processChildren(this.DOMData[x]);
		this.DOMData[x].html = this.DOMData[x].html ? this.DOMData[x].html : this.DOMDataToString(this.DOMData[x].element);
	}
}

/**
 *	Recurse over children and append them to their parents
 */
RenderInterface.prototype.processChildren = function(elem)	{
	for (var x in elem) {
		if (this.isRenderable(elem[x]) && elem[x].type != 'html') {
			elem.element.appendChild(elem[x].element);
			this.processChildren(elem[x]);
		}
	}
}

RenderInterface.prototype.toHTMLString = function()	{
	return this.renderedOutput.join('\n');
}

/**
 *	Set defaults on an element in case of missing values.
 *
 *	@param object elementObj
 *		The element object.
 *
 *	@return object
 *		The modified element object.
 */
RenderInterface.prototype.setDefaults = function(elementObj)	{
	if (!elementObj.weight) {
		elementObj.weight = 0;
	}
	return elementObj;
}