const consultas = {
    buscarClientesPorNombre: `SELECT 
	c.CLIENTE_ID,
	c.NOMBRE AS NOMBRE_CLIENTE,
	m.MONEDA_ID,
	m.NOMBRE AS NOMBRE_MONEDA,
	cp.COND_PAGO_ID,
	cp.NOMBRE AS NOMBRE_CONDICION,
	dc.EMAIL,
    dc.RFC_CURP
    FROM CLIENTES c
    LEFT JOIN MONEDAS m ON c.MONEDA_ID  = m.MONEDA_ID
    LEFT JOIN CONDICIONES_PAGO cp ON c.COND_PAGO_ID = cp.COND_PAGO_ID
    LEFT JOIN DIRS_CLIENTES dc ON c.CLIENTE_ID = dc.CLIENTE_ID
    WHERE c.NOMBRE LIKE ?

    `,

    buscarArticuloPorNombre: `SELECT ba.ARTICULO_ID,
    ba.CLAVE_ARTICULO,
    ba.NOMBRE_ARTICULO,
    ba.UNIDAD_VENTA
    FROM BUSCA_ARTICULOS('NOMBRE', 'S', 'S', ?, NULL) ba;`,
};

module.exports = consultas;