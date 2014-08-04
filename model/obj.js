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
	console.log(this.DOMData);
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