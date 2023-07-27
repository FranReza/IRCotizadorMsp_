const consultas = {

    buscarClientesPorNombre: `SELECT 
	c.CLIENTE_ID,
	c.NOMBRE AS NOMBRE_CLIENTE,
	m.MONEDA_ID,
	m.NOMBRE AS NOMBRE_MONEDA,
	cp.COND_PAGO_ID,
	cp.NOMBRE AS NOMBRE_CONDICION,
    dc.DIR_CLI_ID,
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

    buscarPrecioArticuloCliente : `EXECUTE PROCEDURE GET_PRECIO_ARTCLI(?, ?, '01-01-1000', 0);`,

    listaVendedores : `SELECT v.VENDEDOR_ID, v.NOMBRE FROM VENDEDORES v;`,

    generadorFolio: `EXECUTE PROCEDURE GEN_FOLIO_TEMP;`,

    insertDoctoVe : `INSERT INTO DOCTOS_VE VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING DOCTO_VE_ID;`,

    insertDoctoVeDet : `INSERT INTO DOCTOS_VE_DET VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,

    buscarMonedas : `SELECT m.MONEDA_ID, m.NOMBRE FROM MONEDAS m;`,

    buscarCondicionPago : `SELECT cp.COND_PAGO_ID, cp.NOMBRE FROM CONDICIONES_PAGO cp;`,

    insertarCliente : `INSERT INTO CLIENTES(CLIENTE_ID, NOMBRE, MONEDA_ID, COND_PAGO_ID, VENDEDOR_ID) VALUES (?, ?, ?, ?, ?) RETURNING CLIENTE_ID;`,

    datosCliente : `INSERT INTO DIRS_CLIENTES(DIR_CLI_ID, CLIENTE_ID, NOMBRE_CONSIG, TELEFONO1, EMAIL, RFC_CURP)  VALUES (?, ?, ?, ?, ?, ?);`
};

module.exports = consultas;