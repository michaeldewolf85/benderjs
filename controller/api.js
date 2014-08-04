/**
 *	@file
 *	The controller. Process logic.
 */

/**
 *	Render an array.
 *
 *	@param array renderArray
 *		The array to render.
 */
function benderRender(renderArray)	{
	var renderInterface = new RenderInterface(renderArray);
	renderInterface.buildElements();
}