/**
 * @constructor
 */
function ObjectResult() {};
/** @type {number} */
ObjectResult.prototype.Codigo;

/** @type {string} */
ObjectResult.prototype.Descripcion;

/**
 * @constructor
 */
function TipologiasYZonasGeograficas() {};

/** @type {Array.<ObjectResult>} */
TipologiasYZonasGeograficas.prototype.Tipologias;

/** @type {Array.<ObjectResult>} */
TipologiasYZonasGeograficas.prototype.ZonaGeograficas;