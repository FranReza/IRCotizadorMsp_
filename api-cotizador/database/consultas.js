const consultas = {

    buscarClientesPorNombre : `SELECT 
	c.CLIENTE_ID,
	c.NOMBRE AS NOMBRE_CLIENTE,
	m.MONEDA_ID,
	m.NOMBRE AS NOMBRE_MONEDA,
	cp.COND_PAGO_ID,
	cp.NOMBRE AS NOMBRE_CONDICION
    FROM CLIENTES c
    LEFT JOIN MONEDAS m ON c.MONEDA_ID  = m.MONEDA_ID
    LEFT JOIN CONDICIONES_PAGO cp ON c.COND_PAGO_ID = cp.COND_PAGO_ID
    WHERE c.NOMBRE LIKE ?
    `,
    

};

module.exports = consultas;