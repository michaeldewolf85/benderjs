/**
 *	@file
 *	Core model logic.
 */

/**
 *	The render object.
 *
 *	@param array renderArray
 *		The render array to work with.
 */
function RenderInterface(renderArray)	{

	/**
	 *	@var array DOMData
	 *		The render array to work with.
	 */
	this.DOMData;

	 /**
	  *	Construction logic.
	  */
	this.DOMData = renderArray;
}

/**
 *
 */
RenderInterface.prototype.renderDOMData = function()	{
	for (var x in this.DOMData) {
		console.log(this.DOMData[x]);
	}
}