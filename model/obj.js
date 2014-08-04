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
	for (var x in this.DOMData) {

	}
}

/**
 *	The workhorse. Builds a DOM element out of the render array.
 *
 *	@param object elem
 *		The element to render.
 */
RenderInterface.prototype.buildRenderElement = function(elem)	{

}

/**
 *	Helper function that checks whether a property name is renderable. A 
 *	wrapper for checking if the first letter of the property label is "(".
 *
 *	@param string label
 *		The label to check for.
 */
RenderInterface.prototype.isRenderable = function(label)	{
	return label.charAt(0) === '(' ? true : false;
}