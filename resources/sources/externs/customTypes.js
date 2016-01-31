/**
 * @record
 */
function ObjectResult() {};
/** @type {integer} */
ObjectResult.prototype.Codigo;

/** @type {string} */
ObjectResult.prototype.Descripcion;

/**
 * @record
 */
function TipologiasYZonasGeograficas() {};

/** @type {Array.<ObjectResult>} */
TipologiasYZonasGeograficas.prototype.Tipologias;

/** @type {Array.<ZonaGeograficas>} */
TipologiasYZonasGeograficas.prototype.ZonaGeograficas;