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
	 *	@var array DOMData
	 *		The render array to work with.
	 */
	this.DOMData;

	 /**
	  *	Construction logic.
	  */
	this.DOMData = renderObj;
}

/**
 *	Build the DOM from DOMData.
 */
RenderInterface.prototype.buildElements = function()	{
	this.DOMData = this.buildRenderElement(this.DOMData);
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
	for (var x in elementObj) {
		switch (x) {
			case 'attributes':
				elementObj = this.addAttributes(elementObj, elementObj[x]);
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