import { Fragment } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Fragment>
            <header className="flex items-center justify-between p-5 border-b bg-white shadow">
                <h1 className="text-2xl font-semibold">IR Cotizador Microsip</h1>
                <div className="flex justify-end">
                    <nav>
                        <ul>
                            <Link to={"/nuevo-cliente"}>Alta de Clientes</Link>
                            <Link to={"/visor-clientes"}>Ver Clientes</Link>
                            <Link to={"/"}>Hacer Cotización</Link>
                        </ul>
                    </nav>
                </div>
            </header>
        </Fragment>
    );
}; 

export default Header;