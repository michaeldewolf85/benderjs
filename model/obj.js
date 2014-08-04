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
RenderInterface.prototype.buildDOM = function()	{
	this.buildRenderElement(this.DOMData);
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
			this.buildRenderElement(elem[x]);
		}
	}
}

/**
 *	Helper function that checks whether a property name is renderable. A 
 *	wrapper for checking if the first letter of the property label is "(".
 *
 *	@param object elem
 *		The object to check.
 */
RenderInterface.prototype.isRenderable = function(elem)	{
	return typeof elem == 'object' && elem.type ? true : false;
}