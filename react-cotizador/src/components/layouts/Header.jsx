import { Fragment } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Fragment>
            <header className="flex items-center justify-between p-0 border-b-0 bg-white shadow">
                <div className="flex items-start">
                    <img
                        src="/images/vaes logo.jpg"
                        className="h-28 w-auto"
                        alt=""
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <nav>
                        <ul className="flex">
                            <li className="mr-4">
                                <Link to={"/nuevo-cliente"}>Alta de Clientes</Link>
                            </li>
                            <li className="mr-4">
                                <Link to={"/visor-clientes"}>Ver Clientes</Link>
                            </li>
                            <li className="mr-4">
                                <Link to={"/"}>Hacer Cotización</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </Fragment>
    );
};

export default Header;
