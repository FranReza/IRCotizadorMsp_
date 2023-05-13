import { Fragment } from "react";

const Header = () => {
    return (
        <Fragment>
            <header className="flex items-center justify-between p-5 border-b bg-white shadow">
                <h1 className="text-2xl font-semibold">IR Cotizador Microsip</h1>
                <div className="flex justify-end">
                    <nav>
                        <ul>
                            <li><a href="#">Alta de Clientes</a></li>
                            <li><a href="#">Ver Clientes</a></li>
                            <li><a href="#">Hacer cotización</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </Fragment>
    );
};

export default Header;